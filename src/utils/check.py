import itertools
import sys
import os
import subprocess
import unicodedata

from os.path import join

from pa_tools.mod import checker
from pa_tools.mod.utils import create_pafs
from pa_tools.pa import spec

MODINFO = "modinfo.json"

# build.py copies shared and client into one mod, and shared and server into the other.
ONE_MOD = [
    ("shared", "shared"),
    ("client", "client"),
    ("server", "server"),
    ("shared", "client"),
    ("shared", "server"),
]


def git_name(path):
    # git on macOS prints NFC names, and the disk can hold NFD ones. A macOS
    # volume cannot hold both forms of one name, so NFC cannot merge two files.
    if sys.platform == "darwin":
        return unicodedata.normalize("NFC", path)
    return path


def source_files(source_dir):
    try:
        ignored = subprocess.run(
            ["git", "ls-files", "-z", "--others", "--ignored", "--exclude-standard"],
            cwd=source_dir,
            stdout=subprocess.PIPE,
            check=True,
        ).stdout
    except (OSError, subprocess.CalledProcessError) as error:
        print(f"Error: git could not list the ignored files in src/{source_dir}.")
        print(f"  The build needs git on the PATH and runs only in a clone. {error}")
        input()
        sys.exit(1)

    ignored = {git_name(path) for path in os.fsdecode(ignored).split("\0")}
    found = []

    # Walk the disk, not git's index: the index can keep a file's old case.
    for dir_path, _, file_names in os.walk(source_dir, followlinks=True):
        for file_name in file_names:
            relative = os.path.relpath(join(dir_path, file_name), source_dir)
            relative = relative.replace(os.sep, "/")
            if git_name(relative) not in ignored:
                found.append(relative)

    return found


def path_key(path):
    # Case-insensitive APFS compares names after NFD and a full case fold. NFD goes
    # first: casefold() can split a letter, moving a later mark to the new letter.
    return unicodedata.normalize("NFC", unicodedata.normalize("NFD", path).casefold())


def source_paths(source_dir):
    paths = {}
    for path in source_files(source_dir):
        paths.setdefault(path_key(path), []).append(path)
    return paths


def source_dirs(paths):
    dirs = {}
    for path in itertools.chain.from_iterable(paths.values()):
        parts = path.split("/")
        for end in range(1, len(parts)):
            prefix = "/".join(parts[:end])
            dirs.setdefault(path_key(prefix), set()).add(prefix)
    return dirs


def same_folder_duplicates(found):
    duplicates = []
    for name, paths in found.items():
        for key in sorted(paths):
            for first, second in itertools.combinations(sorted(paths[key]), 2):
                duplicates.append((f"{name}/{first}", f"{name}/{second}"))
    return duplicates


def cross_folder_duplicates(found):
    pairs = [
        # build.py reads each half's modinfo.json to make that mod's own. Only
        # that exact name is exempt: a variant ships as or beside the real one.
        ("client", "server", {MODINFO}),
        ("shared", "client", set()),
        ("shared", "server", set()),
    ]
    duplicates = []

    for first, second, allowed in pairs:
        for folded in sorted(found[first].keys() & found[second].keys()):
            for first_path, second_path in itertools.product(
                sorted(found[first][folded]), sorted(found[second][folded])
            ):
                if {first_path, second_path} <= allowed:
                    continue
                duplicates.append(
                    (f"{first}/{first_path}", f"{second}/{second_path}")
                )
    return duplicates


def file_dir_duplicates(found, dirs):
    duplicates = []
    reverse = [(second, first) for first, second in ONE_MOD if first != second]
    for file_tree, dir_tree in ONE_MOD + reverse:
        for key in sorted(found[file_tree].keys() & dirs[dir_tree].keys()):
            for file_path, dir_path in itertools.product(
                sorted(found[file_tree][key]), sorted(dirs[dir_tree][key])
            ):
                duplicates.append(
                    (f"{file_tree}/{file_path}", f"{dir_tree}/{dir_path}/")
                )
    return duplicates


def dir_spelling_duplicates(dirs):
    duplicates = []
    for first, second in ONE_MOD:
        for key in sorted(dirs[first].keys() & dirs[second].keys()):
            if first == second:
                pairs = itertools.combinations(sorted(dirs[first][key]), 2)
            else:
                pairs = itertools.product(
                    sorted(dirs[first][key]), sorted(dirs[second][key])
                )
            for first_path, second_path in pairs:
                # Equal last names mean that a parent differs. It has its own pair.
                if first_path.rsplit("/", 1)[-1] != second_path.rsplit("/", 1)[-1]:
                    duplicates.append(
                        (f"{first}/{first_path}/", f"{second}/{second_path}/")
                    )
    return duplicates


def non_ascii_paths(found):
    return [
        f"{name}/{path}"
        for name, paths in found.items()
        for path in sorted(itertools.chain.from_iterable(paths.values()))
        if not path.isascii()
    ]


def print_escaped(line):
    # A name can hold a character that does not show, such as U+200C, and two
    # names can look the same, such as the NFC and NFD forms of one name.
    # Escaping shows each character.
    print(line.encode("unicode_escape").decode("ascii"))


def print_duplicates(duplicates):
    for first, second in duplicates:
        print_escaped(f"  src/{first} and src/{second}")


def check_source_paths():
    found = {name: source_paths(name) for name in ("shared", "client", "server")}
    non_ascii = non_ascii_paths(found)
    dirs = {name: source_dirs(paths) for name, paths in found.items()}
    same_folder = same_folder_duplicates(found)
    cross_folder = cross_folder_duplicates(found)
    file_dir = file_dir_duplicates(found, dirs)
    dir_spelling = dir_spelling_duplicates(dirs)

    if non_ascii:
        print(
            "Error: A file path in src/shared, src/client, or src/server holds a "
            "character that is not ASCII."
        )
        print(
            "  File systems compare such names in different ways, so the build "
            "cannot find every pair of names that one of them treats as one."
        )
        for path in non_ascii:
            print_escaped(f"  src/{path}")

    if same_folder:
        print(
            "Error: Two file paths in one of src/shared, src/client, and src/server "
            "compare equal after NFD and a full Unicode case fold."
        )
        print(
            "  The default file systems of macOS, and of Windows for a pair such as "
            "A.json and a.json, hold only one of the two files."
        )
        print_duplicates(same_folder)

    if cross_folder:
        print(
            "Error: A file path is in more than one of src/shared, src/client, "
            "and src/server."
        )
        print(
            "  Both mods ship the path. PA loads the server mod's copy in a lobby "
            "or a game, and the client mod's copy elsewhere."
        )
        print_duplicates(cross_folder)

    if file_dir:
        print(
            "Error: A file name and a directory name in one of src/shared, src/client, "
            "and src/server, or in src/shared and one of the other two, compare equal "
            "after NFD and a full Unicode case fold."
        )
        print(
            "  No folder can hold a file and a directory of one name, and the default "
            "file systems of macOS, and of Windows for a pair such as a and A, treat "
            "the two as one name."
        )
        print_duplicates(file_dir)

    if dir_spelling:
        print(
            "Error: Two directory names in one of src/shared, src/client, and "
            "src/server, or in src/shared and one of the other two, are spelled "
            "differently and compare equal after NFD and a full Unicode case fold."
        )
        print(
            "  The default file systems of macOS, and of Windows for a pair such as "
            "L_bot and l_bot, treat the two as one name, so a build there ships one "
            "folder and a Linux build ships two."
        )
        print_duplicates(dir_spelling)

    if non_ascii or same_folder or cross_folder or file_dir or dir_spelling:
        input()
        sys.exit(1)


def check_mod(client_output_dir, server_output_dir):
    # legion works with pa titans only, so mount that as well
    fs = create_pafs()

    # mount the client and server folders (server gets first pick)
    fs.mount("/", client_output_dir)
    fs.mount("/", server_output_dir)

    # now we are going to do validation
    # mod path isn't really important in this case
    report = checker.ModReport(server_output_dir)

    # Check the server modinfo
    checker.check_modinfo(report, os.path.join(server_output_dir, MODINFO), fs)
    if report.getIssueCount() > 0:
        print(report.printDetailsReport())
        print(report.printInfoIssueReport())
        input()
        sys.exit(1)

    report = checker.ModReport(client_output_dir)
    # Check the client mod info
    checker.check_modinfo(report, os.path.join(client_output_dir, MODINFO), fs)
    if report.getIssueCount() > 0:
        print(report.printDetailsReport())
        print(report.printInfoIssueReport())
        input()
        sys.exit(1)

    checker.find_missing_files(report, fs)
    # For compatibility with other mods, we may need to refer to their files
    # without actually requiring that they are present.
    ALLOW_MISSING_FILES = [
        # Bugs Faction
        "/pa/units/structure/bug_basic_extractor/bug_basic_extractor.json",
        "/pa/units/structure/bug_advanced_extractor/bug_advanced_extractor.json",
    ]
    for allowed_missing in ALLOW_MISSING_FILES:
        report.file_issues.pop(allowed_missing, None)

    if report.getIssueCount() > 0:
        print(report.printDetailsReport())
        print(report.printJsonIssueReport())
        print(report.printFileIssueReport())
        input()
        sys.exit(1)

    # Check that all the legion units have the Custom1 build flag
    units = spec.load_spec(fs, "/pa/units/unit_list_legion.json")

    for unit_path in units["units"]:
        unit = spec.parse_spec(fs, unit_path)

        if "buildable_types" not in unit:
            continue

        # Check that all legion factories have Custom1 as a buildable type
        if "Custom1" not in unit["buildable_types"]:
            print("Error: A factory is missing the Custom1 buildable type.")
            print(f"  unit: {unit_path}")
            print(f" buildable_types: {unit['buildable_types']}")
            input()
            sys.exit(1)

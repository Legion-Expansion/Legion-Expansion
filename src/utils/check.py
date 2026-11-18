import itertools
import sys
import os
import posixpath
import subprocess
import unicodedata

from pa_tools.mod import checker
from pa_tools.mod.utils import create_pafs
from pa_tools.pa import spec

MODINFO = "modinfo.json"


def git_name(path):
    # git on macOS prints NFC names, and the disk can hold NFD ones. A macOS
    # volume cannot hold both forms of one name, so NFC cannot merge two files.
    if sys.platform == "darwin":
        return unicodedata.normalize("NFC", path)
    return path


def stop_on_unreadable_folder(error):
    print(
        "Error: The build could not read a folder in src/shared, src/client, or "
        "src/server."
    )
    print(f"  The build would ship without the files in it. {error}")
    input()
    sys.exit(1)


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
    for dir_path, _, file_names in os.walk(
        source_dir, onerror=stop_on_unreadable_folder, followlinks=True
    ):
        # Keep each name as os.walk lists it: on Windows, path functions such
        # as relpath drop a trailing dot or space.
        relative_dir = dir_path[len(source_dir) + 1 :].replace(os.sep, "/")
        for file_name in file_names:
            relative = posixpath.join(relative_dir, file_name)
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


def trailing_dot_or_space(found):
    return [
        f"{name}/{path}"
        for name, paths in found.items()
        for path in sorted(itertools.chain.from_iterable(paths.values()))
        if any(part.endswith((".", " ")) for part in path.split("/"))
    ]


def print_escaped(line):
    # A redirected stdout can use a code page, such as Windows cp1252,
    # that cannot hold every name. Escaping also shows each name's form.
    print(line.encode("unicode_escape").decode("ascii"))


def print_duplicates(duplicates):
    for first, second in duplicates:
        print_escaped(f"  src/{first} and src/{second}")


def check_source_paths():
    found = {name: source_paths(name) for name in ("shared", "client", "server")}
    windows_names = trailing_dot_or_space(found)
    same_folder = same_folder_duplicates(found)
    cross_folder = cross_folder_duplicates(found)

    if windows_names:
        print(
            "Error: A file or folder name in src/shared, src/client, or src/server "
            "ends in a dot or a space."
        )
        print(
            '  Windows cannot hold the name: it reads "a.json." and "a.json " as '
            '"a.json", and "d./" as "d/". Git for Windows does not check the name out.'
        )
        for path in windows_names:
            print_escaped(f'  "src/{path}"')

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

    if windows_names or same_folder or cross_folder:
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

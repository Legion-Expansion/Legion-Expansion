import os
import subprocess

from os.path import basename, exists, join, relpath


def tracked_paths(repo_dir):
    listing = subprocess.run(
        ["git", "-C", repo_dir, "ls-files", "-z"],
        stdout=subprocess.PIPE,
        check=True,
    ).stdout.decode("utf-8")
    return sorted({tracked for tracked in listing.split("\0") if tracked})


def built_paths(repo_dir):
    found = set()

    for dir_path, dir_names, file_names in os.walk(repo_dir):
        dir_names[:] = [name for name in dir_names if name != ".git"]
        for file_name in file_names:
            built = relpath(join(dir_path, file_name), repo_dir)
            found.add(built.replace(os.sep, "/"))

    return found


# With core.ignorecase on, git add keeps the tracked name when a built file
# changes only its case, as long as the old name still resolves on disk.
def case_only_renames(repo_dir):
    built = built_paths(repo_dir)
    built_by_folded = {path.lower(): path for path in built}
    renames = []

    for tracked in tracked_paths(repo_dir):
        if tracked in built:
            continue
        current = built_by_folded.get(tracked.lower())
        if current is not None and exists(join(repo_dir, tracked)):
            renames.append((tracked, current))

    return renames


def record_case_renames(*repo_dirs):
    for repo_dir in repo_dirs:
        for tracked, current in case_only_renames(repo_dir):
            subprocess.run(
                ["git", "-C", repo_dir, "mv", "-f", tracked, current],
                check=True,
            )
            print(
                f"RENAME {tracked} -> {current} in {basename(repo_dir)}",
                flush=True,
            )

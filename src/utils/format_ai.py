#!/usr/bin/python
import sys

# On Windows, Python before 3.15 writes a redirected stdout in the ANSI code
# page, and print() stops on a character that the code page does not have.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(errors="backslashreplace")

import subprocess
from pathlib import Path
from typing import OrderedDict

SRC_DIR = Path(__file__).resolve().parent.parent
REPO_DIR = SRC_DIR.parent
AI_DIR = SRC_DIR / "server" / "pa" / "ai"
PRETTIER = REPO_DIR / "node_modules" / ".bin" / ("prettier.cmd" if sys.platform == "win32" else "prettier")
sys.path.insert(0, str(SRC_DIR))

from pa_tools.pa import pajson

# Use this as the list of keys you want first, all other keys will appear in-order after this
KEY_ORDER = [
    "name",
    "to_build",
    "instance_count",
    "shared_instance_count",
    "cross_planet_shared_count",
    "priority",
    "min_num_assisters",
    "max_num_assisters",
    "base_sort",
    "builders",
    "build_conditions",
    "placement_rules",
    "buffer",
    "placement_type",
    "unit_count_rules",
    "threat",
    "influence_type",
    "unit_type_string",
    "alliance",
    "compare_type",
    "radius",
    "value",
    "range",
    "count",
    "test_type",
    "unit_type_string0",
    "unit_type_string1",
    "string0",
    "string1",
    "compare0",
    "value0",
    "boolean",
    "min_count",
    "max_count",
]

COMPARE_VALUES = [
    "test_type",
    "unit_type_string0",
    "string0",
    "value0",
    "compare0",
    "value1",
]


def _reorder_dict(obj):
    new_obj = OrderedDict()
    preferred = COMPARE_VALUES if "value1" in obj else KEY_ORDER

    for key in preferred:
        if key in obj:
            new_obj[key] = reorder_keys(obj[key])

    for key, value in obj.items():
        new_obj[key] = reorder_keys(value)

    return new_obj


def reorder_keys(obj):
    if isinstance(obj, dict):
        return _reorder_dict(obj)

    if isinstance(obj, list):
        return list(map(reorder_keys, obj))

    return obj


def prettier_runs():
    try:
        return subprocess.run([PRETTIER, "--version"], capture_output=True).returncode == 0
    except OSError:
        return False


if not prettier_runs():
    sys.exit(f"{PRETTIER} does not run; run npm install in the repository root, with node on PATH")

# Format all the AI files and reorder the object keys
reordered = []
for file in AI_DIR.glob("**/*.json"):
    data, warnings = pajson.loadf(file)
    list(map(print, warnings))

    # prettier's endOfLine "auto" keeps the first line's ending
    with file.open("rb") as f:
        newline = "\r\n" if f.readline().endswith(b"\r\n") else "\n"
    reordered.append((file, reorder_keys(data), newline))

for file, data, newline in reordered:
    with open(file, "w", encoding="utf-8", newline=newline) as f:
        f.write(pajson.dumps(data, indent=2, ensure_ascii=False))
        f.write("\n")

prettier_args = [PRETTIER, "--write", AI_DIR.relative_to(REPO_DIR).as_posix()]
sys.exit(subprocess.run(prettier_args, cwd=REPO_DIR).returncode)

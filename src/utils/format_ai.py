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


def prettier(*args, **kwargs):
    sys.stdout.flush()
    return subprocess.run([PRETTIER, *args], cwd=REPO_DIR, **kwargs).returncode


# The ending at the first CR, as prettier's endOfLine "auto" picks it
def line_ending(raw):
    cr = raw.find(b"\r")
    if cr == -1:
        return "\n"
    return "\r\n" if raw[cr + 1 : cr + 2] == b"\n" else "\r"


try:
    prettier_runs = prettier("--version", stdout=subprocess.DEVNULL) == 0
except OSError:
    prettier_runs = False
if not prettier_runs:
    sys.exit(f"{PRETTIER} does not run; run npm install in the repository root, with node on PATH")

# Format all the AI files and reorder the object keys
reordered = []
for file in AI_DIR.glob("**/*.json"):
    data, warnings = pajson.loadf(file)
    list(map(print, warnings))

    text = pajson.dumps(reorder_keys(data), indent=2, ensure_ascii=False) + "\n"
    text = text.replace("\n", line_ending(file.read_bytes()))
    # A lone surrogate goes back as its \u escape
    reordered.append((file, text.encode("utf-8", errors="backslashreplace")))

try:
    for file, content in reordered:
        file.write_bytes(content)
finally:
    exit_code = prettier("--write", AI_DIR.relative_to(REPO_DIR).as_posix())
sys.exit(exit_code)

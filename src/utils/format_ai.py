#!/usr/bin/python
import sys

# On Windows, Python before 3.15 writes a redirected stdout in the ANSI code
# page, and print() stops on a character that the code page does not have.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(errors="backslashreplace")

import json
import math
import os
import subprocess
from json import decoder, scanner
from pathlib import Path
from typing import OrderedDict

SRC_DIR = Path(os.path.abspath(__file__)).parent.parent
REPO_DIR = SRC_DIR.parent
AI_DIR = SRC_DIR / "server" / "pa" / "ai"
PRETTIER = REPO_DIR / "node_modules" / "prettier" / "bin" / "prettier.cjs"
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


# The ending at the first CR, as prettier's endOfLine "auto" picks it
def line_ending(raw):
    cr = raw.find(b"\r")
    if cr == -1:
        return "\n"
    return "\r\n" if raw[cr + 1 : cr + 2] == b"\n" else "\r"


class RepeatedKey(ValueError):
    pass


def unique_keys(pairs):
    obj = OrderedDict()
    for key, value in pairs:
        if key in obj:
            raise RepeatedKey(f"repeated key {json.dumps(key)} in an object")
        obj[key] = value
    return obj


def located_object(s_and_end, *args):
    try:
        return decoder.JSONObject(s_and_end, *args)
    except RepeatedKey as error:
        text, end = s_and_end
        raise json.JSONDecodeError(str(error), text, end - 1) from None


def reject_constant(name):
    raise ValueError(f"{name} is not JSON")


def finite_float(text):
    value = float(text)
    if not math.isfinite(value):
        raise ValueError(f"{text} is too large for a float")
    return value


class StrictDecoder(json.JSONDecoder):
    def __init__(self):
        super().__init__(
            object_pairs_hook=unique_keys,
            parse_constant=reject_constant,
            parse_float=finite_float,
        )
        # The C scanner tells no hook where an object starts; the Python one
        # calls parse_object with the offset, so a repeated key gets a line
        self.parse_object = located_object
        self.scan_once = scanner.py_make_scanner(self)


# Strict JSON only: the rewrite would drop comments and all but the last value of a
# repeated key, and turn a fraction or exponent too large for a float into Infinity
def read_strict_json(file, raw):
    try:
        return json.loads(raw.decode("utf-8"), cls=StrictDecoder)
    except ValueError as error:
        sys.exit(
            f"{file}: {error}. format_ai.py reads strict JSON only. No file was written."
        )


def find_node():
    name = "node.exe" if sys.platform == "win32" else "node"
    # Only node.exe from an absolute PATH folder: a node.cmd shim would run through cmd.exe,
    # which splits a file name at "&", and the current folder may hold any node.exe
    for folder in os.environ.get("PATH", "").split(os.pathsep):
        node = os.path.join(folder.strip('"'), name)
        if os.path.isabs(node) and os.path.isfile(node) and os.access(node, os.X_OK):
            return node
    sys.exit(f"{name} is not in any folder on PATH. No file was written.")


def prettier_format(file, text):
    sys.stdout.flush()
    try:
        result = subprocess.run(
            [NODE, PRETTIER, "--stdin-filepath", str(file)],
            # A lone surrogate goes back as its \u escape
            input=text.encode("utf-8", errors="backslashreplace"),
            stdout=subprocess.PIPE,
            cwd=REPO_DIR,
        )
    except OSError as error:
        sys.exit(f"{NODE}: {error}. No file was written.")
    if result.returncode != 0:
        sys.exit(
            f"prettier exited with code {result.returncode} while it formatted {file}; "
            "its error is above. No file was written."
        )
    return result.stdout


NODE = find_node()
if not PRETTIER.is_file():
    sys.exit(f"{PRETTIER} is missing. Run npm install in the repository root. No file was written.")

# Reorder and format every file in memory, so that a prettier failure writes nothing
formatted = []
for file in AI_DIR.glob("**/*.json"):
    raw = file.read_bytes()
    data = read_strict_json(file, raw)

    text = pajson.dumps(reorder_keys(data), indent=2, ensure_ascii=False) + "\n"
    text = text.replace("\n", line_ending(raw))
    formatted.append((file, raw, prettier_format(file, text)))

skipped = 0
for file, raw, content in formatted:
    try:
        changed = file.read_bytes() != raw
    except FileNotFoundError:
        changed = True
    if changed:
        print(f"{file} changed during the run, so it was not written")
        skipped += 1
    elif content != raw:
        file.write_bytes(content)
sys.exit(1 if skipped else 0)

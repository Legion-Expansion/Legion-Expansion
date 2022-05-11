#!/usr/bin/python
from pathlib import Path
from typing import OrderedDict

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


def reorder_keys(obj):
    if isinstance(obj, dict):
        new_obj = OrderedDict()
        for key in KEY_ORDER:
            if key in obj and "value1" not in obj:
                new_obj[key] = reorder_keys(obj[key])
        for key in COMPARE_VALUES:
            if key in obj and "value1" in obj:
                new_obj[key] = reorder_keys(obj[key])

        for key, value in obj.items():
            new_obj[key] = reorder_keys(value)

        return new_obj

    if isinstance(obj, list):
        return list(map(reorder_keys, obj))

    return obj


# Format all the AI files and reorder the object keys
for file in Path("server/pa/ai").glob("**/*.json"):
    data, warnings = pajson.loadf(file)
    list(map(print, warnings))

    data = reorder_keys(data)

    with open(file, "w") as f:
        f.write(pajson.dumps(data, indent=2))
        f.write("\n")

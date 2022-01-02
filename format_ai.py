#!/usr/bin/python
from pathlib import Path
from typing import OrderedDict

from pa_tools.pa import pajson
from pa_tools.pa.paths import PA_MEDIA_DIR

# Use this as the list of keys you want first, all other keys will appear in-order after this
key_order = [
    "name",
    "to_build",
    "instance_count",
    "shared_instance_count",
    "priority",
    "base_sort",
    "builders",
    "build_conditions",
    "placement_rules",
    "buffer",
    "placement_type",
    "threat",
    "unit_count_rules",
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
    "value1",
    "boolean",
]


def reorder_keys(obj):
    if isinstance(obj, dict):
        new_obj = OrderedDict()
        for key in key_order:
            if key in obj:
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

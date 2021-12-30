#!/usr/bin/python
import os
import json
import sys

from os.path import join

from collections import OrderedDict

try:
    from pa_tools.pa.paths import PA_MEDIA_DIR
except Exception as E:
    print(f"Could not find PA directory! {E}\n Make sure that you run it at least once and try again.")
    input()
    sys.exit(1)

missing = []
badJSON = []
bad_buildable_type = []


def validate_buildable_types(value, filename):
    if "Custom1" not in value:
        print(f"\nBAD BUILDABLE TYPE {filename}\n")
        bad_buildable_type.append(filename)


def walk_object(data, source):
    if isinstance(data, (str)):
        if data[:3] == "/pa":
            validate_file("./server" + data)
    elif isinstance(data, (dict)):
        for _, key in enumerate(data):
            value = data[key]
            if key == "effect_spec":
                value = value.split(" ")[0]
            new_source = source + " " + key
            if key == "buildable_types" and not filename.startswith("./server/pa\\ai"):
                validate_buildable_types(value, filename)
                return
            walk_object(value, new_source)
    elif isinstance(data, (set)):
        print("\n\nSET\n\n")


def validate_file(filename):
    if not os.path.isfile(filename):
        filename = "./client" + filename[8:]  # strip ./server to start with /pa
        if not os.path.isfile(filename):
            filename2 = PA_MEDIA_DIR + "/pa_ex1" + filename[11:]  # strip ./client/pa
            if not os.path.isfile(filename2):
                filename2 = PA_MEDIA_DIR + filename[8:]  # strip ./client
                if not os.path.isfile(filename2):
                    print(f"\nMISSING FILE {filename2}\n")
                    missing.append(filename2)
                return
            return

    if filename[-5:] == ".json" or filename[-4:] == ".pfx":
        validate_json(filename)


def walk_json(data, first=False):
    if isinstance(data, (dict)):
        if not first:
            data = OrderedDict(sorted(data.items()))
        for key, value in data.items():
            data[key] = walk_json(value)

    if isinstance(data, (list)):
        for index, item in enumerate(data):
            data[index] = walk_json(item)
    return data


def validate_json(filename):
    fp = None
    data = None

    try:
        fp = open(filename)
    except OSError:
        print(f"\nERROR {filename}\n")
        return

    try:
        data = json.load(fp, object_pairs_hook=OrderedDict)
    except ValueError:
        print(f"\nINVALID {filename}\n")
        badJSON.append(filename)
        return
    finally:
        fp.close()

    if data is None:
        print(f"EMPTY {filename}")
        return

    if filename.startswith(PA_MEDIA_DIR):
        print(f"PA {filename}")
        return

    if not filename.startswith("./server/pa\\ai"):
        ordered = OrderedDict()
        if "display_name" in data:
            ordered["display_name"] = data["display_name"]
        if "description" in data:
            ordered["description"] = data["description"]
        ordered.update(sorted(data.items()))
        data = walk_json(ordered, True)
        with open(filename, "w") as f:
            f.write(json.dumps(data, indent=2, sort_keys=False) + "\n")
        if "display_name" in data:
            print(f"\n{data['display_name']}")
            print(filename)

    walk_object(data, filename)


for root, dirnames, filenames in os.walk("./server/pa"):
    for filename in filenames:
        filename = join(root, filename)
        validate_file(filename)

print(f"\nMissing files: {len(missing)}")
if len(missing) > 0:
    print("\n".join(missing))
print(f"\nInvalid JSON: {len(badJSON)}")
if len(badJSON) > 0:
    print("\n".join(badJSON))
print(f"\nBad buildable_types: {len(bad_buildable_type)}")
if len(bad_buildable_type) > 0:
    print("\n".join(bad_buildable_type))

# If errors need resolving then pause to show the results
if len(missing) > 0 or len(badJSON) > 0 or len(bad_buildable_type) > 0:
    print("\nABORTING INSTALLATION!")
    input()
    sys.exit(1)

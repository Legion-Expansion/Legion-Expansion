#!/usr/bin/python
import os
import json
import sys

from os.path import join

from collections import OrderedDict

# update papaths.py with your paths


from pa_tools.pa import paths

PA_MEDIA_PATH = paths.PA_MEDIA_DIR


if not os.path.isdir(PA_MEDIA_PATH):
    print("\nCheck your PA_MEDIA_PATH in papaths.py: " + PA_MEDIA_PATH + "\n")
    sys.exit()

missing = []
badJSON = []

#


def validate_buildable_types(value, source):

    print(value)


#


def walk_object(data, source):

    if isinstance(data, (str)):

        if data[:3] == "/pa":

            validate_file("./server" + data)

    elif isinstance(data, (dict)):

        for _, key in enumerate(data):

            value = data[key]

            if key == "effect_spec":

                value = value.split(" ")[0]

            #    print(value, key, "(%s)" % type(value))

            new_source = source + " " + key

            if key == "buildable_types":

                validate_buildable_types(value, new_source)
                return

            walk_object(value, new_source)

    elif isinstance(data, (set)):

        print("\n\nSET\n\n")


#


def validate_file(filename):

    # server

    if not os.path.isfile(filename):

        # client

        filename = "./client" + filename[8:]  # strip ./server to start with /pa

        if not os.path.isfile(filename):

            # titans

            filename2 = PA_MEDIA_PATH + "/pa_ex1" + filename[11:]  # strip ./client/pa

            if not os.path.isfile(filename2):

                # classic

                filename2 = PA_MEDIA_PATH + filename[8:]  # strip ./client

                if not os.path.isfile(filename2):

                    print("\nMISSING FILE", filename2, "\n")

                    missing.append(filename2)

                return

            return

    if filename[-5:] == ".json" or filename[-4:] == ".pfx":

        validate_json(filename)


#


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


#


def validate_json(filename):

    fp = None
    data = None

    try:
        fp = open(filename)
    except IOError:

        print("\nERROR", filename, "\n")

        return

    try:
        data = json.load(fp, object_pairs_hook=OrderedDict)
    except ValueError:
        print("\nINVALID %s\n" % filename)
        badJSON.append(filename)
        return
    finally:
        fp.close()

    if data is None:
        print("EMPTY %s" % filename)
        return

    if filename.startswith(PA_MEDIA_PATH):
        print("PA %s" % filename)
        return

    if not filename.startswith("./server/pa\\ai"):

        ordered = OrderedDict()

        if "display_name" in data:
            ordered["display_name"] = data["display_name"]

        if "description" in data:
            ordered["description"] = data["description"]

        ordered.update(sorted(data.items()))

        data = walk_json(ordered, True)

        fp = open(filename, "w")
        fp.write(json.dumps(data, indent=2, sort_keys=False) + "\n")
        fp.close()

        if "display_name" in data:
            print("\n%s" % data["display_name"])
            print(filename)

    #  if len(data) == 1:
    #     print(filename)

    walk_object(data, filename)


#

for root, dirnames, filenames in os.walk("./server/pa"):
    for filename in filenames:

        filename = join(root, filename)

        validate_file(filename)

print("\nMISSING FILES: ", len(missing), "\n")

print("\n".join(missing), "\n")

print("\nBAD JSON: ", len(badJSON), "\n")

print("\n".join(badJSON))

input()

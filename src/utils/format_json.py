#!/usr/bin/python
import os
import sys

from pathlib import Path

from pa_tools.pa import pajson


def format_files(directory):
    # Format all json files in server and client
    file_list = []
    file_list.extend(Path(directory).glob("**/*.json"))
    file_list.extend(Path(directory).glob("**/*.pfx"))

    for file in file_list:
        # normalize paths to posix
        file = file.as_posix()

        data, warnings = pajson.loadf(file)
        list(map(print, warnings))

        if file.endswith(".pfx"):
            pajson.dumpf_effect(data, file, indent=2)
        else:
            pajson.dumpf(data, file, indent=2)

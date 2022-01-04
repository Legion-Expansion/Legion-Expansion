#!/usr/bin/python
import os
import sys

from pathlib import Path

from pa_tools.pa import pajson

# Run from this script's directory
os.chdir(os.path.dirname(sys.argv[0]))

def format_files(client_out_dir, server_out_dir):
    # Format all json files in server and client
    file_list = []
    file_list.extend(Path(server_out_dir).glob("**/*.json"))
    file_list.extend(Path(client_out_dir).glob("**/*.json"))
    file_list.extend(Path(server_out_dir).glob("**/*.pfx"))
    file_list.extend(Path(client_out_dir).glob("**/*.pfx"))

    for file in file_list:
        # normalize paths to posix
        file = file.as_posix()

        data, warnings = pajson.loadf(file)
        list(map(print, warnings))

        with open(file, "w", encoding="utf-8", newline='\n') as f:
            pajson.dump(data, f, indent=2)
            f.write("\n")

if __name__ == "__main__":
    format_files("../client", "../server")
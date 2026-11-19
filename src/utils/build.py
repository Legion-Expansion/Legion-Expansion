#!/usr/bin/env python

# Generate Legion-Expansion client and server mods

import copy
import os
import shutil
import glob
from datetime import date

from os.path import join


from pa_tools.mod.utils import create_pafs
from pa_tools.pa import pajson
from pa_tools.mod.generator import update_modinfo

from utils.common import PROD_CLIENT_OUTPUT_DIR
from utils.common import PROD_SERVER_OUTPUT_DIR
from utils.common import DEV_IDENTIFIER_SUFFIX
from utils.common import DEV_CLIENT_OUTPUT_DIR
from utils.common import DEV_SERVER_OUTPUT_DIR
from utils.update_shadows import plan_shadows
from utils.update_shadows import write_shadows
from utils.check import check_mod
from utils.check import check_source_paths
from utils.check import LICENCE_FILES
from utils.check import VERSION_JS
from utils.check import written_paths
from utils.format_json import format_files

LEGION_LIST_INPUTS = [
    "pa/units/unit_list_legion.json",
    "pa/units/commanders/commander_list_legion.json",
]


def clean_output(output_dir):
    # "*" skips dot entries, which keeps the release clones' .git.
    for path in glob.glob(join(glob.escape(output_dir), "*")):
        if os.path.isdir(path):
            shutil.rmtree(path)
        else:
            os.remove(path)


def copy_source(files, source_dir, output_dir):
    print(f"COPY {source_dir} to {output_dir}")
    for path in files:
        target = join(output_dir, path)
        os.makedirs(os.path.dirname(target), exist_ok=True)
        shutil.copy2(join(source_dir, path), target)


def load_json(loader, path):
    resolved = loader.resolveFile(path)
    if resolved is None:
        loader.resolveFile(path, True)
        return None
    json, warnings = pajson.loadf(resolved)
    for w in warnings:
        print(w)
    return json


def change_to_develop(modinfo, client_id, server_id):
    # update MODINFO data
    id_map = {}
    id_map[client_id] = client_id + DEV_IDENTIFIER_SUFFIX
    id_map[server_id] = server_id + DEV_IDENTIFIER_SUFFIX

    modinfo["identifier"] += DEV_IDENTIFIER_SUFFIX
    modinfo["display_name"] += " [DEVELOPMENT]"
    modinfo["dependencies"] = [id_map.get(x, x) for x in modinfo["dependencies"]]
    if "companions" in modinfo:
        modinfo["companions"] = [id_map.get(x, x) for x in modinfo["companions"]]


def generate_mods(is_dev_mode):
    print("PLAN SHADOWS")
    shadows = plan_shadows()

    print("CHECK SOURCES")
    source_files = check_source_paths(written_paths(shadows))

    fs = create_pafs(True)
    fs.mount("/src", ".")

    # Construct the modinfos
    base_modinfo = load_json(fs, "/src/base_modinfo.json")

    server_modinfo = copy.deepcopy(base_modinfo)
    server_modinfo.update(load_json(fs, "/src/server/modinfo.json"))

    client_modinfo = copy.deepcopy(base_modinfo)
    client_modinfo.update(load_json(fs, "/src/client/modinfo.json"))

    if is_dev_mode:
        server_id = server_modinfo["identifier"]
        client_id = client_modinfo["identifier"]

        change_to_develop(server_modinfo, client_id, server_id)
        change_to_develop(client_modinfo, client_id, server_id)

        server_output_dir = DEV_SERVER_OUTPUT_DIR
        client_output_dir = DEV_CLIENT_OUTPUT_DIR
    else:
        server_output_dir = PROD_SERVER_OUTPUT_DIR
        client_output_dir = PROD_CLIENT_OUTPUT_DIR

    # Update build version. update_modinfo uses an old modinfo only to keep
    # its date, which the next lines set.
    server_modinfo = update_modinfo(server_modinfo, None)
    client_modinfo = update_modinfo(client_modinfo, None)
    # Update dates
    server_modinfo["date"] = date.today().strftime("%Y-%m-%d")
    client_modinfo["date"] = date.today().strftime("%Y-%m-%d")

    # Remove old files
    print(f"CLEAN {server_output_dir}")
    clean_output(server_output_dir)
    print(f"CLEAN {client_output_dir}")
    clean_output(client_output_dir)

    # Copy shared stuff to both mods
    copy_source(source_files["shared"], "shared", server_output_dir)
    copy_source(source_files["shared"], "shared", client_output_dir)

    # Copy server and client specific files
    copy_source(source_files["server"], "server", server_output_dir)
    copy_source(source_files["client"], "client", client_output_dir)

    # CC BY-NC-SA and MIT both require the licence to travel with the
    # distributed copy; README.md carries the dual-licence statement and the
    # credits the LICENSE text does not.
    for output_dir in (server_output_dir, client_output_dir):
        print(f"COPY licence to {output_dir}")
        for name in LICENCE_FILES:
            shutil.copyfile(join("..", name), join(output_dir, name))

    # Update the modinfos
    pajson.dumpf(server_modinfo, join(server_output_dir, "modinfo.json"), indent=2)
    pajson.dumpf(client_modinfo, join(client_output_dir, "modinfo.json"), indent=2)

    print("UPDATE ui version.js")
    with open(join(client_output_dir, VERSION_JS), "w", newline="\n") as version_file:
        print(f'var version = "{server_modinfo["version"]}";\n', file=version_file)

    print("UPDATE SHADOWS")
    write_shadows(shadows, client_output_dir, server_output_dir)

    print("CHECK MOD")
    check_mod(client_output_dir, server_output_dir, source_files)

    # check_mod reads these from the output, and PA never does.
    for build_input in LEGION_LIST_INPUTS:
        os.remove(join(server_output_dir, build_input))

    format_files(client_output_dir)
    format_files(server_output_dir)

#!/usr/bin/env python

# Generate Legion-Expansion client and server mods

import copy
import shutil
import glob

from os.path import join


from pa_tools.mod.utils import create_pafs
from pa_tools.pa import pajson
from pa_tools.mod.generator import update_modinfo

from utils.common import PROD_CLIENT_OUTPUT_DIR
from utils.common import PROD_SERVER_OUTPUT_DIR
from utils.common import DEV_IDENTIFIER_SUFFIX
from utils.common import DEV_CLIENT_OUTPUT_DIR
from utils.common import DEV_SERVER_OUTPUT_DIR
from utils.update_shadows import update_shadows
from utils.check import check_mod
from utils.format_json import format_files


def clean_output(output_dir):
    for file in glob.glob(join(output_dir, "*")):
        shutil.rmtree(file, ignore_errors=True)


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
    id_map = dict()
    id_map[client_id] = client_id + DEV_IDENTIFIER_SUFFIX
    id_map[server_id] = server_id + DEV_IDENTIFIER_SUFFIX

    modinfo["identifier"] += DEV_IDENTIFIER_SUFFIX
    modinfo["display_name"] += " [DEVELOPMENT]"
    modinfo["dependencies"] = [id_map.get(x, x) for x in modinfo["dependencies"]]
    if "companions" in modinfo:
        modinfo["companions"] = [id_map.get(x, x) for x in modinfo["companions"]]


def generate_mods(is_dev_mode):
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

    fs.mount("/mod", client_output_dir)
    fs.mount("/mod", server_output_dir)

    old_modinfo = load_json(fs, "/mod/modinfo.json")

    # Update build version and date
    server_modinfo = update_modinfo(server_modinfo, old_modinfo)
    client_modinfo = update_modinfo(client_modinfo, old_modinfo)

    # Remove old files
    print(f"CLEAN {server_output_dir}")
    clean_output(server_output_dir)
    print(f"CLEAN {client_output_dir}")
    clean_output(client_output_dir)

    # Copy shared stuff to both mods
    print(f"COPY shared to {server_output_dir}")
    shutil.copytree("shared", server_output_dir, dirs_exist_ok=True)
    print(f"COPY shared to {client_output_dir}")
    shutil.copytree("shared", client_output_dir, dirs_exist_ok=True)

    # Copy server and client specific files
    print(f"COPY server to {server_output_dir}")
    shutil.copytree("server", server_output_dir, dirs_exist_ok=True)
    print(f"COPY client to {client_output_dir}")
    shutil.copytree("client", client_output_dir, dirs_exist_ok=True)

    # Update the modinfos
    pajson.dumpf(server_modinfo, join(server_output_dir, "modinfo.json"), indent=2)
    pajson.dumpf(client_modinfo, join(client_output_dir, "modinfo.json"), indent=2)

    print("UPDATE ui version.js")
    with open(
        join(client_output_dir, "ui/mods/com.pa.legion-expansion/version.js"),
        "w",
        newline="\n",
    ) as version_file:
        print(f'var version = "{server_modinfo["version"]}";\n', file=version_file)

    print("UPDATE SHADOWS")
    update_shadows(client_output_dir, server_output_dir)

    print("CHECK MOD")
    check_mod(client_output_dir, server_output_dir)

    format_files(client_output_dir)
    format_files(server_output_dir)

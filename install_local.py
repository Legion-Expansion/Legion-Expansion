#!/usr/bin/python

from os.path import join
import os
import shutil
import json
from collections import OrderedDict

from pa_tools.pa import paths as PA_PATH


def open_json(mod_folder, modinfo_file):
    with open(join(mod_folder, modinfo_file), encoding="utf-8") as PATH:
        return json.load(PATH, object_pairs_hook=OrderedDict)


DEV_SUFFIX = "-dev"
ROOT_FOLDER = os.path.dirname(os.path.realpath(__file__))
MOD_FOLDER = PA_PATH.PA_DATA_DIR
MODINFO = "modinfo.json"
base_client_id = open_json(ROOT_FOLDER, "client/" + MODINFO)["identifier"]
client_id = base_client_id + DEV_SUFFIX
base_server_id = open_json(ROOT_FOLDER, "server/" + MODINFO)["identifier"]
server_id = base_server_id + DEV_SUFFIX
CLIENT_DEST = join(MOD_FOLDER, "client_mods", client_id)
SERVER_DEST = join(MOD_FOLDER, "server_mods", server_id)

print(f"Mod source folder: {ROOT_FOLDER}")
print(f"Mod destination folder: {MOD_FOLDER}")

# remove old directories
try:
    shutil.rmtree(SERVER_DEST)
except OSError as E:
    print(f"No Old Server Folder: {E}")
try:
    shutil.rmtree(CLIENT_DEST)
except OSError as E:
    print(f"No Old Client Folder: {E}")


CLIENT = join(ROOT_FOLDER, "client")
SERVER = join(ROOT_FOLDER, "server")
SHARED = join(ROOT_FOLDER, "shared")
# copy files
print("Copy Client")
shutil.copytree(CLIENT, CLIENT_DEST)
print("Copy Server")
shutil.copytree(SERVER, SERVER_DEST)
print("Merge Shared into Client")
shutil.copytree(SHARED, CLIENT_DEST, dirs_exist_ok=True)
print("Merge Shared into Server")
shutil.copytree(SHARED, SERVER_DEST, dirs_exist_ok=True)


# update MODINFO data
print(f"Update client identifier to {client_id}")
client_modinfo = open_json(CLIENT_DEST, MODINFO)
client_modinfo["identifier"] = client_id
client_modinfo["display_name"] = client_modinfo["display_name"] + " [DEVELOPMENT]"
client_modinfo["dependencies"] = [
    server_id if x == base_server_id else x for x in client_modinfo["dependencies"]
]
with open(join(CLIENT_DEST, MODINFO), "w") as PATH:
    json.dump(client_modinfo, PATH, indent=2)

print(f"Update server identifier to {server_id}")
server_modinfo = open_json(SERVER_DEST, MODINFO)
server_modinfo["identifier"] = server_id
server_modinfo["display_name"] = server_modinfo["display_name"] + " [DEVELOPMENT]"
server_modinfo["dependencies"] = [
    client_id if x == base_client_id else x for x in server_modinfo["dependencies"]
]
server_modinfo["companions"] = [
    client_id if x == base_client_id else x for x in server_modinfo["companions"]
]
with open(join(SERVER_DEST, MODINFO), "w") as PATH:
    json.dump(server_modinfo, PATH, indent=2)

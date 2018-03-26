#!/usr/bin/python

from os.path import join
import os, errno
import re
import shutil
import distutils.dir_util
import json
from collections import OrderedDict

from pa_tools.pa import paths as PA_PATH

def open_json(mod_folder, modinfo_file):
    with open(join(mod_folder, modinfo_file), encoding='utf-8') as f:
        return json.load(f, object_pairs_hook=OrderedDict)


DEV_SUFFIX = '-dev'

root_folder =  os.path.dirname(os.path.realpath(__file__))

mod_folder = PA_PATH.PA_DATA_DIR

client_id = open_json(root_folder, 'client/modinfo.json')['identifier'] + DEV_SUFFIX
server_id = open_json(root_folder, 'server/modinfo.json')['identifier'] + DEV_SUFFIX

client_dest = join(mod_folder, 'client_mods', client_id)
server_dest = join(mod_folder, 'server_mods', server_id)

print ('Mod folder: ' + root_folder)

# remove old directories
try:
    distutils.dir_util.remove_tree(server_dest)
except Exception as e:
    print('No Old Server Folder: ', e)
try:
    distutils.dir_util.remove_tree(client_dest)
except:
    print('No Old Client Folder')


# copy files
print ('Copy Client')
shutil.copytree(join(root_folder, 'client'), client_dest)
print ('Copy Server')
shutil.copytree(join(root_folder, 'server'), server_dest)
print ('Merge Shared into Client')
distutils.dir_util.copy_tree(join(root_folder, 'shared'), client_dest)
print ('Merge Shared into Server')
distutils.dir_util.copy_tree(join(root_folder, 'shared'), server_dest)

#update modinfo data
print ('Update client identifier to', client_id)
client_modinfo = open_json(client_dest, 'modinfo.json')
client_modinfo['identifier'] = client_id
client_modinfo['display_name'] = client_modinfo['display_name'] + ' [DEVELOPMENT]'
with open(join(client_dest, 'modinfo.json'), 'w') as out:
    json.dump(client_modinfo, out, indent=2)

print ('Update server identifier to', server_id)
server_modinfo = open_json(server_dest, 'modinfo.json')
server_modinfo['identifier'] = server_id
server_modinfo['display_name'] = server_modinfo['display_name'] + ' [DEVELOPMENT]'
with open(join(server_dest, 'modinfo.json'), 'w') as out:
    json.dump(server_modinfo, out, indent=2)
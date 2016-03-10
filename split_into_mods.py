#!/usr/bin/python

import os, errno
import re
import shutil

############################
## Configuration
##   Edit this part to change which files are selected for client/server split
############################

# location of the mod (can be relative or absolute)
ROOT_PATH = './' # this expects the script to reside and be executed from within the base mod folder

# this is regex, use it to select the files which you want to be in the client mod
# this assumes that everything else is for the server mod
CLIENT_FILES = ('.png', '_mask.papa', '_diffuse.papa', '_material.papa', '.fs', 'server_browser.js')

CLIENT_SUFFIX = '-Client'
SERVER_SUFFIX = '-Server'

EXCLUDE_DIRECTORIES = ('.', '.git', 'art', 'modinfo')

CLIENT_MODINFO = 'modinfo/client/modinfo.json'
SERVER_MODINFO = 'modinfo/server/modinfo.json'

################# Not configuration section :P

# makes directory, doesn't care if it exists already
def mkdir_p(path):
    try:
        os.makedirs(path)
    except OSError as exc: # Python >2.5
        if exc.errno == errno.EEXIST and os.path.isdir(path): pass
        else: raise

root_folder = os.path.realpath(ROOT_PATH)
print ('Mod folder: ' + root_folder)

# iterate over all files
for root, dirs, files in os.walk(ROOT_PATH):
    base_dir = os.path.normpath(root)

    if base_dir.startswith(EXCLUDE_DIRECTORIES): 
        continue

    client_dir = os.path.join(root_folder + CLIENT_SUFFIX, base_dir)
    server_dir = os.path.join(root_folder + SERVER_SUFFIX, base_dir)

    for f in files:
        base_path = os.path.join(base_dir, f)
        #print (base_path)
        if base_path.endswith(CLIENT_FILES):
            full_path = os.path.join(client_dir, f)
            mkdir_p(client_dir)
        else:
            full_path = os.path.join(server_dir, f)
            mkdir_p(server_dir)

        print ('Copying: ' + os.path.normpath(full_path))
        shutil.copyfile(base_path, full_path)

shutil.copyfile(os.path.join(root_folder, CLIENT_MODINFO), os.path.join(root_folder + CLIENT_SUFFIX, 'modinfo.json'))
shutil.copyfile(os.path.join(root_folder, SERVER_MODINFO), os.path.join(root_folder + SERVER_SUFFIX, 'modinfo.json'))

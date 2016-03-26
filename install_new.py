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

CLIENT_SUFFIX = '-Client'
SERVER_SUFFIX = '-Server'

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

shutil.copytree(os.path.join(root_folder, 'client'), os.path.join(root_folder + CLIENT_SUFFIX))
shutil.copytree(os.path.join(root_folder, 'server'), os.path.join(root_folder + SERVER_SUFFIX))
shutil.copytree(os.path.join(root_folder, 'shared'), os.path.join(root_folder + CLIENT_SUFFIX))
shutil.copytree(os.path.join(root_folder, 'shared'), os.path.join(root_folder + SERVER_SUFFIX))

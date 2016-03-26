#!/usr/bin/python

import os, errno
import re
import shutil
import distutils.dir_util

############################
## Configuration
##   Edit this part to change which files are selected for client/server split
############################

# location of the mod (can be relative or absolute)
ROOT_PATH = './' # this expects the script to reside and be executed from within the base mod folder

CLIENT_SUFFIX = '-Client'
SERVER_SUFFIX = '-Server'

root_folder = os.path.realpath(ROOT_PATH)
print ('Mod folder: ' + root_folder)
try:
    distutils.dir_util.remove_tree(os.path.join(root_folder + SERVER_SUFFIX))
except:
    print('No Old Server Folder')
try:
    distutils.dir_util.remove_tree(os.path.join(root_folder + CLIENT_SUFFIX))
except:
    print('No Old Client Folder')
print ('Copy Client')
shutil.copytree(os.path.join(root_folder, 'client'), os.path.join(root_folder + CLIENT_SUFFIX))
print ('Copy Server')
shutil.copytree(os.path.join(root_folder, 'server'), os.path.join(root_folder + SERVER_SUFFIX))
print ('Merge Shared into Client')
distutils.dir_util.copy_tree(os.path.join(root_folder, 'shared'), os.path.join(root_folder + CLIENT_SUFFIX))
print ('Merge Shared into Server')
distutils.dir_util.copy_tree(os.path.join(root_folder, 'shared'), os.path.join(root_folder + SERVER_SUFFIX))

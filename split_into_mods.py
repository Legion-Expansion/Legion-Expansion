#!/usr/bin/python

import os, errno
import re
import shutil

ROOT_PATH = './' # this expects the script to reside and be executed from within the base mod folder


CLIENT_FILES = ('.png', '.papa', '.fs', 'server_browser.js', '_client.js', '_client.css', '.html', '.pfx')
PAPA_CLIENT = ('L_energy_plant.papa', 'L_energy_plant_adv.papa', 'L_land_barrier.papa', 'L_mex.papa', 'L_mex_adv.papa', 'L_radar.papa', 'L_radar_adv.papa', 'L_storage.papa', 'L_orbital_factory.papa', 'L_naval_factory.papa', 'L_naval_factory_adv.papa')

EXCLUDE_DIRECTORIES = ('.', '.git', 'art', 'modinfo')


def mkdir_p(path):
    try:
        os.makedirs(path)
    except OSError as exc: # Python >2.5
        if exc.errno == errno.EEXIST and os.path.isdir(path): pass
        else: raise

REAL_ROOT_PATH = os.path.realpath(ROOT_PATH)

CLIENT_MODINFO = os.path.join(REAL_ROOT_PATH,'modinfo/client/modinfo.json')
SERVER_MODINFO = os.path.join(REAL_ROOT_PATH,'modinfo/server/modinfo.json')

print ('Mod folder: ' + REAL_ROOT_PATH)

# iterate over all files
for root, dirs, files in os.walk(ROOT_PATH):
    base_dir = os.path.normpath(root)
    dirname = os.path.basename(base_dir);
    
    if base_dir.startswith(EXCLUDE_DIRECTORIES): 
        continue

    CLIENT_DIR = os.path.join(REAL_ROOT_PATH + '-client', base_dir);
    SERVER_DIR = os.path.join(REAL_ROOT_PATH + '-server', base_dir);

    for filename in files:
        src = os.path.join(REAL_ROOT_PATH, base_dir, filename)
        server_exception = (filename == ( dirname + '.papa' ) and not filename.endswith(PAPA_CLIENT))

        if src.endswith(CLIENT_FILES) and not server_exception:
            dest_root_path = CLIENT_DIR
        else:
            dest_root_path = SERVER_DIR

        dest_path = os.path.join(dest_root_path, base_dir)
        mkdir_p(dest_path)
        dest = os.path.join(dest_path, filename)
        shutil.copyfile(src, dest)
        
shutil.copyfile( os.path.join(REAL_ROOT_PATH, 'modinfo/client/modinfo.json'), os.path.join( REAL_ROOT_PATH + '-client', 'modinfo.json') )
#shutil.copyfile( os.path.join(REAL_ROOT_PATH, 'modinfo/client/test-modinfo.json'), os.path.join( REAL_ROOT_PATH + '-client', 'modinfo.json') )

shutil.copyfile( os.path.join(REAL_ROOT_PATH, 'modinfo/server/modinfo.json'), os.path.join( REAL_ROOT_PATH + '-server', 'modinfo.json') )
#shutil.copyfile( os.path.join(REAL_ROOT_PATH, 'modinfo/server/test-modinfo.json'), os.path.join( REAL_ROOT_PATH + '-server', 'modinfo.json') )

#!/usr/bin/python

# Generates and installs the development version of the mod. This will show up
# in PA as 'Legion Expansion [DEVELOPMENT]'

from utils.build import generate_mods

# Installs directly to the server_mods and client_mods directories
generate_mods(is_dev_mode=True)

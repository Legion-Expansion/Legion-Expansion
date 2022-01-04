#!/usr/bin/python

# Generate up to date client and server mods, then place them in the
# ../com.pa.legion-expansion-client and ../com.pa.legion-expansion-server
# directories

from utils.build import generate_mods

# is_dev_mode=False makes the generator output to the client and server submodule directories
generate_mods(is_dev_mode=False)

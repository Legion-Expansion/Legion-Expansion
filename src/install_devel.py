#!/usr/bin/python

# Generates and installs the development version of the mod. This will show up
# in PA as 'Legion Expansion [DEVELOPMENT]'

import sys

# On Windows, Python before 3.15 writes a redirected stdout in the ANSI code
# page, and print() stops on a character that the code page does not have.
sys.stdout.reconfigure(errors="backslashreplace")

from utils.build import generate_mods

# Installs directly to the server_mods and client_mods directories
generate_mods(is_dev_mode=True)

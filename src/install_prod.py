#!/usr/bin/python

# Generate up to date client and server mods, then place them in the
# ../com.pa.legion-expansion-client and ../com.pa.legion-expansion-server
# directories

from utils.build import generate_mods
from utils.common import PROD_CLIENT_OUTPUT_DIR
from utils.common import PROD_SERVER_OUTPUT_DIR
from utils.release_case import record_case_renames

# is_dev_mode=False makes the generator output to the client and server submodule directories
generate_mods(is_dev_mode=False)

record_case_renames(PROD_SERVER_OUTPUT_DIR, PROD_CLIENT_OUTPUT_DIR)

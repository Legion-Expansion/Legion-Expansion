import os
import sys

from os.path import join, dirname, realpath

# Change working directory to the src dir
_src_dir = dirname(dirname(realpath(__file__)))
os.chdir(_src_dir)
sys.path.append(_src_dir)
sys.path.append(join(_src_dir, "utils"))

import pa_tools.pa.pajson
from pa_tools.pa.paths import PA_DATA_DIR

server, _ = pa_tools.pa.pajson.loadf("server/modinfo.json")
client, _ = pa_tools.pa.pajson.loadf("client/modinfo.json")

PROD_SERVER_OUTPUT_DIR = join("..", "..", server["identifier"])
PROD_CLIENT_OUTPUT_DIR = join("..", "..", client["identifier"])

DEV_IDENTIFIER_SUFFIX = "-dev"

DEV_CLIENT_OUTPUT_DIR = join(
    PA_DATA_DIR, "client_mods", client["identifier"] + DEV_IDENTIFIER_SUFFIX
)
DEV_SERVER_OUTPUT_DIR = join(
    PA_DATA_DIR, "server_mods", server["identifier"] + DEV_IDENTIFIER_SUFFIX
)

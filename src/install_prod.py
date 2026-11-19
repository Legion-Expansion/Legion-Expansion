#!/usr/bin/python

# Generate up to date client and server mods, then place them in the
# ../com.pa.legion-expansion-client and ../com.pa.legion-expansion-server
# directories

import sys

# On Windows, Python before 3.15 writes a redirected stdout in the ANSI code
# page, and print() stops on a character that the code page does not have.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(errors="backslashreplace")

from pa_tools.pa.pajson import ParseError

try:
    # utils.common parses the modinfos when it is imported
    from utils.build import generate_mods
    from utils.common import PROD_CLIENT_OUTPUT_DIR
    from utils.common import PROD_SERVER_OUTPUT_DIR
    from utils.release_case import record_case_renames

    # is_dev_mode=False makes the generator output to the client and server submodule directories
    generate_mods(is_dev_mode=False)

    record_case_renames(PROD_SERVER_OUTPUT_DIR, PROD_CLIENT_OUTPUT_DIR)
except ParseError as error:
    print("Error: pajson cannot parse a .json or .pfx file, so the build stopped.")
    print(*error.warnings, error, sep="\n")
    input()
    sys.exit(1)

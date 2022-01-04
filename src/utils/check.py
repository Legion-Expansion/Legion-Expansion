import sys
import os

from pa_tools.mod import checker
from pa_tools.mod.utils import create_pafs
from pa_tools.pa import spec


def check_mod(client_output_dir, server_output_dir):
    # legion works with pa titans only, so mount that as well
    fs = create_pafs()

    # mount the client and server folders (server gets first pick)
    fs.mount("/", client_output_dir)
    fs.mount("/", server_output_dir)

    # now we are going to do validation
    # mod path isn't really important in this case
    report = checker.ModReport(server_output_dir)

    # Check the server modinfo
    checker.check_modinfo(report, os.path.join(server_output_dir, "modinfo.json"), fs)
    if report.getIssueCount() > 0:
        print(report.printDetailsReport())
        print(report.printInfoIssueReport())
        input()
        sys.exit(1)

    report = checker.ModReport(client_output_dir)
    # Check the client mod info
    checker.check_modinfo(report, os.path.join(client_output_dir, "modinfo.json"), fs)
    if report.getIssueCount() > 0:
        print(report.printDetailsReport())
        print(report.printInfoIssueReport())
        input()
        sys.exit(1)

    checker.find_missing_files(report, fs)
    if report.getIssueCount() > 0:
        print(report.printDetailsReport())
        print(report.printJsonIssueReport())
        print(report.printFileIssueReport())
        input()
        sys.exit(1)

    # Check that all the legion units have the Custom1 build flag
    units = spec.load_spec(fs, "/pa/units/unit_list_legion.json")

    for unit_path in units["units"]:
        unit = spec.parse_spec(fs, unit_path)

        if "buildable_types" not in unit:
            continue

        # Check that all legion factories have Custom1 as a buildable type
        if "Custom1" not in unit["buildable_types"]:
            print(f"Error: A factory is missing the Custom1 buildable type.")
            print(f"  unit: {unit_path}")
            print(f" buildable_types: {unit['buildable_types']}")
            input()
            sys.exit(1)

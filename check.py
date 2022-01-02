import sys

from pa_tools.mod import checker

from pa_tools.pa import pafs
from pa_tools.pa import spec

from pa_tools.pa.paths import PA_MEDIA_DIR

# legion works with pa titans only, so mount that as well
fs = pafs(PA_MEDIA_DIR)
fs.mount("/pa", "/pa_ex1")

# mount the client and server folders (server gets first pick)
fs.mount("/", "client")
fs.mount("/", "server")


# now we are going to do validation
# mod path isn't really important in this case
report = checker.ModReport(".")

# Check the server modinfo
checker.check_modinfo(report, "server/modinfo.json", fs)
if report.getIssueCount() > 0:
    print(report.printDetailsReport())
    print(report.printInfoIssueReport())
    input()
    sys.exit(1)

report = checker.ModReport(".")
# Check the client mod info
checker.check_modinfo(report, "client/modinfo.json", fs)
if report.getIssueCount() > 0:
    print(report.printDetailsReport())
    print(report.printInfoIssueReport())
    input()
    sys.exit(1)

# Check for missing files
report = checker.ModReport(".")
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
    # Check that all legion factories have Custom1 as a buildable type
    if "buildable_types" in unit and "Custom1" not in unit["buildable_types"]:
        print(
            f"Error: A factory is missing the Custom1 buildable type.\n unit: {unit_path}\n buildable_types: {unit['buildable_types']}"
        )
        input()
        sys.exit(1)

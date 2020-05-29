from pa_tools.mod import checker
from pa_tools.pa import pafs
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

checker.check_modinfo(report, "server/modinfo.json", fs)
print(report.printDetailsReport())
print(report.printInfoIssueReport())

checker.check_modinfo(report, "client/modinfo.json", fs)
report.modinfo_issues = []
print(report.printDetailsReport())
print(report.printInfoIssueReport())

checker.find_missing_files(report, fs)

print(report.printFileIssueReport())
print(report.printJsonIssueReport())

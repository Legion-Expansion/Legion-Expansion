#!/usr/bin/python
from pathlib import Path

from pa_tools.pa import pajson
from pa_tools.pa.paths import PA_MEDIA_DIR

# Format all json files in server and client
file_list = []
file_list.extend(Path("./server").glob('**/*.json'))
file_list.extend(Path("./client").glob('**/*.json'))
file_list.extend(Path("./server").glob('**/*.pfx'))
file_list.extend(Path("./client").glob('**/*.pfx'))

for file in file_list:
    # normalize paths to posix
    file = file.as_posix()

    data, warnings = pajson.loadf(file)
    list(map(print, warnings))

    with open(file, "w") as f:
        f.write(pajson.dumps(data, indent=2))
        f.write("\n")

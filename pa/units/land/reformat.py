import os
import json
import string
from os.path import join

for root, dirnames, filenames in os.walk('.'):
  for f in filenames:
    f = f.lower()
    if f[-5:] == ".json":
      fullpath = join(root, f)
      print("%s" % fullpath)
      fp = open(fullpath)
      data = json.load(fp)
      fp.close()
      fp = open(fullpath, 'w')
      fp.write(json.dumps(data, indent=2, sort_keys=True))
      fp.close()
    if f[-4:] == ".pfx":
      fullpath = join(root, f)
      print("%s" % fullpath)
      fp = open(fullpath)
      data = json.load(fp)
      fp.close()
      fp = open(fullpath, 'w')
      fp.write(json.dumps(data, indent=2, sort_keys=True))
      fp.close()
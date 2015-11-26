#!/usr/bin/python
import os
import json
import sys

from os.path import join

# update papaths.py with your paths
from papaths import PA_MEDIA_PATH

if not os.path.isdir(PA_MEDIA_PATH):
  print("\nCheck your PA_MEDIA_PATH in papaths.py: " + PA_MEDIA_PATH + "\n")
  sys.exit()
  
  
def walkObject(data,source):
  si = data.get("selection_icon")
  current = None
  if si:
    current = si.get("diameter")

  mb = data.get("mesh_bounds")
  if mb:
    d = round(4.357 + mb[0]*0.5325 + mb[1]*0.861 + mb[2]*0.1791)
    print('is:', current, 'calc:', max(mb[0], mb[1], mb[2], d))

def validateFile(filename):

  if not os.path.isfile(filename):
  
    filename2 = PA_MEDIA_PATH + filename[1:]
    
    if not os.path.isfile(filename2):
    
#      print(filename)

#    else:

      print("\nMISSING FILE", filename, filename2, "\n")
      
    return;

  if filename[-5:] == ".json":

    validateJSON(filename)

        
def validateJSON(filename):

  fp = None
  data = None
  
  try:
    fp = open(filename)
  except IOError:

   print("\nERROR", filename, "\n")
     
   return
  
  try:
      data = json.load(fp)
  except ValueError:
    print("\nINVALID %s\n" % filename)
    return
  finally:
    fp.close()
  
  if data is None:
    print("EMPTY %s" % filename)
    return

  if filename.startswith(PA_MEDIA_PATH):
    print("PA %s" % filename)
    return
    
  #fp = open(filename, 'w')
  #fp.write(json.dumps(data, indent=2, sort_keys=True) + "\n")
  #fp.close()

  if "display_name" in data:
    print("\n%s" % data["display_name"])
    print(filename)

#  if len(data) == 1:
#     print(filename)
   
  walkObject(data,filename)
    
         
for root, dirnames, filenames in os.walk('./pa/units'):
  for filename in filenames:
  
    filename = join(root,filename)
    
    validateFile(filename)
    


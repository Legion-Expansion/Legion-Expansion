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

missing = [];
badJSON = [];

def validateBuildableTypes(value,source):

  print(value)
  
def walkObject(data,source):

  if isinstance(data,(str)):
   
    if data[:3] == "/pa":

      validateFile( "." + data)

  elif isinstance(data,(dict)):

   for index, key in enumerate(data):
    
    value = data[key]
    
    if key == "effect_spec":
    
      value = value.split(" ")[0]
         
#    print(value, key, "(%s)" % type(value))
    
    new_source = source + " " + key
    
    if key == "buildable_types":
    
      validateBuildableTypes(value,new_source)
      return
      
    walkObject(value,new_source)

  elif isinstance(data, (set)):

    print("\n\nSET\n\n")


def validateFile(filename):

  if not os.path.isfile(filename):
  
    filename2 = PA_MEDIA_PATH + "/pa_ex1" + filename[4:]
    
    if not os.path.isfile(filename2):
    
      filename3 = PA_MEDIA_PATH + filename[1:]

      if not os.path.isfile(filename3):

#      print(filename)

#    else:

        print("\nMISSING FILE", filename, "\n")
        
        missing.append( filename )
        
      return;
       
    return;

  if filename[-5:] == ".json" or filename[-4:] == ".pfx":

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
    badJSON.append(filename)
    return
  finally:
    fp.close()
  
  if data is None:
    print("EMPTY %s" % filename)
    return

  if filename.startswith(PA_MEDIA_PATH):
    print("PA %s" % filename)
    return
    
  fp = open(filename, 'w')
  fp.write(json.dumps(data, indent=2, sort_keys=True) + "\n")
  fp.close()

  if "display_name" in data:
    print("\n%s" % data["display_name"])
    print(filename)

#  if len(data) == 1:
#     print(filename)
   
  walkObject(data,filename)
    
         
for root, dirnames, filenames in os.walk('./pa'):
  for filename in filenames:
  
    filename = join(root,filename)
    
    validateFile(filename)
    
print( "\nMISSING FILES: ", len( missing ), "\n" )

print( "\n".join( missing ), "\n" )

print( "\nBAD JSON: ", len( badJSON ), "\n" )

print( "\n".join( badJSON ) )
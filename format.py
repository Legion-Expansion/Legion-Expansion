#!/usr/bin/python
import os
import json

from os.path import join

# change this to your PA path

#PA_PATH = "%PROGRAMFILES%/PA/Planetary Annihilation/stable/media"
PA_PATH = "E:\Games\Planetary Annihilation\Planetary Annihilation\stable\media"
#PA_PATH = "/Users/mike/Library/Application Support/Uber Entertainment/Planetary Annihilation/data/streams/stable/PA.app/Contents/Resources/media"

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
  
    filename2 = PA_PATH + filename[1:]
    
    if not os.path.isfile(filename2):
    
#      print(filename)

#    else:

      print("\nMISSING FILE", filename, filename2, "\n")
      
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
    return
  finally:
    fp.close()
  
  if data is None:
    print("EMPTY %s" % filename)
    return

  if filename.startswith(PA_PATH):
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
    


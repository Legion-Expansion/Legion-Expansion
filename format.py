#!/usr/bin/python
import os
import json

from os.path import join

# change this to your PA path

PA_PATH = "%PROGRAMFILES%\PA\Planetary Annihilation\stable\media"
#PA_PATH = "/Users/mike/Library/Application Support/Uber Entertainment/Planetary Annihilation/data/streams/stable/PA.app/Contents/Resources/media"

def walkObject(data,source):

  if isinstance(data,(str, unicode)):
   
    if data[:3] == "/pa":

      validateFile( "." + data)

  elif isinstance(data,(dict)):

   for index, key in enumerate(data):
    
    value = data[key]
    
    if key == "effect_spec":
    
      value = value.split(" ")[0]
         
#    print value, key, "(%s)" % type(value)
  
    walkObject(value,source + " " + key )

  elif isinstance(data, (set)):

    print "\n\nSET\n\n"


def validateFile(filename):

#    filename = filename.lower()

  if not os.path.isfile(filename):
  
    filename2 = PA_PATH + filename[1:]
    
    if os.path.isfile(filename2):
    
      print filename

    else:

      print "\n\nMISSING FILE", filename, filename2, "\n\n"
      
    return;

  if filename[-5:] == ".json" or filename[-4:] == ".pfx":

    validateJSON(filename)

        
def validateJSON(filename):

  fp = None
  data = None
  
  try:
    fp = open(filename)
  except IOError:

   print "\n\nERROR", filename, "\n\n"
     
   return
  
  try:
      data = json.load(fp)
  except ValueError:
    print("\n\nINVALID %s\n\n" % filename)
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
    print("%s" % data["display_name"])

  if len(data) == 1:
     print filename
   
  walkObject(data,filename)
    
         
for root, dirnames, filenames in os.walk('./pa'):
  for filename in filenames:
  
    filename = join(root,filename)
    
    validateFile(filename)
    


#!/usr/bin/python
import os
import json
import shutil
import sys
from datetime import datetime

from os.path import join

# change this to your PA data path

PA_PATH = "C:/Users/Eoin/AppData/Local/Uber Entertainment/Planetary Annihilation"
#PA_PATH = "%LOCALAPPDATA%\\Uber Entertainmen\\Planetary Annihilation"
#PA_PATH = "/Users/mike/Library/Application Support/Uber Entertainment/Planetary Annihilation"

MOD_NAME = "com.pa.legion-expansion"

SERVER_MOD_NAME = MOD_NAME + ".server"
CLIENT_MOD_NAME = MOD_NAME + ".client"

SERVER_MOD_PATH = os.path.join(PA_PATH,"server_mods",SERVER_MOD_NAME,"")
CLIENT_MOD_PATH = os.path.join(PA_PATH,"mods",CLIENT_MOD_NAME,"")

OLD_MOD_NAME = "com.pa.legionfaction"

OLD_SERVER_MOD_NAME = OLD_MOD_NAME + ".server"
OLD_CLIENT_MOD_NAME = OLD_MOD_NAME + ".client"

OLD_SERVER_MOD_PATH = os.path.join(PA_PATH,"server_mods",OLD_SERVER_MOD_NAME,"")
OLD_CLIENT_MOD_PATH = os.path.join(PA_PATH,"mods",OLD_CLIENT_MOD_NAME,"")

NOW = datetime.today()

BACKUPS_PATH = os.path.join(PA_PATH,"legion-expansion-backups")
BACKUPS_NOW_PATH = os.path.join(BACKUPS_PATH, NOW.isoformat("-") ).replace(":","-")
OLD_BACKUPS_PATH = os.path.join(PA_PATH,"legion-faction-backups")

print(BACKUPS_PATH,"\n")

if os.path.isdir(OLD_BACKUPS_PATH):
  shutil.move(OLD_BACKUPS_PATH,BACKUPS_PATH)
  
if not os.path.isdir(PA_PATH):
  print("\nCheck your PA_PATH: " + PA_PATH + "\n")
  sys.exit()
  

# server mod

def serverModFilter(directory,ignore):

  if directory == "./ui/main":
    ignore = ['atlas']
    print(directory, "skipping", ignore)
    return ignore

  if directory == "./ui/mods/com.pa.legion-expansion":
    ignore = ['icon_atlas.js']
    print(directory, "skipping", ignore)
    return ignore

  print(directory)
  
  return []

print(SERVER_MOD_PATH)

if os.path.isdir(OLD_SERVER_MOD_PATH):
  shutil.move(OLD_SERVER_MOD_PATH,BACKUPS_NOW_PATH)
  
if os.path.isdir(SERVER_MOD_PATH):
  shutil.move(SERVER_MOD_PATH,BACKUPS_NOW_PATH)

os.mkdir(SERVER_MOD_PATH)

shutil.copy("./modinfo.json",SERVER_MOD_PATH)

shutil.copytree( "./pa", os.path.join(SERVER_MOD_PATH, "pa"))
shutil.copytree( "./ui", os.path.join(SERVER_MOD_PATH, "ui"),ignore=serverModFilter)

# client mod

def clientModFilter(directory,ignore):

  if directory == "./ui/main":
    ignore=list(ignore)
    ignore.remove("atlas")
    print(directory, "skipping", ignore)
    return ignore
    
  print(directory)
  
  return []

print(CLIENT_MOD_PATH)

if os.path.isdir(OLD_CLIENT_MOD_PATH):
  shutil.move(OLD_CLIENT_MOD_PATH,BACKUPS_NOW_PATH)

if os.path.isdir(CLIENT_MOD_PATH):
  shutil.move(CLIENT_MOD_PATH,BACKUPS_NOW_PATH)

os.mkdir(CLIENT_MOD_PATH)

shutil.copy("./client/modinfo.json",CLIENT_MOD_PATH)

shutil.copytree( "./ui", os.path.join(CLIENT_MOD_PATH, "ui"),ignore=clientModFilter)

print("\nREFRESH PAMM and RESTART PA\n")

#!/usr/bin/python
import os
import json
import shutil
from datetime import datetime

from os.path import join

# change this to your PA path

PA_PATH = "%PROGRAMFILES%\PA\Planetary Annihilation"
#PA_PATH = "/Users/mike/Library/Application Support/Uber Entertainment/Planetary Annihilation"

MOD_NAME = "com.pa.legionfaction"

SERVER_MOD_NAME = MOD_NAME + ".server"
CLIENT_MOD_NAME = MOD_NAME + ".client"

SERVER_MOD_PATH = os.path.join(PA_PATH,"server_mods",SERVER_MOD_NAME,"")
CLIENT_MOD_PATH = os.path.join(PA_PATH,"mods",CLIENT_MOD_NAME,"")

NOW = datetime.today()

BACKUPS_PATH = os.path.join(PA_PATH,"legion-faction-backups", NOW.isoformat(' ') )

if not os.path.isdir(PA_PATH):
  print "Check your PA_PATH: " + PA_PATH
  exit
  

# server mod

def serverModFilter(directory,ignore):

  if directory == "./ui/main":
    ignore = ['atlas']
    print directory, "skipping", ignore
    return ignore

  if directory == "./ui/mods/com.pa.legionfaction":
    ignore = ['icon_atlas.js']
    print directory, "skipping", ignore
    return ignore

  print directory
  
  return []

print BACKUPS_PATH
print SERVER_MOD_PATH

if os.path.isdir(SERVER_MOD_PATH):
  shutil.move(SERVER_MOD_PATH,BACKUPS_PATH)

os.mkdir(SERVER_MOD_PATH)

shutil.copy("./modinfo.json",SERVER_MOD_PATH)

shutil.copytree( "./pa", os.path.join(SERVER_MOD_PATH, "pa"))
shutil.copytree( "./ui", os.path.join(SERVER_MOD_PATH, "ui"),ignore=serverModFilter)

# client mod

def clientModFilter(directory,ignore):

  if directory == "./ui/main":
    ignore=list(ignore)
    ignore.remove("atlas")
    print directory, "skipping", ignore
    return ignore
    
  print directory
  
  return []

print CLIENT_MOD_PATH

if os.path.isdir(CLIENT_MOD_PATH):
  shutil.move(CLIENT_MOD_PATH,BACKUPS_PATH)

os.mkdir(CLIENT_MOD_PATH)

shutil.copy("./client/modinfo.json",CLIENT_MOD_PATH)

shutil.copytree( "./ui", os.path.join(CLIENT_MOD_PATH, "ui"),ignore=clientModFilter)

print "\nREFRESH PAMM and RESTART PA\n"
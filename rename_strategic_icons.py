#!/usr/bin/python
import os
import sys

from os.path import join, basename
from shutil import copyfile

translations = {
    'aa _adv': 'air_defense_adv',
    'aa': 'air_defense',
    'artillery_adv': 'artillery_long',
    'artillery': 'artillery_short',
    'delta_v': 'delta_v_engine',
    'ion_defense': 'ion_defense',
    'AA_bot': 'bot_aa',
    'air_carrier': 'air_carrier',
    'air_fab_adv': 'fabrication_aircraft_adv',
    'air_fab': 'fabrication_aircraft',
    'air_fighter_adv': 'fighter_adv',
    'air_gunship': 'gunship',
    'Air_scout': 'air_scout',
    'air_teleport': 'flying_teleporter',
    'assault_bot': 'assault_bot',
    'assaultbot_adv': 'assault_bot_adv',
    'bomber': 'bomber',
    'bot_artillery': 'assault_bot_adv',
    '': 'bot_artillery_adv',
    'bot_bomb': 'bot_bomb',
    'bot_swarm': 'bot_swarm',
    'fab_bot_adv': 'fabrication_bot_adv',
    'fab_bot': 'fabrication_bot',
    'fac_air_adv': 'air_factory_adv',
    'fac_air': 'air_factory',
    'fac_bot_adv': 'bot_factory_adv',
    'fac_bot': 'bot_factory',
    'fac_land_adv': 'vehicle_factory_adv',
    'fac_land': 'vehicle_factory',
    'fac_naval_adv': 'naval_factory_adv',
    'fac_naval': 'naval_factory',
    'fac_orbital': 'orbital_launcher',
    'fighter': 'fighter',
    'mortar_tank': 'mortar_tank',
    'naval_aa': 'frigate',
    'naval_battleship_adv': 'battleship',
    'naval_destroyer': 'destoryer',
    'naval_fab_adv': 'fabrication_ship_adv',
    'naval_fab': 'fabrication_ship',
    'naval_raider': 'sea_scout',
    'naval_sub_adv': 'nuclear_sub',
    'naval_sub': 'attack_sub',
    'orbital_blacknight': 'orbital_laser',
    'orbital_defense': 'orbital_railgun',
    'orbital_fab': 'orbital_fabrication_bot',
    'orbital_fighter': 'orbital_fighter',
    'orbital_lander': 'orbital_lander',
    'orbital_radar_adv': 'radar_satellite_adv',
    'orbital_radar': 'radar_satellite',
    'orbital_resource': 'mining_platform',
    'orbital_solar': 'solar_array',
    'shotgun_tank': 'shotgun_tank',
    'sniper_tank': 'sniper_tank',
    'unit_tank_fab_adv': 'fabrication_vehicle_adv',
    'tank_fab': 'fabrication_vehicle',
    'tank_heavy_armor': 'tank_heavy_armor',
    'tank_hover_adv': 'hover_tank_adv',
    'tank_laser_adv': 'tank_laser_adv',
    'tank_Shank': 'tank_shank',
    'titan_air': 'titan_air',
    'titan_bot': 'titan_bot',
    #'titan_naval': 'titan_naval',
    'titan_orbital': 'titan_orbital',
    'titan_structure': 'titan_structure',
    'titan_vehicle': 'titan_vehicle',
    'transport': 'transport',
    'mex_adv': 'mex_adv',
    'mex': 'mex',
    'nuke_def': 'anti_nuke_launcher',
    'nuke': 'nuke_launcher',
    'power_adv': 'energy_plant_adv',
    'power': 'energy_plant',
    'radar_adv': 'radar_adv',
    'radar': 'radar',
    'storage': 'storage',
    #'tac_missile': 'tactical_missile_launcher',
    'teleport': 'teleporter',
    'torpedo_adv': 'torpedo_launcher_adv',
    'torpedo': 'torpedo_launcher',
    'turret_missile': 'rocket_barrage',
    'wall': 'land_barrier',
    't1_turret': 't1_turret_basic',
    't2_Flamer': 'flame_turret',
    't2_turret': 't1_turret_adv',
}

def translateName(filename):
  newname = basename(filename)
  newname = newname.replace('Legion Strategic Icons_', '')
  newname = newname.replace('icon_si_', '')
  newname = newname.replace('L_', '')
  newname = newname.replace('.png', '')
  if translations.get(newname):
    newname = translations.get(newname)
  else:
    print('-------------------- not found', newname)
    return None
  newname = 'icon_si_L_' + newname + '.png'
  newname = join('ui/main/atlas/icon_atlas/img/strategic_icons/', newname)
  return newname

def renameFile(filename):
  newname = translateName(filename)
  if newname != None:
    #print(filename, newname)
    copyfile(filename, newname)

for root, dirnames, filenames in os.walk('./art/strategic_icons/'):
  for filename in filenames:
  
    filename = join(root,filename)
    
    renameFile(filename)

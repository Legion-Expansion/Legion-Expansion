(function() {
  if (!window.HodgePodge) return

  try {
    var buildVersion = decode(sessionStorage.build_version);

    var patchName = 'legionExpansion global.js';

    //console.log(patchName + ' on ' + buildVersion + ' last tested on 85138');

    // the build groups are ordered to match the build bar tab order
    HodgePodge.addUnits([
    
    {
        spec_id: "/pa/units/commanders/tank_aeson/tank_aeson.json",
        si_fallback: ["commander"]
      },{
        spec_id: "/pa/units/commanders/imperial_invictus/imperial_invictus.json",
        si_fallback: ["commander"]
      },{
        spec_id: "/pa/units/air/l_flying_teleporter/l_flying_teleporter.json",
        si_fallback: ["teleporter"],
        preferred_builds: [
          ["L_factory", 0]
        ]
      }, {
        spec_id: "/pa/units/land/l_unit_cannon/l_unit_cannon.json",
        si_fallback: ["unit_cannon"],
        preferred_builds: [
          ["L_factory", 6]
        ]
      }, {
        spec_id: "/pa/units/sea/l_naval_factory_adv/l_naval_factory_adv.json",
        si_fallback: ["naval_factory_adv"],
        preferred_builds: [
          ["L_factory", 7]
        ]
      }, {
        spec_id: "/pa/units/air/l_air_factory_adv/l_air_factory_adv.json",
        si_fallback: ["air_factory_adv"],
        preferred_builds: [
          ["L_factory", 8]
        ]
      }, {
        spec_id: "/pa/units/land/l_bot_factory_adv/l_bot_factory_adv.json",
        si_fallback: ["bot_factory_adv"],
        preferred_builds: [
          ["L_factory", 9]
        ]
      }, {
        spec_id: "/pa/units/land/l_vehicle_factory_adv/l_vehicle_factory_adv.json",
        si_fallback: ["vehicle_factory_adv"],
        preferred_builds: [
          ["L_factory", 10]
        ]
      }, {
        spec_id: "/pa/units/orbital/l_orbital_launcher/l_orbital_launcher.json",
        si_fallback: ["orbital_launcher"],
        preferred_builds: [
          ["L_factory", 12]
        ]
      }, {
        spec_id: "/pa/units/sea/l_naval_factory/l_naval_factory.json",
        si_fallback: ["naval_factory"],
        preferred_builds: [
          ["L_factory", 13]
        ]
      }, {
        spec_id: "/pa/units/air/l_air_factory/l_air_factory.json",
        si_fallback: ["air_factory"],
        preferred_builds: [
          ["L_factory", 14]
        ]
      }, {
        spec_id: "/pa/units/land/l_bot_factory/l_bot_factory.json",
        si_fallback: ["bot_factory"],
        preferred_builds: [
          ["L_factory", 15]
        ]
      }, {
        spec_id: "/pa/units/land/l_vehicle_factory/l_vehicle_factory.json",
        si_fallback: ["vehicle_factory"],
        preferred_builds: [
          ["L_factory", 16]
        ]
      },


      {
        spec_id: "/pa/units/land/l_flame_turret/l_flame_turret.json",
        si_fallback: ["laser_defense_adv"],
        preferred_builds: [
          ["L_combat", 3]
        ]
      }, {
        spec_id: "/pa/units/land/l_artillery_long/l_artillery_long.json",
        si_fallback: ["artillery_long"],
        preferred_builds: [
          ["L_combat", 2]
        ]
      }, {
        spec_id: "/pa/units/land/l_rocket_barrage/l_rocket_barrage.json",
        si_fallback: ["tactical_missile_launcher"],
        preferred_builds: [
            ["L_combat", 0]
          ] // catapult
      }, {
        spec_id: "/pa/units/land/l_nuke_launcher/l_nuke_launcher.json",
        si_fallback: ["nuke_launcher"],
        preferred_builds: [
          ["L_combat", 4]
        ]
      }, {
        spec_id: "/pa/units/land/l_t1_turret_adv/l_t1_turret_adv.json",
        si_fallback: ["laser_defense"],
        preferred_builds: [
            ["L_combat", 6]
          ] // double laser
      }, {
        spec_id: "/pa/units/land/l_air_defense_adv/l_air_defense_adv.json",
        si_fallback: ["air_defense_adv"],
        preferred_builds: [
          ["L_combat", 7]
        ]
      },  {
        spec_id: "/pa/units/land/l_swarm_hive/l_swarm_hive.json",
        si_fallback: ["artillery_unit_launcher"],
        preferred_builds: [
          ["L_combat", 8]
        ]
      },  {
        spec_id: "/pa/units/land/l_swarm_hive/l_hive_nanoswarm/l_hive_nanoswarm.json",
        si_fallback: ["bot_nanoswarm"]
      },  {
        spec_id: "/pa/units/sea/l_torpedo_launcher_adv/l_torpedo_launcher_adv.json",
        si_fallback: ["torpedo_launcher_adv"],
        preferred_builds: [
          ["L_combat", 9]
        ]
      },

      {
        spec_id: "/pa/units/land/l_anti_nuke_launcher/l_anti_nuke_launcher.json",
        si_fallback: ["anti_nuke_launcher"],
        preferred_builds: [
          ["L_combat", 10]
        ]
      },{
        spec_id: "/pa/units/air/l_firestarter/l_drop_turret/l_drop_turret.json",
        si_fallback: ["laser_defense_single"]
      }, {
        spec_id: "/pa/units/land/l_t1_turret_basic/l_t1_turret_basic.json",
        si_fallback: ["laser_defense_single"],
        preferred_builds: [
            ["L_combat", 12]
          ] // single laser
      }, {
        spec_id: "/pa/units/land/l_air_defense/l_air_defense.json",
        si_fallback: ["air_defense"],
        preferred_builds: [
          ["L_combat", 13]
        ]
      },  {
        spec_id: "/pa/units/land/l_artillery_short/l_artillery_short.json",
        si_fallback: ["artillery_short"],
        preferred_builds: [
          ["L_combat", 14]
        ]
      },  {
        spec_id: "/pa/units/sea/l_torpedo_launcher/l_torpedo_launcher.json",
        si_fallback: ["torpedo_launcher"],
        preferred_builds: [
          ["L_combat", 15]
        ]
      }, {
        spec_id: "/pa/units/orbital/l_ion_defense/l_ion_defense.json",
        si_fallback: ["ion_defense"],
        preferred_builds: [
          ["L_combat", 16]
        ]
      },


      {
        spec_id: "/pa/units/land/l_control_module/l_control_module.json",
        si_fallback: ["control_module"],
        preferred_builds: [
          ["L_utility", 1]
        ]
      }, {
        spec_id: "/pa/units/land/l_energy_plant_adv/l_energy_plant_adv.json",
        si_fallback: ["energy_plant_adv"],
        preferred_builds: [
          ["L_utility", 3]
        ]
      }, {
        spec_id: "/pa/units/land/l_mex_adv/l_mex_adv.json",
        si_fallback: ["metal_extractor_adv"],
        preferred_builds: [
          ["L_utility", 4]
        ]
      }, {
        spec_id: "/pa/units/orbital/l_deep_space_radar/l_deep_space_radar.json",
        si_fallback: ["deep_space_radar"],
        preferred_builds: [
          ["L_utility", 5]
        ]
      }, {
        spec_id: "/pa/units/orbital/l_delta_v_engine/l_delta_v_engine.json",
        si_fallback: ["delta_v_engine"],
        preferred_builds: [
          ["L_utility", 6]
        ]
      }, 
       {
        spec_id: "/pa/units/land/l_radar_adv/l_radar_adv.json",
        si_fallback: ["radar_adv"],
        preferred_builds: [
          ["L_utility", 8]
        ]
      }, {
        spec_id: "/pa/units/land/l_energy_plant/l_energy_plant.json",
        si_fallback: ["energy_plant"],
        preferred_builds: [
          ["L_utility", 9]
        ]
      }, {
        spec_id: "/pa/units/land/l_mex/l_mex.json",
        si_fallback: ["metal_extractor"],
        preferred_builds: [
          ["L_utility", 10]
        ]
      }, {
        spec_id: "/pa/units/land/l_land_barrier/l_land_barrier.json",
        si_fallback: ["land_barrier"],
        preferred_builds: [
          ["L_utility", 12]
        ]
      }, {
        spec_id: "/pa/units/land/l_teleporter/l_teleporter.json",
        si_fallback: ["teleporter"],
        preferred_builds: [
          ["L_utility", 13]
        ]
      }, {
        spec_id: "/pa/units/land/l_radar/l_radar.json",
        si_fallback: ["radar"],
        preferred_builds: [
          ["L_utility", 14]
        ]
      }, {
        spec_id: "/pa/units/land/l_storage/l_storage.json",
        si_fallback: ["metal_storage"],
        preferred_builds: [
            ["L_utility", 15]
          ] // energy storage
      }, {
        spec_id: "/pa/units/land/l_shield_gen/l_shield_gen.json",
        si_fallback: ["deep_space_radar"],
        preferred_builds: [
          ["L_utility", 16]
        ]
      },


      {
        spec_id: "/pa/units/land/l_fabrication_vehicle_adv/l_fabrication_vehicle_adv.json",
        si_fallback: ["fabrication_vehicle_adv"],
        preferred_builds: [
          ["L_vehicle", 6]
        ]
      }, {
        spec_id: "/pa/units/land/l_tank_laser_adv/l_tank_laser_adv.json",
        si_fallback: ["tank_laser_adv"],
        preferred_builds: [
            ["L_vehicle", 7]
          ] // leveler
      }, {
        spec_id: "/pa/units/land/l_tank_heavy_armor/l_tank_heavy_armor.json",
        si_fallback: ["tank_heavy_armor"],
        preferred_builds: [
            ["L_vehicle", 8]
          ] // vanguard
      }, {
        spec_id: "/pa/units/land/l_tank_swarm/l_tank_swarm.json",
        si_fallback: ["tank_flak"],
        preferred_builds: [
          ["L_vehicle", 9]
        ]
      }, {
        spec_id: "/pa/units/land/l_hover_tank_adv/l_hover_tank_adv.json",
        si_fallback: ["tank_hover"],
        preferred_builds: [
            ["L_vehicle", 10]
          ] //hover
      }, {
        spec_id: "/pa/units/land/l_sniper_tank/l_sniper_tank.json",
        si_fallback: ["tank_heavy_mortar"],
        preferred_builds: [
            ["L_vehicle", 11]
          ] // sheller
      }, {
        spec_id: "/pa/units/land/l_fabrication_vehicle/l_fabrication_vehicle.json",
        si_fallback: ["fabrication_vehicle"],
        preferred_builds: [
          ["L_vehicle", 12]
        ]
      }, {
        spec_id: "/pa/units/land/l_tank_shank/l_tank_shank.json",
        si_fallback: ["tank_light_laser"],
        preferred_builds: [
            ["L_vehicle", 13]
          ] // bolo
      }, {
        spec_id: "/pa/units/land/l_shotgun_tank/l_shotgun_tank.json",
        si_fallback: ["tank_armor"],
        preferred_builds: [
            ["L_vehicle", 14]
          ] // flame tank
      }, {
        spec_id: "/pa/units/land/l_mortar_tank/l_mortar_tank.json",
        si_fallback: ["tank_heavy_mortar"],
        preferred_builds: [
            ["L_vehicle", 15]
          ] // spinner
      }, {
        spec_id: "/pa/units/land/l_hover_tank/l_hover_tank.json",
        si_fallback: ["tank_hover"],
        preferred_builds: [
            ["L_vehicle", 16]
          ] // hover tank
      }, {
        spec_id: "/pa/units/land/l_fabrication_vehicle_combat/l_fabrication_vehicle_combat.json",
        si_fallback: ["tank_heavy_mortar"],
        preferred_builds: [
            ["L_vehicle", 17]
          ] // spinner
      },


      {
        spec_id: "/pa/units/land/l_bot_support_commander/l_bot_support_commander.json",
        si_fallback: ["bot_support_commander"],
        preferred_builds: [
          ["L_bot", 0]
        ]
      },
      {
        spec_id: "/pa/units/land/l_fabrication_bot_adv/l_fabrication_bot_adv.json",
        si_fallback: ["fabrication_bot_adv"],
        preferred_builds: [
          ["L_bot", 6]
        ]
      }, {
        spec_id: "/pa/units/land/l_riot_bot/l_riot_bot.json",
        si_fallback: ["assault_bot_adv"],
        preferred_builds: [
            ["L_bot", 7]
          ] // slammer
      }, {
        spec_id: "/pa/units/land/l_bot_artillery_adv/l_bot_artillery_adv.json",
        si_fallback: ["bot_sniper"],
        preferred_builds: [
            ["L_bot", 8]
          ] // sniper
      }, {
        spec_id: "/pa/units/land/l_bot_aa_adv/l_bot_aa_adv.json",
        si_fallback: ["bot_nanoswarm"],
        preferred_builds: [
            ["L_bot", 9]
          ] // grenadier
      }, {
        spec_id: "/pa/units/land/l_bot_artillery/l_bot_artillery.json",
        si_fallback: ["bluehawk"],
        preferred_builds: [
            ["L_bot", 10]
          ] // grenadier
      }, {
        spec_id: "/pa/units/land/l_necromancer/l_necromancer.json",
        si_fallback: ["fabrication_bot_combat_adv"],
        preferred_builds: [
          ["L_bot", 11]
        ]
      }, {
        spec_id: "/pa/units/land/l_fabrication_bot/l_fabrication_bot.json",
        si_fallback: ["fabrication_bot"],
        preferred_builds: [
            ["L_bot", 12]
          ] //botfab
      }, {
        spec_id: "/pa/units/land/l_assault_bot/l_assault_bot.json",
        si_fallback: ["assault_bot"],
        preferred_builds: [
            ["L_bot", 13]
          ] // dox
      }, {
        spec_id: "/pa/units/land/l_sniper_bot/l_sniper_bot.json",
        si_fallback: ["bot_sniper"],
        preferred_builds: [
            ["L_bot", 14]
          ] //lancer
      }, {
        spec_id: "/pa/units/land/l_bot_aa/l_bot_aa.json",
        si_fallback: ["aa_missile_vehicle"],
        preferred_builds: [
            ["L_bot", 15]
          ] // aa
      }, {
        spec_id: "/pa/units/land/l_bot_bomb/l_bot_bomb.json",
        si_fallback: ["bot_bomb"],
        preferred_builds: [
            ["L_bot", 16]
          ] // boom
      }, {
        spec_id: "/pa/units/land/l_scout_bot/l_scout_bot.json",
        si_fallback: ["land_scout"],
        preferred_builds: [
            ["L_bot", 17]
          ] // scout
      },
	  {
        spec_id: "/pa/units/land/l_scout_bot/l_scout_bot_radar_mode.json",
        si_fallback: ["land_scout"]
      }, {
        spec_id: "/pa/units/land/l_necromancer/minion/minion.json",
        si_fallback: ["bot_bomb"]
      }, 


      {
        spec_id: "/pa/units/air/l_fabrication_aircraft_adv/l_fabrication_aircraft_adv.json",
        si_fallback: ["fabrication_aircraft_adv"],
        preferred_builds: [
          ["L_air", 6]
        ]
      }, {
        spec_id: "/pa/units/air/l_fighter_adv/l_fighter_adv.json",
        si_fallback: ["fighter_adv"],
        preferred_builds: [
          ["L_air", 7]
        ]
      }, {
        spec_id: "/pa/units/air/l_gunship/l_gunship.json",
        si_fallback: ["gunship"],
        preferred_builds: [
          ["L_air", 8]
        ]
      }, {
        spec_id: "/pa/units/air/l_air_carrier/l_air_carrier.json",
        si_fallback: ["carrier"],
        preferred_builds: [
          ["L_air", 9]
        ]
      }, {
        spec_id: "/pa/units/air/l_air_carrier/l_drone/l_drone.json",
        si_fallback: ["drone"]
      }, {
        spec_id: "/pa/units/air/l_fabrication_aircraft/l_fabrication_aircraft.json",
        si_fallback: ["fabrication_aircraft"],
        preferred_builds: [
          ["L_air", 12]
        ]
      }, {
        spec_id: "/pa/units/air/l_fighter/l_fighter.json",
        si_fallback: ["fighter"],
        preferred_builds: [
          ["L_air", 13]
        ]
      }, {
        spec_id: "/pa/units/air/l_bomber/l_bomber.json",
        si_fallback: ["bomber"],
        preferred_builds: [
          ["L_air", 14]
        ]
      }, {
        spec_id: "/pa/units/air/l_raider/l_raider.json",
        si_fallback: ["bomber"],
        preferred_builds: [
          ["L_air", 15]
        ]
      },
 {
        spec_id: "/pa/units/air/l_transport/l_transport.json",
        si_fallback: ["transport"],
        preferred_builds: [
          ["L_air", 16]
        ]
      },
 {
        spec_id: "/pa/units/air/l_air_bomb/l_air_bomb.json",
        si_fallback: ["solar_drone"],
        preferred_builds: [
          ["L_air", 17]
        ]
      }, {
        spec_id: "/pa/units/air/l_air_scout_adv/l_air_scout_adv.json",
        si_fallback: ["air_scout"],
        preferred_builds: [
          ["L_air", 10]
        ]
      }, {
        spec_id: "/pa/units/air/l_firestarter/l_firestarter.json",
        si_fallback: ["transport"],
        preferred_builds: [
          ["L_air", 11]
        ]
      }, {
        spec_id: "/pa/units/air/l_air_scout_adv/vision/vision.json",
        si_fallback: ["air_scout"],
        preferred_builds: [
          ["L_air", 12]
        ]
      },
      {
        spec_id: "/pa/units/sea/l_hover_ship/l_hover_ship.json",
        si_fallback: ["hover_ship"],
        preferred_builds: [
            ["L_sea", 0]
        ]
      },
      {
        spec_id: "/pa/units/sea/l_fabrication_ship_adv/l_fabrication_ship_adv.json",
        si_fallback: ["fabrication_ship_adv"],
        preferred_builds: [
          ["L_sea", 6]
        ]
      }, {
        spec_id: "/pa/units/sea/l_sea_tank/l_sea_tank.json",
        si_fallback: ["nuclear_sub"],
        preferred_builds: [
          ["L_sea", 7]
        ]
      }, {
        spec_id: "/pa/units/sea/l_battleship/l_battleship.json",
        si_fallback: ["battleship"],
        preferred_builds: [
          ["L_sea", 8]
        ]
      }, {
        spec_id: "/pa/units/sea/l_missile_ship/l_missile_ship.json",
        si_fallback: ["missile_ship"],
        preferred_builds: [
          ["L_sea", 9]
        ]
      }, {
        spec_id: "/pa/units/sea/l_fabrication_sub_combat_adv/l_fabrication_sub_combat_adv.json",
        si_fallback: ["fabrication_ship_adv"],
        preferred_builds: [
          ["L_sea", 10]
        ]
      }, {
        spec_id: "/pa/units/sea/l_fabrication_ship/l_fabrication_ship.json",
        si_fallback: ["fabrication_ship"],
        preferred_builds: [
          ["L_sea", 12]
        ]
      }, {
        spec_id: "/pa/units/sea/l_sea_scout/l_sea_scout.json",
        si_fallback: ["sea_scout"],
        preferred_builds: [
          ["L_sea", 13]
        ]
      }, {
        spec_id: "/pa/units/sea/l_destroyer/l_destroyer.json",
        si_fallback: ["destroyer"],
        preferred_builds: [
          ["L_sea", 14]
        ]
      }, {
        spec_id: "/pa/units/sea/l_attack_sub/l_attack_sub.json",
        si_fallback: ["attack_sub"],
        preferred_builds: [
          ["L_sea", 15]
        ]
      }, {
        spec_id: "/pa/units/sea/l_frigate/l_frigate.json",
        si_fallback: ["frigate"],
        preferred_builds: [
          ["L_sea", 16]
        ]
      },


      {
        spec_id: "/pa/units/orbital/l_orbital_battleship/l_orbital_battleship.json",
        si_fallback: ["orbital_battleship"],
        preferred_builds: [
          ["L_orbital", 5]
        ]
      }, {
        spec_id: "/pa/units/orbital/l_solar_array/l_solar_array.json",
        si_fallback: ["solar_array"],
        preferred_builds: [
          ["L_orbital", 6]
        ]
      }, {
        spec_id: "/pa/units/orbital/l_orbital_railgun/l_orbital_railgun.json",
        si_fallback: ["orbital_railgun"],
        preferred_builds: [
          ["L_orbital", 9]
        ]
      }, {
        spec_id: "/pa/units/orbital/l_orbital_laser/l_orbital_laser.json",
        si_fallback: ["orbital_laser"],
        preferred_builds: [
          ["L_orbital", 7]
        ]
      }, {
        spec_id: "/pa/units/orbital/l_radar_satellite_adv/l_radar_satellite_adv.json",
        si_fallback: ["radar_satellite_adv"],
        preferred_builds: [
          ["L_orbital", 8]
        ]
      },
      {
        spec_id: "/pa/units/orbital/l_orbital_dropper/l_orbital_dropper.json",
        si_fallback: ["mining_platform"],
        preferred_builds: [
          ["L_orbital_structure", 15]
        ]
      }, {
        spec_id: "/pa/units/orbital/l_mining_platform/l_mining_platform.json",
        si_fallback: ["mining_platform"],
        preferred_builds: [
          ["L_orbital_structure", 13]
        ]
      }, {
        spec_id: "/pa/units/orbital/l_orbital_factory/l_orbital_factory.json",
        si_fallback: ["orbital_factory"],
        preferred_builds: [
          ["L_orbital_structure", 14]
        ]
      }, {
        spec_id: "/pa/units/orbital/l_orbital_fabrication_bot/l_orbital_fabrication_bot.json",
        si_fallback: ["orbital_fabrication_bot"],
        preferred_builds: [
          ["L_orbital", 12]
        ]
      }, {
        spec_id: "/pa/units/orbital/l_orbital_fighter/l_orbital_fighter.json",
        si_fallback: ["orbital_fighter"],
        preferred_builds: [
          ["L_orbital", 13]
        ]
      }, {
        spec_id: "/pa/units/orbital/l_orbital_probe/l_orbital_probe.json",
        si_fallback: ["radar_satellite"],
        preferred_builds: [
          ["L_orbital", 16]
        ]
      }, {
        spec_id: "/pa/units/orbital/l_orbital_lander/l_orbital_lander.json",
        si_fallback: ["orbital_lander"],
        preferred_builds: [
          ["L_orbital", 15]
        ]
      }, {
        spec_id: "/pa/units/orbital/l_radar_satellite/l_radar_satellite.json",
        si_fallback: ["radar_satellite"],
        preferred_builds: [
          ["L_orbital", 14]
        ]
      }, {
        spec_id: "/pa/units/orbital/l_defense_satellite/l_defense_satellite.json",
        si_fallback: ["defense_satellite"],
        preferred_builds: [
          ["L_orbital_structure", 12]
        ]
      },



      {
        spec_id: "/pa/units/land/l_land_mine/l_land_mine.json",
        si_fallback: ["land_mine"],
        preferred_builds: [
          ["L_ammo", 10]
        ]
      }, {
        spec_id: "/pa/units/sea/l_sea_mine/l_sea_mine.json",
        si_fallback: ["land_mine"],
        preferred_builds: [
          ["L_ammo", 12]
        ]
      }, {
        spec_id: "/pa/units/land/l_anti_nuke_launcher/l_anti_nuke_launcher_ammo.json",
        si_fallback: ["anti_nuke_launcher_ammo"],
        preferred_builds: [
          ["L_ammo", 13]
        ],
        ammo_build_hover: {
          name: 'Legion Iron Dome Interceptor',
          description: '!LOC:Anti-nuke - Intercepts incoming nuclear missiles.',
          cost: 6750,
          sicon_override: 'l_anti_nuke_launcher_ammo',
          damage: 1
        },
      }, {
        spec_id: "/pa/units/land/l_nuke_launcher/l_nuke_launcher_ammo.json",
        si_fallback: ["nuke_launcher_ammo"],
        preferred_builds: [
          ["L_ammo", 14]
        ],
        ammo_build_hover: {
          name: 'Supernova Strategic Warhead',
          description: 'Long range, high damage ballistic missile.',
          cost: 50000,
          sicon_override: 'l_nuke_launcher_ammo',
          damage: 33000
        },
      },

      /*
          {
              spec_id: "/pa/units/land/l_unit/l_unit.json" ]],
              si_fallback: ["unit"],
              preferred_builds: [["L_utility", 14]], // metal storage spare
          },*/
      {
        spec_id: "/pa/units/air/l_titan_air/l_titan_air.json",
        si_fallback: ["titan_air"],
        preferred_builds: [
          ["L_factory", 2]
        ]
      }, {
        spec_id: "/pa/units/land/l_titan_bot/l_titan_bot.json",
        si_fallback: ["titan_bot"],
        preferred_builds: [
          ["L_factory", 3]
        ]
      }, {
        spec_id: "/pa/units/land/l_titan_vehicle/l_titan_vehicle.json",
        si_fallback: ["titan_vehicle"],
        preferred_builds: [
          ["L_factory", 4]
        ]
      }, {
        spec_id: "/pa/units/orbital/l_titan_orbital/l_titan_orbital.json",
        si_fallback: ["titan_orbital"],
        preferred_builds: [
          ["L_orbital_structure", 6]
        ]
      }, {
        spec_id: "/pa/units/land/l_titan_structure/l_titan_structure.json",
        si_fallback: ["titan_structure"],
        preferred_builds: [
          ["L_utility", 0]
        ]
      }
      /*
          {
              spec_id: "/pa/units/land/bot_tesla/bot_tesla.json",
              si_fallback: ["bot_tesla"],
              preferred_builds: [["L_bot", 17]],
          },
          {
              spec_id: "/pa/units/land/bot_nanoswarm/bot_nanoswarm.json",
              si_fallback: ["bot_nanoswarm"],
              preferred_builds: [["L_bot", 11]],
          },
          {
              spec_id: "/pa/units/land/bot_support_commander/bot_support_commander.json",
              si_fallback: ["bot_support_commander"],
              preferred_builds: [["L_bot", 0]],
          },
          {
              spec_id: "/pa/units/land/tank_hover/tank_hover.json",
              si_fallback: ["tank_hover"],
              preferred_builds: [["L_vehicle", 17]],
          },
          {
              spec_id: "/pa/units/land/tank_flak/tank_flak.json",
              si_fallback: ["tank_flak"],
              preferred_builds: [["L_vehicle", 10]],
          },
          {
              spec_id: "/pa/units/land/tank_nuke/tank_nuke.json",
              si_fallback: ["tank_nuke"],
              preferred_builds: [["L_vehicle", 0]],
          },
          {
              spec_id: "/pa/units/air/solar_drone/solar_drone.json",
              si_fallback: ["solar_drone"],
              preferred_builds: [["L_air", 17]],
          },
          {
              spec_id: "/pa/units/air/bomber_heavy/bomber_heavy.json",
              si_fallback: ["bomber_heavy"],
              preferred_builds: [["L_air", 10]],
          },
          {
              spec_id: "/pa/units/air/support_platform/support_platform.json",
              si_fallback: ["support_platform"],
              preferred_builds: [["L_air", 0]],
          },
          {
              spec_id: "/pa/units/sea/fabrication_barge/fabrication_barge.json",
              si_fallback: ["fabrication_barge"],
              preferred_builds: [["L_sea", 17]],
          },
          {
              spec_id: "/pa/units/sea/drone_carrier/carrier/carrier.json",
              si_fallback: ["carrier"],
              preferred_builds: [["L_sea", 0]],
          },
          {
              spec_id: "/pa/units/sea/hover_ship/hover_ship.json",
              si_fallback: ["hover_ship"],
              preferred_builds: [["L_sea", 10]],
          },
          {
              spec_id: "/pa/units/orbital/orbital_probe/orbital_probe.json",
              si_fallback: ["orbital_probe"],
              preferred_builds: [["L_orbital", 16]],
          },
          {
              spec_id: "/pa/units/orbital/orbital_battleship/orbital_battleship.json",
              si_fallback: ["orbital_battleship"],
              preferred_builds: [["L_orbital", 0]],
          },
          {
              spec_id: "/pa/units/orbital/orbital_railgun/orbital_railgun.json",
              si_fallback: ["orbital_railgun"],
              preferred_builds: [["L_orbital", 9]],
          },
          {
              spec_id: "/pa/units/land/artillery_unit_launcher/artillery_unit_launcher.json",
              si_fallback: ["artillery_unit_launcher"],
              preferred_builds: [["L_combat", 8]],
          },
          */
    ]);
  } catch (e) {
    console.log(e);
    console.log(JSON.stringify(e));
  }
})();

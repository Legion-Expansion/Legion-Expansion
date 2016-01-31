(function() {
  if (!window.HodgePodge) return

  try {
    var buildVersion = decode(sessionStorage.build_version);

    var patchName = 'legionExpansion global.js';

    //console.log(patchName + ' on ' + buildVersion + ' last tested on 85138');

    // the build groups are ordered to match the build bar tab order
    HodgePodge.addUnits([{
        spec_id: "/pa/units/air/L_flying_teleporter/L_flying_teleporter.json",
        si_fallback: ["teleporter"],
        preferred_builds: [
          ["L_factory", 0]
        ]
      }, {
        spec_id: "/pa/units/land/L_unit_cannon/L_unit_cannon.json",
        si_fallback: ["unit_cannon"],
        preferred_builds: [
          ["L_factory", 6]
        ]
      }, {
        spec_id: "/pa/units/sea/L_naval_factory_adv/L_naval_factory_adv.json",
        si_fallback: ["naval_factory_adv"],
        preferred_builds: [
          ["L_factory", 7]
        ]
      }, {
        spec_id: "/pa/units/air/L_air_factory_adv/L_air_factory_adv.json",
        si_fallback: ["air_factory_adv"],
        preferred_builds: [
          ["L_factory", 8]
        ]
      }, {
        spec_id: "/pa/units/land/L_bot_factory_adv/L_bot_factory_adv.json",
        si_fallback: ["bot_factory_adv"],
        preferred_builds: [
          ["L_factory", 9]
        ]
      }, {
        spec_id: "/pa/units/land/L_vehicle_factory_adv/L_vehicle_factory_adv.json",
        si_fallback: ["vehicle_factory_adv"],
        preferred_builds: [
          ["L_factory", 10]
        ]
      }, {
        spec_id: "/pa/units/orbital/L_orbital_launcher/L_orbital_launcher.json",
        si_fallback: ["orbital_launcher"],
        preferred_builds: [
          ["L_factory", 12]
        ]
      }, {
        spec_id: "/pa/units/sea/L_naval_factory/L_naval_factory.json",
        si_fallback: ["naval_factory"],
        preferred_builds: [
          ["L_factory", 13]
        ]
      }, {
        spec_id: "/pa/units/air/L_air_factory/L_air_factory.json",
        si_fallback: ["air_factory"],
        preferred_builds: [
          ["L_factory", 14]
        ]
      }, {
        spec_id: "/pa/units/land/L_bot_factory/L_bot_factory.json",
        si_fallback: ["bot_factory"],
        preferred_builds: [
          ["L_factory", 15]
        ]
      }, {
        spec_id: "/pa/units/land/L_vehicle_factory/L_vehicle_factory.json",
        si_fallback: ["vehicle_factory"],
        preferred_builds: [
          ["L_factory", 16]
        ]
      },


      {
        spec_id: "/pa/units/land/L_flame_turret/L_flame_turret.json",
        si_fallback: ["laser_defense_adv"],
        preferred_builds: [
          ["L_combat", 0]
        ]
      }, {
        spec_id: "/pa/units/land/L_artillery_long/L_artillery_long.json",
        si_fallback: ["artillery_long"],
        preferred_builds: [
          ["L_combat", 2]
        ]
      }, {
        spec_id: "/pa/units/land/L_rocket_barrage/L_rocket_barrage.json",
        si_fallback: ["tactical_missile_launcher"],
        preferred_builds: [
            ["L_combat", 3]
          ] // catapult
      }, {
        spec_id: "/pa/units/land/L_nuke_launcher/L_nuke_launcher.json",
        si_fallback: ["nuke_launcher"],
        preferred_builds: [
          ["L_combat", 4]
        ]
      }, {
        spec_id: "/pa/units/land/L_t1_turret_adv/L_t1_turret_adv.json",
        si_fallback: ["laser_defense"],
        preferred_builds: [
            ["L_combat", 6]
          ] // double laser
      }, {
        spec_id: "/pa/units/land/L_air_defense_adv/L_air_defense_adv.json",
        si_fallback: ["air_defense_adv"],
        preferred_builds: [
          ["L_combat", 7]
        ]
      },  {
        spec_id: "/pa/units/sea/L_torpedo_launcher_adv/L_torpedo_launcher_adv.json",
        si_fallback: ["torpedo_launcher_adv"],
        preferred_builds: [
          ["L_combat", 9]
        ]
      },

      {
        spec_id: "/pa/units/land/L_anti_nuke_launcher/L_anti_nuke_launcher.json",
        si_fallback: ["anti_nuke_launcher"],
        preferred_builds: [
          ["L_combat", 10]
        ]
      }, {
        spec_id: "/pa/units/land/L_t1_turret_basic/L_t1_turret_basic.json",
        si_fallback: ["laser_defense_single"],
        preferred_builds: [
            ["L_combat", 12]
          ] // single laser
      }, {
        spec_id: "/pa/units/land/L_air_defense/L_air_defense.json",
        si_fallback: ["air_defense"],
        preferred_builds: [
          ["L_combat", 13]
        ]
      },  {
        spec_id: "/pa/units/land/L_artillery_short/L_artillery_short.json",
        si_fallback: ["artillery_short"],
        preferred_builds: [
          ["L_combat", 14]
        ]
      },  {
        spec_id: "/pa/units/sea/L_torpedo_launcher/L_torpedo_launcher.json",
        si_fallback: ["torpedo_launcher"],
        preferred_builds: [
          ["L_combat", 15]
        ]
      }, {
        spec_id: "/pa/units/orbital/L_ion_defense/L_ion_defense.json",
        si_fallback: ["ion_defense"],
        preferred_builds: [
          ["L_combat", 16]
        ]
      },


      {
        spec_id: "/pa/units/land/L_control_module/L_control_module.json",
        si_fallback: ["control_module"],
        preferred_builds: [
          ["L_utility", 1]
        ]
      }, {
        spec_id: "/pa/units/land/L_energy_plant_adv/L_energy_plant_adv.json",
        si_fallback: ["energy_plant_adv"],
        preferred_builds: [
          ["L_utility", 3]
        ]
      }, {
        spec_id: "/pa/units/land/L_mex_adv/L_mex_adv.json",
        si_fallback: ["metal_extractor_adv"],
        preferred_builds: [
          ["L_utility", 4]
        ]
      }, {
        spec_id: "/pa/units/orbital/L_deep_space_radar/L_deep_space_radar.json",
        si_fallback: ["deep_space_radar"],
        preferred_builds: [
          ["L_utility", 6]
        ]
      }, {
        spec_id: "/pa/units/orbital/L_delta_v_engine/L_delta_v_engine.json",
        si_fallback: ["delta_v_engine"],
        preferred_builds: [
          ["L_utility", 7]
        ]
      }, {
        spec_id: "/pa/units/land/L_radar_adv/L_radar_adv.json",
        si_fallback: ["radar_adv"],
        preferred_builds: [
          ["L_utility", 8]
        ]
      }, {
        spec_id: "/pa/units/land/L_energy_plant/L_energy_plant.json",
        si_fallback: ["energy_plant"],
        preferred_builds: [
          ["L_utility", 9]
        ]
      }, {
        spec_id: "/pa/units/land/L_mex/L_mex.json",
        si_fallback: ["metal_extractor"],
        preferred_builds: [
          ["L_utility", 10]
        ]
      }, {
        spec_id: "/pa/units/land/L_land_barrier/L_land_barrier.json",
        si_fallback: ["land_barrier"],
        preferred_builds: [
          ["L_utility", 12]
        ]
      }, {
        spec_id: "/pa/units/land/L_teleporter/L_teleporter.json",
        si_fallback: ["teleporter"],
        preferred_builds: [
          ["L_utility", 13]
        ]
      }, {
        spec_id: "/pa/units/land/L_radar/L_radar.json",
        si_fallback: ["radar"],
        preferred_builds: [
          ["L_utility", 14]
        ]
      }, {
        spec_id: "/pa/units/land/L_storage/L_storage.json",
        si_fallback: ["metal_storage"],
        preferred_builds: [
            ["L_utility", 15]
          ] // energy storage
      }, {
        spec_id: "/pa/units/land/L_shield_gen/L_shield_gen.json",
        si_fallback: ["deep_space_radar"],
        preferred_builds: [
          ["L_utility", 16]
        ]
      },


      {
        spec_id: "/pa/units/land/L_fabrication_vehicle_adv/L_fabrication_vehicle_adv.json",
        si_fallback: ["fabrication_vehicle_adv"],
        preferred_builds: [
          ["L_vehicle", 6]
        ]
      }, {
        spec_id: "/pa/units/land/L_tank_laser_adv/L_tank_laser_adv.json",
        si_fallback: ["tank_laser_adv"],
        preferred_builds: [
            ["L_vehicle", 7]
          ] // leveler
      }, {
        spec_id: "/pa/units/land/L_tank_heavy_armor/L_tank_heavy_armor.json",
        si_fallback: ["tank_heavy_armor"],
        preferred_builds: [
            ["L_vehicle", 8]
          ] // vanguard
      }, {
        spec_id: "/pa/units/land/L_sniper_tank/L_sniper_tank.json",
        si_fallback: ["tank_heavy_mortar"],
        preferred_builds: [
            ["L_vehicle", 9]
          ] // sheller
      }, {
        spec_id: "/pa/units/land/L_hover_tank_adv/L_hover_tank_adv.json",
        si_fallback: ["tank_hover"],
        preferred_builds: [
            ["L_vehicle", 10]
          ] //hover
      }, {
        spec_id: "/pa/units/land/L_tank_swarm/L_tank_swarm.json",
        si_fallback: ["tank_flak"],
        preferred_builds: [
          ["L_vehicle", 11]
        ]
      }, {
        spec_id: "/pa/units/land/L_fabrication_vehicle/L_fabrication_vehicle.json",
        si_fallback: ["fabrication_vehicle"],
        preferred_builds: [
          ["L_vehicle", 12]
        ]
      }, {
        spec_id: "/pa/units/land/L_tank_shank/L_tank_shank.json",
        si_fallback: ["tank_light_laser"],
        preferred_builds: [
            ["L_vehicle", 13]
          ] // bolo
      }, {
        spec_id: "/pa/units/land/L_shotgun_tank/L_shotgun_tank.json",
        si_fallback: ["tank_armor"],
        preferred_builds: [
            ["L_vehicle", 14]
          ] // flame tank
      }, {
        spec_id: "/pa/units/land/L_hover_tank/L_hover_tank.json",
        si_fallback: ["tank_hover"],
        preferred_builds: [
            ["L_vehicle", 15]
          ] // hover tank
      }, {
        spec_id: "/pa/units/land/L_mortar_tank/L_mortar_tank.json",
        si_fallback: ["tank_heavy_mortar"],
        preferred_builds: [
            ["L_vehicle", 16]
          ] // spinner
      }, {
        spec_id: "/pa/units/land/L_fabrication_vehicle_combat/L_fabrication_vehicle_combat.json",
        si_fallback: ["tank_heavy_mortar"],
        preferred_builds: [
            ["L_vehicle", 17]
          ] // spinner
      },


      {
        spec_id: "/pa/units/land/L_bot_support_commander/L_bot_support_commander.json",
        si_fallback: ["bot_support_commander"],
        preferred_builds: [
          ["L_bot", 0]
        ]
      },
      {
        spec_id: "/pa/units/land/L_fabrication_bot_adv/L_fabrication_bot_adv.json",
        si_fallback: ["fabrication_bot_adv"],
        preferred_builds: [
          ["L_bot", 6]
        ]
      }, {
        spec_id: "/pa/units/land/L_riot_bot/L_riot_bot.json",
        si_fallback: ["assault_bot_adv"],
        preferred_builds: [
            ["L_bot", 7]
          ] // slammer
      }, {
        spec_id: "/pa/units/land/L_bot_artillery_adv/L_bot_artillery_adv.json",
        si_fallback: ["bot_sniper"],
        preferred_builds: [
            ["L_bot", 8]
          ] // sniper
      }, {
        spec_id: "/pa/units/land/L_turtle_bot_adv/L_turtle_bot_adv.json",
        si_fallback: ["fabrication_bot_combat_adv"],
        preferred_builds: [
          ["L_bot", 9]
        ]
      }, {
        spec_id: "/pa/units/land/L_bot_artillery/L_bot_artillery.json",
        si_fallback: ["bluehawk"],
        preferred_builds: [
            ["L_bot", 10]
          ] // grenadier
      },
      {
        spec_id: "/pa/units/land/L_bot_aa_adv/L_bot_aa_adv.json",
        si_fallback: ["bot_nanoswarm"],
        preferred_builds: [
            ["L_bot", 11]
          ] // grenadier
      }, {
        spec_id: "/pa/units/land/L_fabrication_bot/L_fabrication_bot.json",
        si_fallback: ["fabrication_bot"],
        preferred_builds: [
            ["L_bot", 12]
          ] //botfab
      }, {
        spec_id: "/pa/units/land/L_assault_bot/L_assault_bot.json",
        si_fallback: ["assault_bot"],
        preferred_builds: [
            ["L_bot", 13]
          ] // dox
      }, {
        spec_id: "/pa/units/land/L_bot_bomb/L_bot_bomb.json",
        si_fallback: ["bot_bomb"],
        preferred_builds: [
            ["L_bot", 14]
          ] // boom
      }, {
        spec_id: "/pa/units/land/L_sniper_bot/L_sniper_bot.json",
        si_fallback: ["bot_sniper"],
        preferred_builds: [
            ["L_bot", 15]
          ] //lancer
      }, {
        spec_id: "/pa/units/land/L_bot_aa/L_bot_aa.json",
        si_fallback: ["aa_missile_vehicle"],
        preferred_builds: [
            ["L_bot", 16]
          ] // aa
      }, {
        spec_id: "/pa/units/land/L_scout_bot/L_scout_bot.json",
        si_fallback: ["aa_missile_vehicle"],
        preferred_builds: [
            ["L_bot", 17]
          ] // aa
      },


      {
        spec_id: "/pa/units/air/L_fabrication_aircraft_adv/L_fabrication_aircraft_adv.json",
        si_fallback: ["fabrication_aircraft_adv"],
        preferred_builds: [
          ["L_air", 6]
        ]
      }, {
        spec_id: "/pa/units/air/L_fighter_adv/L_fighter_adv.json",
        si_fallback: ["fighter_adv"],
        preferred_builds: [
          ["L_air", 7]
        ]
      }, {
        spec_id: "/pa/units/air/L_gunship/L_gunship.json",
        si_fallback: ["gunship"],
        preferred_builds: [
          ["L_air", 8]
        ]
      }, {
        spec_id: "/pa/units/air/L_air_carrier/L_air_carrier.json",
        si_fallback: ["carrier"],
        preferred_builds: [
          ["L_air", 9]
        ]
      }, {
        spec_id: "/pa/units/air/L_fabrication_aircraft/L_fabrication_aircraft.json",
        si_fallback: ["fabrication_aircraft"],
        preferred_builds: [
          ["L_air", 12]
        ]
      }, {
        spec_id: "/pa/units/air/L_fighter/L_fighter.json",
        si_fallback: ["fighter"],
        preferred_builds: [
          ["L_air", 13]
        ]
      }, {
        spec_id: "/pa/units/air/L_bomber/L_bomber.json",
        si_fallback: ["bomber"],
        preferred_builds: [
          ["L_air", 14]
        ]
      }, {
        spec_id: "/pa/units/air/L_raider/L_raider.json",
        si_fallback: ["bomber"],
        preferred_builds: [
          ["L_air", 15]
        ]
      },
 {
        spec_id: "/pa/units/air/L_transport/L_transport.json",
        si_fallback: ["transport"],
        preferred_builds: [
          ["L_air", 16]
        ]
      }, {
        spec_id: "/pa/units/air/L_air_scout_adv/L_air_scout_adv.json",
        si_fallback: ["air_scout"],
        preferred_builds: [
          ["L_air", 10]
        ]
      }, {
        spec_id: "/pa/units/air/L_firestarter/L_firestarter.json",
        si_fallback: ["transport"],
        preferred_builds: [
          ["L_air", 11]
        ]
      },


      {
        spec_id: "/pa/units/sea/L_fabrication_ship_adv/L_fabrication_ship_adv.json",
        si_fallback: ["fabrication_ship_adv"],
        preferred_builds: [
          ["L_sea", 6]
        ]
      }, {
        spec_id: "/pa/units/sea/L_battleship/L_battleship.json",
        si_fallback: ["battleship"],
        preferred_builds: [
          ["L_sea", 7]
        ]
      }, {
        spec_id: "/pa/units/sea/L_missile_ship/L_missile_ship.json",
        si_fallback: ["missile_ship"],
        preferred_builds: [
          ["L_sea", 8]
        ]
      }, {
        spec_id: "/pa/units/sea/L_sea_tank/L_sea_tank.json",
        si_fallback: ["nuclear_sub"],
        preferred_builds: [
          ["L_sea", 9]
        ]
      }, {
        spec_id: "/pa/units/sea/L_fabrication_sub_combat_adv/L_fabrication_sub_combat_adv.json",
        si_fallback: ["fabrication_ship_adv"],
        preferred_builds: [
          ["L_sea", 10]
        ]
      }, {
        spec_id: "/pa/units/sea/L_fabrication_ship/L_fabrication_ship.json",
        si_fallback: ["fabrication_ship"],
        preferred_builds: [
          ["L_sea", 12]
        ]
      }, {
        spec_id: "/pa/units/sea/L_frigate/L_frigate.json",
        si_fallback: ["frigate"],
        preferred_builds: [
          ["L_sea", 13]
        ]
      }, {
        spec_id: "/pa/units/sea/L_destroyer/L_destroyer.json",
        si_fallback: ["destroyer"],
        preferred_builds: [
          ["L_sea", 14]
        ]
      }, {
        spec_id: "/pa/units/sea/L_attack_sub/L_attack_sub.json",
        si_fallback: ["attack_sub"],
        preferred_builds: [
          ["L_sea", 15]
        ]
      }, {
        spec_id: "/pa/units/sea/L_sea_scout/L_sea_scout.json",
        si_fallback: ["sea_scout"],
        preferred_builds: [
          ["L_sea", 16]
        ]
      },


      {
        spec_id: "/pa/units/orbital/hammerhead/hammerhead.json",
        si_fallback: ["orbital_battleship"],
        preferred_builds: [
          ["L_orbital", 0]
        ]
      }, {
        spec_id: "/pa/units/orbital/L_solar_array/L_solar_array.json",
        si_fallback: ["solar_array"],
        preferred_builds: [
          ["L_orbital", 1]
        ]
      }, {
        spec_id: "/pa/units/orbital/excal/excal.json",
        si_fallback: ["orbital_railgun"],
        preferred_builds: [
          ["L_orbital", 2]
        ]
      }, {
        spec_id: "/pa/units/orbital/L_orbital_laser/L_orbital_laser.json",
        si_fallback: ["orbital_laser"],
        preferred_builds: [
          ["L_orbital", 6]
        ]
      }, {
        spec_id: "/pa/units/orbital/L_radar_satellite_adv/L_radar_satellite_adv.json",
        si_fallback: ["radar_satellite_adv"],
        preferred_builds: [
          ["L_orbital", 7]
        ]
      }, {
        spec_id: "/pa/units/orbital/L_mining_platform/L_mining_platform.json",
        si_fallback: ["mining_platform"],
        preferred_builds: [
          ["L_orbital", 8]
        ]
      }, {
        spec_id: "/pa/units/orbital/L_orbital_factory/L_orbital_factory.json",
        si_fallback: ["orbital_factory"],
        preferred_builds: [
          ["L_orbital", 9]
        ]
      }, {
        spec_id: "/pa/units/orbital/L_orbital_fabrication_bot/L_orbital_fabrication_bot.json",
        si_fallback: ["orbital_fabrication_bot"],
        preferred_builds: [
          ["L_orbital", 10]
        ]
      }, {
        spec_id: "/pa/units/orbital/L_orbital_fighter/L_orbital_fighter.json",
        si_fallback: ["orbital_fighter"],
        preferred_builds: [
          ["L_orbital", 12]
        ]
      }, {
        spec_id: "/pa/units/orbital/wraith/wraith.json",
        si_fallback: ["radar_satellite"],
        preferred_builds: [
          ["L_orbital", 13]
        ]
      }, {
        spec_id: "/pa/units/orbital/L_orbital_lander/L_orbital_lander.json",
        si_fallback: ["orbital_lander"],
        preferred_builds: [
          ["L_orbital", 14]
        ]
      }, {
        spec_id: "/pa/units/orbital/L_radar_satellite/L_radar_satellite.json",
        si_fallback: ["radar_satellite"],
        preferred_builds: [
          ["L_orbital", 15]
        ]
      }, {
        spec_id: "/pa/units/orbital/sentinel/sentinel.json",
        si_fallback: ["orbital_probe"],
        preferred_builds: [
          ["L_orbital", 16]
        ]
      },



      {
        spec_id: "/pa/units/land/L_land_mine/L_land_mine.json",
        si_fallback: ["land_mine"],
        preferred_builds: [
          ["L_ammo", 10]
        ]
      }, {
        spec_id: "/pa/units/sea/L_sea_mine/L_sea_mine.json",
        si_fallback: ["land_mine"],
        preferred_builds: [
          ["L_ammo", 12]
        ]
      }, {
        spec_id: "/pa/units/land/L_anti_nuke_launcher/L_anti_nuke_launcher_ammo.json",
        si_fallback: ["anti_nuke_launcher_ammo"],
        preferred_builds: [
          ["L_ammo", 13]
        ]
      }, {
        spec_id: "/pa/units/land/L_nuke_launcher/L_nuke_launcher_ammo.json",
        si_fallback: ["nuke_launcher_ammo"],
        preferred_builds: [
          ["L_ammo", 14]
        ]
      },

      /*
          {
              spec_id: "/pa/units/land/L_unit/L_unit.json" ]],
              si_fallback: ["unit"],
              preferred_builds: [["L_utility", 14]], // metal storage spare
          },*/
      {
        spec_id: "/pa/units/air/L_titan_air/L_titan_air.json",
        si_fallback: ["titan_air"],
        preferred_builds: [
          ["L_factory", 2]
        ]
      }, {
        spec_id: "/pa/units/land/L_titan_bot/L_titan_bot.json",
        si_fallback: ["titan_bot"],
        preferred_builds: [
          ["L_factory", 3]
        ]
      }, {
        spec_id: "/pa/units/land/L_titan_vehicle/titan_vehicle.json",
        si_fallback: ["titan_vehicle"],
        preferred_builds: [
          ["L_factory", 4]
        ]
      }, {
        spec_id: "/pa/units/orbital/L_titan_orbital/titan_orbital.json",
        si_fallback: ["titan_orbital"],
        preferred_builds: [
          ["L_orbital_structure", 6]
        ]
      }, {
        spec_id: "/pa/units/land/L_titan_structure/titan_structure.json",
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

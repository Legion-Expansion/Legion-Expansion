var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{
    legionExpansionLoaded = true;

    function legionExpansion()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'legionExpansion shared_build.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');

        var legionBuild = {
          "/pa/units/air/l_flying_teleporter/l_flying_teleporter.json": [ "L_factory", 0 ],
          "/pa/units/land/l_unit_cannon/l_unit_cannon.json": [ "L_factory", 6 ],
          "/pa/units/sea/l_naval_factory_adv/l_naval_factory_adv.json": [ "L_factory", 7 ],
          "/pa/units/air/l_air_factory_adv/l_air_factory_adv.json": [ "L_factory", 8 ],
          "/pa/units/land/l_bot_factory_adv/l_bot_factory_adv.json": [ "L_factory", 9 ],
          "/pa/units/land/l_vehicle_factory_adv/l_vehicle_factory_adv.json": [ "L_factory", 10 ],
          "/pa/units/orbital/l_orbital_launcher/l_orbital_launcher.json": [ "L_factory", 12 ],
          "/pa/units/sea/l_naval_factory/l_naval_factory.json": [ "L_factory", 13 ],
          "/pa/units/air/l_air_factory/l_air_factory.json": [ "L_factory", 14 ],
          "/pa/units/land/l_bot_factory/l_bot_factory.json": [ "L_factory", 15 ],
          "/pa/units/land/l_vehicle_factory/l_vehicle_factory.json": [ "L_factory", 16 ],

          "/pa/units/land/l_flame_turret/l_flame_turret.json": [ "L_combat", 3 ],
          "/pa/units/land/l_artillery_long/l_artillery_long.json": [ "L_combat", 2 ],
          "/pa/units/land/l_rocket_barrage/l_rocket_barrage.json": [ "L_combat", 0 ],
          "/pa/units/land/l_nuke_launcher/l_nuke_launcher.json": [ "L_combat", 4 ],
          "/pa/units/land/l_t1_turret_adv/l_t1_turret_adv.json": [ "L_combat", 6 ],
          "/pa/units/land/l_air_defense_adv/l_air_defense_adv.json": [ "L_combat", 7 ],
          "/pa/units/land/l_swarm_hive/l_swarm_hive.json": [ "L_combat", 8 ],
          "/pa/units/sea/l_torpedo_launcher_adv/l_torpedo_launcher_adv.json": [ "L_combat", 9 ],
          "/pa/units/land/l_anti_nuke_launcher/l_anti_nuke_launcher.json": [ "L_combat", 10 ],
          "/pa/units/land/l_t1_turret_basic/l_t1_turret_basic.json": [ "L_combat", 12 ],
          "/pa/units/land/l_air_defense/l_air_defense.json": [ "L_combat", 13 ],
          "/pa/units/land/l_artillery_short/l_artillery_short.json": [ "L_combat", 14 ],
          "/pa/units/sea/l_torpedo_launcher/l_torpedo_launcher.json": [ "L_combat", 15 ],
          "/pa/units/orbital/l_ion_defense/l_ion_defense.json": [ "L_combat", 16 ],

          "/pa/units/land/l_control_module/l_control_module.json": [ "L_utility", 1 ],
          "/pa/units/land/l_energy_plant_adv/l_energy_plant_adv.json": [ "L_utility", 3 ],
          "/pa/units/land/l_mex_adv/l_mex_adv.json": [ "L_utility", 4 ],
          "/pa/units/orbital/l_deep_space_radar/l_deep_space_radar.json": [ "L_utility", 5 ],
          "/pa/units/orbital/l_delta_v_engine/l_delta_v_engine.json": [ "L_utility", 6 ],
          "/pa/units/land/l_radar_adv/l_radar_adv.json": [ "L_utility", 8 ],
          "/pa/units/land/l_energy_plant/l_energy_plant.json": [ "L_utility", 9 ],
          "/pa/units/land/l_mex/l_mex.json": [ "L_utility", 10 ],
          "/pa/units/land/l_land_barrier/l_land_barrier.json": [ "L_utility", 12 ],
          "/pa/units/land/l_teleporter/l_teleporter.json": [ "L_utility", 13 ],
          "/pa/units/land/l_radar/l_radar.json": [ "L_utility", 14 ],
          "/pa/units/land/l_storage/l_storage.json": [ "L_utility", 15 ],
          "/pa/units/land/l_shield_gen/l_shield_gen.json": [ "L_utility", 16 ],

          "/pa/units/land/l_fabrication_vehicle_adv/l_fabrication_vehicle_adv.json": [ "L_vehicle", 6 ],
          "/pa/units/land/l_tank_laser_adv/l_tank_laser_adv.json": [ "L_vehicle", 7 ],
          "/pa/units/land/l_tank_heavy_armor/l_tank_heavy_armor.json": [ "L_vehicle", 8 ],
          "/pa/units/land/l_tank_swarm/l_tank_swarm.json": [ "L_vehicle", 9 ],
          "/pa/units/land/l_hover_tank_adv/l_hover_tank_adv.json": [ "L_vehicle", 10 ],
          "/pa/units/land/l_sniper_tank/l_sniper_tank.json": [ "L_vehicle", 11 ],
          "/pa/units/land/l_fabrication_vehicle/l_fabrication_vehicle.json": [ "L_vehicle", 12 ],
          "/pa/units/land/l_tank_shank/l_tank_shank.json": [ "L_vehicle", 13 ],
          "/pa/units/land/l_shotgun_tank/l_shotgun_tank.json": [ "L_vehicle", 14 ],
          "/pa/units/land/l_mortar_tank/l_mortar_tank.json": [ "L_vehicle", 15 ],
          "/pa/units/land/l_hover_tank/l_hover_tank.json": [ "L_vehicle", 16 ],
          "/pa/units/land/l_fabrication_vehicle_combat/l_fabrication_vehicle_combat.json": [ "L_vehicle", 17 ],

          "/pa/units/land/l_bot_support_commander/l_bot_support_commander.json": [ "L_bot", 0 ],
          "/pa/units/land/l_fabrication_bot_adv/l_fabrication_bot_adv.json": [ "L_bot", 6 ],
          "/pa/units/land/l_riot_bot/l_riot_bot.json": [ "L_bot", 7 ],
          "/pa/units/land/l_bot_artillery_adv/l_bot_artillery_adv.json": [ "L_bot", 8 ],
          "/pa/units/land/l_bot_aa_adv/l_bot_aa_adv.json": [ "L_bot", 9 ],
          "/pa/units/land/l_bot_artillery/l_bot_artillery.json": [ "L_bot", 10 ],
          "/pa/units/land/l_necromancer/l_necromancer.json": [ "L_bot", 11 ],
          "/pa/units/land/l_fabrication_bot/l_fabrication_bot.json": [ "L_bot", 12 ],
          "/pa/units/land/l_assault_bot/l_assault_bot.json": [ "L_bot", 13 ],
          "/pa/units/land/l_sniper_bot/l_sniper_bot.json": [ "L_bot", 14 ],
          "/pa/units/land/l_bot_aa/l_bot_aa.json": [ "L_bot", 15 ],
          "/pa/units/land/l_bot_bomb/l_bot_bomb.json": [ "L_bot", 16 ],
          "/pa/units/land/l_scout_bot/l_scout_bot.json": [ "L_bot", 17 ],

          "/pa/units/air/l_fabrication_aircraft_adv/l_fabrication_aircraft_adv.json": [ "L_air", 6 ],
          "/pa/units/air/l_fighter_adv/l_fighter_adv.json": [ "L_air", 7 ],
          "/pa/units/air/l_gunship/l_gunship.json": [ "L_air", 8 ],
          "/pa/units/air/l_air_carrier/l_air_carrier.json": [ "L_air", 9 ],
          "/pa/units/air/l_fabrication_aircraft/l_fabrication_aircraft.json": [ "L_air", 12 ],
          "/pa/units/air/l_fighter/l_fighter.json": [ "L_air", 13 ],
          "/pa/units/air/l_bomber/l_bomber.json": [ "L_air", 14 ],
          "/pa/units/air/l_raider/l_raider.json": [ "L_air", 15 ],
          "/pa/units/air/l_transport/l_transport.json": [ "L_air", 16 ],
          "/pa/units/air/l_air_bomb/l_air_bomb.json": [ "L_air", 17 ],
          "/pa/units/air/l_air_scout_adv/l_air_scout_adv.json": [ "L_air", 10 ],
          "/pa/units/air/l_firestarter/l_firestarter.json": [ "L_air", 11 ],
          "/pa/units/air/l_air_scout_adv/vision/vision.json": [ "L_air", 0 ],

          "/pa/units/sea/l_hover_ship/l_hover_ship.json": [ "L_sea", 0 ],
          "/pa/units/sea/l_fabrication_ship_adv/l_fabrication_ship_adv.json": [ "L_sea", 6 ],
          "/pa/units/sea/l_sea_tank/l_sea_tank.json": [ "L_sea", 7 ],
          "/pa/units/sea/l_battleship/l_battleship.json": [ "L_sea", 8 ],
          "/pa/units/sea/l_missile_ship/l_missile_ship.json": [ "L_sea", 9 ],
          "/pa/units/sea/l_fabrication_sub_combat_adv/l_fabrication_sub_combat_adv.json": [ "L_sea", 10 ],
          "/pa/units/sea/l_fabrication_ship/l_fabrication_ship.json": [ "L_sea", 12 ],
          "/pa/units/sea/l_sea_scout/l_sea_scout.json": [ "L_sea", 13 ],
          "/pa/units/sea/l_destroyer/l_destroyer.json": [ "L_sea", 14 ],
          "/pa/units/sea/l_attack_sub/l_attack_sub.json": [ "L_sea", 15 ],
          "/pa/units/sea/l_frigate/l_frigate.json": [ "L_sea", 16 ],

          "/pa/units/orbital/l_orbital_battleship/l_orbital_battleship.json": [ "L_orbital", 5 ],
          "/pa/units/orbital/l_solar_array/l_solar_array.json": [ "L_orbital", 6 ],
          "/pa/units/orbital/l_orbital_railgun/l_orbital_railgun.json": [ "L_orbital", 9 ],
          "/pa/units/orbital/l_orbital_laser/l_orbital_laser.json": [ "L_orbital", 7 ],
          "/pa/units/orbital/l_radar_satellite_adv/l_radar_satellite_adv.json": [ "L_orbital", 8 ],
          "/pa/units/orbital/l_orbital_dropper/l_orbital_dropper.json": [ "L_orbital_structure", 15 ],
          "/pa/units/orbital/l_mining_platform/l_mining_platform.json": [ "L_orbital_structure", 13 ],
          "/pa/units/orbital/l_orbital_factory/l_orbital_factory.json": [ "L_orbital_structure", 14 ],
          "/pa/units/orbital/l_orbital_fabrication_bot/l_orbital_fabrication_bot.json": [ "L_orbital", 12 ],
          "/pa/units/orbital/l_orbital_fighter/l_orbital_fighter.json": [ "L_orbital", 13 ],
          "/pa/units/orbital/l_orbital_probe/l_orbital_probe.json": [ "L_orbital", 16 ],
          "/pa/units/orbital/l_orbital_lander/l_orbital_lander.json": [ "L_orbital", 15 ],
          "/pa/units/orbital/l_radar_satellite/l_radar_satellite.json": [ "L_orbital", 14 ],
          "/pa/units/orbital/l_defense_satellite/l_defense_satellite.json": [ "L_orbital_structure", 12 ],

          "/pa/units/land/l_land_mine/l_land_mine.json": [ "L_ammo", 10 ],
          "/pa/units/sea/l_sea_mine/l_sea_mine.json": [ "L_ammo", 12 ],
          "/pa/units/land/l_anti_nuke_launcher/l_anti_nuke_launcher_ammo.json": [ "L_ammo", 13 ],
          "/pa/units/land/l_nuke_launcher/l_nuke_launcher_ammo.json": [ "L_ammo", 14 ],

          "/pa/units/air/l_titan_air/l_titan_air.json": [ "L_factory", 2 ],
          "/pa/units/land/l_titan_bot/l_titan_bot.json": [ "L_factory", 3 ],
          "/pa/units/land/l_titan_vehicle/l_titan_vehicle.json": [ "L_factory", 4 ],
          "/pa/units/orbital/l_titan_orbital/l_titan_orbital.json": [ "L_orbital_structure", 6 ],
          "/pa/units/land/l_titan_structure/l_titan_structure.json": [ "L_utility", 0 ],
        };

        if (Build && Build.HotkeyModel && Build.HotkeyModel.SpecIdToGridMap) {
          _.extend(Build.HotkeyModel.SpecIdToGridMap, legionBuild);
        }
    }

    try
    {
        legionExpansion();
    }
    catch (e)
    {
        console.log(e);
        console.log(JSON.stringify(e));
    }
}

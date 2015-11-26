(function() {
    if ( ! window.HodgePodge ) return

    try
    {
        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'legionExpansion glboal.js';

        //console.log(patchName + ' on ' + buildVersion + ' last tested on 85138');

        // the build groups are ordered to match the build bar tab order
        HodgePodge.addUnits([
            {
                spec_id: "/pa/units/land/L_unit_cannon/L_unit_cannon.json",
                preferred_builds: [["L_factory", 0]],
            },
            {
                spec_id: "/pa/units/sea/L_naval_factory_adv/L_naval_factory_adv.json",
                preferred_builds: [["L_factory", 6]],
            },
            {
                spec_id: "/pa/units/air/L_air_factory_adv/L_air_factory_adv.json",
                preferred_builds: [["L_factory", 7]],
            },
            {
                spec_id: "/pa/units/land/L_bot_factory_adv/L_bot_factory_adv.json",
                preferred_builds: [["L_factory", 8]],
            },
            {
                spec_id: "/pa/units/land/L_vehicle_factory_adv/L_vehicle_factory_adv.json",
                preferred_builds: [["L_factory", 9]],
            },
            {
                spec_id: "/pa/units/orbital/L_orbital_launcher/L_orbital_launcher.json",
                preferred_builds: [["L_factory", 10]],
            },
            {
                spec_id: "/pa/units/sea/L_naval_factory/L_naval_factory.json",
                preferred_builds: [["L_factory", 12]],
            },
            {
                spec_id: "/pa/units/air/L_air_factory/L_air_factory.json",
                preferred_builds: [["L_factory", 13]],
            },
            {
                spec_id: "/pa/units/land/L_bot_factory/L_bot_factory.json",
                preferred_builds: [["L_factory", 14]],
            },
            {
                spec_id: "/pa/units/land/L_vehicle_factory/L_vehicle_factory.json",
                preferred_builds: [["L_factory", 15]],
            },


            {
                spec_id: "/pa/units/land/L_flame_turret/L_flame_turret.json",
                preferred_builds: [["L_combat", 0]],
            },
            {
                spec_id: "/pa/units/land/L_rocket_barrage/L_rocket_barrage.json",
                preferred_builds: [["L_combat", 2]], // catapult
            },
            {
                spec_id: "/pa/units/land/L_nuke_launcher/L_nuke_launcher.json",
                preferred_builds: [["L_combat", 4]],
            },
            {
                spec_id: "/pa/units/land/L_t1_turret_adv/L_t1_turret_adv.json",
                preferred_builds: [["L_combat", 1]], // double laser
            },
            {
                spec_id: "/pa/units/land/L_air_defense_adv/L_air_defense_adv.json",
                preferred_builds: [["L_combat", 6]],
            },
            {
                spec_id: "/pa/units/land/L_artillery_long/L_artillery_long.json",
                preferred_builds: [["L_combat", 7]],
            },
            {
                spec_id: "/pa/units/sea/L_torpedo_launcher_adv/L_torpedo_launcher_adv.json",
                preferred_builds: [["L_combat", 8]],
            },

            {
                spec_id: "/pa/units/land/L_anti_nuke_launcher/L_anti_nuke_launcher.json",
                preferred_builds: [["L_combat", 9]],
            },
            {
                spec_id: "/pa/units/land/L_t1_turret_basic/L_t1_turret_basic.json",
                preferred_builds: [["L_combat", 10]], // single laser
            },
            {
                spec_id: "/pa/units/land/L_air_defense/L_air_defense.json",
                preferred_builds: [["L_combat", 12]],
            },
            {
                spec_id: "/pa/units/land/L_artillery_short/L_artillery_short.json",
                preferred_builds: [["L_combat", 13]],
            },
            {
                spec_id: "/pa/units/sea/L_torpedo_launcher/L_torpedo_launcher.json",
                preferred_builds: [["L_combat", 14]],
            },
            {
                spec_id: "/pa/units/orbital/L_ion_defense/L_ion_defense.json",
                preferred_builds: [["L_combat", 15]],
            },


            {
                spec_id: "/pa/units/land/L_control_module/L_control_module.json",
                preferred_builds: [["L_utility", 1]],
            },
            {
                spec_id: "/pa/units/land/L_radar_adv/L_radar_adv.json",
                preferred_builds: [["L_utility", 2]],
            },
            {
                spec_id: "/pa/units/land/L_energy_plant_adv/L_energy_plant_adv.json",
                preferred_builds: [["L_utility", 3]],
            },
            {
                spec_id: "/pa/units/land/L_mex_adv/L_mex_adv.json",
                preferred_builds: [["L_utility", 4]],
            },

            {
                spec_id: "/pa/units/orbital/L_delta_v_engine/L_delta_v_engine.json",
                preferred_builds: [["L_utility", 6]],
            },

            {
                spec_id: "/pa/units/land/L_radar/L_radar.json",
                preferred_builds: [["L_utility", 7]],
            },
            {
                spec_id: "/pa/units/land/L_energy_plant/L_energy_plant.json",
                preferred_builds: [["L_utility", 8]],
            },
            {
                spec_id: "/pa/units/land/L_mex/L_mex.json",
                preferred_builds: [["L_utility", 9]],
            },
            {
                spec_id: "/pa/units/land/L_land_barrier/L_land_barrier.json",
                preferred_builds: [["L_utility", 10]],
            },
            {
                spec_id: "/pa/units/land/L_teleporter/L_teleporter.json",
                preferred_builds: [["L_utility", 12]],
            },
            {
                spec_id: "/pa/units/orbital/L_deep_space_radar/L_deep_space_radar.json",
                preferred_builds: [["L_utility", 13]],
            },
            {
                spec_id: "/pa/units/land/L_storage/L_storage.json",
                preferred_builds: [["L_utility", 14]], // energy storage
            },
            {
                spec_id: "/pa/units/land/L_shield_gen/L_shield_gen.json",
                preferred_builds: [["L_utility", 15]],
            },


            {
                spec_id: "/pa/units/land/L_fabrication_vehicle_adv/L_fabrication_vehicle_adv.json",
                preferred_builds: [["L_vehicle", 6]],
            },
            {
                spec_id: "/pa/units/land/L_tank_laser_adv/L_tank_laser_adv.json",
                preferred_builds: [["L_vehicle", 7]], // leveler
            },
            {
                spec_id: "/pa/units/land/L_tank_heavy_armor/L_tank_heavy_armor.json",
                preferred_builds: [["L_vehicle", 8]], // vanguard
            },
            {
                spec_id: "/pa/units/land/L_sniper_tank/L_sniper_tank.json",
                preferred_builds: [["L_vehicle", 9]], // sheller
            },
            {
                spec_id: "/pa/units/land/L_fabrication_vehicle/L_fabrication_vehicle.json",
                preferred_builds: [["L_vehicle", 12]],
            },
            {
                spec_id: "/pa/units/land/L_tank_shank/L_tank_shank.json",
                preferred_builds: [["L_vehicle", 13]], // bolo
            },
            {
                spec_id: "/pa/units/land/L_shotgun_tank/L_shotgun_tank.json",
                preferred_builds: [["L_vehicle", 14]], // flame tank
            },
            {
                spec_id: "/pa/units/land/L_land_scout/L_land_scout.json",
                preferred_builds: [["L_vehicle", 15]], // skitter
            },
            {
                spec_id: "/pa/units/land/L_mortar_tank/L_mortar_tank.json",
                preferred_builds: [["L_vehicle", 16]], // spinner
            },
            {
                spec_id: "/pa/units/land/L_hover_tank_adv/L_hover_tank_adv.json",
                preferred_builds: [["L_vehicle", 17]], //hover
            },


            {
                spec_id: "/pa/units/land/L_fabrication_bot_adv/L_fabrication_bot_adv.json",
                preferred_builds: [["L_bot", 6]],
            },
            {
                spec_id: "/pa/units/land/L_riot_bot/L_riot_bot.json",
                preferred_builds: [["L_bot", 7]], // slammer
            },
            {
                spec_id: "/pa/units/land/L_bot_artillery_adv/L_bot_artillery_adv.json",
                preferred_builds: [["L_bot", 8]], // sniper
            },
            {
                spec_id: "/pa/units/land/L_fabrication_bot_combat_adv/L_fabrication_bot_combat_adv.json",
                preferred_builds: [["L_bot", 9]],
            },
            {
                spec_id: "/pa/units/land/L_bot_tactical_missile/L_bot_tactical_missile.json",
                preferred_builds: [["L_bot", 10]], // bluehawk
            },
            {
                spec_id: "/pa/units/land/L_fabrication_bot/L_fabrication_bot.json",
                preferred_builds: [["L_bot", 12]],
            },
            {
                spec_id: "/pa/units/land/L_assault_bot/L_assault_bot.json",
                preferred_builds: [["L_bot", 15]], // dox
            },
            {
                spec_id: "/pa/units/land/L_bot_artillery/L_bot_artillery.json",
                preferred_builds: [["L_bot", 11]], // grenadier
            },
            {
                spec_id: "/pa/units/land/L_fabrication_bot_combat/L_fabrication_bot_combat.json",
                preferred_builds: [["L_bot", 13]],
            },
            {
                spec_id: "/pa/units/land/L_bot_bomb/L_bot_bomb.json",
                preferred_builds: [["L_bot", 14]], // boom
            },
            {
                spec_id: "/pa/units/land/L_bot_aa/L_bot_aa.json",
                preferred_builds: [["L_bot", 16]], // aa
            },


            {
                spec_id: "/pa/units/air/L_fabrication_aircraft_adv/L_fabrication_aircraft_adv.json",
                preferred_builds: [["L_air", 6]],
            },
            {
                spec_id: "/pa/units/air/L_fighter_adv/L_fighter_adv.json",
                preferred_builds: [["L_air", 7]],
            },
            {
                spec_id: "/pa/units/air/L_gunship/L_gunship.json",
                preferred_builds: [["L_air", 8]],
            },
            {
                spec_id: "/pa/units/air/L_air_carrier/L_air_carrier.json",
                preferred_builds: [["L_air", 9]],
            },
            {
                spec_id: "/pa/units/air/L_fabrication_aircraft/L_fabrication_aircraft.json",
                preferred_builds: [["L_air", 12]],
            },
            {
                spec_id: "/pa/units/air/L_fighter/L_fighter.json",
                preferred_builds: [["L_air", 13]],
            },
            {
                spec_id: "/pa/units/air/L_bomber/L_bomber.json",
                preferred_builds: [["L_air", 14]],
            },
            {
                spec_id: "/pa/units/air/L_air_scout_adv/L_air_scout_adv.json",
                preferred_builds: [["L_air", 10]],
            },
            {
                spec_id: "/pa/units/air/L_transport/L_transport.json",
                preferred_builds: [["L_air", 16]],
            },
            {
                spec_id: "/pa/units/air/L_flying_teleporter/L_flying_teleporter.json",
                preferred_builds: [["L_air", 17]],
            },

            {
                spec_id: "/pa/units/sea/L_fabrication_ship_adv/L_fabrication_ship_adv.json",
                preferred_builds: [["L_sea", 6]],
            },
            {
                spec_id: "/pa/units/sea/L_battleship/L_battleship.json",
                preferred_builds: [["L_sea", 7]],
            },
            {
                spec_id: "/pa/units/sea/L_missile_ship/L_missile_ship.json",
                preferred_builds: [["L_sea", 8]],
            },
            {
                spec_id: "/pa/units/sea/L_nuclear_sub/L_nuclear_sub.json",
                preferred_builds: [["L_sea", 9]],
            },
            {
                spec_id: "/pa/units/sea/L_fabrication_ship/L_fabrication_ship.json",
                preferred_builds: [["L_sea", 12]],
            },
            {
                spec_id: "/pa/units/sea/L_frigate/L_frigate.json",
                preferred_builds: [["L_sea", 13]],
            },
            {
                spec_id: "/pa/units/sea/L_destroyer/L_destroyer.json",
                preferred_builds: [["L_sea", 14]],
            },
            {
                spec_id: "/pa/units/sea/L_attack_sub/L_attack_sub.json",
                preferred_builds: [["L_sea", 15]],
            },
            {
                spec_id: "/pa/units/sea/L_sea_scout/L_sea_scout.json",
                preferred_builds: [["L_sea", 16]],
            },


            {
                spec_id: "/pa/units/orbital/L_solar_array/L_solar_array.json",
                preferred_builds: [["L_orbital", 1]],
            },
            {
                spec_id: "/pa/units/orbital/L_orbital_laser/L_orbital_laser.json",
                preferred_builds: [["L_orbital", 6]],
            },
            {
                spec_id: "/pa/units/orbital/L_radar_satellite_adv/L_radar_satellite_adv.json",
                preferred_builds: [["L_orbital", 7]],
            },
            {
                spec_id: "/pa/units/orbital/L_mining_platform/L_mining_platform.json",
                preferred_builds: [["L_orbital", 8]],
            },
            {
                spec_id: "/pa/units/orbital/L_orbital_factory/L_orbital_factory.json",
                preferred_builds: [["L_orbital", 9]],
            },
            {
                spec_id: "/pa/units/orbital/L_orbital_fabrication_bot/L_orbital_fabrication_bot.json",
                preferred_builds: [["L_orbital", 10]],
            },
            {
                spec_id: "/pa/units/orbital/L_orbital_fighter/L_orbital_fighter.json",
                preferred_builds: [["L_orbital", 12]],
            },
            {
                spec_id: "/pa/units/orbital/L_radar_satellite/L_radar_satellite.json",
                preferred_builds: [["L_orbital", 13]],
            },
            {
                spec_id: "/pa/units/orbital/L_orbital_lander/L_orbital_lander.json",
                preferred_builds: [["L_orbital", 14]],
            },
            {
                spec_id: "/pa/units/orbital/L_defense_satellite/L_defense_satellite.json",
                preferred_builds: [["L_orbital", 15]],
            },



            {
                spec_id: "/pa/units/land/L_land_mine/L_land_mine.json",
                preferred_builds: [["L_ammo", 10]],
            },
            {
                spec_id: "/pa/units/land/L_anti_nuke_launcher/L_anti_nuke_launcher_ammo.json",
                preferred_builds: [["L_ammo", 13]],
            },
            {
                spec_id: "/pa/units/land/L_nuke_launcher/L_nuke_launcher_ammo.json",
                preferred_builds: [["L_ammo", 14]],
            },

            /*
            {
                spec_id: "/pa/units/land/L_unit/L_unit.json" ]],
                preferred_builds: [["L_utility", 14]], // metal storage spare
            },
            {
                spec_id: "/pa/units/air/titan_air/titan_air.json",
                preferred_builds: [["L_factory", 2]],
            },
            {
                spec_id: "/pa/units/land/titan_bot/titan_bot.json",
                preferred_builds: [["L_factory", 3]],
            },
            {
                spec_id: "/pa/units/land/titan_vehicle/titan_vehicle.json",
                preferred_builds: [["L_factory", 4]],
            },
            {
                spec_id: "/pa/units/orbital/titan_orbital/titan_orbital.json",
                preferred_builds: [["L_orbital_structure", 6]],
            },
            {
                spec_id: "/pa/units/land/titan_structure/titan_structure.json",
                preferred_builds: [["L_utility", 0]],
            },
            {
                spec_id: "/pa/units/land/bot_tesla/bot_tesla.json",
                preferred_builds: [["L_bot", 17]],
            },
            {
                spec_id: "/pa/units/land/bot_nanoswarm/bot_nanoswarm.json",
                preferred_builds: [["L_bot", 11]],
            },
            {
                spec_id: "/pa/units/land/bot_support_commander/bot_support_commander.json",
                preferred_builds: [["L_bot", 0]],
            },
            {
                spec_id: "/pa/units/land/tank_hover/tank_hover.json",
                preferred_builds: [["L_vehicle", 17]],
            },
            {
                spec_id: "/pa/units/land/tank_flak/tank_flak.json",
                preferred_builds: [["L_vehicle", 10]],
            },
            {
                spec_id: "/pa/units/land/tank_nuke/tank_nuke.json",
                preferred_builds: [["L_vehicle", 0]],
            },
            {
                spec_id: "/pa/units/air/solar_drone/solar_drone.json",
                preferred_builds: [["L_air", 17]],
            },
            {
                spec_id: "/pa/units/air/bomber_heavy/bomber_heavy.json",
                preferred_builds: [["L_air", 10]],
            },
            {
                spec_id: "/pa/units/air/support_platform/support_platform.json",
                preferred_builds: [["L_air", 0]],
            },
            {
                spec_id: "/pa/units/sea/fabrication_barge/fabrication_barge.json",
                preferred_builds: [["L_sea", 17]],
            },
            {
                spec_id: "/pa/units/sea/drone_carrier/carrier/carrier.json",
                preferred_builds: [["L_sea", 0]],
            },
            {
                spec_id: "/pa/units/sea/hover_ship/hover_ship.json",
                preferred_builds: [["L_sea", 10]],
            },
            {
                spec_id: "/pa/units/orbital/orbital_probe/orbital_probe.json",
                preferred_builds: [["L_orbital", 16]],
            },
            {
                spec_id: "/pa/units/orbital/orbital_battleship/orbital_battleship.json",
                preferred_builds: [["L_orbital", 0]],
            },
            {
                spec_id: "/pa/units/orbital/orbital_railgun/orbital_railgun.json",
                preferred_builds: [["L_orbital", 9]],
            },
            {
                spec_id: "/pa/units/land/artillery_unit_launcher/artillery_unit_launcher.json",
                preferred_builds: [["L_combat", 8]],
            },
            */
        ])
    }
    catch (e)
    {
        console.log(e);
        console.log(JSON.stringify(e));
    }
})();

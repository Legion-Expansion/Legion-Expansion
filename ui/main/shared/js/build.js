var legionExpansionLoaded;

if (!legionExpansionLoaded) {
    var Build = (function () {
        var FALLBACK_ICON = 'coui://ui/main/game/live_game/img/build_bar/img_missing_unit.png';
        var pathWithoutExtensionMatch = /(.*)\.json[^\/]*$/;

        var iconForSpecId = function (id) {
            var match = null;
            if (id) match = pathWithoutExtensionMatch.exec(id);

            if (_.size(match) < 2) return FALLBACK_ICON;

            if (decode(localStorage.getItem('legionExpansionSelected'))) {
                return 'coui:/' + match[1] + '.png';
            } else {
                return 'coui:/' + match[1] + '_icon_buildbar.png';
            }
        };

        var iconForUnit = function (unit) {
            if (!unit) return FALLBACK_ICON;
            return iconForSpecId(unit.id);
        };

        var HotkeyModel = function () {
            var self = this;

            if (!api.content.usingTitans()) {

                self.SpecIdToGridMap = ko.observable({
                    "/pa/units/land/control_module/control_module.json": ["utility", 1],
                        "/pa/units/land/radar_adv/radar_adv.json": ["utility", 8],
                        "/pa/units/land/energy_plant_adv/energy_plant_adv.json": ["utility", 3],
                        "/pa/units/land/metal_extractor_adv/metal_extractor_adv.json": ["utility", 4],
                        "/pa/units/orbital/delta_v_engine/delta_v_engine.json": ["utility", 7],
                        "/pa/units/land/radar/radar.json": ["utility", 14],
                        "/pa/units/land/energy_plant/energy_plant.json": ["utility", 9],
                        "/pa/units/land/metal_extractor/metal_extractor.json": ["utility", 10],
                        "/pa/units/land/land_barrier/land_barrier.json": ["utility", 12],
                        "/pa/units/land/teleporter/teleporter.json": ["utility", 13],
                        "/pa/units/orbital/deep_space_radar/deep_space_radar.json": ["utility", 2],
                        "/pa/units/land/energy_storage/energy_storage.json": ["utility", 15],
                        "/pa/units/land/metal_storage/metal_storage.json": ["utility", 16],


                        "/pa/units/land/unit_cannon/unit_cannon.json": ["factory", 6],
                        "/pa/units/sea/naval_factory_adv/naval_factory_adv.json": ["factory", 7],
                        "/pa/units/air/air_factory_adv/air_factory_adv.json": ["factory", 8],
                        "/pa/units/land/bot_factory_adv/bot_factory_adv.json": ["factory", 9],
                        "/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json": ["factory", 10],
                        "/pa/units/orbital/orbital_launcher/orbital_launcher.json": ["factory", 12],
                        "/pa/units/sea/naval_factory/naval_factory.json": ["factory", 13],
                        "/pa/units/air/air_factory/air_factory.json": ["factory", 14],
                        "/pa/units/land/bot_factory/bot_factory.json": ["factory", 15],
                        "/pa/units/land/vehicle_factory/vehicle_factory.json": ["factory", 16],


                        "/pa/units/land/laser_defense_adv/laser_defense_adv.json": ["combat", 0],
                        "/pa/units/land/artillery_long/artillery_long.json": ["combat", 2],
                        "/pa/units/land/tactical_missile_launcher/tactical_missile_launcher.json": ["combat", 3],
                        "/pa/units/land/nuke_launcher/nuke_launcher.json": ["combat", 4],
                        "/pa/units/land/laser_defense/laser_defense.json": ["combat", 6],
                        "/pa/units/land/air_defense_adv/air_defense_adv.json": ["combat", 7],
                        "/pa/units/sea/torpedo_launcher_adv/torpedo_launcher_adv.json": ["combat", 9],
                        "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher.json": ["combat", 10],
                        "/pa/units/land/laser_defense_single/laser_defense_single.json": ["combat", 12],
                        "/pa/units/land/air_defense/air_defense.json": ["combat", 13],
                        "/pa/units/land/artillery_short/artillery_short.json": ["combat", 14],
                        "/pa/units/sea/torpedo_launcher/torpedo_launcher.json": ["combat", 15],
                        "/pa/units/orbital/ion_defense/ion_defense.json": ["combat", 16],



                        "/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json": ["vehicle", 6],
                        "/pa/units/land/tank_laser_adv/tank_laser_adv.json": ["vehicle", 7],
                        "/pa/units/land/tank_heavy_armor/tank_heavy_armor.json": ["vehicle", 8],
                        "/pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json": ["vehicle", 9],

                        "/pa/units/land/fabrication_vehicle/fabrication_vehicle.json": ["vehicle", 12],
                        "/pa/units/land/tank_light_laser/tank_light_laser.json": ["vehicle", 13],
                        "/pa/units/land/tank_armor/tank_armor.json": ["vehicle", 14],
                        "/pa/units/land/land_scout/land_scout.json": ["vehicle", 15],
                        "/pa/units/land/aa_missile_vehicle/aa_missile_vehicle.json": ["vehicle", 16],



                        "/pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json": ["bot", 6],
                        "/pa/units/land/assault_bot_adv/assault_bot_adv.json": ["bot", 7],
                        "/pa/units/land/bot_sniper/bot_sniper.json": ["bot", 8],
                        "/pa/units/land/fabrication_bot_combat_adv/fabrication_bot_combat_adv.json": ["bot", 9],
                        "/pa/units/land/bot_tactical_missile/bot_tactical_missile.json": ["bot", 10],

                        "/pa/units/land/fabrication_bot/fabrication_bot.json": ["bot", 12],
                        "/pa/units/land/assault_bot/assault_bot.json": ["bot", 13],
                        "/pa/units/land/bot_grenadier/bot_grenadier.json": ["bot", 14],
                        "/pa/units/land/fabrication_bot_combat/fabrication_bot_combat.json": ["bot", 15],
                        "/pa/units/land/bot_bomb/bot_bomb.json": ["bot", 16],



                        "/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json": ["air", 6],
                        "/pa/units/air/fighter_adv/fighter_adv.json": ["air", 7],
                        "/pa/units/air/gunship/gunship.json": ["air", 8],
                        "/pa/units/air/bomber_adv/bomber_adv.json": ["air", 9],

                        "/pa/units/air/fabrication_aircraft/fabrication_aircraft.json": ["air", 12],
                        "/pa/units/air/fighter/fighter.json": ["air", 13],
                        "/pa/units/air/bomber/bomber.json": ["air", 14],
                        "/pa/units/air/air_scout/air_scout.json": ["air", 15],
                        "/pa/units/air/transport/transport.json": ["air", 16],




                        "/pa/units/sea/fabrication_ship_adv/fabrication_ship_adv.json": ["sea", 6],
                        "/pa/units/sea/battleship/battleship.json": ["sea", 7],
                        "/pa/units/sea/missile_ship/missile_ship.json": ["sea", 8],
                        "/pa/units/sea/nuclear_sub/nuclear_sub.json": ["sea", 9],

                        "/pa/units/sea/fabrication_ship/fabrication_ship.json": ["sea", 12],
                        "/pa/units/sea/frigate/frigate.json": ["sea", 13],
                        "/pa/units/sea/destroyer/destroyer.json": ["sea", 14],
                        "/pa/units/sea/attack_sub/attack_sub.json": ["sea", 15],
                        "/pa/units/sea/sea_scout/sea_scout.json": ["sea", 16],

                        "/pa/units/orbital/defense_satellite/defense_satellite.json": ["orbital_structure", 12],
                        "/pa/units/orbital/mining_platform/mining_platform.json": ["orbital_structure", 13],
                        "/pa/units/orbital/orbital_factory/orbital_factory.json": ["orbital_structure", 14],



                        "/pa/units/orbital/solar_array/solar_array.json": ["orbital", 6],
                        "/pa/units/orbital/orbital_laser/orbital_laser.json": ["orbital", 7],
                        "/pa/units/orbital/radar_satellite_adv/radar_satellite_adv.json": ["orbital", 8],


                        "/pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json": ["orbital", 12],
                        "/pa/units/orbital/orbital_fighter/orbital_fighter.json": ["orbital", 13],
                        "/pa/units/orbital/radar_satellite/radar_satellite.json": ["orbital", 14],
                        "/pa/units/orbital/orbital_lander/orbital_lander.json": ["orbital", 15],

                        "/pa/units/land/land_mine/land_mine.json": ["ammo", 14],
                        "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher_ammo.json": ["ammo", 15],
                        "/pa/units/land/nuke_launcher/nuke_launcher_ammo.json": ["ammo", 16]
                });
            } else {
                self.SpecIdToGridMap = ko.observable({
                    "/pa/units/land/titan_structure/titan_structure.json": ["utility", 0],
                        "/pa/units/land/control_module/control_module.json": ["utility", 1],
                        "/pa/units/land/radar_adv/radar_adv.json": ["utility", 8],
                        "/pa/units/land/energy_plant_adv/energy_plant_adv.json": ["utility", 3],
                        "/pa/units/land/metal_extractor_adv/metal_extractor_adv.json": ["utility", 4],
                        "/pa/units/orbital/delta_v_engine/delta_v_engine.json": ["utility", 7],
                        "/pa/units/land/radar/radar.json": ["utility", 14],
                        "/pa/units/land/energy_plant/energy_plant.json": ["utility", 9],
                        "/pa/units/land/metal_extractor/metal_extractor.json": ["utility", 10],
                        "/pa/units/land/land_barrier/land_barrier.json": ["utility", 12],
                        "/pa/units/land/teleporter/teleporter.json": ["utility", 13],
                        "/pa/units/orbital/deep_space_radar/deep_space_radar.json": ["utility", 2],
                        "/pa/units/land/energy_storage/energy_storage.json": ["utility", 15],
                        "/pa/units/land/metal_storage/metal_storage.json": ["utility", 16],


                        "/pa/units/air/titan_air/titan_air.json": ["factory", 2],
                        "/pa/units/land/titan_bot/titan_bot.json": ["factory", 3],
                        "/pa/units/land/titan_vehicle/titan_vehicle.json": ["factory", 4],
                        "/pa/units/land/unit_cannon/unit_cannon.json": ["factory", 6],
                        "/pa/units/sea/naval_factory_adv/naval_factory_adv.json": ["factory", 7],
                        "/pa/units/air/air_factory_adv/air_factory_adv.json": ["factory", 8],
                        "/pa/units/land/bot_factory_adv/bot_factory_adv.json": ["factory", 9],
                        "/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json": ["factory", 10],
                        "/pa/units/orbital/orbital_launcher/orbital_launcher.json": ["factory", 12],
                        "/pa/units/sea/naval_factory/naval_factory.json": ["factory", 13],
                        "/pa/units/air/air_factory/air_factory.json": ["factory", 14],
                        "/pa/units/land/bot_factory/bot_factory.json": ["factory", 15],
                        "/pa/units/land/vehicle_factory/vehicle_factory.json": ["factory", 16],


                        "/pa/units/land/laser_defense_adv/laser_defense_adv.json": ["combat", 0],
                        "/pa/units/land/artillery_long/artillery_long.json": ["combat", 2],
                        "/pa/units/land/tactical_missile_launcher/tactical_missile_launcher.json": ["combat", 3],
                        "/pa/units/land/nuke_launcher/nuke_launcher.json": ["combat", 4],
                        "/pa/units/land/laser_defense/laser_defense.json": ["combat", 6],
                        "/pa/units/land/air_defense_adv/air_defense_adv.json": ["combat", 7],
                        "/pa/units/land/artillery_unit_launcher/artillery_unit_launcher.json": ["combat", 8],
                        "/pa/units/sea/torpedo_launcher_adv/torpedo_launcher_adv.json": ["combat", 9],
                        "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher.json": ["combat", 10],
                        "/pa/units/land/laser_defense_single/laser_defense_single.json": ["combat", 12],
                        "/pa/units/land/air_defense/air_defense.json": ["combat", 13],
                        "/pa/units/land/artillery_short/artillery_short.json": ["combat", 14],
                        "/pa/units/sea/torpedo_launcher/torpedo_launcher.json": ["combat", 15],
                        "/pa/units/orbital/ion_defense/ion_defense.json": ["combat", 16],


                        "/pa/units/land/tank_nuke/tank_nuke.json": ["vehicle", 0],

                        "/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json": ["vehicle", 6],
                        "/pa/units/land/tank_laser_adv/tank_laser_adv.json": ["vehicle", 7],
                        "/pa/units/land/tank_heavy_armor/tank_heavy_armor.json": ["vehicle", 8],
                        "/pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json": ["vehicle", 9],
                        "/pa/units/land/tank_flak/tank_flak.json": ["vehicle", 10],

                        "/pa/units/land/fabrication_vehicle/fabrication_vehicle.json": ["vehicle", 12],
                        "/pa/units/land/tank_light_laser/tank_light_laser.json": ["vehicle", 13],
                        "/pa/units/land/tank_armor/tank_armor.json": ["vehicle", 14],
                        "/pa/units/land/land_scout/land_scout.json": ["vehicle", 15],
                        "/pa/units/land/aa_missile_vehicle/aa_missile_vehicle.json": ["vehicle", 16],
                        "/pa/units/land/tank_hover/tank_hover.json": ["vehicle", 17],


                        "/pa/units/land/bot_support_commander/bot_support_commander.json": ["bot", 0],

                        "/pa/units/land/bot_nanoswarm/bot_nanoswarm.json": ["bot", 11],
                        "/pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json": ["bot", 6],
                        "/pa/units/land/assault_bot_adv/assault_bot_adv.json": ["bot", 7],
                        "/pa/units/land/bot_sniper/bot_sniper.json": ["bot", 8],
                        "/pa/units/land/fabrication_bot_combat_adv/fabrication_bot_combat_adv.json": ["bot", 9],
                        "/pa/units/land/bot_tactical_missile/bot_tactical_missile.json": ["bot", 10],

                        "/pa/units/land/fabrication_bot/fabrication_bot.json": ["bot", 12],
                        "/pa/units/land/assault_bot/assault_bot.json": ["bot", 13],
                        "/pa/units/land/bot_grenadier/bot_grenadier.json": ["bot", 14],
                        "/pa/units/land/fabrication_bot_combat/fabrication_bot_combat.json": ["bot", 15],
                        "/pa/units/land/bot_bomb/bot_bomb.json": ["bot", 16],
                        "/pa/units/land/bot_tesla/bot_tesla.json": ["bot", 17],


                        "/pa/units/air/support_platform/support_platform.json": ["air", 0],

                        "/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json": ["air", 6],
                        "/pa/units/air/fighter_adv/fighter_adv.json": ["air", 7],
                        "/pa/units/air/gunship/gunship.json": ["air", 8],
                        "/pa/units/air/bomber_adv/bomber_adv.json": ["air", 9],
                        "/pa/units/air/bomber_heavy/bomber_heavy.json": ["air", 10],

                        "/pa/units/air/fabrication_aircraft/fabrication_aircraft.json": ["air", 12],
                        "/pa/units/air/fighter/fighter.json": ["air", 13],
                        "/pa/units/air/bomber/bomber.json": ["air", 14],
                        "/pa/units/air/air_scout/air_scout.json": ["air", 15],
                        "/pa/units/air/transport/transport.json": ["air", 16],
                        "/pa/units/air/solar_drone/solar_drone.json": ["air", 17],



                        "/pa/units/sea/drone_carrier/carrier/carrier.json": ["sea", 0],

                        "/pa/units/sea/fabrication_ship_adv/fabrication_ship_adv.json": ["sea", 6],
                        "/pa/units/sea/battleship/battleship.json": ["sea", 7],
                        "/pa/units/sea/missile_ship/missile_ship.json": ["sea", 8],
                        "/pa/units/sea/nuclear_sub/nuclear_sub.json": ["sea", 9],
                        "/pa/units/sea/hover_ship/hover_ship.json": ["sea", 10],

                        "/pa/units/sea/fabrication_ship/fabrication_ship.json": ["sea", 12],
                        "/pa/units/sea/frigate/frigate.json": ["sea", 13],
                        "/pa/units/sea/destroyer/destroyer.json": ["sea", 14],
                        "/pa/units/sea/attack_sub/attack_sub.json": ["sea", 15],
                        "/pa/units/sea/sea_scout/sea_scout.json": ["sea", 16],
                        "/pa/units/sea/fabrication_barge/fabrication_barge.json": ["sea", 17],


                        "/pa/units/orbital/titan_orbital/titan_orbital.json": ["orbital_structure", 6],
                        "/pa/units/orbital/defense_satellite/defense_satellite.json": ["orbital_structure", 12],
                        "/pa/units/orbital/mining_platform/mining_platform.json": ["orbital_structure", 13],
                        "/pa/units/orbital/orbital_factory/orbital_factory.json": ["orbital_structure", 14],


                        "/pa/units/orbital/orbital_battleship/orbital_battleship.json": ["orbital", 0],

                        "/pa/units/orbital/solar_array/solar_array.json": ["orbital", 6],
                        "/pa/units/orbital/orbital_laser/orbital_laser.json": ["orbital", 7],
                        "/pa/units/orbital/radar_satellite_adv/radar_satellite_adv.json": ["orbital", 8],
                        "/pa/units/orbital/orbital_railgun/orbital_railgun.json": ["orbital", 9],


                        "/pa/units/orbital/orbital_fabrication_bot/orbital_fabrication_bot.json": ["orbital", 12],
                        "/pa/units/orbital/orbital_fighter/orbital_fighter.json": ["orbital", 13],
                        "/pa/units/orbital/radar_satellite/radar_satellite.json": ["orbital", 14],
                        "/pa/units/orbital/orbital_lander/orbital_lander.json": ["orbital", 15],
                        "/pa/units/orbital/orbital_probe/orbital_probe.json": ["orbital", 16],

                        "/pa/units/land/land_mine/land_mine.json": ["ammo", 14],
                        "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher_ammo.json": ["ammo", 15],
                        "/pa/units/land/nuke_launcher/nuke_launcher_ammo.json": ["ammo", 16]
                });
            }

            // keep above the same for easy diff with PA source

            if (decode(localStorage.getItem('legionExpansionSelected'))) {
                if (api.content.usingTitans()) {

                    self.SpecIdToGridMap({


                        "/pa/units/land/L_control_module/L_control_module.json": ["utility", 1],
                            "/pa/units/land/L_radar_adv/L_radar_adv.json": ["utility", 2],
                            "/pa/units/land/L_energy_plant_adv/L_energy_plant_adv.json": ["utility", 3],
                            "/pa/units/land/L_mex_adv/L_mex_adv.json": ["utility", 4],

                            "/pa/units/orbital/L_delta_v_engine/L_delta_v_engine.json": ["utility", 6],

                            "/pa/units/land/L_radar/L_radar.json": ["utility", 7],
                            "/pa/units/land/L_energy_plant/L_energy_plant.json": ["utility", 8],
                            "/pa/units/land/L_mex/L_mex.json": ["utility", 9],
                            "/pa/units/land/L_land_barrier/L_land_barrier.json": ["utility", 10],
                            "/pa/units/land/L_teleporter/L_teleporter.json": ["utility", 12],
                            "/pa/units/orbital/L_deep_space_radar/L_deep_space_radar.json": ["utility", 13],
                            "/pa/units/land/L_storage/L_storage.json": ["utility", 14], // energy storage
                        //            "/pa/units/land/L_unit/L_unit.json" ]: ["utility", 14], // metal storage spare


                        "/pa/units/land/L_unit_cannon/L_unit_cannon.json": ["factory", 0],
                            "/pa/units/sea/L_naval_factory_adv/L_naval_factory_adv.json": ["factory", 6],
                            "/pa/units/air/L_air_factory_adv/L_air_factory_adv.json": ["factory", 7],
                            "/pa/units/land/L_bot_factory_adv/L_bot_factory_adv.json": ["factory", 8],
                            "/pa/units/land/L_vehicle_factory_adv/L_vehicle_factory_adv.json": ["factory", 9],
                            "/pa/units/orbital/L_orbital_launcher/L_orbital_launcher.json": ["factory", 10],
                            "/pa/units/sea/L_naval_factory/L_naval_factory.json": ["factory", 12],
                            "/pa/units/air/L_air_factory/L_air_factory.json": ["factory", 13],
                            "/pa/units/land/L_bot_factory/L_bot_factory.json": ["factory", 14],
                            "/pa/units/land/L_vehicle_factory/L_vehicle_factory.json": ["factory", 15],

                            "/pa/units/land/L_laser_defense_adv/L_laser_defense_adv.json": ["combat", 0],
                            "/pa/units/land/L_rocket_barrage/L_rocket_barrage.json": ["combat", 2], // catapult
                        "/pa/units/land/L_nuke_launcher/L_nuke_launcher.json": ["combat", 4],
                            "/pa/units/land/L_t1_turret_adv/L_t1_turret_adv.json": ["combat", 1], // double laser
                        "/pa/units/land/L_air_defense_adv/L_air_defense_adv.json": ["combat", 6],
                            "/pa/units/land/L_artillery_long/L_artillery_long.json": ["combat", 7],
                            "/pa/units/sea/L_torpedo_launcher_adv/L_torpedo_launcher_adv.json": ["combat", 8],

                            "/pa/units/land/L_anti_nuke_launcher/L_anti_nuke_launcher.json": ["combat", 9],
                            "/pa/units/land/L_t1_turret_basic/L_t1_turret_basic.json": ["combat", 10], // single laser
                        "/pa/units/land/L_air_defense/L_air_defense.json": ["combat", 12],
                            "/pa/units/land/L_artillery_short/L_artillery_short.json": ["combat", 13],
                            "/pa/units/sea/L_torpedo_launcher/L_torpedo_launcher.json": ["combat", 14],
                            "/pa/units/orbital/L_ion_defense/L_ion_defense.json": ["combat", 15],


                            "/pa/units/land/L_fabrication_bot_adv/L_fabrication_bot_adv.json": ["bot", 6],
                            "/pa/units/land/L_riot_bot/L_riot_bot.json": ["bot", 7], // slammer
                        "/pa/units/land/L_bot_artillery_adv/L_bot_artillery_adv.json": ["bot", 8], // sniper
                        "/pa/units/land/L_fabrication_bot_combat_adv/L_fabrication_bot_combat_adv.json": ["bot", 9],
                            "/pa/units/land/L_bot_tactical_missile/L_bot_tactical_missile.json": ["bot", 10], // bluehawk
                        "/pa/units/land/L_fabrication_bot/L_fabrication_bot.json": ["bot", 12],
                            "/pa/units/land/L_assault_bot/L_assault_bot.json": ["bot", 15], // dox
                        "/pa/units/land/L_bot_artillery/L_bot_artillery.json": ["bot", 11], // grenadier
                        "/pa/units/land/L_fabrication_bot_combat/L_fabrication_bot_combat.json": ["bot", 13],
                            "/pa/units/land/L_bot_bomb/L_bot_bomb.json": ["bot", 14], // boom
                            "/pa/units/land/L_bot_aa/L_bot_aa.json": ["bot", 16], // aa

                        "/pa/units/land/L_fabrication_vehicle_adv/L_fabrication_vehicle_adv.json": ["vehicle", 6],
                            "/pa/units/land/L_tank_laser_adv/L_tank_laser_adv.json": ["vehicle", 7], // leveler
                        "/pa/units/land/L_tank_heavy_armor/L_tank_heavy_armor.json": ["vehicle", 8], // vanguard
                        "/pa/units/land/L_sniper_tank/L_sniper_tank.json": ["vehicle", 9], // sheller
                        "/pa/units/land/L_fabrication_vehicle/L_fabrication_vehicle.json": ["vehicle", 12],
                            "/pa/units/land/L_tank_shank/L_tank_shank.json": ["vehicle", 13], // bolo
                        "/pa/units/land/L_shotgun_tank/L_shotgun_tank.json": ["vehicle", 14], // flame tank
                        "/pa/units/land/L_land_scout/L_land_scout.json": ["vehicle", 15], // skitter
                        "/pa/units/land/L_mortar_tank/L_mortar_tank.json": ["vehicle", 16], // spinner

                        "/pa/units/orbital/L_solar_array/L_solar_array.json": ["orbital", 1],
                            "/pa/units/orbital/L_orbital_laser/L_orbital_laser.json": ["orbital", 6],
                            "/pa/units/orbital/L_radar_satellite_adv/L_radar_satellite_adv.json": ["orbital", 7],
                            "/pa/units/orbital/L_mining_platform/L_mining_platform.json": ["orbital", 8],
                            "/pa/units/orbital/L_orbital_factory/L_orbital_factory.json": ["orbital", 9],
                            "/pa/units/orbital/L_orbital_fabrication_bot/L_orbital_fabrication_bot.json": ["orbital", 10],
                            "/pa/units/orbital/L_orbital_fighter/L_orbital_fighter.json": ["orbital", 12],
                            "/pa/units/orbital/L_radar_satellite/L_radar_satellite.json": ["orbital", 13],
                            "/pa/units/orbital/L_orbital_lander/L_orbital_lander.json": ["orbital", 14],
                            "/pa/units/orbital/L_defense_satellite/L_defense_satellite.json": ["orbital", 15],

                            "/pa/units/air/L_fabrication_aircraft_adv/L_fabrication_aircraft_adv.json": ["air", 6],
                            "/pa/units/air/L_fighter_adv/L_fighter_adv.json": ["air", 7],
                            "/pa/units/air/L_gunship/L_gunship.json": ["air", 8],
                            "/pa/units/air/L_bomber_adv/L_bomber_adv.json": ["air", 9],
                            "/pa/units/air/L_fabrication_aircraft/L_fabrication_aircraft.json": ["air", 12],
                            "/pa/units/air/L_fighter/L_fighter.json": ["air", 13],
                            "/pa/units/air/L_bomber/L_bomber.json": ["air", 14],
                            "/pa/units/air/L_air_scout/L_air_scout.json": ["air", 15],
                            "/pa/units/air/L_transport/L_transport.json": ["air", 16],

                            "/pa/units/sea/L_fabrication_ship_adv/L_fabrication_ship_adv.json": ["sea", 6],
                            "/pa/units/sea/L_battleship/L_battleship.json": ["sea", 7],
                            "/pa/units/sea/L_missile_ship/L_missile_ship.json": ["sea", 8],
                            "/pa/units/sea/L_nuclear_sub/L_nuclear_sub.json": ["sea", 9],
                            "/pa/units/sea/L_fabrication_ship/L_fabrication_ship.json": ["sea", 12],
                            "/pa/units/sea/L_frigate/L_frigate.json": ["sea", 13],
                            "/pa/units/sea/L_destroyer/L_destroyer.json": ["sea", 14],
                            "/pa/units/sea/L_attack_sub/L_attack_sub.json": ["sea", 15],
                            "/pa/units/sea/L_sea_scout/L_sea_scout.json": ["sea", 16],


                            "/pa/units/land/L_land_mine/L_land_mine.json": ["ammo", 10],
                            "/pa/units/land/L_anti_nuke_launcher/L_anti_nuke_launcher_ammo.json": ["ammo", 13],
                            "/pa/units/land/L_nuke_launcher/L_nuke_launcher_ammo.json": ["ammo", 14]
                        /*"/pa/units/air/titan_air/titan_air.json": ["factory", 2],
                        "/pa/units/land/titan_bot/titan_bot.json": ["factory", 3],
                        "/pa/units/land/titan_vehicle/titan_vehicle.json": ["factory", 4],
                        "/pa/units/orbital/titan_orbital/titan_orbital.json": ["orbital_structure", 6],
                        "/pa/units/land/titan_structure/titan_structure.json": ["utility", 0],
                        "/pa/units/land/bot_tesla/bot_tesla.json": ["bot", 17],
                        "/pa/units/land/bot_nanoswarm/bot_nanoswarm.json": ["bot", 11],
                        "/pa/units/land/bot_support_commander/bot_support_commander.json": ["bot", 0],
                        "/pa/units/land/tank_hover/tank_hover.json": ["vehicle", 17],
                        "/pa/units/land/tank_flak/tank_flak.json": ["vehicle", 10],
                        "/pa/units/land/tank_nuke/tank_nuke.json": ["vehicle", 0],
                        "/pa/units/air/solar_drone/solar_drone.json": ["air", 17],
                        "/pa/units/air/bomber_heavy/bomber_heavy.json": ["air", 10],
                        "/pa/units/air/support_platform/support_platform.json": ["air", 0],
                        "/pa/units/sea/fabrication_barge/fabrication_barge.json": ["sea", 17],
                        "/pa/units/sea/drone_carrier/carrier/carrier.json": ["sea", 0],
                        "/pa/units/sea/hover_ship/hover_ship.json": ["sea", 10],
                        "/pa/units/orbital/orbital_probe/orbital_probe.json": ["orbital", 16],
                        "/pa/units/orbital/orbital_battleship/orbital_battleship.json": ["orbital", 0],
                        "/pa/units/orbital/orbital_railgun/orbital_railgun.json": ["orbital", 9],
                        "/pa/units/land/artillery_unit_launcher/artillery_unit_launcher.json": ["combat", 8]*/
                    });
                } else {

                }
            }
        };
        return {
            iconForSpecId: iconForSpecId,
            iconForUnit: iconForUnit,
            HotkeyModel: HotkeyModel
        };
    })();
}
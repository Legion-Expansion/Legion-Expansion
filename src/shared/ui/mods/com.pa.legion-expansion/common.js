var legion = {};

legion.commanders = [
  "/pa/units/commanders/l_rockteeth/l_rockteeth.json",
  "/pa/units/commanders/l_overwatch/l_overwatch.json",
  "/pa/units/commanders/l_cyclops/l_cyclops.json",
  "/pa/units/commanders/l_wasushi/l_wasushi.json",
];
legion.basicFactories = [
  "/pa/units/air/l_air_factory/l_air_factory.json",
  "/pa/units/land/l_bot_factory/l_bot_factory.json",
  "/pa/units/land/l_vehicle_factory/l_vehicle_factory.json",
  "/pa/units/sea/l_naval_factory/l_naval_factory.json",
  "/pa/units/orbital/l_orbital_launcher/l_orbital_launcher.json",
];
legion.advFactories = [
  "/pa/units/air/l_air_factory_adv/l_air_factory_adv.json",
  "/pa/units/land/l_bot_factory_adv/l_bot_factory_adv.json",
  "/pa/units/land/l_vehicle_factory_adv/l_vehicle_factory_adv.json",
  "/pa/units/sea/l_naval_factory_adv/l_naval_factory_adv.json",
  "/pa/units/orbital/l_orbital_factory/l_orbital_factory.json",
];
legion.airFabbers = [
  "/pa/units/air/l_fabrication_aircraft/l_fabrication_aircraft.json",
  "/pa/units/air/l_fabrication_aircraft_adv/l_fabrication_aircraft_adv.json",
];
legion.landFabbers = [
  "/pa/units/land/l_fabrication_vehicle/l_fabrication_vehicle.json",
  "/pa/units/land/l_fabrication_vehicle_adv/l_fabrication_vehicle_adv.json",
  "/pa/units/land/l_fabrication_vehicle_combat/l_fabrication_vehicle_combat.json",
  "/pa/units/land/l_bot_support_commander/l_bot_support_commander.json",
  "/pa/units/land/l_fabrication_bot/l_fabrication_bot.json",
  "/pa/units/land/l_fabrication_bot_adv/l_fabrication_bot_adv.json",
];
legion.orbitalFabbers = [
  "/pa/units/orbital/l_orbital_fabrication_bot/l_orbital_fabrication_bot.json",
];
legion.navalFabbers = [
  "/pa/units/sea/l_fabrication_ship/l_fabrication_ship.json",
  "/pa/units/sea/l_fabrication_ship_adv/l_fabrication_ship_adv.json",
  "/pa/units/sea/l_fabrication_sub_combat_adv/l_fabrication_sub_combat_adv.json",
];
legion.launchers = [
  "/pa/units/land/l_anti_nuke_launcher/l_anti_nuke_launcher.json",
  "/pa/units/land/l_nuke_launcher/l_nuke_launcher.json",
  "/pa/units/orbital/l_orbital_dropper/l_orbital_dropper.json",
];
legion.builders = _.union(
  legion.commanders,
  legion.basicFactories,
  legion.advFactories,
  legion.airFabbers,
  legion.landFabbers,
  legion.orbitalFabbers,
  legion.navalFabbers,
  legion.launchers
);

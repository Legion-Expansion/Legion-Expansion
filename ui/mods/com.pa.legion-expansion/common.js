//check if we can't get this from blueprint unit infoframework but will need dependency.
var legionglobal = {};

legionglobal.commanders = ["/pa/units/commanders/tank_aeson/tank_aeson.json","/pa/units/commanders/imperial_invictus/imperial_invictus.json"];
legionglobal.basicfactories = ["/pa/units/air/L_air_factory/L_air_factory.json","/pa/units/land/L_bot_factory/L_bot_factory.json","/pa/units/land/L_vehicle_factory/L_vehicle_factory.json","/pa/units/sea/L_naval_factory/L_naval_factory.json","/pa/units/orbital/L_orbital_launcher/L_orbital_launcher.json"];
legionglobal.advfactories = ["/pa/units/air/L_air_factory_adv/L_air_factory_adv.json","/pa/units/land/L_bot_factory_adv/L_bot_factory_adv.json","/pa/units/land/L_vehicle_factory_adv/L_vehicle_factory_adv.json","/pa/units/sea/L_naval_factory_adv/L_naval_factory_adv.json","/pa/units/orbital/L_orbital_factory/L_orbital_factory.json"];
legionglobal.airfabbers = [];
legionglobal.vehfabbers = [];

legionglobal.builders = _.union(legionglobal.commanders,legionglobal.basicfactories,legionglobal.advfactories,legionglobal.airfabbers,legionglobal.vehfabbers);
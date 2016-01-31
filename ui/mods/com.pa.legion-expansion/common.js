//check if we can't get this from blueprint unit infoframework but will need dependency.
var legionglobal = {};

legionglobal.commanders = ["/pa/units/commanders/tank_aeson/tank_aeson.json","/pa/units/commanders/imperial_invictus/imperial_invictus.json"];
legionglobal.basicfactories = ["/pa/units/air/L_air_factory/L_air_factory.json","/pa/units/land/L_bot_factory/L_bot_factory.json"];
legionglobal.advfactories = [];
legionglobal.airfabbers = [];
legionglobal.vehfabbers = [];

legionglobal.builders = _.union(legionglobal.commanders,legionglobal.basicfactories,legionglobal.advfactories,legionglobal.airfabbers,legionglobal.vehfabbers);
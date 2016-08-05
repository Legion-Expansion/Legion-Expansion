var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{
    legionExpansionLoaded = true;

    function legionExpansion()
    {

        var patchName = 'legionExpansion icon_atlas.js';

        console.log(patchName + ' last tested on 94684');

        var legionIcons = {
            "l_commander": ["commander"],
            "l_flying_teleporter": ["teleporter"],
            "l_naval_factory_adv": ["naval_factory_adv"],
            "l_air_factory_adv": ["air_factory_adv"],
            "l_bot_factory_adv": ["bot_factory_adv"],
            "l_vehicle_factory_adv": ["vehicle_factory_adv"],
            "l_orbital_launcher": ["orbital_launcher"],
            "l_naval_factory": ["naval_factory"],
            "l_air_factory": ["air_factory"],
            "l_bot_factory": ["bot_factory"],
            "l_vehicle_factory": ["vehicle_factory"],
            "l_flame_turret": ["laser_defense_adv"],
            "l_artillery_long": ["artillery_long"],
            "l_rocket_barrage": ["tactical_missile_launcher"],
            "l_nuke_launcher": ["nuke_launcher"],
            "l_t1_turret_adv": ["laser_defense"],
            "l_air_defense_adv": ["air_defense_adv"],
            "l_swarm_hive": ["artillery_unit_launcher"],
            "l_hive_nanoswarm": ["bot_nanoswarm"],
            "l_torpedo_launcher_adv": ["torpedo_launcher_adv"],
            "l_anti_nuke_launcher": ["anti_nuke_launcher"],
            "l_drop_turret": ["laser_defense_single"],
            "l_t1_turret_basic": ["laser_defense_single"],
            "l_air_defense": ["air_defense"],
            "l_artillery_short": ["artillery_short"],
            "l_torpedo_launcher": ["torpedo_launcher"],
            "l_ion_defense": ["ion_defense"],
            "l_energy_plant_adv": ["energy_plant_adv"],
            "l_mex_adv": ["metal_extractor_adv"],
            "l_delta_v_engine": ["delta_v_engine"],
            "l_radar_adv": ["radar_adv"],
            "l_energy_plant": ["energy_plant"],
            "l_mex": ["metal_extractor"],
            "l_land_barrier": ["land_barrier"],
            "l_teleporter": ["teleporter"],
            "l_radar": ["radar"],
            "l_storage": ["metal_storage"],
            "l_shield_gen": ["deep_space_radar"],
            "l_fabrication_vehicle_adv": ["fabrication_vehicle_adv"],
            "l_tank_laser_adv": ["tank_laser_adv"],
            "l_tank_heavy_armor": ["tank_heavy_armor"],
            "l_tank_swarm": ["tank_flak"],
            "l_hover_tank_adv": ["tank_hover"],
            "l_sniper_tank": ["tank_heavy_mortar"],
            "l_fabrication_vehicle": ["fabrication_vehicle"],
            "l_tank_shank": ["tank_light_laser"],
            "l_shotgun_tank": ["tank_armor"],
            "l_mortar_tank": ["tank_heavy_mortar"],
            "l_hover_tank": ["tank_hover"],
            "l_fabrication_vehicle_combat": ["tank_heavy_mortar"],
            "l_bot_support_commander": ["bot_support_commander"],
            "l_fabrication_bot_adv": ["fabrication_bot_adv"],
            "l_riot_bot": ["assault_bot_adv"],
            "l_bot_artillery_adv": ["bot_sniper"],
            "l_bot_aa_adv": ["bot_nanoswarm"],
            "l_bot_artillery": ["bluehawk"],
            "l_necromancer": ["fabrication_bot_combat_adv"],
            "l_fabrication_bot": ["fabrication_bot"],
            "l_assault_bot": ["assault_bot"],
            "l_sniper_bot": ["bot_sniper"],
            "l_bot_aa": ["aa_missile_vehicle"],
            "l_bot_bomb": ["bot_bomb"],
            "l_scout_bot": ["land_scout"],
            "l_scout_bot_radar_mode": ["land_scout"],
            "minion": ["bot_bomb"],
            "l_fabrication_aircraft_adv": ["fabrication_aircraft_adv"],
            "l_fighter_adv": ["fighter_adv"],
            "l_gunship": ["gunship"],
            "l_air_carrier": ["carrier"],
            "l_drone": ["drone"],
            "l_fabrication_aircraft": ["fabrication_aircraft"],
            "l_fighter": ["fighter"],
            "l_bomber": ["bomber"],
            "l_raider": ["bomber"],
            "l_transport": ["transport"],
            "l_air_bomb": ["solar_drone"],
            "l_air_scout_adv": ["air_scout"],
            "l_firestarter": ["transport"],
            "vision": ["air_scout"],
            "l_hover_ship": ["hover_ship"],
            "l_fabrication_ship_adv": ["fabrication_ship_adv"],
            "l_sea_tank": ["nuclear_sub"],
            "l_battleship": ["battleship"],
            "l_missile_ship": ["missile_ship"],
            "l_fabrication_sub_combat_adv": ["fabrication_ship_adv"],
            "l_fabrication_ship": ["fabrication_ship"],
            "l_sea_scout": ["sea_scout"],
            "l_destroyer": ["destroyer"],
            "l_attack_sub": ["attack_sub"],
            "l_frigate": ["frigate"],
            "l_orbital_battleship": ["orbital_battleship"],
            "l_solar_array": ["solar_array"],
            "l_orbital_railgun": ["orbital_railgun"],
            "l_orbital_laser": ["orbital_laser"],
            "l_radar_satellite_adv": ["radar_satellite_adv"],
            "l_orbital_dropper": ["mining_platform"],
            "l_mining_platform": ["mining_platform"],
            "l_orbital_factory": ["orbital_factory"],
            "l_orbital_fabrication_bot": ["orbital_fabrication_bot"],
            "l_orbital_fighter": ["orbital_fighter"],
            "l_orbital_probe": ["radar_satellite"],
            "l_orbital_lander": ["orbital_lander"],
            "l_radar_satellite": ["radar_satellite"],
            "l_defense_satellite": ["defense_satellite"],
            "l_land_mine": ["land_mine"],
            "l_sea_mine": ["land_mine"],
            "l_anti_nuke_launcher_ammo": ["anti_nuke_launcher_ammo"],
            "l_nuke_launcher_ammo": ["nuke_launcher_ammo"],
            "l_titan_air": ["titan_air"],
            "l_titan_bot": ["titan_bot"],
            "l_titan_vehicle": ["titan_vehicle"],
            "l_titan_orbital": ["titan_orbital"],
            "l_titan_structure": ["titan_structure"],
        }

        if (model["requestIcons"]) {
            model.requestIcons(legionIcons)
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

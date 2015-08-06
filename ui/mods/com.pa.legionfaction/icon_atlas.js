var legionFactionLoaded;

if ( ! legionFactionLoaded )
{

    legionFactionLoaded = true;

    function legionFaction()
    {
    
        var buildVersion = decode( sessionStorage.build_version );
    
        var patchName = 'legionFaction icon_atlas.js';
    
        console.log(patchName + ' on ' + buildVersion + ' last tested on 85138');
                    
        model.strategicIcons( _.union( model.strategicIcons(), 
        [
            'L_air_defense_adv',
            'L_air_defense',
            'L_air_factory_adv',
            'L_air_factory',
            'L_air_scout',
            'L_anti_nuke_launcher_ammo',
            'L_anti_nuke_launcher',
            'L_artillery_long',
            'L_artillery_short',
            'L_assault_bot',
            'L_attack_sub',
            'L_battleship',
            'L_bomber_adv',
            'L_bomber',
            'L_bot_bomb',
            'L_bot_factory_adv',
            'L_bot_factory',
            'L_bot_artillery',
            'L_bot_artillery_adv',
            'L_bot_tactical_missile',
            'L_control_module',
            'L_deep_space_radar',
            'L_defense_satellite',
            'L_delta_v_engine',
            'L_destroyer',
            'L_energy_plant_adv',
            'L_energy_plant',
            'L_fabrication_aircraft_adv',
            'L_fabrication_aircraft',
            'L_fabrication_bot_adv',
            'L_fabrication_bot_combat_adv',
            'L_fabrication_bot_combat',
            'L_fabrication_bot',
            'L_fabrication_ship_adv',
            'L_fabrication_ship',
            'L_fabrication_vehicle_adv',
            'L_fabrication_vehicle',
            'L_fighter_adv',
            'L_fighter',
            'L_frigate',
            'L_gunship',
            'L_ion_defense',
            'L_land_barrier',
            'L_land_mine',
            'L_land_scout',
            'L_laser_defense_adv',
            'L_mex_adv',
            'L_mex',
            'L_mining_platform',
            'L_missile_ship',
            'L_mortar_tank',
            'L_naval_factory_adv',
            'L_naval_factory',
            'L_nuclear_sub',
            'L_nuke_launcher_ammo',
            'L_nuke_launcher',
            'L_orbital_fabrication_bot',
            'L_orbital_factory',
            'L_orbital_fighter',
            'L_orbital_lander',
            'L_orbital_laser',
            'L_orbital_launcher',
            'L_radar_adv',
            'L_radar_satellite_adv',
            'L_radar_satellite',
            'L_radar',
            'L_riot_bot',
            'L_sea_scout',
            'L_shotgun_tank',
            'L_sniper_tank',
            'L_solar_array',
            'L_storage',
            'L_t1_turret_adv',
            'L_t1_turret',
            'L_rocket_barrage',
            'L_tank_laser_adv',
            'L_tank_shank',
            'L_teleporter',
            'L_torpedo_launcher_adv',
            'L_torpedo_launcher',
            'L_transport',
            'L_unit_cannon_deploy',
            'L_unit_cannon',
            'L_vehicle_factory_adv',
            'L_vehicle_factory'
        ]));    
    }
    
    try
    {
        legionFaction();
    }
    catch (e)
    {
        console.log(e);
        console.log(JSON.stringify(e));
    }
}
var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{
    legionExpansionLoaded = true;

    function legionExpansion()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'legionExpansion icon_atlas.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');

        var legionIcons =[
          "tank_aeson", // FIXME
          "imperial_invictus", // FIXME
          "l_flying_teleporter",
          "l_unit_cannon",
          "l_naval_factory_adv",
          "l_air_factory_adv",
          "l_bot_factory_adv",
          "l_vehicle_factory_adv",
          "l_orbital_launcher",
          "l_naval_factory",
          "l_air_factory",
          "l_bot_factory",
          "l_vehicle_factory",
          "l_flame_turret",
          "l_artillery_long",
          "l_rocket_barrage",
          "l_nuke_launcher",
          "l_t1_turret_adv",
          "l_air_defense_adv",
          "l_swarm_hive",
          "l_hive_nanoswarm",
          "l_torpedo_launcher_adv",
          "l_anti_nuke_launcher",
          "l_drop_turret",
          "l_t1_turret_basic",
          "l_air_defense",
          "l_artillery_short",
          "l_torpedo_launcher",
          "l_ion_defense",
          "l_control_module",
          "l_energy_plant_adv",
          "l_mex_adv",
          "l_deep_space_radar",
          "l_delta_v_engine",
          "l_radar_adv",
          "l_energy_plant",
          "l_mex",
          "l_land_barrier",
          "l_teleporter",
          "l_radar",
          "l_storage",
          "l_shield_gen",
          "l_fabrication_vehicle_adv",
          "l_tank_laser_adv",
          "l_tank_heavy_armor",
          "l_tank_swarm",
          "l_hover_tank_adv",
          "l_sniper_tank",
          "l_fabrication_vehicle",
          "l_tank_shank",
          "l_shotgun_tank",
          "l_mortar_tank",
          "l_hover_tank",
          "l_fabrication_vehicle_combat",
          "l_bot_support_commander",
          "l_fabrication_bot_adv",
          "l_riot_bot",
          "l_bot_artillery_adv",
          "l_bot_aa_adv",
          "l_bot_artillery",
          "l_necromancer",
          "l_fabrication_bot",
          "l_assault_bot",
          "l_sniper_bot",
          "l_bot_aa",
          "l_bot_bomb",
          "l_scout_bot",
          "l_scout_bot_radar_mode",
          "minion",
          "l_fabrication_aircraft_adv",
          "l_fighter_adv",
          "l_gunship",
          "l_air_carrier",
          "l_drone",
          "l_fabrication_aircraft",
          "l_fighter",
          "l_bomber",
          "l_raider",
          "l_transport",
          "l_air_bomb",
          "l_air_scout_adv",
          "l_firestarter",
          "vision",
          "l_hover_ship",
          "l_fabrication_ship_adv",
          "l_sea_tank",
          "l_battleship",
          "l_missile_ship",
          "l_fabrication_sub_combat_adv",
          "l_fabrication_ship",
          "l_sea_scout",
          "l_destroyer",
          "l_attack_sub",
          "l_frigate",
          "l_orbital_battleship",
          "l_solar_array",
          "l_orbital_railgun",
          "l_orbital_laser",
          "l_radar_satellite_adv",
          "l_orbital_dropper",
          "l_mining_platform",
          "l_orbital_factory",
          "l_orbital_fabrication_bot",
          "l_orbital_fighter",
          "l_orbital_probe",
          "l_orbital_lander",
          "l_radar_satellite",
          "l_defense_satellite",
          "l_land_mine",
          "l_sea_mine",
          "l_anti_nuke_launcher_ammo",
          "l_nuke_launcher_ammo",
          "l_titan_air",
          "l_titan_bot",
          "l_titan_vehicle",
          "l_titan_orbital",
          "l_titan_structure"
        ];

        model.strategicIcons(_.union(model.strategicIcons(), legionIcons).slice(0,315));
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

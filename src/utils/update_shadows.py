# What is THIS?
# This script automates creating all the files in the base PA that legion
# needs to shadow for reasons:
#  - The legion shield needs to have all blocked projectiles be added to the
#    physics_db
#  - Any shadowed ammo spec for PA needs to have the effects canonicalised.
#    (allows More Pew Pew to shadow effects without conflicting with the
#    server mod, which needs to touch the ammo files)
#  - Update unit and commander lists
#  - Update anti entity target lists, to include the legion equivalents, i.e.
#    anti nuke must be able to shoot down the legion nuke missile

import os
import os.path as path
import posixpath
import copy
import shutil


from pa_tools.pa import spec
from pa_tools.pa import pajson
from pa_tools.pa import pafs
from pa_tools.pa import paths

# create file resolution mappings (handles the mounting of pa_ex1 on pa and fallback etc.)
loader = pafs("server")
loader.mount("/", paths.PA_MEDIA_DIR)
loader.mount("/pa", "/pa_ex1")

# Load file and add it to the 'cache'
# This is to allow modifying the same unit spec multiple times.
file_cache = {}


def load(file_path):
    if not file_path in file_cache:
        file_cache[file_path] = spec.load_spec(loader, file_path)

    return file_cache[file_path]


def update_shadows(client_out_dir, server_out_dir):
    mla_units = spec.load_spec(loader, "/pa/units/unit_list.json")
    # The tutorial commanders aren't listed in the unit file, but they still need to be modified
    mla_units["units"] += [
        "/pa/units/commanders/tutorial_ai_commander/tutorial_ai_commander.json",
        "/pa/units/commanders/tutorial_ai_commander_2/tutorial_ai_commander_2.json",
        "/pa/units/commanders/tutorial_ai_commander_3/tutorial_ai_commander_3.json",
    ]

    for unit_path in mla_units["units"]:
        unit = load(unit_path)

        # Mine sight layer hack
        if (
            "recon" in unit
            and "observer" in unit["recon"]
            and "items" in unit["recon"]["observer"]
        ):
            items = unit["recon"]["observer"]["items"]

            mine_layers = filter(lambda x: x["layer"] == "mine", items)
            for mine_layer in mine_layers:
                items.append(
                    {
                        "channel": "radar",
                        "layer": "surface_and_air",
                        "radius": mine_layer["radius"],
                        "shape": "capsule",
                        "uses_energy": True,
                    }
                )

        # Avatar units should be able to build everything
        if unit_path == "/pa/units/commanders/avatar/avatar.json":
            continue
        if unit_path == "/pa/units/land/avatar_factory/avatar_factory.json":
            continue

        # Update buildable_types
        while "buildable_types" not in unit and "base_spec" in unit:
            unit_path = unit["base_spec"]
            unit = load(unit_path)

        old_buildable_types = unit.get("buildable_types", None)

        if old_buildable_types and not old_buildable_types.endswith(
            " - Custom1 - Custom2 - Custom3 - Custom4"
        ):
            unit["buildable_types"] = (
                "(" + old_buildable_types + ") - Custom1 - Custom2 - Custom3 - Custom4"
            )

    # Anti-AA missile
    load("/pa/units/air/support_platform/support_platform_tool_interception.json")[
        "anti_entity_targets"
    ] += [
        "/pa/units/land/l_bot_aa/l_bot_aa_ammo.json",
        "/pa/units/land/l_air_defense_adv/l_air_defense_adv_ammo.json",
        "/pa/units/air/l_fighter_adv/l_fighter_adv_rocket_ammo.json",
        "/pa/units/land/l_hover_tank_adv/l_hover_tank_adv_ammo.json",
    ]

    # Anti-Nuke missile
    load("/pa/units/land/anti_nuke_launcher/anti_nuke_launcher_tool_weapon.json")[
        "anti_entity_targets"
    ] += ["/pa/units/land/l_nuke_launcher/l_nuke_launcher_ammo.json"]

    # Anti-Tac Missiles
    load("/pa/units/land/bot_sniper/bot_sniper_beam_tool_weapon.json")[
        "anti_entity_targets"
    ] += ["/pa/units/land/l_hover_tank_adv/l_hover_tank_adv_ammo.json"]

    # Anti-Drop
    anti_drop_tools = [
        "/pa/units/land/bot_tactical_missile/bot_tactical_missile_tool_antidrop.json",
        "/pa/units/land/tactical_missile_launcher/tactical_missile_tool_antidrop.json",
        "/pa/units/orbital/ion_defense/ion_defense_tool_antidrop.json",
        "/pa/units/sea/missile_ship/missile_ship_tool_antidrop.json",
    ]
    for tool in map(load, anti_drop_tools):
        tool["anti_entity_targets"] += [
            "/pa/units/orbital/l_orbital_dropper/l_orbital_dropper_ammo.json"
        ]

    # Metal Extractors
    load("/pa/units/land/metal_extractor/metal_extractor.json")[
        "replaceable_units"
    ] += ["/pa/units/land/l_mex_adv/l_mex_adv.json"]
    load("/pa/units/land/metal_extractor_adv/metal_extractor_adv.json")[
        "replaceable_units"
    ] += ["/pa/units/land/l_mex/l_mex.json"]

    # Patch the unit_list and commander_list
    load("/pa/units/unit_list.json")["units"] += load(
        "/pa/units/unit_list_legion.json"
    )["units"]
    load("/pa/units/commanders/commander_list.json")["commanders"] += load(
        "/pa/units/commanders/commander_list_legion.json"
    )["commanders"]

    ## Get the list of ammo entities that are targeted by the shield
    legion_shield = spec.parse_spec(
        loader, "/pa/units/land/l_shield_gen/anti_entity_targets.json"
    )

    for target in legion_shield["anti_entity_targets"]:
        ammo_dir = path.dirname(target)
        ammo_name = path.splitext(path.basename(target))[0]

        # get the spec
        full_ammo_spec = spec.parse_spec(loader, target)
        ammo = load(target)
        original_spec = copy.deepcopy(ammo)

        if "Projectile" not in full_ammo_spec["ammo_type"]:
            print(f"Skipping (reason: ammo type {full_ammo_spec['ammo_type']})")
            continue

        if full_ammo_spec["physics"].get("add_to_spatial_db", False):
            continue

        is_legion = "/l_" in target
        if not is_legion:
            # If this is not a legion ammo spec, then we need to add it to the
            # spacial database.
            ammo["physics"] = ammo.get("physics", {})
            ammo["physics"]["add_to_spatial_db"] = True

            # However, this has consequences. It makes it impossible for mods like
            # More Pew Pew to override individual effects, since in normal PA a
            # lot of effects are shared between units. Because Legion makes this
            # changes in the server mod, more pew pew can't shadow the projectile
            # fx_trail anymore.

            # We solve this by duplicating the vanilla effects and making sure
            # that each ammo has it's own unique effects specs. This lets other
            # mods shadow these effects individually.
            src_trail_file = full_ammo_spec["fx_trail"]["filename"]
            src_hit_file = full_ammo_spec["events"]["died"]["effect_spec"]

            # construct the new effect names relative to the location of the actual ammo file
            dst_trail_file = posixpath.join(ammo_dir, ammo_name + "_trail.pfx")
            dst_hit_file = posixpath.join(ammo_dir, ammo_name + "_hit.pfx")

            ammo["fx_trail"] = ammo.get("fx_trail", {})
            ammo["fx_trail"]["filename"] = dst_trail_file

            ammo["events"] = ammo.get("events", {})
            ammo["events"]["died"] = ammo["events"].get("died", {})
            ammo["events"]["died"]["effect_spec"] = dst_hit_file

        # If there was no change, skip
        if ammo == original_spec:
            continue

        # prepare files:
        if not is_legion:
            os.makedirs(client_out_dir + ammo_dir, exist_ok=True)
            # copy client files
            shutil.copyfile(
                loader.resolveFile(src_hit_file), client_out_dir + dst_hit_file
            )
            shutil.copyfile(
                loader.resolveFile(src_trail_file), client_out_dir + dst_trail_file
            )

    # Write out all changes to the mod server directory
    for file_path, unit in file_cache.items():
        # If we have made no changes, ignore them
        if unit == spec.load_spec(loader, file_path):
            continue

        os.makedirs(server_out_dir + os.path.dirname(file_path), exist_ok=True)
        pajson.dumpf(unit, server_out_dir + file_path, separators=(",", ": "))

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
# It also guards the shaders under src/client/shaders, which are hand-maintained
# whole-file copies that nothing here regenerates.

import hashlib
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

# Shaders have no include or partial-override mechanism, so src/client/shaders
# holds whole-file copies of these stock files. Each is pinned to the install
# version it was last diffed against, so a stock fix landing in one of them
# fails the build instead of being silently reverted for everyone running Legion.
SHADOWED_SHADERS = {
    "/shaders/prelight_pa_unit_fab.fs": "e88d598fd60a67ca745d0b53a81cce16191ec372571b4f820d3403493c2764b2",
    "/shaders/unit_ring_hover.fs": "033d0d40a89c2464c20607ce17c4654c6b916400a0b1f8f7642e1d1a85174b8b",
    "/shaders/unit_ring_selection.fs": "e2e86648fe7dba4a62aaceabb7469f5d5e64b1d78fc9e4817f33bb23207893fd",
}

UNIT_LIST = "/pa/units/unit_list.json"

L_HOVER_TANK_ADV_AMMO = "/pa/units/land/l_hover_tank_adv/l_hover_tank_adv_ammo.json"
L_NUKE_AMMO = "/pa/units/land/l_nuke_launcher/l_nuke_launcher_ammo.json"
L_ORBITAL_DROPPER_AMMO = "/pa/units/orbital/l_orbital_dropper/l_orbital_dropper_ammo.json"

# Vanilla interceptors, and the Legion projectiles each has to be able to shoot down.
ANTI_ENTITY_PATCHES = {
    # Anti-AA missile
    "/pa/units/air/support_platform/support_platform_tool_interception.json": [
        "/pa/units/land/l_bot_aa/l_bot_aa_ammo.json",
        "/pa/units/land/l_air_defense_adv/l_air_defense_adv_ammo.json",
        "/pa/units/air/l_fighter_adv/l_fighter_adv_rocket_ammo.json",
        L_HOVER_TANK_ADV_AMMO,
    ],
    # Anti-Nuke missile
    "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher_tool_weapon.json": [
        L_NUKE_AMMO
    ],
    # Anti-Tac missile
    "/pa/units/land/bot_sniper/bot_sniper_beam_tool_weapon.json": [
        L_HOVER_TANK_ADV_AMMO
    ],
    # Anti-Drop
    "/pa/units/land/bot_tactical_missile/bot_tactical_missile_tool_antidrop.json": [
        L_ORBITAL_DROPPER_AMMO
    ],
    "/pa/units/land/tactical_missile_launcher/tactical_missile_tool_antidrop.json": [
        L_ORBITAL_DROPPER_AMMO
    ],
    "/pa/units/orbital/ion_defense/ion_defense_tool_antidrop.json": [
        L_ORBITAL_DROPPER_AMMO
    ],
    "/pa/units/sea/missile_ship/missile_ship_tool_antidrop.json": [
        L_ORBITAL_DROPPER_AMMO
    ],
}

# Cross-faction mex upgrade paths.
REPLACEABLE_UNIT_PATCHES = {
    "/pa/units/land/metal_extractor/metal_extractor.json": [
        "/pa/units/land/l_mex_adv/l_mex_adv.json"
    ],
    "/pa/units/land/metal_extractor_adv/metal_extractor_adv.json": [
        "/pa/units/land/l_mex/l_mex.json"
    ],
}

PATCH_TABLES = {
    "anti_entity_targets": ANTI_ENTITY_PATCHES,
    "replaceable_units": REPLACEABLE_UNIT_PATCHES,
}

# Load file and add it to the 'cache'
# This is to allow modifying the same unit spec multiple times.
file_cache = {}


# Every vanilla path below is hardcoded, so a PA patch that renames or removes
# one would otherwise skip the edit and take the interaction with it.
def resolve(file_path):
    resolved = loader.resolveFile(file_path)
    if resolved is None:
        loader.resolveFile(file_path, True)
        raise FileNotFoundError(
            f"{file_path} is not in the PA install; a patch has renamed or "
            "removed it. Update src/utils/update_shadows.py."
        )

    return resolved


def load(file_path):
    if file_path not in file_cache:
        resolve(file_path)
        file_cache[file_path] = spec.load_spec(loader, file_path)

    return file_cache[file_path]


def check_shadowed_shaders():
    for shader_path, expected in SHADOWED_SHADERS.items():
        with open(resolve(shader_path), "rb") as shader:
            actual = hashlib.sha256(shader.read()).hexdigest()

        if actual != expected:
            raise RuntimeError(
                f"{shader_path} has changed in the PA install.\n"
                f"  pinned: {expected}\n"
                f"  actual: {actual}\n"
                f"Re-diff src/client{shader_path} against the install, then "
                "update SHADOWED_SHADERS in src/utils/update_shadows.py."
            )


def patch_mine_sight_layers():
    resolve(UNIT_LIST)
    mla_units = spec.load_spec(loader, UNIT_LIST)
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


def patch_anti_entity_targets():
    for key, table in PATCH_TABLES.items():
        for target, additions in table.items():
            load(target)[key] += additions


def patch_unit_and_commander_lists():
    load(UNIT_LIST)["units"] += load("/pa/units/unit_list_legion.json")["units"]
    load("/pa/units/commanders/commander_list.json")["commanders"] += load(
        "/pa/units/commanders/commander_list_legion.json"
    )["commanders"]


def patch_shield_blocked_ammo(client_out_dir):
    ## Get the list of ammo entities that are targeted by the shield
    resolve("/pa/units/land/l_shield_gen/anti_entity_targets.json")
    legion_shield = spec.parse_spec(
        loader, "/pa/units/land/l_shield_gen/anti_entity_targets.json"
    )

    for target in legion_shield["anti_entity_targets"]:
        ammo_dir = path.dirname(target)
        ammo_name = path.splitext(path.basename(target))[0]

        # get the spec
        resolve(target)
        full_ammo_spec = spec.parse_spec(loader, target)
        ammo = load(target)
        original_spec = copy.deepcopy(ammo)

        if "Projectile" not in full_ammo_spec["ammo_type"]:
            print(f"Skipping (reason: ammo type {full_ammo_spec['ammo_type']})")
            continue

        if full_ammo_spec["physics"].get("add_to_spatial_db", False):
            continue

        if "/l_" in target:
            continue

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
        os.makedirs(client_out_dir + ammo_dir, exist_ok=True)

        # copy client files
        shutil.copyfile(resolve(src_hit_file), client_out_dir + dst_hit_file)
        shutil.copyfile(resolve(src_trail_file), client_out_dir + dst_trail_file)


def write_changed_specs(server_out_dir):
    # Write out all changes to the mod server directory
    for file_path, unit in file_cache.items():
        # If we have made no changes, ignore them
        if unit == spec.load_spec(loader, file_path):
            continue

        os.makedirs(server_out_dir + os.path.dirname(file_path), exist_ok=True)
        pajson.dumpf(unit, server_out_dir + file_path, separators=(",", ": "))


def update_shadows(client_out_dir, server_out_dir):
    check_shadowed_shaders()
    patch_mine_sight_layers()
    patch_anti_entity_targets()
    patch_unit_and_commander_lists()
    patch_shield_blocked_ammo(client_out_dir)
    write_changed_specs(server_out_dir)

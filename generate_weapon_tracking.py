""" this script takes all the targets that are needed by legion for their shields and changes their effect paths """
# tools for generating this mod
import os
import os.path as path
from posixpath import join
import copy

from shutil import copyfile

from pa_tools.pa import pafs
from pa_tools.pa import paths
from pa_tools.pa import pajson

print ('PA MEDIA DIR:', paths.PA_MEDIA_DIR)
# create file resolution mappings (handles the mounting of pa_ex1 on pa and fallback etc.)
fs = pafs('server')
fs.mount('/', paths.PA_MEDIA_DIR)
fs.mount('/pa', '/pa_ex1')

with open("server/pa/units/land/l_shield_gen/anti_entity_targets.json",'r',encoding='utf8') as file:
    targets, warnings = pajson.load(file)
    targets = targets["anti_entity_targets"]


"""###################################################################################"""
#########################################################################################
"""###################################################################################"""

# file cache for spec loading
_cache = {}


def _updateSpec(base_spec, spec):
    base_spec = copy.deepcopy(base_spec)
    for key, value in spec.items():
        if key in base_spec and isinstance(base_spec[key], dict) and isinstance(value, dict):
            base_spec[key] = _updateSpec(base_spec[key], value)
        elif key in base_spec and base_spec[key] != value:
            base_spec[key] = value
        elif key not in base_spec:
            base_spec[key] = value

    return base_spec


def _pruneSpec(spec, base_spec):
    spec = copy.deepcopy(spec)
    spec_keys = list(spec.keys() & base_spec.keys())
    for key in spec_keys:
        if key in base_spec:
            if spec[key] == base_spec[key]:
                del spec[key]
            elif isinstance(spec[key], dict) and isinstance(base_spec[key], dict):
                spec[key] = _pruneSpec(spec[key], base_spec[key])

    return spec


def _parseSpec(file_path):
    # do cache lookup first
    if file_path in _cache:
        return _cache[file_path]

    global fs
    resolved_file_path = fs.resolveFile(file_path)

    with open(resolved_file_path,'r',encoding='utf8') as file:
        spec, warnings = pajson.load(file)
        base_spec_id = spec.get('base_spec', None)
        if base_spec_id:
            base_spec = _parseSpec(base_spec_id)
            spec = _updateSpec(base_spec, spec)

    _cache[file_path] = spec
    return copy.deepcopy(spec)


"""###################################################################################"""
#########################################################################################
"""###################################################################################"""


print (' ::Parsing ammo specs::')
for target in targets:
    print ('ammo:', target)
    ammo_dir = path.dirname(target)
    ammo_name = path.splitext(path.basename(target))[0]

    # get the spec
    ammo = _parseSpec(target)

    if 'Projectile' not in ammo['ammo_type']:
        print ('Skipping (reason: ammo type ' + ammo['ammo_type'] + ')')
        continue

    ammo['physics']['add_to_spatial_db'] = True

    is_legion = '/l_' in target
    if not is_legion:
        # get the vanila effect that we are going to duplicate
        src_trail_file = ammo['fx_trail']['filename']
        src_hit_file = ammo['events']['died']['effect_spec']

        # construct the new effect names relative to the location of the actual ammo file
        dst_trail_file = join(ammo_dir, ammo_name + '_trail.pfx')
        dst_hit_file = join(ammo_dir, ammo_name + '_hit.pfx')

        ammo['fx_trail']['filename'] = dst_trail_file
        ammo['events']['died']['effect_spec'] =  dst_hit_file


    # make a minimal ammo spec for the server mod
    base_ammo = _parseSpec(ammo['base_spec'])
    ammo = _pruneSpec(ammo, base_ammo)

    # prepare files:
    os.makedirs('server' + ammo_dir, exist_ok=True)

    if not is_legion:
        os.makedirs('client' + ammo_dir, exist_ok=True)

        # copy client files
        copyfile(fs.resolveFile(src_hit_file), 'client' + dst_hit_file)
        copyfile(fs.resolveFile(src_trail_file), 'client' + dst_trail_file)

    with open('server' + target, 'w', encoding='utf-8') as ammo_file:
        pajson.dump(ammo, ammo_file)

# Legion Expansion Server & Client Mods

Please do not commit untested or broken files to the master branch :-)

Create a branch or fork the repository.


## Structure

Please remove all unncessary files from the pa and ui directories.

Only server mod files that will be uploaded to the server belong in the pa and ui directories (everything else should go into art.... rename that if needed)

Javascript and JSON are formatted for readability with 2 space indent and sorted keys. They will be compressed when packaged into the mods.

Copy `papaths.py.example` to `papaths.py` then edit to update `PA_DATA_PATH` and `PA_MEDIA_PATH`.

Lastest Python 3.x is required. Please do not use Python 2.x as whitespace formatting is different.


## Commiting

1. Don't commit broken stuff to MASTER... develop, text and fix in your local, a branch or your own fork.
2. Run format.py on your files with your PA_MEDIA_PATH in papaths.py so you don't commit unnecessary white spaces changes
3. Fix any MISSING FILE refernces in the format.py output


## Units

Vanilla units with `buildable_types` must be adjusted to ignore `Custom1`. This is provided by the Xenophobia mod.

When working with legion units please:

- update the google doc
- prefix all legion units directories and filenames with L_
- follow uber naming conventions ie L_type_unit_adv (although some are different eg dox)
- for all legion units that can build change buildable_types to "CUSTOM1 & ( existing_buildable_types )"
- check area builds ie area_build_separation
- create sea versions when needed in pa/units/sea/
- update pa/units/unit_list.json
- update ui/mods/com.pa.legion-expansion/global.js
- add a build bar image 
- add a strategic icon
- update pa/ai/unit_maps/imperial_legion.json"

If replacing existing vanilla units:

- update the google doc
- use the same naming conventions for directories and files as the vanilla units
- set the base_spec to the vanila unit to reduce copy / paste of duplicate information in unit json files
- add only changed properties to unit json files (everything else will inherit from the base_spec)

If you rename a unit directory:

- update the google doc
- reanme in pa/units/unit_list.json
- rename in ui/mods/com.pa.legion-expansion/global.js
- rename the build bar image
- rename the strategic icon

### Strategic Icons

Ideally these resemble existing strategic icons for similar units.

Add to ui/main/atlas/icon_atlas/img/strategic_icons/:

- filename format: `icon_si_L_unit.png`
- 52px x 52px
- #FFFF00 mask
- PNG32

### Build Bar Images

Ideally these should be the same blue tint as existing images to avoid UI clutter.

Add to the same path as the unit's json file:

- filename format: `L_unit_icon_buildbar.png`
- 60px x 60px
- PNG32

Once mixed factions in shared teams is possible we can look at changing the background colour of build bar images in the server mod.

### Projecticles

If you're changing projectiles and anti-projectiles remember to update anti_entity_targets eg nukes

### Commanders

Currently commanders need to hijack an existing commander as commander_list.json cannot be shadowed.

ImperialFiveleafclover is currently used as it's not available for resale.

Nothing is used from the custom commander... it's just a placeholder which can be shadowed.


## AI

Queller will provide AI support


## Known Issues

- mixed factions in shared team games are not currently possible and should be disabled by the server mod
- AI cannot use Legion Faction
- legion commander is no longer selectable on Uber servers (test with local until updated)


## TO DO

### Units

- finish them ;-)

### Mod

- add script to check vanilla units against current build
- add packaging script
- restrict shared team games to single faction
- submit server-script changes for updating AI commander to Uber


## Install

1. Download a copy of the master branch
2. If you have Legion-Expansion-Server and Legion-Expansion-Client folders from a previous install then delete them now
2. Run split_into_mods.py in the root directory of the branch
 * You will need Python 3.x installed on your system
3. Enter the parent directory of the master branch
4. Copy Legion-Expansion-Server to your server_mods folder
 * Setting up a symlink in place of copying will make updates more painless
5. Copy Legion-Expansion-Client to your client_mods folder (mods on older PAMM installations)
 * Setting up a symlink in place of copying will make updates more painless
6. The following steps are only necessary if this is the first time you've installed Legion Expansion
7. Open PAMM
8. Download the following client mods
 * Icon Extensions
9. Download the following server mods
 * HodgePodge
 * Icon Reloader
 * Xenophobia
10. Enable the Legion Expansion server mod
 * This will enable all dependencies automatically
 * Non-Legion dependencies will not be disabled when you disable the Legion mod
11. Run Planetary Annihilation: TITANS

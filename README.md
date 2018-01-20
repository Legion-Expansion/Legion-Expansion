# Legion Expansion Server & Client Mods

Please do not commit untested or broken files to the master or development branches, create a feature branch or fork the repository.


## Structure

Please remove all unncessary files from the pa and ui directories.

Only server mod files that will be uploaded to the server belong in the pa and ui directories (everything else should go into art)

Javascript and JSON are formatted for readability with 2 space indent and sorted keys. They will be compressed when packaged into the mods.

Copy `papaths.py.example` to `papaths.py` then edit to update `PA_DATA_PATH` and `PA_MEDIA_PATH`.

Lastest Python 3.x is required. Please do not use Python 2.x as whitespace formatting is different.


## Commiting

1. Don't commit broken stuff to MASTER. Develop, test and fix in your local, a branch or your own fork.
2. Run format.py on your files with your PA_MEDIA_PATH in papaths.py so you don't commit unnecessary white spaces changes
3. Fix any MISSING FILE refernces in the format.py output

Our branch structure is based on the [GitFlow](http://nvie.com/posts/a-successful-git-branching-model/) model:

MASTER - release candidate; can be forked to HOTFIX-x.x.x; used to create release versions

BALANCE - development; forked to RELEASE-x.x.x and FEATURE-*name*

FEATURE-*name* - a feature which is stil in development; merged into BALANCE on completion

HOTFIX-x.x.x - a critical fix for a current release; forks from MASTER and merged into MASTER and BALANCE

RELEASE-x.x.x - a version; fixes prior to release are done in this branch; forks from BALANCE and merged into MASTER and BALANCE


## Units

Vanilla units with `buildable_types` must be adjusted to ignore `Custom1`. This is provided by the Xenophobia mod.

When working with legion units please:

- prefix all legion units directories and filenames with L_
- follow uber naming conventions ie L_type_unit_adv (although some are different eg dox)
- for all legion units that can build change buildable_types to "CUSTOM1 & ( existing_buildable_types )"
- check area builds i.e. area_build_separation
- create sea versions when needed in pa/units/sea/
- update pa/units/unit_list.json
- update pa/ai/unit_maps/imperial_legion.json
- update ui/mods/com.pa.legion-expansion/global.js
- add a build bar image
- add a strategic icon

If replacing existing vanilla units:

- use the same naming conventions for directories and files as the vanilla units
- set the base_spec to the vanila unit to reduce copy / paste of duplicate information in unit json files
- add only changed properties to unit json files (everything else will inherit from the base_spec)

If you rename a unit directory:

- reanme in pa/units/unit_list.json
- update pa/ai/unit_maps/imperial_legion.json
- rename in ui/mods/com.pa.legion-expansion/global.js
- rename the build bar image
- rename the strategic icon

### Strategic Icons

These should resemble existing strategic icons for similar units. All weapon capabilities must be indicated by the icon.

Add to ui/main/atlas/icon_atlas/img/strategic_icons/:

- filename format: `icon_si_L_unit.png`
- 52px x 52px
- #FFFF00 mask
- PNG32

### Build Bar Images

These will use a red tint.

Add to the same path as the unit's json file:

- filename format: `L_unit_icon_buildbar.png`
- 60px x 60px
- PNG32

### Projecticles

If you're changing projectiles and anti-projectiles remember to update anti_entity_targets e.g. nukes

### Commanders

Currently commanders need to hijack an existing commander as commander_list.json cannot be shadowed.


## AI

Full AI support is built into the mod.


## Install

This mod should be installed via the Planetary Annihilation in-game community mods manager.

To create a copy for testing local changes:

1. Install [Python](https://www.python.org/)
2. Edit papaths.py to correctly set your Planetary Annihilation data and media folder paths
3. Run install_new.py
4. Move the Legion-Expansion-Client folder to your [client_mods folder](https://wiki.palobby.com/wiki/Planetary_Annihilation_Data_Directory).
5. Move the Legion-Expansion-Server folder to your [server_mods folder](https://wiki.palobby.com/wiki/Planetary_Annihilation_Data_Directory).
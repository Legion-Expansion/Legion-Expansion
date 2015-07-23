# Legion Faction Server Mod

Please do not commit untested or broken files to the master branch :-)

Create a branch or fork the repository.


## Structure

Please remove all unncessary files from the pa and ui directories.

Only server mod files that will be uploaded to the server belong in the pa and ui directories (everything else should go into art.... rename that if needed)

Javascript and JSON are formatted for readability with 2 space indent and sorted keys. They will be compressed when packaged into mod.

Use a copy of format.py update with your PA_PATH.


## Units

All vanilla units with buildable_types have been cloned to exclude legion units with:

- "buildable_types": "( existing_buildable_types ) - Custom1"

These units need to be checked when a new build is release by Uber.

When working with legion units please:

- prefix all legion units directories and filenames with L_
- follow uber naming conventions ie L_type_unit_adv (although some are different eg dox)
- for all legion units that can build change buildable_types to "CUSTOM1 & ( existing_buildable_types )"
- add to pa/units/unit_list.json
- add to ui/main/shared/js/builds.js
- add a build bar image 
- add a strategic icon

If replacing existing vanilla units:

- use the same naming conventions for directories and files as the vanilla units
- set the base_spec to the vanila unit to reduce copy / paste of duplicate information in unit json files
- add only changed properties to unit json files (everything else will inherit from the base_spec)

### Strategic Icons

- add to ui/main/game/live_game/img/build_bar/units/
- 52px x 52px
- #FFFF00 mask
- PNG32

### Build Bar Images

ideally these should be the same blue tint as existing images to avoid UI clutter:

- add to ui/main/game/live_game/img/build_bar/units/
- 60px x 60px
- PNG32

### Projecticles

- if you're changing projectiles and anti-projectiles remember to update anti_entity_targets eg nukes


### Commanders

Currently commanders need to hijack an existing commander.

ImperialFiveleafclover is currently used as not available for resale.


## Known Issues

- mixed factions in shared team games are not currently possible and should be disabled
- AI cannot use Legion Faction


## TO DO

### Units

- finish them ;-)

### Mod

- add packaging script
- restrict shared team games to single faction
- submit server-script changes to update AI commander to Uber
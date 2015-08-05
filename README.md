# Legion Faction Server & Client Mods

Please do not commit untested or broken files to the master branch :-)

Create a branch or fork the repository.


## Structure

Please remove all unncessary files from the pa and ui directories.

Only server mod files that will be uploaded to the server belong in the pa and ui directories (everything else should go into art.... rename that if needed)

Javascript and JSON are formatted for readability with 2 space indent and sorted keys. They will be compressed when packaged into the mods.

Update format.py updated with your PA_PATH (and don't commit your changes).


## Commiting

1. Don't commit broken stuff to MASTER... develop, text and fix in your local, a branch or your own fork.
2. Run format.py on your files with correct PA_PATH so you don't commit unnecessary white spaces changes
3. Fix any MISSING FILE refernces in the format.py output


## Units

All vanilla units with buildable_types have been cloned to exclude legion units with:

- "buildable_types": "( existing_buildable_types ) - Custom1"

These units need to be checked when a new build is released by Uber.

When working with legion units please:

- update the google doc
- prefix all legion units directories and filenames with L_
- follow uber naming conventions ie L_type_unit_adv (although some are different eg dox)
- for all legion units that can build change buildable_types to "CUSTOM1 & ( existing_buildable_types )"
- check area builds ie area_build_separation
- create sea versions when needed in pa/units/sea/
- update pa/units/unit_list.json
- update ui/main/shared/js/builds.js
- update ui/mods/icon_atlas.js
- add a build bar image 
- add a strategic icon

If replacing existing vanilla units:

- update the google doc
- use the same naming conventions for directories and files as the vanilla units
- set the base_spec to the vanila unit to reduce copy / paste of duplicate information in unit json files
- add only changed properties to unit json files (everything else will inherit from the base_spec)

If you rename a unit directory:

- update the google doc
- reanme in pa/units/unit_list.json
- reanme in ui/main/shared/js/builds.js
- reanme in ui/mods/icon_atlas.js
- rename the build bar image
- rename the strategic icon

### Strategic Icons

Ideally these resemble existing strategic icons for similar units.

Add to ui/main/game/live_game/img/build_bar/units/:

- filename format: icon_si_L_unit.png
- 52px x 52px
- #FFFF00 mask
- PNG32

A client mod is still currently required for strategic icons.


### Build Bar Images

Ideally these should be the same blue tint as existing images to avoid UI clutter.

Add to ui/main/game/live_game/img/build_bar/units/:

- filename format: L_unit.png
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

Currently the AI cannot use the Legion Faction without server-script modifications.


## Known Issues

- mixed factions in shared team games are not currently possible and should be disabled by the server mod
- AI cannot use Legion Faction


## TO DO

### Units

- finish them ;-)

### Mod

- add script to check vanilla units against current build
- add packaging script
- restrict shared team games to single faction
- submit server-script changes for updating AI commander to Uber


## Manual Install

### Server Mod

- copy entire folder to server-mods
- delete art
- delete client
- if you want quicker uploads / downloads then:
 - delete ui/main/atlas
 - delete ui/mods/com.pa.legionfaction/icon_atlas.js

### Client Mod

- copy entire folder to mods
- delete art
- replace modinfo.json with client/modinfo.json and delete client

# Legion Expansion Licensing

Legion Expansion is dual licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/) and MIT for software portions containing JavaScript code.

Licensing is automatically revoked for any projects that do not follow the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/) terms, alter / remove licenses or distribute from private repositories.

You must publicly distribute your contributions using the same dual licence of [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/) and MIT for software portions containing JavaScript code.

You cannot use Legion Expansion for commercial advantage or any form of monetary compensation.

Using a GitHub fork containing all changes will satisfy the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/) requirement to indicate changes made.

See [Best Practices for Attribution](https://wiki.creativecommons.org/wiki/Best_practices_for_attribution).

## Example Attribution

This work, ["YOUR-PROJECT-NAME-WITH-GITHUB-FORK-LINK"](https://github.com/) is a derivative of [Legion Expansion](https://github.com/Legion-Expansion/Legion-Expansion/) by nicb1, Crembels, KillerKiwiJuice, mgmetal13, zx0, Alpha2546, PRoeleert, wondible, mikeyh, Quitch, Stuart98, dom314, CptConundrum, Elodea, AndreasG, Clopse, Graushwein, N30N, Qzipco, WPMarshall, xankar used under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/). ["YOUR-PROJECT-NAME-WITH-GITHUB-FORK-LINK"](https://github.com/) is licenced under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/) by [YOUR-NAME-HERE] and MIT for software portions containing JavaScript code.

## Full Credits

This project is not the work of one, but of a legion.

| Name            | Role                               |
| --------------- | ---------------------------------- |
| nicb1           | Project Lead / Models              |
| Crembels        | Concept Artist                     |
| KillerKiwiJuice | Models / Textures / Code / Effects |
| mgmetal13       | Textures                           |
| zx0             | Textures                           |
| Alpha2546       | Effects / Balance                  |
| PRoeleert       | UI                                 |
| wondible        | Code                               |
| mikeyh          | Code                               |
| Quitch          | AI / Media                         |
| Stuart98        | Code / Strategic Icons             |
| dom314          | Effects                            |
| CptConundrum    | UI                                 |
| Elodea          | Balance Lead / Effects / Media     |
| AndreasG        | Balance Lead / Balance Senior      |
| Clopse          | Balance                            |
| Graushwein      | Balance                            |
| N30N            | Playtester                         |
| Qzipco          | Playtester                         |
| WPMarshall      | Playtester                         |
| xankar          | Playtester                         |

# Installation

This mod should be installed via the Planetary Annihilation in-game community mods manager.

To create a copy for testing local changes:

1. Install [Python 3](https://www.python.org/)
2. Checkout origin/balance
3. Run install_local.py
4. Enable the '[DEVELOPMENT]' version of the mod.


# Translations

If you would like to help translate Queller to one of PA's languages then please drop us a line in the [Legion Expansion forum thread](https://forums.uberent.com/threads/rel-legion-expansion-released.71680/).

# Legion Expansion Development

## Structure

Please remove all unnecessary files from the pa and ui directories.

Only server mod files that will be uploaded to the server belong in the pa and ui directories (everything else should go into art)

JavaScript and JSON are formatted for readability with 2 space indent and sorted keys. They will be compressed when packaged into the mods.

Copy `papaths.py.example` to `papaths.py` then edit to update `PA_DATA_PATH` and `PA_MEDIA_PATH`.

Latest Python 3.x is required. Please do not use Python 2.x as whitespace formatting is different.

## Committing

1. Don't commit broken stuff to BALANCE. Develop, test and fix in your local, a branch, or your own fork.
2. Run format.py on your files with your PA_MEDIA_PATH in papaths.py so you don't commit unnecessary white spaces changes
3. Fix any MISSING FILE references in the format.py output

Our branch structure is based on the [GitFlow](http://nvie.com/posts/a-successful-git-branching-model/) model:

MASTER - release candidate; can be forked to HOTFIX-x.x.x; used to create release versions; never to be directly committed to

BALANCE - development; forked to RELEASE-x.x.x and FEATURE-*name*

FEATURE-*name* - a feature which is still in development; merged into BALANCE on completion

HOTFIX-x.x.x - a critical fix for a current release; forks from MASTER and merged into MASTER and BALANCE

RELEASE-x.x.x - a version; fixes prior to release are done in this branch; forks from BALANCE and merged into MASTER and BALANCE


## Units

Vanilla units with `buildable_types` must be adjusted to ignore `Custom1`.

When working with Legion units please:

- prefix all Legion units directories and filenames with L_
- follow Uber's naming conventions i.e. L_type_unit_adv (although some are different eg dox)
- for all Legion units that can build change buildable_types to "CUSTOM1 & ( existing_buildable_types )"
- check area builds i.e. area_build_separation
- create sea versions when needed in pa/units/sea/
- update pa/units/unit_list.json
- update pa/ai/unit_maps/imperial_legion.json
- update ui/mods/com.pa.legion-expansion/global.js
- add a build bar image
- add a strategic icon

If replacing existing vanilla units:

- use the same naming conventions for directories and files as the vanilla units
- set the base_spec to the vanilla unit to reduce copy / paste of duplicate information in unit json files
- add only changed properties to unit json files (everything else will inherit from the base_spec)

If you rename a unit directory:

- rename in pa/units/unit_list.json
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

These should use a red tint.

Add to the same path as the unit's json file:

- filename format: `L_unit_icon_buildbar.png`
- 60px x 60px
- PNG32

### Projectiles

If you're changing projectiles and anti-projectiles remember to update anti_entity_targets e.g. nukes
# Legion Expansion for Planetary Annihilation: TITANS

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/legion-Expansion/Legion-Expansion)

## Licensing

Legion Expansion is dual licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/) and MIT for software portions containing JavaScript code.

Licensing is automatically revoked for any projects that do not follow the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/) terms, alter / remove licenses or distribute from private repositories.

You must publicly distribute your contributions using the same dual licence of [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/) and MIT for software portions containing JavaScript code.

You cannot use Legion Expansion for commercial advantage or any form of monetary compensation.

Using a GitHub fork containing all changes will satisfy the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/) requirement to indicate changes made.

See [Best Practices for Attribution](https://wiki.creativecommons.org/wiki/Best_practices_for_attribution).

### Example Attribution

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
| Luther          | Textures                           |
| Alpha2546       | Effects / Balance                  |
| PRoeleert       | UI                                 |
| wondible        | Code                               |
| mikeyh          | Code                               |
| Quitch          | AI / Media                         |
| Stuart98        | Code / Strategic Icons             |
| dom314          | Effects / Code                     |
| CptConundrum    | UI                                 |
| Elodea          | Balance Lead / Effects / Media     |
| AndreasG        | Balance Lead                       |
| Clopse          | Balance                            |
| Graushwein      | Balance                            |
| N30N            | Playtester                         |
| Qzipco          | Playtester                         |
| WPMarshall      | Playtester                         |
| xankar          | Playtester                         |

## Installation

You should download and install this mod via the Planetary Annihilation TITANS in-game Community Mod Manager. You will need to [enable Community Mods](https://steamcommunity.com/sharedfiles/filedetails/?id=1417396826).

To create a copy for testing local changes:

1. Install [Python 3](https://www.python.org/)
2. Checkout origin/develop:
   `git clone -b develop --recurse-submodules git@github.com:Legion-Expansion/Legion-Expansion.git`
3. Run `src/install_devel.py`
4. Run PA and click on `Community Mods`
5. Enable the "DEVELOPMENT" version of the mod

## Unit Stats

A full breakdown of all unit stats can be found at the [Planetary Annihilation TITANS & Legion Expansion Units Database](https://palobby.com/legion-expansion/units).

## Development

### Structure

The repo is structured with all the source files - including unit specs, effects, and art assets - in the `src` folder.

Please remove all unnecessary files from the pa and ui directories.

Only server mod files that will be uploaded to the server belong in the pa and ui directories (everything else should go into art)

JavaScript and JSON are formatted for readability with 2 space indent.

Latest Python 3.x is required. Please do not use Python 2.x as whitespace formatting is different.

### Committing

1. Don't commit broken stuff to DEVELOP. Develop, test and fix in your local, a feature branch, or your own fork.
2. Minimise changes as much as possible. Ensure that your files are properly formatted to avoid whitespace only changes
3. Fix all missing file issues when running `src/install_devel.py`
4. Use correct casing when referencing files to prevent issues on Linux.
5. Keep commit subjects concise, use the body to include details.
6. Make small, single-purpose commits.
7. Large files not required for the mod to run should be stored using [Git Large File Storage](https://git-lfs.github.com/)

Our branch structure is based on the [git-flow](http://nvie.com/posts/a-successful-git-branching-model/) model:

- MASTER - release candidate; can be forked to HOTFIX-x.x.x; used to create release versions; never to be directly committed to

- DEVELOP - development; forked to FEATURE-_name_

- FEATURE-_name_ - a feature which is still in development; merged into DEVELOP on completion

- HOTFIX-x.x.x - a critical fix for a current release; forks from MASTER and merged into MASTER and DEVELOP

### Release Process

In order to update the Legion-Expansion release, the
[client](https://github.com/Legion-Expansion/com.pa.legion-expansion-client) and
[server](https://github.com/Legion-Expansion/com.pa.legion-expansion-server)
Legion mods need to be updated.

The `src/install_prod.py` script automates updating the the client and server
mods by updating the submodules we have for those repositories.

The first step is to make sure you have cloned the client and server mods to a
sibling directory of this repo. After cloning the repos you should have a layout like this:

- Legion-Expansion
- com.pa.legion-expansion-client
- com.pa.legion-expansion-server

The script in `src/install_prod.py` depends on those locations.

#### Release Using `src/install_prod.py`

1. Bump the version number in `src/base_modinfo.json`
1. Merge develop into master
1. Create release from master and tag with version number
1. Run `src/install_prod.py`
1. Inspect output and check for errors or warnings
1. cd into `../com.pa.legion-expansion-client`
1. Check all changes are as expected using `git diff`
1. Add all the changes `git add .`
1. Create a commit that describes the update
1. Repeat those steps for `../com.pa.legion-expansion-server`

### Units

Vanilla units with `buildable_types` must be adjusted to ignore `Custom1`.

When working with Legion units please:

- prefix all Legion units directories and filenames with l\_
- follow Uber's naming conventions i.e. l_type_unit_adv (although some are different eg dox)
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
- set the base_spec to the vanilla unit to reduce copy / paste of duplicate information in unit JSON files
- add only changed properties to unit JSON files (everything else will inherit from the base_spec)

If you rename a unit directory:

- rename in pa/units/unit_list.json
- update pa/ai/unit_maps/imperial_legion.json
- rename in ui/mods/com.pa.legion-expansion/global.js
- rename the build bar image
- rename the strategic icon

### Strategic Icons

These should resemble existing strategic icons for similar units. All weapon capabilities must be indicated by the icon.

Add to ui/main/atlas/icon_atlas/img/strategic_icons/:

- filename format: `icon_si_l_unit.png`
- 52px x 52px
- #FFFF00 mask
- PNG32

### Build Bar Images

These should use a red tint.

Add to the same path as the unit's JSON file:

- filename format: `l_unit_icon_buildbar.png`
- 60px x 60px
- PNG32

### Projectiles

If you're changing projectiles and anti-projectiles remember to update anti_entity_targets e.g. nukes

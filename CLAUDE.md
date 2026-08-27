# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Build source for the **Legion Expansion**, a new faction for Planetary Annihilation: TITANS. It is
_not_ a mod directory. The repo generates a **pair** of mods that must ship together:

| Output                           | Built from                  | Contains                                                   |
| -------------------------------- | --------------------------- | ---------------------------------------------------------- |
| `com.pa.legion-expansion-server` | `src/shared` + `src/server` | unit/ammo/tool JSON, AI build data, generated shadows      |
| `com.pa.legion-expansion-client` | `src/shared` + `src/client` | `.papa` models, textures, `.pfx` effects, UI JS/CSS, icons |

Each declares the other in `dependencies`; the server also lists the client as a `companion`. The
client mod is `"hidden": true` — users only ever see the server mod in the mod manager.

`src/base_modinfo.json` holds the fields common to both (version, author, category, `titansOnly`);
`src/client/modinfo.json` and `src/server/modinfo.json` overlay the per-context fields. The build
merges them — **never** duplicate a shared field into the two halves.

The mod cannot be used in Galactic War.

## Commands

No test suite. Python 3 (latest 3.x; not 2.x) drives the build; every linter is a dev dependency,
so `npm install` gets the lot. Node >= 22 (markdownlint-cli's floor).

```sh
python src/install_devel.py   # build + install into %LOCALAPPDATA%\...\{client,server}_mods as *-dev
python src/install_prod.py    # build into the sibling release repos (see Releases)
python src/utils/format_ai.py # reformat + key-reorder everything under src/server/pa/ai
```

`install_devel.py` appends `-dev` to both identifiers and a `[DEVELOPMENT]` tag to the display
names, so the dev build coexists with a Community Mods install. Enable the `[DEVELOPMENT]` entry in-game.

Both scripts locate the PA install by **reading the newest PA log file** for the Coherent host dir
(`src/pa_tools/pa/paths.py`). PA must have been run at least once or the build aborts.

Lint — `npm run lint` runs all four in turn, or one at a time:

```sh
npm run lint:js      # eslint . — flat config in eslint.config.mjs
npm run lint:css     # stylelint — config in stylelint.config.mjs
npm run lint:md      # markdownlint — config in .markdownlint.json
npm run lint:format  # prettier --check . — config in .prettierrc
npm run format       # prettier --write .
```

Every dependency is pinned to a **major** version, so minors and patches float. `.browserslistrc`
(`chrome 40`) is not decoration — `stylelint-no-unsupported-browser-features` reads it, and without
it that whole automatic half of the CSS config silently checks against the wrong browser.

`eslint.config.mjs` layers four things over `js/recommended`: the PA globals, `lodash/v3` with
`prefer-lodash-method`, `curly: all`, and — for everything under `src/` — `eslint-plugin-es-x`'s
`restrict-to-es5`, which bans **every** post-ES5 feature and then whitelists back, one rule at a
time, only what Chrome 40 shipped. Each whitelist entry carries the Chrome version that added the
feature; anything above 40 stays banned. `String.prototype.startsWith`/`endsWith` are re-banned on
purpose — PA's own polyfill is one-argument and silently returns a wrong answer, so use
`_.startsWith` / `_.endsWith`.

ESLint is pinned to **9.x**: `eslint-plugin-lodash` is unmaintained and calls `context.getSourceCode`,
removed in ESLint 10. `eslint-plugin-es-x` is pinned to 9.x for the same reason (its 10.x needs
ESLint ≥ 10.6). Dropping the lodash plugin is the prerequisite for moving to ESLint 10.

SonarLint runs in connected mode against SonarCloud project `Legion-Expansion_Legion-Expansion`
(`.vscode/settings.json`); `.sonarcloud.properties` carries `sonar.projectVersion` and must be
bumped alongside `src/base_modinfo.json`.

### Verifying a change

Loading PA with the dev build enabled and starting a skirmish is the only real verification. A
clean `install_devel.py` run (no warnings, no missing files) is the pre-commit gate — see the PR
template checklist.

## Build pipeline (`src/utils/build.py`)

Worth understanding because **a large part of what ships is generated, not committed**:

1. Merge modinfos; in dev mode rewrite identifiers/dependencies/companions with the `-dev` suffix.
2. `update_modinfo` (pa_tools) stamps `version` as `<version>-<PA build>`, sets `build`, and keeps
   the previous `date` if the PA build has not changed.
3. Wipe the two output dirs, then copy `shared` → both, `server` → server, `client` → client.
4. Write `ui/mods/com.pa.legion-expansion/version.js` into the client from the version string.
5. **`update_shadows.py`** — generates the base-game shadow files (see below).
6. **`check.py`** — validation gate; on any issue it prints a report, calls `input()`, then
   `sys.exit(1)`. That `input()` **blocks on stdin**, so never run these scripts non-interactively
   without expecting a hang on failure.
7. `format_json.py` reformats every `.json`/`.pfx` in both outputs with `pajson` (2-space indent;
   `.pfx` uses the effect-specific dumper).

### Generated shadows — do not hand-author

`src/utils/update_shadows.py` mounts the real PA install (`pa_ex1` over `pa`) and writes shadowed
copies of vanilla files into the **output** dirs. It is the only place these belong:

- **Unit and commander lists** — `unit_list.json` / `commander_list.json` are produced by appending
  `src/server/pa/units/unit_list_legion.json` and
  `src/server/pa/units/commanders/commander_list_legion.json` to the vanilla lists. Add new units
  to the `_legion` list only.
- **`anti_entity_targets`** — vanilla interceptors (anti-nuke, anti-AA, anti-tac, anti-drop) get the
  Legion ammo specs appended. Adding or renaming a Legion projectile means editing the matching
  hard-coded list in this script.
- **Metal extractor `replaceable_units`** — cross-faction mex upgrade paths.
- **Mine sight-layer hack** — every vanilla unit with a `mine` observer item gains a matching radar
  observer item.
- **Shield spatial-DB + effect canonicalisation** — every ammo in
  `l_shield_gen/anti_entity_targets.json` not already in the spatial DB gets `add_to_spatial_db`,
  and its shared vanilla `fx_trail`/death effect is _copied_ to a per-ammo `.pfx` beside the ammo
  file. This is deliberate: it keeps More Pew Pew able to shadow individual effects despite the
  server mod having to touch the ammo specs.

Only files that actually differ from the resolved vanilla spec are written out.

### `check.py` gates

- Both modinfos pass `pa_tools.mod.checker.check_modinfo`.
- No missing referenced files, except the `ALLOW_MISSING_FILES` allowlist (currently Bugs Faction
  extractors, referenced for cross-mod compatibility without requiring that mod be installed).
- **Every unit in `unit_list_legion.json` with `buildable_types` must contain `Custom1`.**

### `src/pa_tools/`

Git submodule (`Legion-Expansion/pa_tools`) providing the PA virtual filesystem (`pafs`, with
`pa_ex1` mounted over `pa`), the comment-tolerant `pajson` reader/pretty-printer, `spec.parse_spec`
(resolves the `base_spec` inheritance chain) and `spec.prune_spec` (strips keys equal to the base —
useful when minimising a unit override). Clone with `--recurse-submodules`.

## Faction mechanics

`Custom1` is the Legion faction bit. Legion units carry it; every Legion builder's
`buildable_types` is `"Custom1 & ( ... )"`, and vanilla builders must be adjusted to exclude
`Custom1` so the two tech trees stay separate. AI unit-map entries in
`src/server/pa/ai/unit_maps/legion.json` are the vanilla type expressions intersected with
`Custom1` (e.g. `"(Factory & Advanced) & Custom1"`).

AI build data lives under `src/server/pa/ai/` in the stock layout (`fabber_builds/`,
`factory_builds/`, `platoon_builds/`, `platoon_templates/`, `unit_maps/`) with a `legion_` filename
prefix. Those directories are scanned by the game, not indexed — there is no registry to update.

## Client UI

One entry script per scene, registered in `src/client/modinfo.json` `scenes`. The server modinfo
also registers `icon_atlas` and `new_game` scripts — those files are supplied by the client/shared
half and resolve through the merged VFS, which is why the server mod can hold the scene binding
while the client mod ships the file.

House pattern for every scene script — deviate only with reason:

```js
var legionXLoaded;
function legionX() {
  if (legionXLoaded) {
    return;
  }
  legionXLoaded = true;
  try {
    /* ... */
  } catch (e) {
    console.error(e);
    console.error(JSON.stringify(e));
  }
}
legionX();
```

The re-entrancy guard exists because a scene's scripts can load more than once, and the blanket
try/catch stops one failure taking out the shared scene scope. SonarLint's complexity rule may be
ignored for that outer function.

Key pieces:

- `shared/.../common.js` — the `legion` global: hand-maintained arrays of Legion commander,
  factory, fabber and launcher spec paths, unioned into `legion.builders`. Loaded on demand with
  `loadScript(...)`; reference it behind `// eslint-disable-next-line no-undef`. **Adding or
  renaming a Legion builder means editing this file.**
- `client/.../common_functions.js` — an AMD `define({...})` module pulled in with `require([...])`,
  holding the theme helpers (`uiColour`, `toggleImage`, `bodyPanelClass`, …).
- **Theming**: `live_game_players.js` classifies the local player's commanders as
  `legion` / `mixed` / `vanilla`, then fans the result out to the other panels with
  `api.Panel.message("<panel>", "legionui", ui)`; each panel implements `handlers.legionui`. Red is
  the Legion palette, purple is mixed. `live_game_players.js` and `live_game_build_bar.js` each
  carry their own copy of that classification (over `model.player().commanders` and
  `buildSet().selectedSpecs()` respectively) — keep them in step.
- **Theming is opt-out**: gate theme work on
  `api.settings.isSet("ui", "legionThemeFunction", true)` in game and `legionMenuThemeFunction` in
  menus, both defaulting to `"ON"`; the settings are registered in `settings.js`.
- **Build bar**: `live_game_build_bar.js` appends `L_`-prefixed tab groups to
  `model.BuildSet.tabsTemplate` and remaps labels/hotkeys back to the vanilla group name;
  `shared_build.js` registers every Legion spec's grid position in
  `Build.HotkeyModel.SpecIdToGridMap` under those `L_` groups. A new buildable unit needs an entry
  in both, plus `icon_atlas.js`.
- `new_game.js` (shared) detects the server mod via `model.gameModIdentifiers()` — always checking
  **both** the plain and `-dev` identifiers — colours Legion commanders in the picker, shows the
  welcome overlay, and calls `model.registerHoldReady` if the client half is missing.

Engine constraints: Coherent UI on Chromium 40, ES5 plus a little ES6 — no `let`, arrow functions,
template literals or `class`; a parse error kills the whole shared scene scope. lodash is **3.9.3**
(`_.pluck`, `_.forOwn` exist; v4 names do not). `curly: all` and `lodash/prefer-lodash-method` are
enforced as errors.

## Assets and conventions

`README.md` under "Development" is the authoritative reference for naming, sizes and formats
(strategic icons, build-bar images, commander UI renders, unit directory prefixes), and its "Units"
checklist enumerates every registry a new or renamed unit has to touch.

- Everything in `src/client` and `src/server` ships. Anything not needed at runtime — source
  models, working textures — belongs in `src/art/` (~169 MB, excluded from the build). Large binary
  sources use Git LFS (`.blend`, `.blend1`, `.xcf`).
- Legion units and files are prefixed `l_`, otherwise following Uber's naming (`l_type_unit_adv`).
- When replacing a vanilla unit, set `base_spec` to the vanilla spec and list **only** the changed
  properties.
- Use exact filename casing everywhere — the mod runs on Linux and macOS.
- 2-space indent for JS and JSON; camelCase variables; HTML in its own file, never inlined in JS.

## Workflow

git-flow: `master` (release only, never commit directly) ← `develop` ← `feature-<name>`, with
`hotfix-x.x.x` off `master`. Default branch is `develop`.

Commits are small and single-purpose, with a concise subject and detail in the body. A PR changes
only what the request needs — no drive-by reformatting or clean-up.

`CHANGELOG.md` is user-facing, newest first, with an `## Unreleased` section at the top and
`### General` / `### Balance` / `### Bugfix` / `### AI` / `### Translations` subsections.

### Releases

`install_prod.py` writes into `../com.pa.legion-expansion-client` and
`../com.pa.legion-expansion-server` — sibling clones of this repo's directory, which must exist
first. Order: bump the `src/base_modinfo.json` version → merge `develop` into `master` → tag the
release → run `install_prod.py` → review, commit and push each of the two repos separately.

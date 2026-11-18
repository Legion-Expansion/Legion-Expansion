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

## Commands

No test suite. Python 3 (latest 3.x; not 2.x) drives the build; every linter is a dev dependency,
so `npm install` gets the lot. Node >= 22 (markdownlint-cli's floor).

```sh
python src/install_devel.py   # build + install into %LOCALAPPDATA%\...\{client,server}_mods as *-dev
python src/install_prod.py    # build into the sibling release repos (see Releases)
python src/utils/format_ai.py # key-reorder everything under src/server/pa/ai, then run prettier on it
```

`format_ai.py` needs `npm install` first, because it formats its output with the repo's prettier.

`install_devel.py` appends `-dev` to both identifiers and a `[DEVELOPMENT]` tag to the display
names, so the dev build coexists with a Community Mods install. Enable the `[DEVELOPMENT]` entry in-game.

Both scripts locate the PA install by **reading the PA client logs, newest first**, for the
directory PA mounts as `/` (`src/pa_tools/pa/paths.py`). Both UI backends log that mount. The
script also still reads the `Coherent host dir` line, which CEF does not log. The first match
decides. The build aborts if no log has a match, or if the directory the match names no longer
exists (for example, after the install moved). Run PA once from the current install, then build.

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

Each pull request to `develop` or `master` runs `.github/workflows/checks.yml` on Linux: the
`check_source_paths` gate (with stdin from `/dev/null`, so a failure ends in `EOFError`) and
`npm run lint`. The rest of the build reads the PA install, so CI cannot run it. `check.py`
imports `pa_tools` inside `check_mod` for that reason: importing `pa_tools.pa.paths` looks for
a PA install. For the same reason CI cannot plan the shadows, so its gate checks the source paths
against the other paths that the build writes (`written_paths({})`), not against the shadows.

## Build pipeline (`src/utils/build.py`)

Worth understanding because **a large part of what ships is generated, not committed**:

1. `plan_shadows` (`update_shadows.py`) works out the step 6 shadow files in memory. Then
   `check_source_paths` (`check.py`) stops the build, before the outputs are touched, on a file
   path that is in more than one of `src/shared`, `src/client`, and `src/server`, and on two paths
   in one of them that compare equal after NFD and a full Unicode case fold. It also stops on a
   file and a directory, or two spellings of one directory, that compare equal in that way in one
   of them, or in `src/shared` and one of the other two. A path in any of the three that holds a
   character that is not ASCII stops it too, and so does a source path that clashes with a path that
   the build writes into a mod after the step 4 copy (see the gates below), a file or folder at the
   root of one of them whose name starts with a dot, and a file or folder name in the path of a file
   that ships that the `core.protectNTFS` check of Git for Windows refuses, such as one that ends in
   a dot or a space, or `con.js`. A file or folder named `.git`, in any case, in the path of a file
   that ships stops it as well. It stops if it cannot read a folder in the three source folders,
   and it gives the step 4 copy the file lists that it checked. It stops the way the step 7 gate
   does, so it also calls `input()` and blocks on stdin.
2. Merge modinfos; in dev mode rewrite identifiers/dependencies/companions with the `-dev` suffix.
3. `update_modinfo` (pa_tools) stamps `version` as `<version>-<PA build>` and sets `build`. Then
   `build.py` sets `date` in both modinfos to the current date on every build.
4. Wipe the two output dirs, except their dot entries (the release clones keep `.git`), then copy
   `shared` → both, `server` → server, `client` → client. A file that cannot be deleted, such as
   one another program holds open, stops the build with an error. The copy takes the file lists
   that step 1 checked, so a file added after step 1 does not ship, and a listed file that is
   removed before the copy stops the build with an error after the wipe. The copy skips each
   untracked file that git ignores (`.gitignore`, `.git/info/exclude`, or the global excludes
   file), so an untracked operating system file such as `.DS_Store` does not ship. Every other file
   on disk at step 1 ships under its case at step 1, a new file before `git add`. Git does not look
   inside a symlinked directory, so every file in one ships, as before. A nested repository stops
   step 1, because its `.git` would ship too, unless git ignores its folder and tracks no file in
   it: git then lists that folder as one entry, and step 1 leaves the whole folder out. Git never
   lists a `.git` as ignored, so a `.git` in an ignored folder that git does not list as one entry
   (one where git tracks a file, or a `.git` that git does not read as a repository) would still
   ship, and stops step 1. A `.git` folder that holds no file ships nothing, so it passes. The
   build needs git on the `PATH` and runs only in a clone.
5. Write `ui/mods/com.pa.legion-expansion/version.js` into the client from the version string.
6. **`update_shadows.py`** — writes the base-game shadow files that step 1 planned (see below).
7. **`check.py`** — validation gate; on any issue it prints a report, calls `input()`, then
   `sys.exit(1)`. That `input()` **blocks on stdin**, so never run these scripts non-interactively
   without expecting a hang on failure.
8. Remove the `_legion` unit and commander lists from the server output; `check.py` was their last
   reader there.
9. `format_json.py` reformats every `.json`/`.pfx` in both outputs with `pajson` (2-space indent;
   `.pfx` uses the effect-specific dumper).

### Generated shadows — do not hand-author

`src/utils/update_shadows.py` mounts the real PA install (`pa_ex1` over `pa`) and writes shadowed
copies of vanilla files into the **output** dirs. It is the only place these belong, and the
step 1 gate stops on a source path that clashes with a shadow's path (see the `check.py` gates).
It reads only the PA install and `src/server`, so it works the shadows out before the wipe and
writes them at step 6:

- **Unit and commander lists** — `unit_list.json` / `commander_list.json` are produced by appending
  `src/server/pa/units/unit_list_legion.json` and
  `src/server/pa/units/commanders/commander_list_legion.json` to the vanilla lists. Add new units
  to the `_legion` list only. The `_legion` lists are build inputs: `build.py` removes them from
  the server output once `check_mod` has run.
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
  server mod having to touch the ammo specs. An effect the vanilla ammo already keeps at that
  per-ammo path is not copied, so the client never ships an unchanged shadow of it. A copy is
  re-serialised with the base-game `emissionBurts` typo renamed to `emissionBursts`, so the copies
  differ from the vanilla files in that key.

Only files that actually differ from the resolved vanilla spec are written out.

### `check.py` gates

- Each file path that the build copies from `src/shared`, `src/client`, and `src/server`, compared
  after NFD and a full Unicode case fold (case-insensitive APFS, the macOS default, treats `ß` and
  `ss` as one name), is in only one of them. Only the exact name `modinfo.json` may be in both
  `src/client` and `src/server`: the build reads each half's copy to make that mod's own. The two
  outputs mount at the same root, so a path in both mods ships twice: PA loads the server mod's
  copy in a lobby or a game, and the client mod's copy elsewhere. Put a file both mods need in
  `src/shared`. This gate reads the sources, not the outputs, where every `src/shared` file is in
  both mods.
- No two file paths that the build copies from one of those three folders compare equal in that
  way. The default file systems of macOS, and of Windows for a pair such as `A.json` and `a.json`,
  hold only one of the two files: a git clone there keeps one and warns.
- Among the file paths that the build copies from one of those folders, or from `src/shared` and
  one of the other two (the sources of one mod), no file and directory, and no two spellings of
  one directory, compare equal in that way. A directory's name is each folder prefix of one of
  those paths. No folder holds a file and a directory of one name. Where the file system that holds
  the outputs treats the two names as one (the same name, or a case variant such as `data` and
  `Data/` on a case-insensitive file system), the step 4 copy stops part-way, after the wipe, if it
  writes the file first. If it makes the directory first, it copies the file into the directory
  under its own name with no message, writing over a file of that name there; a folder of that name
  there stops the copy. The copy writes `src/shared` before `src/client` and `src/server`. Where the
  file system treats them as two, such as a case variant on a case-sensitive file system (the Linux
  default), the copy succeeds and the mod ships both names. A build on Windows puts a directory
  spelled two ways, such as `L_bot` and `l_bot`, in one folder named after the first one written.
- No file that ships from those three folders has a file or folder name in its path that the
  `core.protectNTFS` check of Git for Windows refuses, so a clone on Windows does not check it
  out: a name that ends in a dot or a space, holds one of `< > : " | ? * \` or a character from
  U+0000 to U+001F, is a Windows device name (`con`, `prn`, `aux`, `nul`, `conin$`, `conout$`,
  `com1` to `com9`, or `lpt0` to `lpt9`, in any case) alone or before a dot, with or without
  spaces before the dot, or is `git~1` in any case, a short name Windows can give `.git`. Windows
  reads `a.json.` as `a.json`, `d./a.json` as `d/a.json`, and `a:b` as a stream of `a`, and it
  drops a trailing space when it makes a file or a folder. A build on Windows cannot read a folder
  whose name ends in a dot or a space, so it stops on one whatever the folder holds.
- No file that ships from those three folders has a file or folder named `.git`, in any case, in
  its path. Git records no path that holds that name, on any platform (`verify_dotfile` in
  `read-cache.c`), so a release commit leaves the `.git` out. Where git finds a repository with a
  commit in it (a `.git` folder that holds one, a `.GIT` folder on a case-insensitive file system,
  or a `.git` file whose `gitdir:` path reaches one from the release clone), and the clone's index
  tracks no file in the folder that holds it, `git add -A` in a release clone records that folder
  as one gitlink entry, and none of the files in it. Otherwise it records the other files and
  leaves the `.git` out. The copy skips empty folders, so the copy of a repository with no commit
  has no `refs/` or `objects/`, and git does not read it as a repository. A `.git` at a source root
  is also listed by the dot-name check below. The other names that git refuses as `.git` stop
  other checks: `.git` or `git~1` followed by dots, spaces, or a `:` stops the check above, and
  `.git` with an ignorable character such as U+200C stops the ASCII check below.
- Every file path that the build copies from those three folders is ASCII. File systems compare
  other characters in different ways, so the comparison above cannot find every pair that one of
  them treats as one name. For example, case-insensitive HFS Plus skips U+200C ZERO WIDTH
  NON-JOINER when it compares names.
- No file that the build copies from `src/shared`, `src/client`, or `src/server`, and no folder
  that holds one at any depth, compares equal, after NFD and a full Unicode case fold, to a path
  that the build writes into a mod after the step 4 copy. `written_paths` in `check.py` lists
  those paths: the repository's `LICENSE` and `README.md` (both mods),
  `ui/mods/com.pa.legion-expansion/version.js` (client), and the shadows that `update_shadows.py`
  plans (specs and lists in the server, `.pfx` copies in the client). At a written file path the
  build writes over a file and fails on a folder; at a written folder path it fails on a file.
  Where the name is spelled another way, such as `license`, or a folder `Land_Scout/` for a shadow
  in `land_scout/`, the default file systems of macOS and Windows keep that spelling, and a
  case-sensitive one ships the name beside the written one. A source folder with the same spelling
  as a folder that the build writes into is not reported. A file at a path that the build writes
  into one mod only makes both mods ship that path if it is in `src/shared` or in the other mod's
  folder. Folders are compared only within one mod's sources. `modinfo.json` is not listed: the
  build reads each half's copy.
- At the root of `src/shared`, `src/client`, or `src/server`, no file that the build copies, and no
  folder that holds one at any depth, has a name that starts with a dot, such as `.git` or
  `.gitattributes`. Step 4 keeps the dot entries at the root of each mod, so a later build does not
  remove the copy. In a release clone, the files of a `.git` folder go into the clone's own `.git`,
  and a `.gitignore` or `.gitattributes` changes what `git add -A` records. A pattern for those
  folders goes in the repository's root `.gitattributes` or `.gitignore`, with a path that starts
  at `src/`.
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
`buildable_types` is `"Custom1 & ( ... )"`. Nothing has to be done on the vanilla side: stock
units carry `Custom58` and stock builders already require it, which keeps the two tech trees
separate on its own. AI unit-map entries in
`src/server/pa/ai/unit_maps/legion.json` are the vanilla type expressions intersected with
`Custom1` (e.g. `"(Factory & Advanced) & Custom1"`).

AI build data lives under `src/server/pa/ai/` in the stock layout (`fabber_builds/`,
`factory_builds/`, `platoon_builds/`, `platoon_templates/`, `unit_maps/`) with a `legion_` filename
prefix. Those directories are scanned by the game, not indexed — there is no registry to update.

## Client UI

One entry script per scene, registered in `src/client/modinfo.json` `scenes`. The server modinfo
also registers `icon_atlas` and `new_game` scripts — those files are supplied by the client/shared
half and resolve through the merged VFS, which is why the server mod can hold the scene binding
while the client mod ships the file. The exception is the four body-panel-only scenes
(`live_game_econ`, `live_game_menu`, `live_game_time_bar`, `live_game_build_hover`), which share
`live_game_body_panel.js`: it reads its panel name from `api.Panel.pageName` (the `<panel id>` in
`live_game.html`) and loads `css/legion_<pageName>.css`. A new panel that only needs the class swap
is added by registering that script on its scene and adding a matching CSS file.

House pattern for every scene script — deviate only with reason:

```js
(function () {
  try {
    /* ... */
  } catch (e) {
    console.error("Legion Expansion: " + (e.stack || e.message || e));
  }
})();
```

The IIFE keeps a script's `var`s out of the shared scene scope. There is no re-entrancy guard
because the engine unions the client and server scene lists, so a script registered by both
modinfos loads once. The blanket try/catch stops one failure taking out the shared scene scope.
SonarLint's complexity rule may be ignored for the IIFE.

Key pieces:

- `shared/.../common.js` — the `legion` global: hand-maintained arrays of Legion commander,
  factory, fabber and launcher spec paths, unioned into `legion.builders`. Loaded on demand with
  `loadScript(...)`; reference it behind `// eslint-disable-next-line no-undef`. **Adding or
  renaming a Legion builder means editing this file.** It also holds `legion.appendBinding`,
  which adds a binding to a stock element's `data-bind` instead of replacing it, so a stock
  binding a PA patch adds survives. Legion theme classes go in `legionCss`, an alias of
  Knockout's `css` handler, because one binding takes only one `css` key.
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
- **Legion CSS loads before stock CSS.** `loadCSS` appends to `<head>`, but every stock scene Legion
  styles has a `<noloc>` element before its first `<link>`. `<noloc>` ends the head, so the stock
  `<link>`s are parsed into `<body>` and come after Legion's. A Legion rule must outrank the stock
  selector it overrides (the theme class usually does it); one of equal specificity silently loses.
  The in-game sheets load whatever the commanders are, so every selector in them needs a Legion
  theme class. `npm run lint:css` enforces this with `legion/theme-class`, a rule defined in
  `stylelint.config.mjs`, on every sheet in `src/client/.../css/` except `legion_buttons.css` and
  `start.css`, which `start.js` loads in the main menu.
- **Build bar**: `live_game_build_bar.js` appends `L_`-prefixed tab groups to
  `model.BuildSet.tabsTemplate` with the vanilla labels, and adds a `tab_L_<group>` copy of each
  vanilla `tab_<group>` key to `model.hotkeys()`, which stock reads for every tab's hotkey;
  `shared_build.js` registers every Legion spec's grid position in
  `Build.HotkeyModel.SpecIdToGridMap` under those `L_` groups. A new buildable unit needs an entry
  in both, plus `icon_atlas.js`.
- `new_game.js` (shared) detects the server mod via `model.gameModIdentifiers()` — always checking
  **both** the plain and `-dev` identifiers — and colours Legion commanders in the picker.

Engine constraints: PA renders the UI with CEF (Chromium 150) by default, but it can fall back to
Coherent UI on Chrome 40, and the launch option `--ui-backend coherent` also selects it. So shipped
code targets Chrome 40: ES5 plus a little ES6 — no `let`, arrow functions, template literals or
`class`; a parse error kills the whole shared scene scope. lodash is **3.9.3** (`_.pluck`,
`_.forOwn` exist; v4 names do not). `curly: all` and `lodash/prefer-lodash-method` are enforced as
errors.

## Assets and conventions

`README.md` under "Development" is the authoritative reference for naming, sizes and formats
(strategic icons, build-bar images, commander UI renders, unit directory prefixes), and its "Units"
checklist enumerates every registry a new or renamed unit has to touch.

- Every file in `src/client` and `src/server` ships, except an untracked file that git ignores.
  Anything not needed at runtime — source models, working textures — belongs in `src/art/`
  (~169 MB, excluded from the build). Large binary sources use Git LFS (`.blend`, `.blend1`,
  `.xcf`).
- Legion units and files are prefixed `l_`, otherwise following Uber's naming (`l_type_unit_adv`).
- When replacing a vanilla unit, set `base_spec` to the vanilla spec and list **only** the changed
  properties.
- Use exact filename casing everywhere — the mod runs on Linux and macOS.
- 2-space indent for JS and JSON; camelCase variables; HTML in its own file, never inlined in JS.

### Comments

Code here carries a comment only where the code itself cannot explain something: base-game or
engine behaviour, a bug workaround, a dependency that lives outside this repo, or a
counter-intuitive ordering. Most shipped scene scripts have none, and that is correct — the
absence is the default, not an oversight.

That bar sets the length too: past a line or two a comment is documentation, and this repo has no
`docs/` tree to hold it. Subsystem-level prose goes in this file, naming conventions and per-asset
formats in `README.md` under "Development", and process in `CONTRIBUTING.md`. Rejected
alternatives, tuning history and "this used to live elsewhere" belong in `CHANGELOG.md`; a comment
states the rule that holds now.

Verify a comment against the code before writing it. Every path, filename and identifier it names
must exist, and the claim must match the lines beside it — a confidently wrong comment is worse
than none, and it is the easiest defect to introduce here.

Comments in `src/**` JSON and `.pfx` files are parsed and thrown away: `pajson` treats them as
ignored tokens, so `format_json.py` never writes them into the built mod. Explain a spec in the
prose above, not in a file whose comment cannot ship.

Never removed, because they are not prose:

- `eslint-disable`, `prettier-ignore` and `stylelint-disable` directives. Today that is the
  `// eslint-disable-next-line no-undef` lines covering each use of the `legion` global in the
  scene scripts — dropping one turns a clean `npm run lint` into a failure.
- Knockout `<!-- ko -->` / `<!-- /ko -->` virtual bindings in HTML, which are executable rather
  than markup comments.
- Anything inside `src/pa_tools/`. It is a submodule, so its comments — including the `TODO`s in
  `lib/patcher.py` — are not this repo's to edit; fix them upstream or leave them.
- The attribution and licence headers third-party art and code arrive with, and the credits in
  `README.md` they point at. Those are a licence condition, not commentary.

Generated output carries no comments at all, and is not the place to add any: shadows come out of
`update_shadows.py`, so a note about why a shadow looks the way it does belongs beside the code
that generates it.

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

The release clones have `core.ignorecase` on, so `git add` records nothing when a built file
changes only the case of its name, and the old name ships. After the build, `install_prod.py`
(`src/utils/release_case.py`) prints a `CHECK CASE` line for each release repo, then records each
such rename with `git mv -f` and prints a `RENAME` line for it.

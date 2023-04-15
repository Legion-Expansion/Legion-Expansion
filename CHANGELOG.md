# CHANGELOG

## Unreleased

### General

- Transports always move to units, units never move to Transports

### Balance

- Orbital
  - Chariot
    - Brake increased from 25 to 30
    - Speed increased from 25 to 50

### Bugfix

- Naval Factory can no longer be blocked in a way that prevents production

## v1.26.0 - 2022-09-19

### General

- Aligned Legion orbital travel speeds with those of MLA

### Balance

- Air
  - Salamander
    - Removed secondary fire
    - Purifier no longer self-destructs
- Land
  - Havoc
    - Cost increased from 750 to 800
  - Lancer
    - Health decreased from 120 to 100
  - Peacekeeper
    - Health increased from 165 to 170
  - Scorpion
    - Range reduced from 130 to 120
    - Cost increased from 800 to 900
- Orbital
  - Starcannon
    - Health decreased from 3000 to 2000
    - Unit slots reduced from 14 to 9
    - Added Enforcer as a buildable unit
  - Viper
    - Removed the 100 range weapon
    - Attacks at full range

### AI

- Enabled usage of Star Cannon following crash fix in base game

### Fixed

- Unit types for Purifier

## v1.25.0 - 2022-07-17

### General

- Added support for the Bugs' Faction metal extractors

### Balance

- Land
  - Odin
    - Removed stomp weapon
  - Omni Silo
    - Energy storage increased from 75,000 to 225,000
  - Thor
    - Removed stomp weapon
- Orbital
  - Rig
    - Cost increased from 3000 to 4000

### Fixed

- Manta not showing DPS for any weapon on its unit card
- Manta's anti-drop-pod weapon being linked to its missile targeting system
- Manta AA effects not being tied to where it was shooting
- Interplanetary speeds and unittype tags for Infiltrator - with thanks to Dreadnought for the report
- Havoc missing UNITTYPE_TacticalDefense

## v.1.24.0 - 2022-05-11

### General

- Updated selection circle diameter for (with thanks to Anonemous2):
  - Archer
  - Decimator
  - Gustav
  - Hive
  - Holocene
  - Kosmos
  - Lockheed
  - Loki
  - Miniman
  - Monstrosity
  - Nova
  - OmniSilo
  - Orbweaver
  - Overseer
  - Paladin
  - Panzer
  - Ripple
  - Salamander Turret
  - Sky Bridge
  - Starcannon
- Updated mesh bounds for (with thanks to Anonemous2):
  - Advanced Armour Fabricator
  - Arsonist
  - Gustav
  - Holocene
  - Jackal
  - Kosmos
  - Lancer
  - Loki
  - Meteor
  - Miniman
  - Orbweaver
  - Panzer
  - Rampart
  - Ripple
  - Salamander
  - Scarab
  - Shredder
  - Theodor
  - Thor
- Visual improvements for Rampart
- Rampart size increased
- Rampart strategic icon updated

### Balance

- Air
  - Meteor
    - Won't launch Meteorites until ammo is fully reloaded
  - Scythe
    - Damage reduced from 35 to 29

### AI

- Fixed Meteors not moving with air platoons

## v1.23.0 - 2022-04-16

### General

- Improved Tyr effects
- Bots brake instantly
- Tank braking aligned to acceleration
- Further improved PNG compression to reduce mod size

### Balance

- Air
  - Firebird
    - Health reduced from 300 to 240
  - Lockheed
    - Health reduced from 400 to 350
  - Loki
    - Health increased from 9000 to 11250
  - Scythe
    - Health reduced from 150 to 120
- Land
  - Advanced Mass Extractor
    - Build cost decreased from 2000 to 1800
    - Metal production increased from 16 to 18
    - Health reduced from 5000 to 3000
  - Deathmark
    - Health increased from 125 to 250
    - Turn speed increased from 60 to 90
    - Turret yaw rate increased from 30 to 60
  - Havoc
    - Projectiles per shot reduced from 2 to 1
    - Chain jump vision increased from 10 to 50
    - Chain jump range increased from 25 to 50
    - Chained damage reduced from 1500 -> 750 -> 1500 to 750 -> 750 -> 750
  - Hive
    - Nanoswarm damage type changed to metal
    - Nanoswarm damage reduced from 30 to 5
  - Investigator
    - Radar range decreased from 350 to 300
  - Jackal
    - Cost decreased from 350 to 325
  - Lancer
    - Range decreased from 75 to 70
  - Maul
    - Speed increased from 8 to 10
  - Miniman
    - Speed increased from 8 to 10
  - Monstrosity
    - Turret yaw rate increased from 30 to 45
  - Odin
    - Acceleration increased from 5 to 100
    - Braking increased from 5 to 100
  - Panzer
    - Speed increased from 10 to 14
  - Peacekeeper
    - Cost increased from 60 to 75
    - Health increased from 150 to 165
    - Range decreased from 75 to 70
  - Purger
    - Health reduced from 40 to 20
  - Praetorian
    - Range increased from 100 to 110
    - Build range increased from 20 to 30
  - Rampart
    - Energy consumption increased from 0 to 1200
  - Scarab
    - Cost increased from 500 to 550
  - Scorpion
    - Range reduced from 150 to 140
  - Thor
    - Health reduced from 80,000 to 60,000
    - Acceleration increased from 10 to 100
- Orbital
  - Rig
    - Storage removed
    - Energy production reduced from 7000 to 3750
  - Starcannon
    - Range reduced from 800 to 600
- Sea
  - Hammerhead
    - Acceleration increased from 4 to 30
    - Brake increased from 25 to 80

### AI

- Builds the Hive

### Fixed

- Rampart blocking three times as many shots as intended due to change in engine's handling of ammo
- Removed Rampart's energy efficiency requirement as it only led to the appearance of a non-operational unit
- Factories not blocking projectiles properly (with thanks to Taiga for the report):
  - Armour Foundry
  - Flyer Foundry
  - Walker Foundry
  - Ship Foundry
  - Advanced Armour Foundry
  - Advanced Flyer Foundry
  - Advanced Walker Foundry
  - Advanced Ship Foundry

## v1.22.0 - 2022-02-16

### General

- Improved PNG compression to reduce mod size

### Balance

- Air
  - Flyer Foundry
    - Build cost decreased from 660 to 600
  - Loki
    - Damage to air increased from 50% to 100%
  - Meteoroid
    - Damage to structures decreased from 150% to 100%
    - Increased guard radius from 100 to 250
    - Give higher priority to air defences
- Land
  - Armour Foundry
    - Build cost decreased from 660 to 600
    - Energy demand increased from 640 to 765
    - Metal demand increased from 15 to 17
  - Corsair
    - Increased standard deviation of shots from 0 to 1
  - Havoc
    - Damage to commanders increased from 67% to 100%
  - Lancer
    - Damage to commanders decreased from 133% to 100%
    - Damage to structures decreased from 133% to 100%
    - Damage to vehicles decreased from 133% to 100%
    - Damage increased from 125 to 166
  - Panzer
    - Damage to structures decreased from 300% to 100%
  - Peacekeeper
    - Build cost reduced from 75 to 60
  - Walker Foundry
    - Build cost decreased from 660 to 600
    - Energy demand increased from 640 to 765
    - Metal demand increased from 15 to 17
- Orbital
  - Imperator
    - Meteoroids can now be controlled
  - Starcannon
    - Energy demand increased from 1900 to 2250
- Sea
  - Catfish
    - Shots reverted to hitscan
    - Movement changed from water-hover to deepwater
  - Manta
    - Damage to orbital increased from 25% to 100%
  - Ship Foundry
    - Build cost decreased from 660 to 600

### AI

- Scout with Stokes if no better options
- Fixed the building of too many Purgers
- Won't build land titans due to pathfinding issues
- Builds more Stokes
- Builds more Corsairs

### Fixed

- Obsolete scene loads
- Some Legion theme elements not being loaded
- Failure to stop to engage a target while patrolling for:
  - Purger
  - Panzer
  - Maul
  - Deathmark
  - Nanoswarms
  - Earthshaker
  - Scorpion
  - Shank
  - Epoch
- Panzer description - with thanks to Thorveim for the report
- Radar jamming no longer prevents the triggering of Spoilers
- Monstrosity secondary weapons pointing at the primary gun's target rather than their own
- One of the Imperator's side-guns not firing
- Imperator moves into range of all its guns when attacking orbital targets
- Viper not firing when chasing a target
- Particle shape for nuke explosions
- Supernova causing an error to be logged when built
- UI style errors
- Black Knight idle animation not playing

### Strategic Icons

With thanks to Quildtide for these.

- Fixed inconsistent energy symbol for:
  - Power Catalyst
  - Advanced Power Catalyst
  - OmniSilo Storage
- Fixed inconsistent radar symbol for:
  - Radar
  - Overseer
- Fixed inconsistent targeting symbol for:
  - Shredder
  - Archer
  - Ripple
  - Tsunami
- Fixed inconsistent metal symbol for OmniSilo Storage
- Fixed inconsistent walker/armour symbols for Starcannon
- Replaced all #FFF100 with #FFFF00 for Radar
- Horizontally centered icons for:
  - Power Catalyst
  - Advanced Power Catalyst
  - OmniSilo Storage
  - Starcannon
  - Radar
  - Shredder
  - Archer
  - Ripple
  - Tsunami

## v1.21.0 - 2021-08-05

### General

- Updated icons for units given water-hover (shallow water) navigation

### Balance

- Air
  - Comet
    - Removed underwater vision
  - Lockheed
    - Build cost increased from 800 to 900
  - Marauder
    - Weapon blocked by enemies and terrain
- Land
  - Archer
    - Icarus added to priority target list
  - Arsonist
    - Damage increased from 20 to 40
    - Splash increased from 20 to 40
  - Deathmark
    - Removed underwater vision
  - Earthshaker
    - Removed underwater vision
  - Enforcer
    - Removed underwater vision
  - Havoc
    - Can now intercept missiles
    - Removed underwater vision
  - Lancer
    - Removed underwater vision
  - Maul
    - Removed underwater vision
  - Miniman
    - Removed underwater vision
  - Monstrosity
    - Removed underwater vision
  - Odin
    - Icarus added to priority target list for AA
  - Orbweaver
    - Weapon blocked by enemies and terrain
    - Icarus added to priority target list
    - Build cost increased from 600 to 750
    - Removed underwater vision
  - Panzer
    - Removed ability to shoot Air units
    - Removed underwater vision
  - Patriot
    - Icarus added to priority target list
  - Purger
    - Removed underwater vision
  - Shredder
    - Icarus added to priority target list
  - Stoke
    - Torpedo can no longer target WaterHover units
  - Thor
    - Multilaser blocked by enemies and terrain
    - Removed underwater vision
  - Tola
    - Weapon blocked by enemies and terrain
- Orbital
  - Centurion
    - Weapon blocked by enemies and terrain
  - Imperator
    - Weapon blocked by enemies and terrain
  - Kosmos
    - Weapon blocked by enemies and terrain
  - Paladin
    - Weapon blocked by enemies and terrain
- Sea
  - Akula
    - Torpedo can no longer target WaterHover
  - Catfish
    - Movement changed from deepwater to water-hover
    - Torpedo can no longer target WaterHover
    - Laser blocked by enemies and terrain
  - Hammerhead
    - Torpedo can no longer target WaterHover
    - Ram blocked by enemies and terrain
  - Manta
    - Anti-air blocked by enemies and terrain
    - Icarus added to priority target list for AA
  - Ripple
    - Torpedo can no longer target WaterHover
  - Talos
    - Weapon blocked by enemies and terrain
    - Icarus added to priority target list
  - Tsunami
    - Torpedo can no longer target WaterHover

### Fixed

- Havoc fires from both pylons
- Added wakes to ships and subs that didn't have one

## v1.20.1 - 2021-06-24

### General

- Updated file shadows

## 1.20.0 - 2021-02-14

### General

- Updated file shadows
- Added vertical icon offset to Advanced Mass Extractor
- Added new UNITTYPEs to match usage by MLA

### Balance

- Orbital
  - Fabrication Starship
    - Changed ground and air vision to sight from radar

## v1.19.0 - 2021-01-15

### Balance

- Orbital
  - Starcannon
    - Increased build cost from 1700 to 2600

## v1.18.0 - 2021-01-15

### General

- Changed UNITTYPE tags assigned to Investigator when in radar mode
- Updated file shadows

### Balance

- Land
  - Corsair
    - Increased LOS from 100 to 115
    - Removed underwater LOS
  - Tola
    - Can now be built by the Commander
- Orbital
  - Starship Projector
    - Reduced build cost from 1500 to 600
    - Can now be built by the Commander
  - Starship Factory
    - Increased build cost from 3600 to 6000

### AI

- Add check for UNITTYPE_Mobile to all new platoons

### Bugfix

- Fixed icon assignment for Infiltrator's spy camera

## v1.17.1 - 2020-12-17

### General

- Update file shadows

### Balance

- Land
  - Advanced Mass Extractor
    - Increased metal income from 15 to 16

## v1.17.0 - 2020-10-08

### General

- Added support for new UNITTYPEs
- Updated file shadows
- Removed Legion theming from all menu screens except the main menu
- Add UNITTYPE_Tactical to Panzer

### AI

- Use new UNITTYPEs when making platoon decisions
- Builds Ramparts
- Require some space around land titan builds
- Builds Black Knights even when alone on the planet

### Balance

- Sea
  - Fabrication Vessel
    - Changed movement type from water to water-hover

## v1.16.3 - 2020-08-27

### General

- Update file shadows for 114862

## v1.16.2 - 2020-08-13

### General

- Update file shadows for 114823

## v1.16.1 - 2020-07-30

### General

- Updated MLA unit file shadows for 114803

## v1.16.0 - 2020-07-24

### Balance

- Land
  - Mass Extractor
    - Reduced build cost from 220 to 170
    - Reduced metal production from 8 to 7
    - Can be built on the same spot as an Advanced Metal Extractor
  - Advanced Mass Extractor
    - Reduced build cost from 2200 to 2000
    - Increased metal production from 14 to 15
    - Can be built on the same spot as a Metal Extractor

## v1.15.3 - 2020-07-13

### Translations

- Removed community translations replaced by professional translations now shipping with PA

## v1.15.2 - 2020-07-05

### Bugfix

- Restored attack command to the Comet following a crash fix being deployed by PA Inc

## v1.15.1 - 2020-07-02

### Bugfix

- Removed attack command from the Comet

## v1.15.0 - 2020-06-25

### General

- Add support for the Unicorn Commander
- Updated MLA unit file shadows

### AI

- Removed redundant personality tag checks
- Removed community translations replaced by professional translations now shipping with PA

### Translations

- Corrected Necromancer description

## v1.14.0 - 2020-06-18

### General

- Update file shadows for TITANS 114445

### Balance

- Air
  - Scythe
    - No longer prioritises fighters
- Land
  - Deathmark
    - No longer prioritises mobile units
    - Removed splash damage
    - Reduced health from 250 to 125
    - Reduced turn speed from 90 to 55
    - Reduced turret yaw rate from 60 to 30
- Sea
  - Talos
    - Give equal weighting to transports, bombers, gunships, and titans

### Translations

- Removed community translations replaced by professional translations now shipping with PA
- Ensured all client strings are being translated

### Bugfix

- Correct UNITTYPE tags for spawned weapons

## v1.13.2 - 2020-06-12

### General

- Updated the formatting of unit descriptions to match the MLA

### Translations

- We've moved to a new translation service. Help [translate the Legion Expansion](https://crowdl.io/legionexpansion/entries) to your local language.
- Updated the Dutch (nl) translation with thanks to Viporizer
- Added an English (not US) translation for those not using English (US)
- Updated the Korean (ko) translation with thanks to R.O.S.S

## 1.13.1 - 2020-06-05

### Bugfix

- Corrected Infiltrator moving slower between planets than other interplanetary aircraft
- Fixed Bowhead weapons not always finding a firing solution

## v1.13.0 - 2020-05-30

### Balance

- Land
  - Archer
    - Splash range increase from 15 to 20
  - Shredder
    - Rate of fire increased from 8 to 10
    - Can no longer damage non-air units
  - Theodor
    - Range reduced from 260 to 240

### Bugfix

- Assigned Shredder target priorities to the correct weapon

## v1.12.0 - 2020-05-29

### AI

- Clean-up of some build condition oddities

### Balance

- Air
  - Advanced Flyer Foundry
    - Build cost increased from 4500 to 4800
  - Comet
    - Removed Bomber tag
    - Added Transport tag
    - Both weapons removed
- Land
  - Advanced Armour Foundry
    - Build cost increased from 4500 to 4800
  - Advanced Walker Foundry
    - Build cost increased from 4500 to 4800
  - Deathmark
    - Underwater LOS decreased from 120 to 100
  - Havoc
    - Range increased from 100 to 115
  - Lancer
    - Health reduced from 130 to 120
  - Miniman
    - Range increased from 180 to 220
    - Speed increased from 7 to 8
  - Monstrosity
    - LOS decreased from 150 to 100
    - Weapon #1 range increased from 150 to 170
    - Weapon #2 range decreased from 90 to 75
  - Necromancer
    - LOS decreased from 150 to 100
  - Orbweaver
    - LOS decreased from 150 to 100
  - Peacekeeper
    - Health increased from 140 to 150
  - Scorpion
    - Range increased from 140 to 150
  - Walker Foundry
    - Roll-off time reduced from 4 to 3 seconds
- Orbital
  - Starcannon
    - Build cost increased from 900 to 1700
    - Roll-off time increased from 3 to 4 seconds
- Sea
  - Advanced Ship Foundry
    - Build cost increased from 4500 to 4800
  - Bowhead
    - LOS increased from 150 to 180

## v1.11.0 - 2020-05-29

### General

- Updated Rampart ammo mirroring
- Updated MLA unit file shadows
- Removed FX files we don't need to shadow
- Code clean-up
- Legion commanders moved to the bottom of the commander selection list
- Improved the Theodor's description

### AI

- Adjusted how specialist unit ratios are measured to avoid them sitting in the base without a platoon
- Prioritise building Marauders when intel is required
- Ensure platoons don't conflict with other mods
- Scouts with the Catfish if air is unavailable
- Builds the Necromancer
- Fixed error resulting in too many Purgers being built

### Balance

- Land
  - Necromancer
    - Explosion on death removed
    - Health reduced from 2500 to 250
  - Purger
    - Removed target priorities
- Sea
  - Manta
    - Prioritises bombers and gunships first
- Orbital
  - Centurion
    - Anti-ground weapon range reduced from 100 to 80
  - Rig
    - Build cost reduced from 3600 to 3000
    - Health reduced from 3600 to 3000
    - Energy income reduced from 10800 to 7500
    - Metal income reduced from 43 to 30
  - Starship Projector
    - Build cost reduced from 2000 to 1500

### Bugfix

- Fixed broken MLA translations
- Fixed incorrect build costs for MLA T2 factories
- Fixed Gil-E not shooting down Stingray missiles
- Fixed Skitter navigation type and build completion sound
- Fixed Purgers not attacking in some situations

## v1.10.2 - 2020-04-28

### Bugfix

- Corrected layout of theme settings in the gameplay tab
- Legion version number correctly formatted when in-game theme is disabled
- Fixed colour and position errors when the Legion menu theme was active
- Fit the same number of map tabs on a row in the Legion theme as the standard theme

## v1.10.1 - 2020-04-25

### Bugfix

- Fabrication Starship can now build the Basic Mass Extractor for real

## v1.10.0 - 2020-04-25

### General

- Updated Rampart ammo mirroring for 114218

### Balance

- Air
  - Loki
    - Added the Rampart to the priority target list
- Land
  - Iron Dome
    - Metal cost increased from 12000 to 15600
  - Odin
    - Added the Rampart to the priority target list
  - Thor
    - Fixed targeting priorities
    - Added the Rampart to the priority target list
- Orbital
  - Fabrication Starship
    - Can now build the Basic Mass Extractor
  - Meteoroid
    - Updated targeting priorities to include those of its sea counterpart
  - Tyr
    - Aligned targeting priorities with those of the Helios
- Sea
  - Meteoroid
    - Commander now first target priority

### AI

- Updated for Fabrication Starship change
- Builds the Ripple
- Builds the Tsunami

### Bugfix

- Corrected UNITTYPEs on Meteroid
- Corrected UNITTYPEs on Nanoswarm
- Corrected UNITTYPEs on Purifier

## v1.9.6 - 2020-01-19

### AI

- Reversal of island approach, now tries to avoid putting land factories on islands
- Workaround for AI not building for several seconds when starting air

## v1.9.5 - 2020-01-18

### AI

- Prevent the inclusion of factories in mobile unit ratio checks
- Removes unnecessary economy checks from Titan builds
- Uncaps the amphibious and hover tank build ratios when there is no land route
- Recognises that Vehicle Foundries can be effective even without a land route
- Recognises that the Advanced Naval Foundry can be effective even without a naval route
- Can place amphibious units into their own platoon
- Builds the Thor Titan
- Builds the Odin Titan
- Prevents hover units getting stuck on islands with land armies or in ponds with naval fleets
- Recognise that the Investigator is amphibious
- Fixed Enforcers being built on islands
- Uncaps the Necromancer Advanced Suicide Bot build ratio when there is no land route
- Fixed Deathmarks being built on islands

### General

- Update Rampart ammo mirroring for 113953

### Bugfix

- Added missing Titan UNITTYPE to Holocene

### Balance

- Orbital
  - Tyr
    - Moves closer to the target when attacking to maximise the damage done

## v1.9.4 - 2019-11-27

### General

- Update Rampart ammo mirroring for 113936

## v1.9.3 - 2019-11-26

### General

- Update Rampart ammo mirroring for 113932

### Bugfix

- Restored missing UNITTYPE tags to Necromancer minion

## v1.9.2 - 2019-10-21

### Bugfix

- Add support for Pumpkin Commander

## v1.9.1 - 2019-10-20

### General

- Compatibility with 113867+

## v1.9.0 - 2019-10-05

### General

- Added support for Horsefly

### Bugfix

- Removed invalid ammo types from the Rampart

### Balance

- Air
  - Dauntless
    - Target priorities added:
      - Commander
      - AirDefense & (Land | Naval)
      - Titan & (Land | Naval)
      - Artillery & Advanced & (Land | Naval)
      - Nuke | NukeDefense
  - Firestarter
    - Target priorities added:
      - Commander
      - AirDefense & (Land | Naval)
      - Titan & (Land | Naval)
      - Artillery & Advanced & (Land | Naval)
      - Nuke | NukeDefense
  - Lockheed
    - Can no longer shoot amphibious units
    - Target priorities changed:
      - Commander
      - AirDefense & (Land | Naval)
      - Titan & (Land | Naval)
      - Artillery & Advanced & (Land | Naval)
      - Nuke | NukeDefense
  - Loki
    - Target priorities changed:
      - Commander
      - AirDefense & (Land | Naval)
      - Artillery & Advanced & (Land | Naval)
      - Nuke | NukeDefense
  - Osprey
    - Increased health from 40 to 55
    - Increased speed from 80 to 100
- Land
  - Archer
    - Target priorities changed:
      - Air & (Bomber | Gunship)
      - Air & Mobile
  - Gustav
    - Target priorities added:
      - Commander
      - Titan & (Land | Naval)
      - Artillery & Advanced & (Land | Naval)
      - Nuke | NukeDefense
  - Odin
    - Primary weapon priorities changed:
      - Commander
      - Titan & (Land | Naval)
      - Artillery & Advanced & (Land | Naval)
      - Nuke | NukeDefense
    - AA priorities changed:
      - Air & (Transport | Bomber | Gunship | Titan)
      - Mobile & Air
  - Orbweaver
    - Target priorities changed:
      - Air & (Transport | Bomber | Gunship | Titan)
      - Mobile & Air
  - Patriot
    - Target priorities changed:
      - Air & (Transport | Bomber | Gunship | Titan)
      - Mobile & Air
  - Rampart
    - Blocks shots from the Horsefly
    - Blocks shots from the Stryker
  - Shredder
    - Target priorities changed:
      - Air & (Transport | Bomber | Gunship | Titan)
      - Mobile & Air

## v1.8.0 - 2019-08-29

### General

- Updated for the introduction of the dynamic build bar
- Removed dependency on HodgePodge framework
- Updated for the changes to ammo handling in the latest PA build

### Balance

- Land
  - Monstrosity
    - Decreased health from 6000 to 4000
- Sea
  - Bowhead
    - Increased speed from 9 to 12
  - Epoch
    - Increased speed from 8 to 11
  - Manta
    - Increased speed from 8 to 11

## v1.7.1 - 2019-06-29

### Balance

- Land
  - Advanced Mass Extractor
    - Increased cost from 1700 to 2200
    - Decreased metal income from 19 to 14

## v1.7.0 - 2019-03-08

### AI

- Update for 113034 artillery placement changes

### Translations

- Simplified Chinese will use Traditional Chinese until we have a translation

### Fixes

- POV button uses correct UI theming
- Increased Osprey's brake value from 20 to 40 to meet best practice braking rules for PA

## 1.6.2 - 2019-01-07

### Fixes

- Increased Theodor's max_firing_velocity from 150 to 200 to allow it to fire its full range on large radius planets
- Removed To Legion button in lobby as you can now directly select the AI's Commander

## 1.6.1 - 2019-01-06

### Fixes

- Infiltrator Spy Camera no longer causes the game to crash - thanks to Kire for the report
- Rockteeth's weapons assigned to correct aim and muzzle bones

### Known Issues

- You cannot pick which Commander model the AI will use only which faction it will play as

## v1.6.0 - 2019-01-05

### General

- Update Legion Intro button to display correctly in 112474 and later
- Removed custom FX from the Rockteeth Commander

### Translations

- All unit descriptions overhauled for accuracy and clarity
- Updated translations will be provided as they become available

### Balance

- Air
  - Firebird
    - Removed target priorities
  - Osprey
    - Movement increased from 70 to 80
- Commanders
  - Rockteeth
    - Removed custom weapons so that it is using the exact same weapon stats as all other Commanders
- Land
  - Praetorian
    - Decreased health from 10000 to 8000
- Orbital
  - Kosmos
    - Able to shoot sea surface targets in addition to land
- Titans
  - Loki
    - Lowered shot velocity and increased tracking to improve accuracy

### Fixes

- Firebird can now fire its long-range weapon

### Known Issues

- You cannot pick which Commander model the AI will use only which faction it will play as

## v1.5.0 - 2018-10-30

### Balance

- Air
  - Advanced Flyer Foundry
    - Cost increased from 3600 to 4500
- Land
  - Advanced Walker Foundry
    - Cost increased from 3600 to 4500
  - Advanced Armour Foundry
    - Cost increased from 3600 to 4500
  - Panzer
    - Missile lifetime increased from 5 to 5.5 seconds
- Naval
  - Advanced Ship Foundry
    - Cost increased from 3600 to 4500

## v1.4.3 - 2018-10-21

### AI

- Updated for the changes to the vanilla AI in 112176
- Improved integration of Novas into platoons
- Better handling of air platoon creation alongside vanilla AI and in shared army situations

### Fixes

- Strategic icons fixed following update to HodgePodge
- Fixed Linux issues with Havoc and Black Knight due to incorrect casing

## v1.4.2 - 2018-10-18

### Translations

- Corrected Chinese (Traditional) (zh-TW) translations added in 1.4.1 with thanks to IPWIW

### Fixes

- Advanced Air, Bot, Vehicle and Naval Factory cost updated to match the new cost in PA release 112176

## v1.4.1 - 2018-10-06

### Translations

- Added partial Russian (ru) support with thanks to Diskraip and грязь dirt
- Updated and completed German (de) with thanks to tunsel
- Updated Chinese (Traditional) (zh-TW) with thanks to IPWIW

### Fixes

- Legion Intro button works again though we must load it in an external browser now
- Browsing systems in the lobby correctly uses the full width of the screen under the Legion theme

## v1.4.0 - 2018-05-21

### Translations

- Setup Legion unit names to allow translation by third party mods
- Added Chinese (Traditional) with thanks to IPWIW

### Fixes

- All Legion Commander descriptions now consistent in their format

## v1.3.2 - 2018-04-08

### Fixes

- Infiltrator can now move between planets per its description
- AI checks it can afford the build and running costs of the Infiltrator before building it

## v1.3.1 - 2018-03-26

### Translations

- Expanded to cover lobby chat messages
- Added French (fr) and German (de) for lobby only, pending further unit description translations
- Commander names are no longer translated so as to resolve them being displayed incorrectly in the lobby
- Unit names are no longer translated in any language to ensure consistency of communication

## v1.3 - 2018/03/15

### General

- Maul, Earthshaker and Necromancer move to 10% of their range when attacking
- Thor will move to bring its multilaser into range when attacking
- AI no longer builds the Necromancer

### Translations

For languages which use the Latin alphabet we are not including unit name translations at this time so as to avoid confusion when referring to units across languages. This was done on the advice of a number of our bilingual players.

We can't include translations for client components like the lobby pop-up at this time due to client mod translations breaking vanilla translations. We have put the necessary frameworks in place for the future though.

Thanks to everyone who has contributed so far!

Translations added:

- en-US, English (US)
- ko, Korean
- nl, Dutch

### Balance

- Land
  - Scorpion
    - Damage reduced from 750 to 500
- Titans
  - Odin buff
    - Main cannon can now shoot at units on the sea floor
- Orbital
  - Spectre correction
    - Cost decreased from 300 to 200
    - Vision lost only once energy efficiency drops below 90% instead of 100%

## v1.2.1 - 2017/09/01

### General

- Initial lobby pop-up now states how to play as Legion

### Fixes

- Fixed multiple intro buttons appearing when Legion was installed by a player not logged into Ubernet
- POV button coloured to match Legion theme

## v1.2 - 2017/06/20

### General

- AI puts greater distance between Rigs to avoid chain reactions
- Added support for new MLA Commanders
- Removed Wrasse

### Balance

- Star Cannon
  - Added three second delay between unit builds (same as Unit Cannon)

## v1.1 - 2017/02/03

### General

- Standardised metal texture across faction to resolve light/dark contrast between units
- Resolved all instances of Tron lines on units
- Replaced some low quality textures

### Fixes

- Holocene and Wrasse given correct selection shape
- Removed further unnecessary files to minimise mod size
- Catfish strategic icon properly reflects its ability to fire torpedoes and is slightly larger now

## v1.0.2 - 2016/12/30

### Fixes

- Fixed Holocene being buildable by Fabrication Starship

## v1.0.1 - 2016/12/22

### Fixes

- Fixed Jaeger splash being twice its weapon's damage

## v1.0 - 2016/12/22

### General

- Removed BETA from Legion UI and added version number
- Updated AI for changes to Starcannon buildable units
- AI can build Wrasse

### Balance

- Armour
  - Armour Fabricator
    - Speed increased from 10 to 11
    - Increased LOS from 100 to 125
  - Shank
    - Speed increased from 8 to 10
    - Health decreased from 420 to 300
    - Added splash damage
      - Damage 5
      - Radius 20
  - Corsair
    - Cost decreased from 405 to 300
    - Health increased from 125 to 175
  - Panzer
    - Reload time decreased from 9 sec to 6 sec
  - Scorpion
    - Rate of fire increased from 0.3 to 0.4
- Walkers
  - Purger
    - Cost decreased from 75 to 50
    - Health decreased from 70 to 40
    - Splash increased from 50 to 150
  - Patriot
    - Rate of fire decreased from 8 to 4
  - Monstrosity
    - Braking rate increased from 10 to 100
    - Cost decreased from 1800 to 1700
    - Primary weapon damage increased from 1500 to 1650
  - Miniman
    - Speed increased from 6 to 7
  - Enforcer
    - Cost decreased from 550 to 450
- Air
  - Infiltrator
    - Decreased cost from 500 to 280
    - Increased acceleration from 60 to 300
    - Increased speed from 90 to 100
    - Increased radar range to 400
    - No longer visible on radar
- Naval
  - Jaeger
    - Damage decreased from 1500 to 750
    - Rate of fire increased from 0.25 to 0.5
    - Range increased from 180 to 250
  - Catfish
    - Laser range decreased from 120 to 100
    - Speed decreased from 20 to 18
    - Can no longer see mines
  - Talos
    - Range increase from 150 to 180
  - Manta
    - Rate of fire AA increased from 4 to 6
  - Epoch
    - Range increased from 400 to 430
  - Hammerhead
    - Torpedo range increase from 150 to 200
    - Added splash damage
      - Damage 50
      - Radius 10
      - Full damage radius 2
      - Linear fall-off
  - Wrasse
    - Combat fabricator
    - Reclaims
    - Spot mines
    - Repairs units
- Air
  - Lockheed
    - Health decreased from 450 to 400
  - Comet
    - Increased cost from 2500 to 4000
- Orbital
  - Starcannon
    - Removed Purger
    - Added Scorpion
- Static Weapons
  - Jackal
    - Cost increased from 150 to 350
    - Damage decreased from 30 to 10
    - Rate of fire increased from 2 to 15
    - Range increased from 100 to 105
  - Scarab
    - Cost increased from 400 to 500
    - Damage increased from 100 to 300
    - Rate of fire decreased from 1.75 to 1
  - Gustav
    - Range decreased from 500 to 400

### Fixes

- Fixed use of invalid form of RGB curve in fabber spray effects
- Fixed Ripple and Tsunami torpedoes colliding with the sea floor on certain maps
- Necromancer Purger metal value set to match that of the Purger

## v0.18.2 - 2016/11/22

### Fixes

- Correct version shown in UI

## v0.18.1 - 2016/11/22

### General

- Replace metal texture on multiple units to ensure consistency across faction
- Guardian tooltip more accurately describes its abilities
- Disabled the AI building the Starcannon due to some associated server crashes

### Fixes

- Holocene correctly flagged as a Titan

## v0.18.0 - 2016/10/03

### IMPORTANT

- The server mod HodgePodge has been added as a dependency. If your strategic icons are missing you need to install this mod in CMM.
- Please uninstall Weapons Tracking as the required changes have been merged directly into Legion.
- Report any crashes experienced while playing with Legion
  - [Windows](https://wiki.palobby.com/wiki/Windows#Reporting_Windows_Issues)
  - [OS X](https://wiki.palobby.com/wiki/OS_X#Reporting_OS_X_Issues)
  - [Linux](https://wiki.palobby.com/wiki/Linux/SteamOS#Reporting_Linux_Issues)

### General

- Anti-air symbol added to Jaeger build bar icon
- Weapon range circles disabled for uncontrollable entities
- Earthshaker camera shake reduced by 50%
- Necromancer's Purgers no longer selectable with factory built Purgers and have been coloured red to distinguish them
- Strategic icons now show for jumping Purgers and Investigators

### Balance

- Rampart nerf
  - Shield no longer starts fully charged when built
- Earthshaker buff
- Rate of fire changed from 4 to 3.3
- Damage decreased from 1500 to 1200
- Splash damage decreased from 500 to 400
- Scorpion buff
- Ammo velocity increased to 110
- Loki buff
  - Rate of fire changed from 3 to 2
  - Main gun damage modifier against air units changed from 0.75 to 0.5
- Enforcer nerf
  - Range decreased from 110 to 100
- Maul nerf
  - Health decreased from 1300 to 1150
- Walker Factory nerf
  - Metal cost increased from 600 to 660
- Armour Foundry nerf
  - Metal cost increased from 600 to 660
- Flyer Foundry nerf
  - Metal cost increased from 600 to 660
- Ship Foundry nerf
  - Metal cost increased from 600 to 660
- Peacekeeper buff
  - Rate of fire changed from 0.9 to 0.83
- Lancer change
  - Damage increased from 6 to 125
  - Rate of fire changed from 0.1 to 1.64
- Purger nerf
  - Health decreased from 80 to 70

### Fixes

- Black icons caused by memory limit replaced with dots
- Animation log errors fixed for a variety of units
- Salamander drop turret physics errors fixed
- Salamander drop turret no longer plays fire effect when it dies
- Mixed UI action bar now transparent like the MLA UI
- Mixed UI planet list bar now transparent and no longer blocks metal counts
- Necromancer Purgers now properly attack units at long range automatically
- Imperator ground attack drones no longer missing unit selection portraits
- Orbweaver muzzle flash now appears in the correct position
- Error in Thor animations fixed
- Kaiju projectiles now properly blocked by Rampart
- Jaeger projectiles now properly blocked by Rampart
- Legion no longer overrides weapon effect mods
- Clean-up of file shadowing
- Lobby overlay no longer broken when Legion theme is disabled

## v0.17.0 - 2016/07/18

### General

- Salamander banking angle increased from 0.25 to 0.5
- Havoc no longer prefers to be at the back of a formation
- Removed generic aircraft death explosion effect from Nova bubble
- Added idle and death explosion effects for Nova bubble
- Performance improvements to Nova targeting laser
- Reduced Loki formation spacing
- Reduced Meteor formation spacing
- Miniman no longer prioritises Commander
- New Stoke model

### Balance

- Deathmark nerf:
  - Rate of fire changed from 6 to 7
- Lockheed buff:
  - Speed, acceleration and deceleration increased from 50 to 60
  - Turn speed increased from 90 to 120
- Salamander buff:
  - Health increased from 1000 to 1100
  - Turn speed increased from 70 to 120
- Orbweaver nerf:
  - Rate of fire changed from 2 to 1.75
- Imperator nerf:
  - Drone aggression radius changed from 200 to 100
- Thor buff:
  - Laser damage increased from 150 to 175
  - Rocket damage increased from 50 to 100
  - Rocket splash radius increased from 10 to 15
  - Rockets more likely to impact in an area around the target
- Panzer nerf:
  - Missile lifetime decreased from 8 to 5 seconds
- Nova change:
  - Metal cost increased from 120 to 180
  - Nova bubble now does 35 AOE damage on death after 1 second
- Loki buff:
  - Turn acceleration increased from 20 to 30
  - Turret pitch angle tolerance increased from 0 to 30
- Lancer nerf:
  - Weapon range decreased from 80 to 75
- Meteor nerf:
  - Health decreased from 3000 to 2000
  - Turn speed increased from 40 to 60
- Havoc buff:
  - Health decreased from 650 to 450
  - Speed increased from 12 to 15
  - Turn speed increased from 60 to 90
- Patriot nerf:
  - Rate of fire per volley decreased from 1 to 0.83

### Fixes

- Infiltrator now selects as a combat air unit
- Thor main cannon less likely to shoot into the ground
- Scout Bot Radar mode renamed to Investigator Radar mode
- Nova now properly auto-attacks targets
- Lockheed bullets now correctly exit from the gun barrel
- Lancer no longer fires above tall units at max range
- Spoiler land mines no longer block pathing

## v0.16.0 - 2016/06/27

### General

- Added ability to hold fire to Spoiler mines
- Imperator now launches drones against ground targets
- Performance improvements to Salamander and its turret

### Balance

- Havoc buff
  - Weapon starts fully charged
- Black Knight buff
- Speed, acceleration and deceleration increased from 14 to 20
- Deathmark buff
- Rate of fire changed from 7 to 6
- Stoke buff
  - Speed increased from 13 to 14
- Mass Extractor buff
  - Metal cost decreased from 240 to 220
- Imperator change
  - Launches drones against ground targets
  - Orbital to ground damage decreased from 300 to 50

### Fixes

- Starcannon unit pods now always visible
- Epoch shots blocked by Ramparts
- Purgers from Necromancers now correctly grouped with Purgers built from factories

## v0.15.0 - 2016/06/20

### General

- Miniman projectiles now show a trail
- Scorpion hit FX changed to better show AoE
- Improved Stoke textures
- Firebird now uses the same laser effect as the Scythe to improve performance
- Remove numerous redundant files
- Optimise Legion Ubercannon sim performance
- Changed Firebird description to mention it's interplanetary
- Enforcer now displays FX on death

### Balance

[Full unit stats](https://palobby.com/legion-expansion/units)

- Tyr buff:
  - Can now target underwater and seafloor units
- Scorpion buff:
  - Increased lifetime of shots from 1.5 to 3
- Firebird nerf:
  - Only damages air units
- Comet nerf:
  - Health reduced from 2500 to 1900
  - Planetary arrival cooldown increased from 3 to 8
- Rig buff:
  - Health increased from 600 to 3600
  - Energy income increased from 1080 to 10800
- Centurion buff:
  - Increased rate of fire from 2.5 to 4
- Air Foundry buff:
- Metal cost decreased from 720 to 600
- Advanced Air Foundry buff:
  - Energy usage reduced from 3000 to 1650
  - Metal usage increased from 48 to 50
- Ship Foundry buff:
  - Energy usage increased from 675 to 800
  - Metal usage increased from 15 to 20
- Advanced Ship Foundry buff:
  - Energy usage decreased from 2025 to 1750
- Guardian nerf:
  - No longer amphibious
- Shredder buff:
  - Check for target tick rate changed from 3 to 2
  - Does not spread its damage output across multiple targets
- Iron Dome buff:
  - Missile initial and max velocity increased from 500 to 1500
  - Energy usage decreased from 9000 to 4000
  - Metal usage increased from 45 to 60
- Peacekeeper buff:
  - Vision radius increased from 100 to 105
- Fabrication Walker buff:
  - Energy usage decreased from 675 to 650
- Advanced Armour Fabricator buff:
  - Metal cost decreased from 2400 to 2250
- Supernova buff:
  - Damage to orbital units decreased from 100% to 33%
  - Energy usage decreased from 18000 to 6000
  - Metal usage decreased from 120 to 90
- Fabrication Vessel nerf:
  - Energy usage increased from 800 to 850
- Advanced Fabrication Vessel buff:
  - Health increased from 450 to 675
- Advanced Ship Foundry change:
  - Energy usage increased from 1750 to 1900
  - Metal usage increased from 1900 to 65
- Tola nerf:
  - Metal cost increased from 900 to 1000
  - Health increased from 900 to 1000
- Miniman buff:
  - Disabled friendly fire

### Fixes

- Rampart textures now show when it's built on the water
- Fixed bone structure of the Stoke
- Marauder muzzle flash now displayed
- Fixed animation errors generated by Black Knight
- All instances of armour now spelled the same
- Praetorian can now use teleporters
- Clots now correctly block all hover and large amphibious units
- Centurion plays sound when it fires
- Removed Tsunami duplicate weapon
- Tsunami plays sound when it fires
- Scorpion weapon charging FX now correctly align with firing sequence
- Investigator radar FX better aligned to model
- Lancer firing FX better aligned to model
- Miniman bomb explosions don't end prematurely

## v0.14.1 - 2016/06/10

### General

- AI updated for Starcannon changes

### Balance

- Comet nerf:
  - Added 3 second cooldown on arrival at a new planet
- Starcannon buff:
  - Can now build the Orbweaver

### Fixes

- Stoke and Corsair now display the correct cost to build
- AI no longer tries to have the Praetorian build things it can't

## v0.14.0 - 2016/06/06

### General

- Switched Deathmark and Havoc on the build bar so their positions are better aligned with MLA roles
- Switched Salamander and Infiltrator on the build bar so their positions are better aligned with MLA roles
- Added a firing effect to the Miniman
- Added idle effect to Salamander
- Salamander turrets now auto fire rather than requiring manual attack orders

### Balance

- Salamander buff:
  - Turrets now automatically deployed though manual deployment is still possible
  - Turret health increased from 1500 to 2500
  - Turret damage increased from 10 to 15
- Infiltrator nerf:
  - Metal cost increased from 300 to 450
  - Health decreased from 350 to 250
  - Rate of fire decreased from 4 to 2
  - Increased angle of fire from 180 to 360 degrees
- Starcannon nerf:
  - Removed option to build Enforcer
  - Removed option to build Scorpion
  - Build power decreased from 50/2100 to 45/1900
  - Rate of fire decreased from 6 to 3
  - Unit pod velocity decreased from 150 to 120
  - Metal cost reduced from 1500 to 900
- Meteor change:
  - Drone storage capacity reduced from 18 to 14
  - Drone damage increased from 15 to 20

### Fixes

- Welcome message now links to correct Legion Expansion forum thread
- Fix bot fabricator having wrong metal cost
- Meteor launch smoke now shoots in the correct direction
- Miniman bomb explosion effect now timed correctly with explosion
- Rockteeth given identical rate of fire and damage as other Commanders to ensure fairness
- Fixed bug preventing Necromancer from sometimes spawning all its Purgers

## v0.13.0 - 2016/05/29

### General

- Mixed MLA/Legion armies now use a custom icon on the player list

### Balance

- Starcannon nerf:
  - Pods can now be shot down by Bluehawks, Catapults, Stingrays and Panzers
- Decimator buff:
  - Health increased from 1500 to 2500
- Panzer nerf:
  - Missiles can now be shot down by GIL-Es

### Fixes

- Removed an invalid ammo type to prevent errors
- Panzer no longer misses at close range
- Legion tag no longer shown in UI in non-Legion games

## v0.12.0 - 2016/05/23

### General

- Improved MLA selection graphics in lobby
- In-game menu is now red when Legion UI is enabled
- Removed blue shadows from UI elements when Legion UI is enabled
- Novas prioritise air
- Optimised Nova effects for performance
- Standardised colouring of commanders on game launch splash
- Standardised colouring of Commanders in lobby
- Infiltrator's probe scan effect plays more than once after deployment to more clearly show its function
- Wraith renamed to Spectre
- Excalibur renamed to Paladin
- Added idle effects to the Havoc
- Improved PA start-up time when Legion is disabled through use of new companion mod feature
- Improved Investigator description
- Improved game logging

### Balance

- Diplomat buffed
  - Cost reduced from 50,000 metal to 40,000 to match Halley

### Fixes

- Fixed build icon weapon symbols for Catfish, Bowhead and Talos
- Fixed numerous textures being too bright
- Adding unit card pictures for Booms spawned by Necromancers
- Log no longer shows errors for invalid impact decal
- Fixed placement size of basic and advanced Vehicle Foundry and the advanced Walker Foundry
- Build bar buttons turn red when clicked not blue
- Sub-orders from the orders bar are now also red
- Fixed boundary and selection box of the Holocene
- Legion lobby no longer obscures Lobby System Preview mod's planet display
- Slot colour now correct shade of grey after removing an AI player
- Legion Commanders highlighted red in commander selection even if the Legion theme is disabled
- Fixed ready button moving after being clicked
- Starcannon pods correctly display their trail
- Description of Kosmos now correctly states that it attacks land
- Starcannon description no longer claims it's a teleporter
- Booms spawned by the Necromancer now have alt-fire
- Purger can attack surface naval ships close to the shore
- Fixed strategic icon warnings in log
- Intro buttons properly sized for latest PA versions

## v0.11.0 - 2016/05/16

### General

- Patriots automatically place themselves at the back of formations
- MLA Commanders now outlined in blue in the lobby to match Legion
- Earthshaker causes smaller forest fires
- Corsair prioritises structures (excluding walls) over mobile units
- Rampart uses team colour for its switching off effect

### Balance

- Gustav nerfed:
  - range decreased to 500 from 550
- Earthshaker nerfed:
  - damage reduced from 2000 to 1500
- Comet nerfed:
  - build cost increased from 2400 metal to 2500
  - health decreased from 4000 to 2500
  - bomber tag added to ensure ground AA shoots it before fighters
- Nova overhaul:
  - build cost increased from 90 metal to 120
  - health decreased from 180 to 120
  - causes constant damage to all enemy air units within close proximity for 20 seconds
- Miniman buffed:
  - bomb health increased from 125 to 130
  - bomb explosion timer decreased from 3 seconds to 2.5
  - bomb splash damage decreased from 500 to 250

### Fixes

- Moved Rampart to correct location on build bar
- Fixed colour of spectators in lobby when Legion theme is active
- Fixed colour of Legion tag in games browser
- Stoke now uses correct weapon identifier on its factory build image
- Corsair now uses correct weapon identifier on its factory build image
- Investigator in radar mode no longer creates errors in the logs
- Fixed Decimator rocket trail

## v0.10.1 - 2016/05/13

- Added BETA tag to mod name
- Updated mod description to list known issues
- Updated lobby welcome screen to list known issues

## v0.10.0 - 2016/05/09

### General

- New build effect
- Improved Purger description
- More work done on the lobby UI
- Titans prioritise shooting other Titans
- Improved ability of Arsonist to hit units
- Optimisation of Arsonist effects to reduce lag
- Hives can no longer overlap other units during placement
- Hive selection hexagon size increased to properly fit the unit
- Legion players now have a Legion Commander icon on the player list
- Legion UI can now be disabled separately for the menu and in-game UI
- Improvements to the way the intro video is displayed
- Improved main menu load time when Legion theme is disabled
- Optimised background images to reduce mod size

### Balance

- Black Knight now heavily drains Ramparts
- Hive nerfed:
  - reload time increased from 10 seconds to 14
  - no longer accepts orders
  - health reduced from 125 to 100
  - cost increased from 600 metal to 750
  - Swarms are now properly targeted by other units
  - Swarm speed lowered from 60 to 50
  - Swarms no longer accept orders
  - Swarm lifetime lowered to 6 seconds from 6.5
- Peacekeeper buffed:
  - weapon range increased from 70 to 75
- Air bomb splash damage only affects air units
- Monstrosity nerfed:
  - metal cost increased from 1700 to 1800
  - health decreased from 6100 to 6000
  - acceleration and brake decreased from 40/30 to 10/10
  - turn speed decreased from 60 to 45
  - main cannon yaw rate decreased from 70 to 30
- Purger buffed:
  - damage increased from 350 to 450
- Stoke buffed:
  - damage increased from 35 to 39
  - splash damage increased from 10 to 25
  - splash radius decreased from 7 to 6
- Lancer tweaked:
  - damage against bots decreased by 15%
  - damage against vehicles increased by 10%
  - less likely to fire into the ground and do no damage to target
- Excalibur nerf:
  - health decreased from 650 to 350
- Reduced Tyr splash radius from 180 to 160

### Fixes

- Marauder firing sound fixed
- Fix Rockteeth commander not having a torpedo weapon

## v0.9.1 - 2016/05/03

- Fixed bug preventing the Enderstryke71 and Nefelpitou Commanders from building
- Restored Rockteeth build effects
- The Imperator orbital battleship is now buildable
- Fixed the Marauder description

## v0.9.0 - 2016/05/02

- Public beta release

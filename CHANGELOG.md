## CHANGELOG

#### v1.3.2 - 2018-04-08

###### Fixes

 - Infiltrator can now move between planets per its description
 - AI checks it can afford the build and running costs of the Infiltrator before building it


#### v1.3.1 - 2018-03-26

###### Translations

 - Expanded to cover lobby chat messages
 - Added French (fr) and German (de) for lobby only, pending further unit description translations
 - Commander names are no longer translated so as to resolve them being displayed incorrectly in the lobby
 - Unit names are no longer translated in any language to ensure consistency of communication


#### v1.3 - 2018/03/15

###### General

 - Maul, Earthshaker and Necromancer move to 10% of their range when attacking
 - Thor will move to bring its multilaser into range when attacking
 - AI no longer builds the Necromancer

###### Translations

For languages which use the Latin alphabet we are not including unit name translations at this time so as to avoid confusion when referring to units across languages. This was done on the advice of a number of our bilingual players.

We can't include translations for client components like the lobby pop-up at this time due to client mod translations breaking vanilla translations. We have put the necessary frameworks in place for the future though.

Thanks to everyone who has contributed so far!

Translations added:

   - en-US, English (US)
   - ko, Korean
   - nl, Dutch

###### Balance

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


#### v1.2.1 - 2017/09/01

###### General

 - Initial lobby pop-up now states how to play as Legion

###### Fixes

 - Fixed multiple intro buttons appearing when Legion was installed by a player not logged into Ubernet
 - POV button coloured to match Legion theme


#### v1.2 - 2017/06/20

###### General

 - AI puts greater distance between Rigs to avoid chain reactions
 - Added support for new MLA Commanders
 - Removed Wrasse

###### Balance

 - Star Cannon
   - Added three second delay between unit builds (same as Unit Cannon)


#### v1.1 - 2017/02/03

###### General

 - Standardised metal texture across faction to resolve light/dark contrast between units
 - Resolved all instances of Tron lines on units
 - Replaced some low quality textures

###### Fixes

 - Holocene and Wrasse given correct selection shape
 - Removed further unnecessary files to minimise mod size
 - Catfish strategic icon properly reflects its ability to fire torpedoes and is slightly larger now


#### v1.0.2 - 2016/12/30

###### Fixes

 - Fixed Holocene being buildable by Fabrication Starship


#### v1.0.1 - 2016/12/22

###### Fixes

 - Fixed Jaeger splash being twice its weapon's damage


#### v1.0 - 2016/12/22

###### General

 - Removed BETA from Legion UI and added version number
 - Updated AI for changes to Starcannon buildable units
 - AI can build Wrasse

###### Balance

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

###### Fixes

 - Fixed use of invalid form of RGB curve in fabber spray effects
 - Fixed Ripple and Tsunami torpedoes colliding with the sea floor on certain maps
 - Necromancer Purger metal value set to match that of the Purger


#### v0.18.2 - 2016/11/22

###### Fixes

 - Correct version shown in UI


#### v0.18.1 - 2016/11/22

###### General

 - Replace metal texture on multiple units to ensure consistency across faction
 - Guardian tooltip more accurately describes its abilities
 - Disabled the AI building the Starcannon due to some associated server crashes

###### Fixes

 - Holocene correctly flagged as a Titan


#### v0.18.0 - 2016/10/03

###### IMPORTANT

 - The server mod HodgePodge has been added as a dependency. If your strategic icons are missing you need to install this mod in CMM.
 - Please uninstall Weapons Tracking as the required changes have been merged directly into Legion.
 - Report any crashes experienced while playing with Legion
   - Windows - https://wiki.palobby.com/wiki/Windows#Reporting_Windows_Issues
   - OS X - https://wiki.palobby.com/wiki/OS_X#Reporting_OS_X_Issues
   - Linux - https://wiki.palobby.com/wiki/Linux/SteamOS#Reporting_Linux_Issues

###### General

 - Anti-air symbol added to Jaeger build bar icon
 - Weapon range circles disabled for uncontrollable entities
 - Earthshaker camera shake reduced by 50%
 - Necromancer's Purgers no longer selectable with factory built Purgers and have been coloured red to distinguish them
 - Strategic icons now show for jumping Purgers and Investigators

###### Balance

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

###### Fixes

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


#### v0.17.0 - 2016/07/18

###### General

 - Salamander banking angle increased from 0.25 to 0.5
 - Havoc no longer prefers to be at the back of a formation
 - Removed generic aircraft death explosion effect from Nova bubble
 - Added idle and death explosion effects for Nova bubble
 - Performance improvements to Nova targeting laser
 - Reduced Loki formation spacing
 - Reduced Meteor formation spacing
 - Miniman no longer prioritises Commander
 - New Stoke model

###### Balance

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

###### Fixes

 - Infiltrator now selects as a combat air unit
 - Thor main cannon less likely to shoot into the ground
 - Scout Bot Radar mode renamed to Investigator Radar mode
 - Nova now properly auto-attacks targets
 - Lockheed bullets now correctly exit from the gun barrel
 - Lancer no longer fires above tall units at max range
 - Spoiler land mines no longer block pathing


#### v0.16.0 - 2016/06/27

###### General

 - Added ability to hold fire to Spoiler mines
 - Imperator now launches drones against ground targets
 - Performance improvements to Salamander and its turret

###### Balance

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

###### Fixes

 - Starcannon unit pods now always visible
 - Epoch shots blocked by Ramparts
 - Purgers from Necromancers now correctly grouped with Purgers built from factories


#### v0.15.0 - 2016/06/20

###### General

 - Miniman projectiles now show a trail
 - Scorpion hit FX changed to better show AoE
 - Improved Stoke textures
 - Firebird now uses the same laser effect as the Scythe to improve performance
 - Remove numerous redundant files
 - Optimise Legion ubercannon sim performance
 - Changed Firebird description to mention it's interplanetary
 - Enforcer now displays FX on death

###### Balance

Full unit stats - https://palobby.com/legion-expansion/units

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

###### Fixes

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


#### v0.14.1 - 2016/06/10

###### General

 - AI updated for Starcannon changes

###### Balance

 - Comet nerf:
   - Added 3 second cooldown on arrival at a new planet
 - Starcannon buff:
   - Can now build the Orbweaver

###### Fixes

 - Stoke and Corsair now display the correct cost to build
 - AI no longer tries to have the Praetorian build things it can't


#### v0.14.0 - 2016/06/06

###### General

 - Switched Deathmark and Havoc on the build bar so their positions are better aligned with MLA roles
 - Switched Salamander and Infiltrator on the build bar so their positions are better aligned with MLA roles
 - Added a firing effect to the Miniman
 - Added idle effect to Salamander
 - Salamander turrets now auto fire rather than requiring manual attack orders

###### Balance

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

###### Fixes

 - Welcome message now links to correct Legion Expansion forum thread
 - Fix bot fabricator having wrong metal cost
 - Meteor launch smoke now shoots in the correct direction
 - Miniman bomb explosion effect now timed correctly with explosion
 - Rockteeth given identical rate of fire and damage as other Commanders to ensure fairness
 - Fixed bug preventing Necromancer from sometimes spawning all its Purgers


#### v0.13.0 - 2016/05/29

###### General

 - Mixed MLA/Legion armies now use a custom icon on the player list

###### Balance

 - Starcannon nerf:
   - Pods can now be shot down by Bluehawks, Catapults, Stingrays and Panzers
 - Decimator buff:
   - Health increased from 1500 to 2500
 - Panzer nerf:
   - Missiles can now be shot down by GIL-Es

###### Fixes

 - Removed an invalid ammo type to prevent errors
 - Panzer no longer misses at close range
 - Legion tag no longer shown in UI in non-Legion games


#### v0.12.0 - 2016/05/23

###### General

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

###### Balance

 - Diplomat buffed
   - Cost reduced from 50,000 metal to 40,000 to match Halley

###### Fixes

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


#### v0.11.0 - 2016/05/16

###### General

 - Patriots automatically place themselves at the back of formations
 - MLA Commanders now outlined in blue in the lobby to match Legion
 - Earthshaker causes smaller forest fires
 - Corsair prioritises structures (excluding walls) over mobile units
 - Rampart uses team colour for its switching off effect

###### Balance

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

###### Fixes

 - Moved Rampart to correct location on build bar
 - Fixed colour of spectators in lobby when Legion theme is active
 - Fixed colour of Legion tag in games browser
 - Stoke now uses correct weapon identifier on its factory build image
 - Corsair now uses correct weapon identifier on its factory build image
 - Investigator in radar mode no longer creates errors in the logs
 - Fixed Decimator rocket trail


#### v0.10.1 - 2016/05/13

 - Added BETA tag to mod name
 - Updated mod description to list known issues
 - Updated lobby welcome screen to list known issues


#### v0.10.0 - 2016/05/09

###### General

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

###### Balance

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

###### Fixes

 - Marauder firing sound fixed
 - Fix Rockteeth commander not having a torpedo weapon


#### v0.9.1 - 2016/05/03

 - Fixed bug preventing the Enderstryke71 and Nefelpitou Commanders from building
 - Restored Rockteeth build effects
 - The Imperator orbital battleship is now buildable
 - Fixed the Marauder description


#### v0.9.0 - 2016/05/02

 - Public beta release

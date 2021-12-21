var legionLiveGameBuildBarLoaded;

if (!legionLiveGameBuildBarLoaded) {
  legionLiveGameBuildBarLoaded = true;

  function legionLiveGameBuildBar() {
    try {
      if (model.BuildSet && model.BuildSet.tabsTemplate) {
        model.BuildSet.tabsTemplate = model.BuildSet.tabsTemplate.concat([
          ["L_factory", "!LOC:factory", true],
          ["L_combat", "!LOC:combat", true],
          ["L_utility", "!LOC:utility", true],
          ["L_vehicle", "!LOC:vehicle"],
          ["L_bot", "!LOC:bot"],
          ["L_air", "!LOC:air"],
          ["L_sea", "!LOC:sea"],
          ["L_orbital", "!LOC:orbital", true],
          ["L_orbital_structure", "orbital structure", true],
          ["L_ammo", "!LOC:ammo", true],
        ]);
      }

      ko.computed(function () {
        var buildSet = model.buildSet();
        if (!buildSet) {
          return;
        }
        var hotkeys = model.hotkeys();
        var groups = buildSet.tabsByGroup();

        setTimeout(function () {
          // Get tab hotkeys
          _.forEach(buildSet.tabs(), function (tab) {
            var baseTab = tab.group().replace("L_", "");
            if (!tab.label()) {
              tab.label(groups[baseTab].label());
            }
            tab.hotkey(hotkeys["tab_" + baseTab] || "");

            tab.buildGroup = tab.buildGroup || ko.observable(baseTab);
            tab.buildGroup(baseTab);
          });
        }, 0);
      });

      handlers.start_build_sequence = model.startBuildSequence = function (
        params
      ) {
        var group = params.group;
        var locked = params.locked;

        var tabs = model
          .buildSet()
          .tabs()
          .filter(function (tab) {
            console.debug(tab.buildGroup());
            return tab.visible() && tab.buildGroup() === group;
          });
        if (tabs.length < 1) {
          return;
        }
        group = tabs[0].group();

        model.activeBuildGroup(group);
        if (locked) {
          model.activeBuildGroupLocked(locked);
        }
      };

      var themeSetting =
        api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
      if (themeSetting === "ON") {
        loadCSS(
          "coui://ui/mods/com.pa.legion-expansion/css/legion_build_bar.css"
        );
        loadScript("coui://ui/mods/com.pa.legion-expansion/common.js");

        // eslint-disable-next-line no-undef
        var legionspecids = legion.builders;

        model.isLegionOrMixedOrVanilla = function (data) {
          if (data.buildSet()) {
            var legionCount = 0;
            var specsLength = 0;
            var selectedSpecs = data.buildSet().selectedSpecs();

            _.forOwn(selectedSpecs, function (value, key) {
              if (_.includes(legionspecids, key)) {
                legionCount++;
              }
              specsLength++;
            });
            if (legionCount === specsLength) {
              return "legion";
            } else if (legionCount > 0 && legionCount < specsLength) {
              return "mixed";
            } else {
              return "vanilla";
            }
          }
          return null;
        };

        loadScript("coui://ui/mods/com.pa.legion-expansion/common_faction.js");
      }
    } catch (e) {
      console.log(e);
      console.log(JSON.stringify(e));
    }
  }
  legionLiveGameBuildBar();
}

(function () {
  try {
    var legionTabs = [
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
    ];

    if (model.BuildSet && model.BuildSet.tabsTemplate) {
      model.BuildSet.tabsTemplate =
        model.BuildSet.tabsTemplate.concat(legionTabs);
    }

    // Stock sets every tab's hotkey to hotkeys["tab_" + group] on each tab switch.
    var addLegionTabHotkeys = function (hotkeys) {
      var aliases = {};
      _.forEach(legionTabs, function (tab) {
        var key = "tab_" + tab[0];
        var baseHotkey = hotkeys["tab_" + tab[0].substring(2)];
        if (hotkeys[key] !== baseHotkey) {
          aliases[key] = baseHotkey;
        }
      });
      if (!_.isEmpty(aliases)) {
        model.hotkeys(_.assign({}, hotkeys, aliases));
      }
    };
    model.hotkeys.subscribe(addLegionTabHotkeys);
    addLegionTabHotkeys(model.hotkeys());

    var stockStartBuildSequence = model.startBuildSequence;
    handlers.start_build_sequence = model.startBuildSequence = function (
      params
    ) {
      var buildSet = model.buildSet();
      if (!buildSet) {
        return;
      }
      var tabsByGroup = buildSet.tabsByGroup();
      var group = _.find([params.group, "L_" + params.group], function (key) {
        return (
          Object.prototype.hasOwnProperty.call(tabsByGroup, key) &&
          tabsByGroup[key].visible()
        );
      });
      var tab = group && tabsByGroup[group];
      if (!tab && params.group) {
        // Other mods set buildGroup to map a tab to a base group: Bugs Faction's
        // tab_hotkeys.js as an observable, Dynastiya's build_bar.js as a string.
        tab = _.find(buildSet.tabs(), function (candidate) {
          if (!candidate.visible()) {
            return false;
          }
          var buildGroup = _.isFunction(candidate.buildGroup)
            ? candidate.buildGroup()
            : candidate.buildGroup;
          return buildGroup === params.group;
        });
      }
      if (tab) {
        stockStartBuildSequence(_.assign({}, params, { group: tab.group() }));
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
      var legionSpecIds = legion.builders;
      // eslint-disable-next-line no-undef
      var specPath = legion.specPath;

      var isLegionOrMixedOrVanilla = function (data) {
        if (data.buildSet()) {
          var legionCount = 0;
          var specsLength = 0;
          var selectedSpecs = data.buildSet().selectedSpecs();

          _.forOwn(selectedSpecs, function (value, key) {
            if (_.includes(legionSpecIds, specPath(key))) {
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

      model.isLegion = function (data) {
        return isLegionOrMixedOrVanilla(data) === "legion";
      };

      model.isMixed = function (data) {
        return isLegionOrMixedOrVanilla(data) === "mixed";
      };

      // eslint-disable-next-line no-undef
      legion.appendBinding(
        ".body_panel",
        "legionCss: { legion: model.isLegion($data), mixed: model.isMixed($data)}"
      );
    }
  } catch (e) {
    console.error("Legion Expansion: " + (e.stack || e.message || e));
  }
})();

(function () {
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
          var baseTab = tab.group().replace(/^L_/, "");
          if (
            !tab.label() &&
            Object.prototype.hasOwnProperty.call(groups, baseTab)
          ) {
            tab.label(groups[baseTab].label());
          }
          tab.hotkey(hotkeys["tab_" + baseTab] || "");
        });
      }, 0);
    });

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
      if (!tab) {
        // Bugs Faction's tab_hotkeys.js sets buildGroup to map its tabs to a base group.
        tab = _.find(buildSet.tabs(), function (candidate) {
          return (
            candidate.visible() &&
            candidate.buildGroup &&
            candidate.buildGroup() === params.group
          );
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

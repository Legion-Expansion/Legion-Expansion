var legionLiveGameActionBarLoaded;

if (!legionLiveGameActionBarLoaded) {
  legionLiveGameActionBarLoaded = true;

  function legionLiveGameActionBar() {
    try {
      var themeSetting =
        api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
      if (themeSetting === "ON") {
        loadCSS(
          "coui://ui/mods/com.pa.legion-expansion/css/legion_action_bar.css"
        );

        model.isLegionOrMixedOrVanilla = function (data) {
          var legionCount = 0;
          var specsLength = 0;
          var selectedSpecs = data.selection().spec_ids;

          _.forOwn(selectedSpecs, function (value, key) {
            if (key.indexOf("/l_") > 2) {
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
        };

        loadScript("coui://ui/mods/com.pa.legion-expansion/common_faction.js");
      }
    } catch (e) {
      console.log(e);
      console.log(JSON.stringify(e));
    }
  }
  legionLiveGameActionBar();
}

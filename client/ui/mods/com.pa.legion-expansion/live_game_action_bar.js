var legionLiveGameActionBarLoaded;

if (!legionLiveGameActionBarLoaded) {
  legionLiveGameActionBarLoaded = true;

  function legionLiveGameActionBar() {
    try {
      var themesetting =
        api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
      if (themesetting === "ON") {
        loadCSS(
          "coui://ui/mods/com.pa.legion-expansion/css/legion_action_bar.css"
        );

        model.isLegionOrMixedOrVanilla = function (data) {
          var legioncount = 0;
          var specslength = 0;
          var selectedspecs = data.selection().spec_ids;

          _.forOwn(selectedspecs, function (value, key) {
            if (key.indexOf("/l_") > 2) {
              legioncount++;
            }
            specslength++;
          });
          if (legioncount === specslength) {
            return "legion";
          } else if (legioncount > 0 && legioncount < specslength) {
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

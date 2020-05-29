var legionExpansionLoaded;

if (!legionExpansionLoaded) {
  legionExpansionLoaded = true;

  function legionExpansion() {
    var patchName = "legionExpansion live_game_action_bar.js";

    console.log(patchName + " on " + gBuild + " last tested on 89755");

    var themesetting =
      api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
    if (themesetting === "ON") {
      //LOAD CUSTOM LEGION ACTIONBAR CSS
      loadCSS(
        "coui://ui/mods/com.pa.legion-expansion/css/legion_action_bar.css"
      );

      model.isLegionOrMixedOrVanilla = function (data) {
        try {
          var legioncount = 0;
          var specslength = 0;
          var selectedspecs = data.selection().spec_ids;

          _.forOwn(selectedspecs, function (value, key) {
            if (key.indexOf("/l_") > 2) {
              legioncount++;
            }
            specslength++;
          });
          if (legioncount == specslength) {
            return "legion";
          } else {
            if (legioncount > 0 && legioncount < specslength) {
              return "mixed";
            } else {
              return "vanilla";
            }
          }
        } catch (e) {
          return "";
        }
      };

      model.isLegion = function (data) {
        if (model.isLegionOrMixedOrVanilla(data) === "legion") {
          return true;
        } else {
          return false;
        }
      };

      model.isMixed = function (data) {
        if (model.isLegionOrMixedOrVanilla(data) === "mixed") {
          return true;
        } else {
          return false;
        }
      };

      //ADD legion class to build_bar_menu
      $(".body_panel").attr(
        "data-bind",
        "css: { legion: model.isLegion($data), mixed: model.isMixed($data)}"
      );
    }
  }

  try {
    legionExpansion();
  } catch (e) {
    console.log(e);
    console.log(JSON.stringify(e));
  }
}

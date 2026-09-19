var legionLiveGameBuildHoverLoaded;

function legionLiveGameBuildHover() {
  if (legionLiveGameBuildHoverLoaded) {
    return;
  }
  legionLiveGameBuildHoverLoaded = true;

  try {
    var themeSetting =
      api.settings.isSet("ui", "legionThemeFunction", true) || "ON";

    if (themeSetting !== "ON") {
      return;
    }

    loadCSS(
      "coui://ui/mods/com.pa.legion-expansion/css/legion_build_hover.css"
    );

    handlers.legionui = function (payload) {
      require([
        "coui://ui/mods/com.pa.legion-expansion/common_functions.js",
      ], function (common) {
        common.bodyPanelClass(payload);
      });
    };
  } catch (e) {
    "Legion Expansion: " + (e.stack || e.message || e);
  }
}
legionLiveGameBuildHover();

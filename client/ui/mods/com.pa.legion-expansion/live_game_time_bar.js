var legionLiveGameTimeBarLoaded;

if (!legionLiveGameTimeBarLoaded) {
  legionLiveGameTimeBarLoaded = true;

  function legionLiveGameTimeBar() {
    try {
      var themeSetting =
        api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
      if (themeSetting === "ON") {
        loadCSS(
          "coui://ui/mods/com.pa.legion-expansion/css/legion_time_bar.css"
        );

        handlers.legionui = function (payload) {
          require([
            "coui://ui/mods/com.pa.legion-expansion/common_functions.js",
          ], function (common) {
            common.bodyPanelClass(payload);
          });
        };
      }
    } catch (e) {
      console.error(e);
      console.error(JSON.stringify(e));
    }
  }
  legionLiveGameTimeBar();
}

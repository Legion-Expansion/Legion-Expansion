var legionExpansionLoaded;

if (!legionExpansionLoaded) {
  legionExpansionLoaded = true;

  function legionLiveGameTimeBar() {
    try {
      var themesetting =
        api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
      if (themesetting === "ON") {
        loadCSS(
          "coui://ui/mods/com.pa.legion-expansion/css/legion_time_bar.css"
        );
      }

      handlers.legionui = function (payload) {
        console.log("SET UI : " + payload);
        if (payload === "legion") {
          $(".body_panel").addClass("legionui");
        }
        if (payload === "mixed") {
          $(".body_panel").addClass("mixedui");
        }
      };
    } catch (e) {
      console.log(e);
      console.log(JSON.stringify(e));
    }
  }
  legionLiveGameTimeBar();
}

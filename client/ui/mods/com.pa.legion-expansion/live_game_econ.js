var legionLiveGameEconLoaded;

if (!legionLiveGameEconLoaded) {
  legionLiveGameEconLoaded = true;

  function legionLiveGameEcon() {
    try {
      var themeSetting =
        api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
      if (themeSetting === "ON") {
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_econ.css");
        loadScript("coui://ui/mods/com.pa.legion-expansion/common_handlers.js");
      }
    } catch (e) {
      console.log(e);
      console.log(JSON.stringify(e));
    }
  }
  legionLiveGameEcon();
}

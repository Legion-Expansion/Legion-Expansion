var legionLiveGameMenuLoaded;

if (!legionLiveGameMenuLoaded) {
  legionLiveGameMenuLoaded = true;

  function legionLiveGameMenu() {
    try {
      var themeSetting =
        api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
      if (themeSetting === "ON") {
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_menu.css");
        loadScript("coui://ui/mods/com.pa.legion-expansion/common_handlers.js");
      }
    } catch (e) {
      console.log(e);
      console.log(JSON.stringify(e));
    }
  }
  legionLiveGameMenu();
}

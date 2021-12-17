var legionLiveGameBuildHoverLoaded;

if (!legionLiveGameBuildHoverLoaded) {
  legionLiveGameBuildHoverLoaded = true;

  function legionLiveGameBuildHover() {
    try {
      var themesetting =
        api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
      if (themesetting === "ON") {
        loadCSS(
          "coui://ui/mods/com.pa.legion-expansion/css/legion_build_hover.css"
        );
        loadScript("coui://ui/mods/com.pa.legion-expansion/common_handlers.js");
      }
    } catch (e) {
      console.log(e);
      console.log(JSON.stringify(e));
    }
  }
  legionLiveGameBuildHover();
}

var legionLiveGameMenuLoaded;

function legionLiveGameMenu() {
  if (legionLiveGameMenuLoaded) {
    return;
  }
  legionLiveGameMenuLoaded = true;

  try {
    const themeSetting =
      api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
    if (themeSetting === "ON") {
      loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_menu.css");

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
legionLiveGameMenu();

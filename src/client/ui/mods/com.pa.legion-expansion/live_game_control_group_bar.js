var legionLiveGameControlGroupLoaded;

if (!legionLiveGameControlGroupLoaded) {
  legionLiveGameControlGroupLoaded = true;

  function legionLiveGameControlGroup() {
    try {
      var themeSetting =
        api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
      if (themeSetting === "ON") {
        loadCSS(
          "coui://ui/mods/com.pa.legion-expansion/css/legion_control_group_bar.css"
        );
      }

      handlers.legionui = function (payload) {
        require([
          "coui://ui/mods/com.pa.legion-expansion/common_functions.js",
        ], function (common) {
          common.bodyPanelClass(payload);

          var src = "coui://ui/main/game/live_game/img/control_group_bar/";
          var path =
            "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/";
          var colour = common.uiColour(payload);

          model.imageSourceForType = function (type) {
            return common.imageSourceForType(path, colour, type);
          };

          common.toggleImage(src, path, colour, "icon_category_bot.png");
          common.toggleImage(src, path, colour, "icon_category_tank.png");
          common.toggleImage(src, path, colour, "icon_category_air.png");
          common.toggleImage(src, path, colour, "icon_category_naval.png");
          common.toggleImage(src, path, colour, "icon_category_orbital.png");
          common.toggleImage(src, path, colour, "icon_category_advanced.png");
          common.toggleImage(src, path, colour, "icon_category_fabber.png");
        });
      };
    } catch (e) {
      console.error(e);
      console.error(JSON.stringify(e));
    }
  }
  legionLiveGameControlGroup();
}

var legionExpansionLoaded;

if (!legionExpansionLoaded) {
  legionExpansionLoaded = true;

  function legionLiveGameControlGroup() {
    try {
      var themesetting =
        api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
      if (themesetting === "ON") {
        loadCSS(
          "coui://ui/mods/com.pa.legion-expansion/css/legion_control_group_bar.css"
        );
      }

      handlers.legionui = function (payload) {
        console.log("SET UI : " + payload);
        if (payload === "legion") {
          $(".body_panel").addClass("legionui");

          model.imageSourceForType = function (type) {
            return (
              "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_" +
              type.toLowerCase() +
              ".png"
            );
          };
          $(
            'img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_bot.png"]'
          ).attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_bot.png"
          );
          $(
            'img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_tank.png"]'
          ).attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_tank.png"
          );
          $(
            'img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_air.png"]'
          ).attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_air.png"
          );
          $(
            'img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_naval.png"]'
          ).attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_naval.png"
          );
          $(
            'img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_orbital.png"]'
          ).attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_orbital.png"
          );
          $(
            'img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_advanced.png"]'
          ).attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_advanced.png"
          );
          $(
            'img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_fabber.png"]'
          ).attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_fabber.png"
          );
        }
        if (payload === "mixed") {
          $(".body_panel").addClass("mixedui");

          model.imageSourceForType = function (type) {
            return (
              "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/purple/icon_category_" +
              type.toLowerCase() +
              ".png"
            );
          };
          $(
            'img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_bot.png"]'
          ).attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/purple/icon_category_bot.png"
          );
          $(
            'img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_tank.png"]'
          ).attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/purple/icon_category_tank.png"
          );
          $(
            'img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_air.png"]'
          ).attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/purple/icon_category_air.png"
          );
          $(
            'img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_naval.png"]'
          ).attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/purple/icon_category_naval.png"
          );
          $(
            'img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_orbital.png"]'
          ).attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/purple/icon_category_orbital.png"
          );
          $(
            'img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_advanced.png"]'
          ).attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/purple/icon_category_advanced.png"
          );
          $(
            'img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_fabber.png"]'
          ).attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/purple/icon_category_fabber.png"
          );
        }
      };
    } catch (e) {
      console.log(e);
      console.log(JSON.stringify(e));
    }
  }
  legionLiveGameControlGroup();
}

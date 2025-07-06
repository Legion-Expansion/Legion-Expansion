var legionLiveGameOptionsBarLoaded;

function legionLiveGameOptionsBar() {
  if (legionLiveGameOptionsBarLoaded) {
    return;
  }
  legionLiveGameOptionsBarLoaded = true;

  try {
    const themeSetting =
      api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
    if (themeSetting === "ON") {
      loadCSS(
        "coui://ui/mods/com.pa.legion-expansion/css/legion_options_bar.css"
      );
    }

    handlers.legionui = function (payload) {
      require([
        "coui://ui/mods/com.pa.legion-expansion/common_functions.js",
      ], function (common) {
        common.bodyPanelClass(payload);

        const src = "img/ingame_options_bar/";
        const path =
          "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/";
        const colour = common.uiColour(payload);

        const togglePip = function () {
          const png1 = "pip_off.png";
          const png2 = "pip_on.png";
          common.toggleImage(src, path, colour, png1, png2);
          model.pipImage = ko.computed(function () {
            return common.togglePanel(model.pip(), path, colour, png1, png2);
          });
        };
        togglePip();

        const toggleUberBar = function () {
          const png1 = "uberbar_hide.png";
          const png2 = "uberbar_show.png";
          common.toggleImage(src, path, colour, png1, png2);
          model.uberBarImage = ko.computed(function () {
            return common.togglePanel(
              model.uberBar(),
              path,
              colour,
              png1,
              png2
            );
          });
        };
        toggleUberBar();

        common.toggleImage(src, path, colour, "chronocam.png");
        common.toggleImage(src, path, colour, "game_menu.png");
        common.toggleImage(src, path, colour, "pov.png");
      });
    };
  } catch (e) {
    console.error(e);
    console.error(JSON.stringify(e));
  }
}
legionLiveGameOptionsBar();

var legionLiveGameOptionsBarLoaded;

if (!legionLiveGameOptionsBarLoaded) {
  legionLiveGameOptionsBarLoaded = true;

  function legionLiveGameOptionsBar() {
    try {
      api.mods.getMounted("server").then(function (mods) {
        var legionServerLoaded =
          _.intersection(_.pluck(mods, "identifier"), [
            "com.pa.legion-expansion-server",
            "com.pa.legion-expansion-server-dev",
          ]).length > 0;
        if (legionServerLoaded) {
          loadScript("coui://ui/mods/com.pa.legion-expansion/version.js");
          $(".div_ingame_options_bar_cont").prepend(
            "<div id='legion_watermark' class='watermark'><loc>Legion</loc>&nbsp;" +
              // eslint-disable-next-line no-undef
              version +
              "</div>"
          );
          locTree($("#legion_watermark"));
        }
      });

      loadCSS(
        "coui://ui/mods/com.pa.legion-expansion/css/legion_watermark.css"
      );

      var themeSetting =
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

          var src = "img/ingame_options_bar/";
          var path =
            "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/";
          var colour = common.uiColour(payload);

          var togglePip = function () {
            var png1 = "pip_off.png";
            var png2 = "pip_on.png";
            common.toggleImage(src, path, colour, png1, png2);
            model.pipImage = ko.computed(function () {
              return common.togglePanel(model.pip(), path, colour, png1, png2);
            });
          };
          togglePip();

          var toggleUberBar = function () {
            var png1 = "uberbar_hide.png";
            var png2 = "uberbar_show.png";
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
}

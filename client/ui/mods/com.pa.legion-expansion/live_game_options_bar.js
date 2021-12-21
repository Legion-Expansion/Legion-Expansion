var legionLiveGameOptionsBarLoaded;

if (!legionLiveGameOptionsBarLoaded) {
  legionLiveGameOptionsBarLoaded = true;

  function legionLiveGameOptionsBar() {
    try {
      api.mods.getMounted("server").then(function (mods) {
        var legionServerLoaded =
          _.intersection(_.pluck(mods, "identifier"), [
            "com.pa.legion-expansion-server",
            "com.pa.legion-expansion-server-master",
            "com.pa.legion-expansion-server-balance",
            "com.pa.legion-expansion-server-dev",
          ]).length > 0;
        if (legionServerLoaded) {
          $(".div_ingame_options_bar_cont").prepend(
            "<div id='legion_watermark' class='watermark'><loc>Legion</loc>&nbsp;#.##.#</div>"
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

          var colour = common.uiColour(payload);
          var src = "img[src='img/ingame_options_bar/";
          var path =
            "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/";

          var png1 = "pip_off.png";
          var png2 = "pip_on.png";
          common.toggleImage(src, path, colour, png1, png2);
          model.pipImage = ko.computed(function () {
            png1 = "pip_off.png";
            png2 = "pip_on.png";
            return common.togglePanel(model.pip(), path, colour, png1, png2);
          });

          png1 = "uberbar_hide.png";
          png2 = "uberbar_show.png";
          common.toggleImage(src, path, colour, png1, png2);
          model.uberBarImage = ko.computed(function () {
            png1 = "uberbar_hide.png";
            png2 = "uberbar_show.png";
            return common.togglePanel(
              model.uberBar(),
              path,
              colour,
              png1,
              png2
            );
          });

          png1 = "chronocam.png";
          common.toggleImage(src, path, colour, png1);

          png1 = "game_menu.png";
          common.toggleImage(src, path, colour, png1);

          png1 = "pov.png";
          common.toggleImage(src, path, colour, png1);
        });
      };
    } catch (e) {
      console.error(e);
      console.error(JSON.stringify(e));
    }
  }
  legionLiveGameOptionsBar();
}

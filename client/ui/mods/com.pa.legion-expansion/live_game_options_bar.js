var legionExpansionLoaded;

if (!legionExpansionLoaded) {
  legionExpansionLoaded = true;

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
            "<div class='watermark'><loc>Legion</loc>&nbsp;1.21.0</div>"
          );
          locUpdateDocument();
        }
      });

      loadCSS(
        "coui://ui/mods/com.pa.legion-expansion/css/legion_watermark.css"
      );

      var themesetting =
        api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
      if (themesetting === "ON") {
        loadCSS(
          "coui://ui/mods/com.pa.legion-expansion/css/legion_options_bar.css"
        );
      }

      handlers.legionui = function (payload) {
        console.log("SET UI : " + payload);
        //temporary watermark

        if (payload === "legion") {
          $(".body_panel").addClass("legionui");

          model.pipImage = ko.computed(function () {
            return model.pip()
              ? "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/pip_off.png"
              : "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/pip_on.png";
          });

          model.uberBarImage = ko.computed(function () {
            return model.uberBar()
              ? "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/uberbar_hide.png"
              : "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/uberbar_show.png";
          });

          //replace images
          $('img[src="img/ingame_options_bar/pip_off.png"]').attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/pip_off.png"
          );
          $('img[src="img/ingame_options_bar/pip_on.png"]').attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/pip_on.png"
          );
          $('img[src="img/ingame_options_bar/uberbar_hide.png"]').attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/uberbar_hide.png"
          );
          $('img[src="img/ingame_options_bar/uberbar_show.png"]').attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/uberbar_show.png"
          );
          $('img[src="img/ingame_options_bar/chronocam.png"]').attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/chronocam.png"
          );
          $('img[src="img/ingame_options_bar/game_menu.png"]').attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/game_menu.png"
          );
          $('img[src="img/ingame_options_bar/pov.png"]').attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/pov.png"
          );
        }
        if (payload === "mixed") {
          $(".body_panel").addClass("mixedui");

          model.pipImage = ko.computed(function () {
            return model.pip()
              ? "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/pip_off.png"
              : "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/pip_on.png";
          });

          model.uberBarImage = ko.computed(function () {
            return model.uberBar()
              ? "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/uberbar_hide.png"
              : "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/uberbar_show.png";
          });

          //replace images
          $('img[src="img/ingame_options_bar/pip_off.png"]').attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/pip_off.png"
          );
          $('img[src="img/ingame_options_bar/pip_on.png"]').attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/pip_on.png"
          );
          $('img[src="img/ingame_options_bar/uberbar_hide.png"]').attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/uberbar_hide.png"
          );
          $('img[src="img/ingame_options_bar/uberbar_show.png"]').attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/uberbar_show.png"
          );
          $('img[src="img/ingame_options_bar/chronocam.png"]').attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/chronocam.png"
          );
          $('img[src="img/ingame_options_bar/game_menu.png"]').attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/game_menu.png"
          );
          $('img[src="img/ingame_options_bar/pov.png"]').attr(
            "src",
            "coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/pov.png"
          );
        }
      };
    } catch (e) {
      console.log(e);
      console.log(JSON.stringify(e));
    }
  }
  legionLiveGameOptionsBar();
}

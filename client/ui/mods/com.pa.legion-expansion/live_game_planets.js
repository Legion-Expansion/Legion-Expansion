var legionLiveGamePlanetsLoaded;

if (!legionLiveGamePlanetsLoaded) {
  legionLiveGamePlanetsLoaded = true;

  function legionLiveGamePlanets() {
    try {
      var themesetting =
        api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
      if (themesetting === "ON") {
        loadCSS(
          "coui://ui/mods/com.pa.legion-expansion/css/legion_planets.css"
        );
      }

      handlers.legionui = function (payload) {
        if (payload === "vanilla") {
          return null;
        }

        var colour = "";

        if (payload === "legion") {
          $(".body_panel").addClass("legionui");
          colour = "red";
        } else {
          $(".body_panel").addClass("mixedui");
          colour = "purple";
        }

        require([
          "coui://ui/mods/com.pa.legion-expansion/legion_common_functions.js",
        ], function (common) {
          var src = "img[src='coui://ui/main/shared/img/controls";
          var path = "coui://ui/mods/com.pa.legion-expansion/img/controls/";
          var png1 = "/pin_open.png";
          var png2 = "/pin_closed.png";

          var panelPath = function (panel) {
            return panel ? path + colour + png1 : path + colour + png2;
          };

          model.toggleImage = ko.computed(function () {
            common.toggleImage(src, path, colour, png1, png2);
            return panelPath(model.showCelestialViewModels());
          });
        });
      };
    } catch (e) {
      console.log(e);
      console.log(JSON.stringify(e));
    }
  }
  legionLiveGamePlanets();
}

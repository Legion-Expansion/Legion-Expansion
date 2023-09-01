var legionLiveGamePlanetsLoaded;

if (!legionLiveGamePlanetsLoaded) {
  legionLiveGamePlanetsLoaded = true;

  function legionLiveGamePlanets() {
    try {
      var themeSetting =
        api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
      if (themeSetting === "ON") {
        loadCSS(
          "coui://ui/mods/com.pa.legion-expansion/css/legion_planets.css"
        );
      }

      handlers.legionui = function (payload) {
        require([
          "coui://ui/mods/com.pa.legion-expansion/common_functions.js",
        ], function (common) {
          common.bodyPanelClass(payload);

          var src = "coui://ui/main/shared/img/controls/";
          var path = "coui://ui/mods/com.pa.legion-expansion/img/controls/";
          var colour = common.uiColour(payload);
          var png1 = "pin_open.png";
          var png2 = "pin_closed.png";

          common.toggleImage(src, path, colour, png1, png2);

          model.toggleImage = ko.computed(function () {
            return common.togglePanel(
              model.showCelestialViewModels(),
              path,
              colour,
              png1,
              png2
            );
          });
        });
      };
    } catch (e) {
      console.error(e);
      console.error(JSON.stringify(e));
    }
  }
  legionLiveGamePlanets();
}

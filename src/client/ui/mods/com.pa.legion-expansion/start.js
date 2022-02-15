var legionStartLoaded;

if (!legionStartLoaded) {
  legionStartLoaded = true;

  function legionStart() {
    try {
      model.legionPlayVideo = function () {
        engine.call(
          "web.launchPage",
          "https://gaming.youtube.com/embed/aqzdPnJfKMo?autoplay=1"
        );
      };

      $("div.view_intro:contains(View Intro)").after(
        loadHtml("coui://ui/mods/com.pa.legion-expansion/legion_intro.html")
      );
      locTree($("#legion_intro"));

      $("div.div_watermarks").css("bottom", "95px");

      var themeSetting =
        api.settings.isSet("ui", "legionMenuThemeFunction", true) || "ON";

      if (themeSetting === "ON") {
        loadCSS(
          "coui://ui/mods/com.pa.legion-expansion/css/legion_buttons.css"
        );
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_shared.css");
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/start.css");
        $("body").addClass("legion");
      }
    } catch (e) {
      console.error(e);
      console.error(JSON.stringify(e));
    }
  }
  legionStart();
}

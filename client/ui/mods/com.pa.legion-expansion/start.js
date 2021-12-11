var legionStartLoaded;

if (!legionStartLoaded) {
  legionStartLoaded = true;

  function legionStart() {
    try {
      // includes some temp CSS until next PTE

      $("div.view_intro:contains(View Intro)")
        // .css("padding", "flex")
        // .css("text-align", "center")
        // .css("flex-grow", "1")
        // .css("justify-content", "center")
        // .css("flex-direction", "column")
        .after(
          '<div class="btn_std_ix view_intro" style="display: flex; text-align: center; flex-grow: 1; justify-content: center; flex-direction: column" data-bind="click: legionPlayVideo, click_sound: \'default\', rollover_sound: \'default\'"><loc>Legion Intro</loc></div>'
        );
      locUpdateDocument();

      $("div.div_watermarks").css("bottom", "95px");

      model.legionPlayVideo = function () {
        engine.call(
          "web.launchPage",
          "https://gaming.youtube.com/embed/aqzdPnJfKMo?autoplay=1"
        );
      };

      var themesetting =
        api.settings.isSet("ui", "legionMenuThemeFunction", true) || "ON";

      if (themesetting === "ON") {
        loadCSS(
          "coui://ui/mods/com.pa.legion-expansion/css/legion_buttons.css"
        );
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_shared.css");
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/start.css");
        $("body").addClass("legion");
      }
    } catch (e) {
      console.error(e);
    }
  }
  legionStart();
}

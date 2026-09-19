(function () {
  try {
    model.legionPlayVideo = function () {
      engine.call(
        "web.launchPage",
        "https://www.youtube.com/watch?v=aqzdPnJfKMo"
      );
    };

    $("#left-panel-footer .view_intro").after(
      loadHtml("coui://ui/mods/com.pa.legion-expansion/legion_intro.html")
    );
    locTree($("#legion_intro"));

    var themeSetting =
      api.settings.isSet("ui", "legionMenuThemeFunction", true) || "ON";

    if (themeSetting === "ON") {
      loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_buttons.css");
      loadCSS("coui://ui/mods/com.pa.legion-expansion/css/start.css");
      $("body").addClass("legion");
      // stock start.js pins the computed logo image inline before mod CSS loads
      $("#logo-background").css("background-image", "");
    }
  } catch (e) {
    console.error("Legion Expansion: " + (e.stack || e.message || e));
  }
})();

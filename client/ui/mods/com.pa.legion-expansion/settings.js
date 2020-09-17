var legionExpansionLoaded;

if (!legionExpansionLoaded) {
  legionExpansionLoaded = true;

  function legionExpansion() {
    var patchName = "legionExpansion settings.js";

    console.log(patchName + " on " + gBuild + " last tested on 114218");
    _.extend(api.settings.definitions.ui.settings, {
      legionThemeFunction: {
        title: "Theme In Game",
        type: "select",
        default: "ON",
        options: ["ON", "OFF"],
      },
    });

    _.extend(api.settings.definitions.ui.settings, {
      legionMenuThemeFunction: {
        title: "Theme Menu",
        type: "select",
        default: "ON",
        options: ["ON", "OFF"],
      },
    });

    model.settingDefinitions(api.settings.definitions);

    $(".option-list.ui .form-group").append(
      $.ajax({
        type: "GET",
        url: "coui://ui/mods/com.pa.legion-expansion/settings.html",
        async: false,
      }).responseText
    );
  }

  try {
    legionExpansion();
  } catch (e) {
    console.log(e);
    console.log(JSON.stringify(e));
  }
}

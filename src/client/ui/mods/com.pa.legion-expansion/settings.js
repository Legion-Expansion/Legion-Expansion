var legionSettingsLoaded;

if (!legionSettingsLoaded) {
  legionSettingsLoaded = true;

  function legionSettings() {
    try {
      _.assign(api.settings.definitions.ui.settings, {
        legionThemeFunction: {
          title: "Theme In Game",
          type: "select",
          default: "ON",
          options: ["ON", "OFF"],
        },
      });

      _.assign(api.settings.definitions.ui.settings, {
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
    } catch (e) {
      console.error(e);
      console.error(JSON.stringify(e));
    }
  }
  legionSettings();
}

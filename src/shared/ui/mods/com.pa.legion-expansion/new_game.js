(function () {
  try {
    var legionExpansionEnabled = false;

    model.isLegion = function (commander) {
      // eslint-disable-next-line no-undef
      return _.includes(legion.commanders, commander);
    };

    model.enableLegion = function () {
      if (legionExpansionEnabled) {
        return;
      }

      legionExpansionEnabled = true;

      if (_.isFunction(model.aiPersonalities)) {
        model.aiPersonalities.valueHasMutated();
      } else {
        model.aiPersonalityNames(_.keys(model.aiPersonalities));
      }

      //legion commander picker colouring
      loadCSS(
        "coui://ui/mods/com.pa.legion-expansion/css/legion_commander_picker.css"
      );

      loadScript("coui://ui/mods/com.pa.legion-expansion/common.js");

      //Style Commander Picker Legion
      // eslint-disable-next-line no-undef
      legion.appendBinding(
        "#commander-picker .div-commander-picker-item.btn_std_ix, #ai-commander-picker .div-commander-picker-item.btn_std_ix",
        "legionCss: {legioncommander: model.isLegion($data)}"
      );

      //Style Slot Legion
      // eslint-disable-next-line no-undef
      legion.appendBinding(
        ".slot-player",
        "legionCss: {legionslot: !$data.isEmpty() && model.isLegion($data.commander()), mlaslot: !$data.isEmpty() && !model.isLegion($data.commander())}"
      );

      _.defer(function () {
        if (model.localChatMessage) {
          model.localChatMessage(
            loc("!LOC:Legion Expansion"),
            loc("!LOC:To play as the Legion select one of the red Commanders.")
          );
        }
      });
    };

    if (
      _.intersection(model.gameModIdentifiers(), [
        "com.pa.legion-expansion-server",
        "com.pa.legion-expansion-server-dev",
      ]).length > 0
    ) {
      model.enableLegion();
    }
  } catch (e) {
    console.error("Legion Expansion: " + (e.stack || e.message || e));
  }
})();

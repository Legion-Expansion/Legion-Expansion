var legionNewGameLoaded;

function legionNewGame() {
  if (legionNewGameLoaded) {
    return;
  }
  legionNewGameLoaded = true;

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
      $("#commander-picker .div-commander-picker-item.btn_std_ix").attr(
        "data-bind",
        "css: {legioncommander: model.isLegion($data)}, click: function () { model.setCommander($index()) }, click_sound: 'default', rollover_sound: 'default'"
      );
      $("#ai-commander-picker .div-commander-picker-item.btn_std_ix").attr(
        "data-bind",
        "css: {legioncommander: model.isLegion($data)}, click: function () { model.setAICommander(model.selectedAI(), $data) }, click_sound: 'default', rollover_sound: 'default'"
      );

      //Style Slot Legion
      $(".slot-player").attr(
        "data-bind",
        "css: {legionslot: !$data.isEmpty() && model.isLegion($data.commander()), mlaslot: !$data.isEmpty() && !model.isLegion($data.commander()), ready: isReady, loading: isLoading}"
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
    "Legion Expansion: " + (e.stack || e.message || e);
  }
}
legionNewGame();

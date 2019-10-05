var legionExpansionLoaded;

if (!legionExpansionLoaded) {
  legionExpansionLoaded = true;

  function legionExpansion() {
    console.log("legionExpansion new_game.js last tested on 94533+");

    var legionExpansionEnabled = false;

    model.enableLegion = function() {
      if (legionExpansionEnabled) {
        return;
      }

      console.log("legionExpansion new_game.js enabled");

      legionExpansionEnabled = true;

      var newBuild = _.isFunction(model.aiPersonalities);

      var aiPersonalities = newBuild
        ? model.aiPersonalities()
        : model.aiPersonalities;

      if (newBuild) {
        model.aiPersonalities.valueHasMutated();
      } else {
        model.aiPersonalityNames(_.keys(aiPersonalities));
      }

      model.legionClientModLoaded = ko.observable(false);

      model.legionDoNotShowWelcome = ko
        .observable(false)
        .extend({ local: "legion_welcome_dontshow" });

      model.legionToggleDoNotShowWelcome = function() {
        model.legionDoNotShowWelcome(!model.legionDoNotShowWelcome());
      };

      model.legionUrlClicked = function(data, event) {
        if (event && event.target && event.target.href) {
          model.legionOpenUrl(event.target.href);
        }
      };

      model.legionOpenUrl = function(url) {
        engine.call("web.launchPage", url);
      };

      model.legionCloseWelcome = function() {
        $("#legion-welcome").fadeOut();
        $("body").off("keypress", model.legionCloseWelcome);
      };

      model.legionShowWelcome = function() {
        $("body").on("keypress", model.legionCloseWelcome);
        $("#legion-welcome")
          .delay(1000)
          .fadeIn();
      };

      var themesetting =
        api.settings.isSet("ui", "legionMenuThemeFunction", true) || "ON";
      if (themesetting === "ON") {
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_shared.css");
        loadCSS(
          "coui://ui/mods/com.pa.legion-expansion/css/legion_buttons.css"
        );
        loadCSS(
          "coui://ui/mods/com.pa.legion-expansion/css/background_no_logo.css"
        );
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/new_game.css");
        $("body").addClass("legion");
      }
      //legion commander picker colouring
      loadCSS(
        "coui://ui/mods/com.pa.legion-expansion/css/legion_commander_picker.css"
      );

      //legion welcome screen
      loadCSS("coui://ui/mods/com.pa.legion-expansion/css/welcome.css");
      $("body").append(
        loadHtml("coui://ui/mods/com.pa.legion-expansion/new_game/welcome.html")
      );

      api.mods.getMountedMods("client", function(mods) {
        var legionClientLoaded =
          _.intersection(_.pluck(mods, "identifier"), [
            "com.pa.legion-expansion-client",
            "com.pa.legion-expansion-client-master",
            "com.pa.legion-expansion-client-balance",
            "com.pa.legion-expansion-client-dev"
          ]).length > 0;

        model.legionClientModLoaded(legionClientLoaded);

        if (!legionClientLoaded) {
          if (model.registerHoldReady)
            model.registerHoldReady(
              "com.pa.legion-expansion-client",
              "Legion Client Mod Missing"
            );
          if (model.localChatMessage)
            model.localChatMessage(
              "Legion Expansion",
              "Legion Expansion client mod is not installed!"
            );
        }

        if (!model.legionDoNotShowWelcome() && !model.returnFromLoad()) {
          model.legionShowWelcome();
        }
      });

      loadScript("coui://ui/mods/com.pa.legion-expansion/common.js");

      var legioncommanders = legionglobal.commanders;

      model.isNotLegion = function(commander, isEmpty) {
        if (!isEmpty) {
          return !_.includes(legioncommanders, commander);
        } else {
          return true;
        }
      };

      model.isMLA = function(commander, isEmpty) {
        if (!isEmpty) {
          return !_.includes(legioncommanders, commander);
        }
      };

      //Style Commander Picker Legion
      $("#commander-picker .div-commander-picker-item.btn_std_ix").attr(
        "data-bind",
        "css: {legioncommander: !model.isNotLegion($data)}, click: function () { model.setCommander($index()) }, click_sound: 'default', rollover_sound: 'default'"
      );
      $("#ai-commander-picker .div-commander-picker-item.btn_std_ix").attr(
        "data-bind",
        "css: {legioncommander: !model.isNotLegion($data)}, click: function () { model.setAICommander(model.selectedAI(), $data) }, click_sound: 'default', rollover_sound: 'default'"
      );

      //Style Slot Legion
      $(".slot-player").attr(
        "data-bind",
        "css: {legionslot: !model.isNotLegion($data.commander(),$data.isEmpty()), mlaslot: model.isMLA($data.commander(),$data.isEmpty()), ready: isReady, loading: isLoading}"
      );
    };

    if (
      _.intersection(model.gameModIdentifiers(), [
        "com.pa.legion-expansion-server",
        "com.pa.legion-expansion-server-master",
        "com.pa.legion-expansion-server-balance",
        "com.pa.legion-expansion-server-dev"
      ]).length > 0
    ) {
      model.enableLegion();
    }

    _.defer(function() {
      model.localChatMessage(
        loc("!LOC:Legion Expansion"),
        loc("!LOC:To play as the Legion select one of the red Commanders.")
      );
    });
  }

  try {
    legionExpansion();
  } catch (e) {
    console.error(e);
  }
}

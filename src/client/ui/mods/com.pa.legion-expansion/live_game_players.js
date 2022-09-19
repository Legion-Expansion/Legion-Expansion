var legionLiveGamePlayersLoaded;

if (!legionLiveGamePlayersLoaded) {
  legionLiveGamePlayersLoaded = true;

  function legionLiveGamePlayers() {
    try {
      loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_players.css");
      loadScript("coui://ui/mods/com.pa.legion-expansion/common.js");

      var checkCommanders = function (commanders) {
        var legionCount = 0;
        var specsLength = 0;
        if (commanders !== undefined) {
          _.forOwn(commanders, function (value) {
            // eslint-disable-next-line no-undef
            if (_.includes(legion.commanders, value)) {
              legionCount++;
            }
            specsLength++;
          });
          if (legionCount === specsLength) {
            return "legion";
          } else if (legionCount > 0 && legionCount < specsLength) {
            return "mixed";
          }
        }
        return "vanilla";
      };

      var isLegionOrMixedOrVanilla = ko.computed(function () {
        var selectedSpecs = model.player().commanders;
        return checkCommanders(selectedSpecs);
      });

      model.isLegion = ko.computed(function () {
        return isLegionOrMixedOrVanilla() === "legion";
      });

      model.isMixed = ko.computed(function () {
        return isLegionOrMixedOrVanilla() === "mixed";
      });

      var legionStart = ko.observable(false);
      var themeSetting =
        api.settings.isSet("ui", "legionThemeFunction", true) || "ON";

      model.player.subscribe(function () {
        if (!legionStart()) {
          if (themeSetting === "ON") {
            var ui = isLegionOrMixedOrVanilla();

            if (ui !== "legion" && ui !== "mixed") {
              return;
            }

            api.Panel.message("selection", "legionui", ui);
            api.Panel.message("planets", "legionui", ui);
            api.Panel.message("control_group_bar", "legionui", ui);
            api.Panel.message("econ", "legionui", ui);
            api.Panel.message("options_bar", "legionui", ui);
            api.Panel.message("build_hover", "legionui", ui);
            api.Panel.message("time_bar", "legionui", ui);
            api.Panel.message("menu", "legionui", ui);

            require([
              "coui://ui/mods/com.pa.legion-expansion/common_functions.js",
            ], function (common) {
              var src = "coui://ui/main/shared/img/controls/";
              var path = "coui://ui/mods/com.pa.legion-expansion/img/controls/";
              var colour = common.uiColour(ui);
              var png1 = "pin_open.png";
              var png2 = "pin_closed.png";

              common.toggleImage(src, path, colour, png1, png2);

              model.playerPanelToggleImage = ko.computed(function () {
                return common.togglePanel(
                  model.showPlayerListPanel(),
                  path,
                  colour,
                  png1,
                  png2
                );
              });

              model.spectatorPanelToggleImage = ko.computed(function () {
                return common.togglePanel(
                  model.showSpectatorPanel(),
                  path,
                  colour,
                  png1,
                  png2
                );
              });
            });
          }
          legionStart(true);
        }
      });

      if (themeSetting === "ON") {
        $(".body_panel").attr(
          "data-bind",
          "css: { legionui: model.isLegion(), mixedui: model.isMixed()}, visible: show"
        );
      }

      model.commanderImage = function (data) {
        var result = "";
        switch (checkCommanders(data.commanders)) {
          case "legion":
            result =
              "coui://ui/mods/com.pa.legion-expansion/img/icon_player_outline_l.png";
            break;
          case "mixed":
            result =
              "coui://ui/mods/com.pa.legion-expansion/img/icon_player_outline_m.png";
            break;
          default:
            result =
              "coui://ui/main/game/live_game/img/players_list_panel/icon_player_outline.png";
            break;
        }
        return result;
      };

      model.commanderImageMaskLeg = function (data) {
        return checkCommanders(data.commanders) === "legion";
      };

      model.commanderImageMaskMix = function (data) {
        return checkCommanders(data.commanders) === "mixed";
      };

      $(
        'img[src="img/players_list_panel/icon_player_outline.png"]'
      ).replaceWith(
        '<img data-bind="attr:{src: model.commanderImage($data)}" />'
      );
      $(".player_masked").attr(
        "data-bind",
        "style: { backgroundColor: color }, css: { legcom: model.commanderImageMaskLeg($data), mixcom: model.commanderImageMaskMix($data)}"
      );
    } catch (e) {
      console.error(e);
      console.error(JSON.stringify(e));
    }
  }
  legionLiveGamePlayers();
}

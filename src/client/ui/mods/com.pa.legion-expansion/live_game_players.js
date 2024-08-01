var legionLiveGamePlayersLoaded;

function legionLiveGamePlayers() {
  if (legionLiveGamePlayersLoaded) {
    return;
  }
  legionLiveGamePlayersLoaded = true;

  try {
    loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_players.css");
    loadScript("coui://ui/mods/com.pa.legion-expansion/common.js");

    const checkCommanders = function (commanders) {
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

    const isLegionOrMixedOrVanilla = ko.computed(function () {
      const selectedSpecs = model.player().commanders;
      return checkCommanders(selectedSpecs);
    });

    model.isLegion = ko.computed(function () {
      return isLegionOrMixedOrVanilla() === "legion";
    });

    model.isMixed = ko.computed(function () {
      return isLegionOrMixedOrVanilla() === "mixed";
    });

    const legionStart = ko.observable(false);
    const themeSetting =
      api.settings.isSet("ui", "legionThemeFunction", true) || "ON";

    model.player.subscribe(function () {
      if (!legionStart()) {
        if (themeSetting === "ON") {
          const ui = isLegionOrMixedOrVanilla();

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
            const src = "coui://ui/main/shared/img/controls/";
            const path = "coui://ui/mods/com.pa.legion-expansion/img/controls/";
            const colour = common.uiColour(ui);
            const png1 = "pin_open.png";
            const png2 = "pin_closed.png";

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
      switch (checkCommanders(data.commanders)) {
        case "legion":
          return "coui://ui/mods/com.pa.legion-expansion/img/icon_player_outline_l.png";
        case "mixed":
          return "coui://ui/mods/com.pa.legion-expansion/img/icon_player_outline_m.png";
        default:
          return "coui://ui/main/game/live_game/img/players_list_panel/icon_player_outline.png";
      }
    };

    model.commanderImageMaskLeg = function (data) {
      return checkCommanders(data.commanders) === "legion";
    };

    model.commanderImageMaskMix = function (data) {
      return checkCommanders(data.commanders) === "mixed";
    };

    $('img[src="img/players_list_panel/icon_player_outline.png"]').replaceWith(
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

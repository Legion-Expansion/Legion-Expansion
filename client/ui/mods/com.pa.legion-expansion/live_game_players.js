var legionExpansionLoaded;

if (!legionExpansionLoaded) {
  legionExpansionLoaded = true;

  function legionLiveGamePlayers() {
    try {
      //LOAD CUSTOM LEGION CSS
      loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_players.css");
      loadScript("coui://ui/mods/com.pa.legion-expansion/common.js");

      //see global.js
      // eslint-disable-next-line no-undef
      var legioncomms = legionglobal.commanders;
      var themesetting =
        api.settings.isSet("ui", "legionThemeFunction", true) || "ON";

      model.checkCommanders = function (commanders) {
        try {
          var legioncount = 0;
          var specslength = 0;
          if (commanders !== undefined) {
            _.forOwn(commanders, function (value) {
              if (_.includes(legioncomms, value)) {
                legioncount++;
              }
              specslength++;
            });
            if (legioncount == specslength) {
              return "legion";
            } else {
              if (legioncount > 0 && legioncount < specslength) {
                return "mixed";
              } else {
                return "vanilla";
              }
            }
          } else {
            return "vanilla";
          }
        } catch (e) {
          console.log(e);
          console.log(JSON.stringify(e));
          return "";
        }
      };

      model.isLegionOrMixedOrVanilla = ko.computed(function () {
        try {
          var selectedspecs = model.player().commanders;
          return model.checkCommanders(selectedspecs);
        } catch (e) {
          console.log(e);
          console.log(JSON.stringify(e));
          return "";
        }
      });

      model.isLegion = ko.computed(function () {
        if (model.isLegionOrMixedOrVanilla() === "legion") {
          return true;
        } else {
          return false;
        }
      });

      model.isMixed = ko.computed(function () {
        if (model.isLegionOrMixedOrVanilla() === "mixed") {
          return true;
        } else {
          return false;
        }
      });

      model.legionstart = ko.observable(false);

      model.player.subscribe(function () {
        if (!model.legionstart()) {
          if (themesetting === "ON") {
            var ui = model.isLegionOrMixedOrVanilla();
            api.Panel.message("selection", "legionui", ui);
            api.Panel.message("planets", "legionui", ui);
            api.Panel.message("control_group_bar", "legionui", ui);
            api.Panel.message("econ", "legionui", ui);
            api.Panel.message("options_bar", "legionui", ui);
            api.Panel.message("build_hover", "legionui", ui);
            api.Panel.message("time_bar", "legionui", ui);
            api.Panel.message("menu", "legionui", ui);

            if (ui === "legion") {
              var toggleImage = function (open) {
                return open
                  ? "coui://ui/mods/com.pa.legion-expansion/img/controls/red/pin_open.png"
                  : "coui://ui/mods/com.pa.legion-expansion/img/controls/red/pin_closed.png";
              };

              model.playerPanelToggleImage = ko.computed(function () {
                return toggleImage(model.showPlayerListPanel());
              });
              model.spectatorPanelToggleImage = ko.computed(function () {
                return toggleImage(model.showSpectatorPanel());
              });

              $(
                'img[src="coui://ui/main/shared/img/controls/pin_open.png"]'
              ).attr(
                "src",
                "coui://ui/mods/com.pa.legion-expansion/img/controls/red/pin_open.png"
              );
              $(
                'img[src="coui://ui/main/shared/img/controls/pin_closed.png"]'
              ).attr(
                "src",
                "coui://ui/mods/com.pa.legion-expansion/img/controls/red/pin_closed.png"
              );
            }
            if (ui === "mixed") {
              toggleImage = function (open) {
                return open
                  ? "coui://ui/mods/com.pa.legion-expansion/img/controls/purple/pin_open.png"
                  : "coui://ui/mods/com.pa.legion-expansion/img/controls/purple/pin_closed.png";
              };

              model.playerPanelToggleImage = ko.computed(function () {
                return toggleImage(model.showPlayerListPanel());
              });
              model.spectatorPanelToggleImage = ko.computed(function () {
                return toggleImage(model.showSpectatorPanel());
              });

              $(
                'img[src="coui://ui/main/shared/img/controls/red/pin_open.png"]'
              ).attr(
                "src",
                "coui://ui/mods/com.pa.legion-expansion/img/controls/purple/pin_open.png"
              );
              $(
                'img[src="coui://ui/main/shared/img/controls/red/pin_closed.png"]'
              ).attr(
                "src",
                "coui://ui/mods/com.pa.legion-expansion/img/controls/purple/pin_closed.png"
              );
            }
          }
          model.legionstart(true);
        }
      });

      if (themesetting === "ON") {
        $(".body_panel").attr(
          "data-bind",
          "css: { legionui: model.isLegion(), mixedui: model.isMixed()}, visible: show"
        );
      }

      //COMMANDER IMAGE
      model.commanderImage = function (d) {
        var result = "";
        switch (model.checkCommanders(d.commanders)) {
          case "vanilla":
            result =
              "coui://ui/main/game/live_game/img/players_list_panel/icon_player_outline.png";
            break;
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

      model.commanderImageMaskLeg = function (d) {
        if (model.checkCommanders(d.commanders) === "legion") {
          return true;
        } else {
          return false;
        }
      };

      model.commanderImageMaskMix = function (d) {
        if (model.checkCommanders(d.commanders) === "mixed") {
          return true;
        } else {
          return false;
        }
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
      console.log(e);
      console.log(JSON.stringify(e));
    }
  }
  legionLiveGamePlayers();
}

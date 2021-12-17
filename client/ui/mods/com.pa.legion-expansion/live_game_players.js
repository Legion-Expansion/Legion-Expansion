var legionLiveGamePlayersLoaded;

if (!legionLiveGamePlayersLoaded) {
  legionLiveGamePlayersLoaded = true;

  function legionLiveGamePlayers() {
    try {
      loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_players.css");
      loadScript("coui://ui/mods/com.pa.legion-expansion/common.js");

      // eslint-disable-next-line no-undef
      var legioncomms = legion.commanders;
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
            if (legioncount === specslength) {
              return "legion";
            } else if (legioncount > 0 && legioncount < specslength) {
              return "mixed";
            } else {
              return "vanilla";
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
        }
        return false;
      });

      model.isMixed = ko.computed(function () {
        if (model.isLegionOrMixedOrVanilla() === "mixed") {
          return true;
        }
        return false;
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

            require([
              "coui://ui/mods/com.pa.legion-expansion/legion_common_functions.js",
            ], function (common) {
              var src = "img[src='coui://ui/main/shared/img/controls";
              var path = "coui://ui/mods/com.pa.legion-expansion/img/controls/";
              var colour = common.uiColour();
              var png1 = "/pin_open.png";
              var png2 = "/pin_closed.png";

              var panelPath = function (panel) {
                return panel ? path + colour + png1 : path + colour + png2;
              };

              model.playerPanelToggleImage = ko.computed(function () {
                common.toggleImage(src, path, colour, png1, png2);
                return panelPath(model.showPlayerListPanel());
              });
              model.spectatorPanelToggleImage = ko.computed(function () {
                common.toggleImage(src, path, colour, png1, png2);
                return panelPath(model.showSpectatorPanel());
              });
            });
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

      model.commanderImage = function (d) {
        var result = "";
        switch (model.checkCommanders(d.commanders)) {
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
        }
        return false;
      };

      model.commanderImageMaskMix = function (d) {
        if (model.checkCommanders(d.commanders) === "mixed") {
          return true;
        }
        return false;
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

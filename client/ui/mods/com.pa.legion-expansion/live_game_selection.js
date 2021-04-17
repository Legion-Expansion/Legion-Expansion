var legionExpansionLoaded;

if (!legionExpansionLoaded) {
  legionExpansionLoaded = true;

  function legionLiveGameSelection() {
    try {
      var themesetting =
        api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
      if (themesetting === "ON") {
        //LOAD CUSTOM LEGION CSS
        loadCSS(
          "coui://ui/mods/com.pa.legion-expansion/css/legion_selection.css"
        );

        model.isLegion = function (type) {
          if (themesetting === "ON") {
            var haslegionunit = false;
            try {
              if (type.indexOf("/l_") > 2) {
                haslegionunit = true;
                return haslegionunit;
              }
            } catch (e) {
              console.log(e);
              console.log(JSON.stringify(e));
            }

            return haslegionunit;
          } else {
            return false;
          }
        };

        //ADD legion class to build_bar_menu
        $(".div_unit_selection").attr(
          "data-bind",
          "css: { legion: model.isLegion($data.type)}, event: { mousedown: function (data, event) { $parent.onSelectionDisplayClick($index(), event) } }"
        );
      }

      handlers.legionui = function (payload) {
        console.log("SET UI : " + payload);
        if (payload === "legion") {
          $(".body_panel").addClass("legionui");

          var imageSourceForType = function (type) {
            return (
              "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_" +
              type.toLowerCase() +
              ".png"
            );
          };

          model.typeArray = ko.computed(function () {
            var group = model.selectionTypeCounts();

            var result = _.compact(
              _.map(model.types(), function (element) {
                if (!group[element]) return null;

                return {
                  type: element,
                  count: group[element],
                  source: imageSourceForType(element),
                };
              })
            );

            return result;
          });
        }
        if (payload === "mixed") {
          $(".body_panel").addClass("mixedui");

          imageSourceForType = function (type) {
            return (
              "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/purple/icon_category_" +
              type.toLowerCase() +
              ".png"
            );
          };

          model.typeArray = ko.computed(function () {
            var group = model.selectionTypeCounts();

            var result = _.compact(
              _.map(model.types(), function (element) {
                if (!group[element]) return null;

                return {
                  type: element,
                  count: group[element],
                  source: imageSourceForType(element),
                };
              })
            );

            return result;
          });
        }
      };
    } catch (e) {
      console.log(e);
      console.log(JSON.stringify(e));
    }
  }
  legionLiveGameSelection();
}

var legionLiveGameSelectionLoaded;

if (!legionLiveGameSelectionLoaded) {
  legionLiveGameSelectionLoaded = true;

  function legionLiveGameSelection() {
    try {
      var themeSetting =
        api.settings.isSet("ui", "legionThemeFunction", true) || "ON";
      if (themeSetting === "ON") {
        loadCSS(
          "coui://ui/mods/com.pa.legion-expansion/css/legion_selection.css"
        );

        model.isLegion = function (type) {
          if (themeSetting === "ON") {
            var haslegionunit = false;
            if (type.indexOf("/l_") > 2) {
              haslegionunit = true;
              return haslegionunit;
            }

            return haslegionunit;
          } else {
            return false;
          }
        };

        $(".div_unit_selection").attr(
          "data-bind",
          "css: { legion: model.isLegion($data.type)}, event: { mousedown: function (data, event) { $parent.onSelectionDisplayClick($index(), event) } }"
        );
      }

      handlers.legionui = function (payload) {
        if (payload === "legion") {
          $(".body_panel").addClass("legionui");

          var imageSourceForType = function (type) {
            return (
              "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_" +
              type.toLowerCase() +
              ".png"
            );
          };
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
        }

        model.typeArray = ko.computed(function () {
          var group = model.selectionTypeCounts();

          return _.compact(
            _.map(model.types(), function (element) {
              if (!group[element]) {
                return null;
              }

              return {
                type: element,
                count: group[element],
                source: imageSourceForType(element),
              };
            })
          );
        });
      };
    } catch (e) {
      console.error(e);
      console.error(JSON.stringify(e));
    }
  }
  legionLiveGameSelection();
}

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
          return themeSetting === "ON" && type.indexOf("/l_") > 2;
        };

        $(".div_unit_selection").attr(
          "data-bind",
          "css: { legion: model.isLegion($data.type)}, event: { mousedown: function (data, event) { $parent.onSelectionDisplayClick($index(), event) } }"
        );
      }

      handlers.legionui = function (payload) {
        require([
          "coui://ui/mods/com.pa.legion-expansion/common_functions.js",
        ], function (common) {
          common.bodyPanelClass(payload);

          model.typeArray = ko.computed(function () {
            var group = model.selectionTypeCounts();

            var path =
              "coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/";
            var colour = common.uiColour(payload);

            return _.compact(
              _.map(model.types(), function (element) {
                if (!group[element]) {
                  return null;
                }
                return {
                  type: element,
                  count: group[element],
                  source: common.imageSourceForType(path, colour, element),
                };
              })
            );
          });
        });
      };
    } catch (e) {
      console.error(e);
      console.error(JSON.stringify(e));
    }
  }
  legionLiveGameSelection();
}

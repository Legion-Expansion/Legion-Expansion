(function () {
    model.enableFaction = ko.observable(false);

    model.toggleEnableFaction = function () {
        model.enableFaction(!model.enableFaction());
    };

    $(".form-control-spectator").after('<div data-bind="visible: canChangeSettings"><label data-bind="click: toggleEnableFaction"><input type="checkbox" style="pointer-events: none !important;" data-bind="checked: enableFaction" /><label>Enable Legion Faction</label></div>');
})();
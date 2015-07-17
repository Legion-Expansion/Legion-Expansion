/* function kLobbyAdditions() {
    /////////////////
    //lock shared army mechanism **HIGHLY WIP**
    /////////////////
    var buildNumber = decode(sessionStorage['build_version']);

    console.log("Currently Running Legion Faction Mod on " + version + ", last tested on 82834");

    $.ajax('coui://pa/units/unit_list.json', {
        cache: false,
        async: false,
        dataType: 'json'
    }).done(function (data) {
        units_json = data.units;
    });

    if (model.factionEnabled) {
        //Restrict UI to legion units
    } else {
        //Restrict UI to vanilla units
    }
}
*/
/////////////////
//AI dropdown mechanism
/////////////////

/*(function () {
    
    model.legionOptions = ko.observableArray([
        "Vanilla",
        "Legion"
    ]);

    model.defaultLegionOption = ko.observable(model.legionOptions()[0]);
    
    $(".form-control-personality").after('<div class="form-control-personality"><select data-bind="options: model.legionOptions, selectPicker: model.defaultLegionOption, visible: model.isGameCreator" data-width="106px"></select></div>');
    
    /*var giveLegionCommander = function () {
        
    }
    switch (model.legionOptions([])) {
        case 0:
            giveLegionCommander()
            break;
        case 1:
            return;
    }*/
})();*/

/////////////////
//button
/////////////////

/*(function () {
    model.factionEnabled = ko.observable(false);
    //Toggle the boolean value of 'factionEnabled' when clicked via knockout button
    model.toggleFactionEnabled = function () {
        model.factionEnabled(!model.factionEnabled());
    };

    //Change the button text dynamically
    model.buttonText = ko.computed(function () {
        return model.factionEnabled() ? "Disable Legion Faction" : "Enable Legion Faction";
    });

    $("#game-bar").append('<div class="btn_std" id="enable_faction" data-bind="click: toggleFactionEnabled, css: { btn_hero: factionEnabled}" style="margin: 0px -15px;"><div class="btn_label" style="width: 200px;font-size:15px;" data-bind="text: buttonText"><div style="font-size:15px;"></div></div></div>');

    console.log("Legion button successfully loaded");
})();*/

//kLobbyAdditions();
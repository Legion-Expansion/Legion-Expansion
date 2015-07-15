function kLobbyAdditions() {
/*    /////////////////
    //lock shared army mechanism **HIGHLY WIP**
    /////////////////
    var buildNumber = decode(sessionStorage['build_version']);

    console.log("Currently Running Legion Faction Mod on " + version + ", last tested on 82834");

    var legionFaction = {};

    legionFaction.newCommanders = [
        "TODO1",
        "TODO2"
    //etc
    ];
    var chosenCommander = ko.observable(legionFaction.newCommanders[0]);
    var lockArmy = function (chosenCommander) {
        if (chosenCommander === "a legion faction commander" ) {
            //lock the army to legion commanders
        }
    };
*/
    /////////////////
    //button
    /////////////////
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

}
kLobbyAdditions();
try {
    kLobbyAdditions();
} catch (i) {
    console.log(i);
}
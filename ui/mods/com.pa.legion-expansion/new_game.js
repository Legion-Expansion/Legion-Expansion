var legionExpansionLoaded, vanillaLock;

if (!legionExpansionLoaded) {

    legionExpansionLoaded = true;

    function legionExpansion() {

        var buildVersion = decode(sessionStorage.build_version);

        var patchName = 'legionExpansion new_game.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 85138');

/*      var commanderObjectNameToHack = 'ImperialFiveleafclover';

        var commanderIdToHack = '/pa/units/commanders/imperial_fiveleafclover/imperial_fiveleafclover.json';

        model.commanders.subscribe(function (commanders) {
            commanders.push(commanderIdToHack);
        });
        
        localStorage.setItem('legionExpansionSelected', false);

        model.selectedCommander.subscribe(function (selectedCommander) {

            localStorage.setItem('legionExpansionSelected', selectedCommander == commanderIdToHack);

        }); 

    model.legionCommanderSelected = ko.observable(false);

    $("#join.btn-std").click(function(){model.checkLegionCommanderIsSelected(army.index())});

    model.checkLegionCommanderIsSelected = function(index) {
        if ((model.armies()[index].slots()[0].commander() == "/pa/units/commanders/tank_aeson/tank_aeson.json") && (model.armies()[index].slots()[0].commander() == "/pa/units/commanders/imperial_invictus/imperial_invictus.json")) {
            localStorage.setItem('legionCommanderSelected', encode( model.legionCommanderSelected(true) ));
        }
        else {
            localStorage.setItem('legionCommanderSelected', encode( model.legionCommanderSelected(false) ));
        }
    }
*/
    }
     
    try {
        legionExpansion();
    } catch (e) {
        console.log(e);
        console.log(JSON.stringify(e));
    }
}
model.LegionCommander = function (index) {
    model.targetAIArmyIndex(index);
    model.targetAISlotIndex(0);
    model.addAI();
    console.log(index);
    setTimeout(model.CheckLegionCommander, 200, index);
};
model.CheckLegionCommander = function (index) {
    if ((model.armies()[index].slots()[0].commander() !== "/pa/units/commanders/tank_aeson/tank_aeson.json") && (model.armies()[index].slots()[0].commander() !== "/pa/units/commanders/imperial_invictus/imperial_invictus.json")) {
        console.log(model.armies()[index].slots()[0].commander());
        model.kickUser(index);
        model.LegionCommander(index);
    } else {
        console.log("FUCK YEAH");
    }
};

$('.army-button.btn_add_ai').parent().append('<div class="army-button btn_add_ai" data-bind="visible: slot.isEmpty(),click: function() { model.LegionCommander(army.index());}">Add Legion AI</div>');
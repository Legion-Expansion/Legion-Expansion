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
//LOAD CUSTOM LEGION NEW GAME CSS
loadCSS("coui://ui/mods/com.pa.legion-expansion/css/new_game.css");
loadScript("coui://ui/mods/com.pa.legion-expansion/common.js");

var legioncommanders = legionglobal.commanders;
var vanillacommanders = ["/pa/units/commanders/quad_osiris/quad_osiris.json","/pa/units/commanders/imperial_delta/imperial_delta.json"];

model.isNotLegion = function(commander){
    return !_.includes(legioncommanders, commander);
}

//Style Commander Picker Legion
$('.div-commander-picker-item.btn_std_ix').attr("data-bind","css: {legioncommander: !model.isNotLegion($data)}, click: function () { model.setCommander($index()) }, click_sound: 'default', rollover_sound: 'default'");

//Style Slot Legion
$('.slot-player').attr("data-bind","css: {legionslot: !model.isNotLegion($data.commander()), ready: isReady, loading: isLoading}");


model.changeLegionAI = function(playerid){
    //console.log("change to legion");
    model.send_message('set_ai_commander', {
        id: playerid,
        ai_commander: legioncommanders[_.random(legioncommanders.length-1)]
    });   
}

model.changeVanillaAI = function(playerid){
    //console.log("change to vanilla");
    model.send_message('set_ai_commander', {
        id: playerid,
        ai_commander: vanillacommanders[_.random(vanillacommanders.length-1)]
    });   
}

//To Legion Button
//$('.army-button.slot-remove-button.slot-remove-button-team').parent().append('<div class="army-button btn_add_ai" data-bind="visible: slot.ai() && model.isNotLegion(slot.commander()),click: function() { model.changeLegionAI(slot.playerId());}">to Legion</div>');
//To Vanilla Button
//$('.army-button.slot-remove-button.slot-remove-button-team').parent().append('<div class="army-button btn_add_ai" data-bind="visible: slot.ai() && !model.isNotLegion(slot.commander()),click: function() { model.changeVanillaAI(slot.playerId());}">to Vanilla</div>');


//HACKY WAY TO SWITCH LEGION COMMANDER till lobby.js is updated
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
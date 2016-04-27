var legionExpansionLoaded;

if (!legionExpansionLoaded) {

    legionExpansionLoaded = true;

    function legionExpansion() {

        console.log('legionExpansion new_game.js last tested on 94157+');

        var legionEnabled = false;

        model.enableLegion = function() {

            if(legionEnabled) {
                return;
            }

            legionEnabled = true;

// temporary
            if (!model.gameModIdentifiers) {
                model.gameModIdentifiers = ko.observableArray().extend({ session: 'game_mod_identifiers' });
            }
//

            model.legionClientModLoaded = ko.observable(false);

            model.legionDoNotShowWelcome = ko.observable(false).extend({ local: 'legion_welcome_dontshow'});

            model.legionToggleDoNotShowWelcome = function() {
                model.legionDoNotShowWelcome(!model.legionDoNotShowWelcome());
            }

            model.legionUrlClicked = function(data, event) {
                 if (event && event.target && event.target.href) {
                    model.legionOpenUrl(event.target.href);
                }
            }

            model.legionOpenUrl = function(url) {
                 engine.call('web.launchPage', url);
            }

            model.legionCloseWelcome = function() {
                $('#legion-welcome').fadeOut();
                $('body').off('keypress', model.legionCloseWelcome);
            }

            model.legionShowWelcome = function() {
                $("body").on('keypress', model.legionCloseWelcome);
                $('#legion-welcome').delay(1000).fadeIn();
            }

            loadCSS('coui://ui/mods/com.pa.legion-expansion/css/new_game.css');

            $("body").append(loadHtml('coui://ui/mods/com.pa.legion-expansion/new_game/welcome.html'));

            if (!model.legionDoNotShowWelcome() && ! model.returnFromLoad()) {
                model.legionShowWelcome();
            }

            api.mods.getMountedMods('client', function(mods) {
                var legionClientLoaded =  _.intersection( _.pluck( mods, 'identifier' ), [ 'com.pa.legion-expansion-client', ,'com.pa.legion-expansion-client-master', 'com.pa.legion-expansion-client-balance' ] ).length > 0;

                model.legionClientModLoaded(legionClientLoaded);

                if (!legionClientLoaded) {
                    if (model.registerHoldReady) model.registerHoldReady('com.pa.legion-expansion-client', 'Legion Client Mod Missing');
                    if (model.localChatMessage) model.localChatMessage('Legion Expansion', 'Legion Expansion client mod is not installed!');
                }

            });

            loadScript("coui://ui/mods/com.pa.legion-expansion/common.js");

            var legioncommanders = legionglobal.commanders;
            var vanillacommanders = ["/pa/units/commanders/quad_osiris/quad_osiris.json","/pa/units/commanders/imperial_delta/imperial_delta.json"];

            model.isNotLegion = function(commander,isEmpty){
                if(!isEmpty){
                    return !_.includes(legioncommanders, commander);
                }
                else{
                    return true;
                }
            }

            //Style Commander Picker Legion
            $('.div-commander-picker-item.btn_std_ix').attr("data-bind","css: {legioncommander: !model.isNotLegion($data)}, click: function () { model.setCommander($index()) }, click_sound: 'default', rollover_sound: 'default'");

            //Style Slot Legion
            $('.slot-player').attr("data-bind","css: {legionslot: !model.isNotLegion($data.commander(),$data.isEmpty()), ready: isReady, loading: isLoading}");

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

            //NEED PATCHED lobby.js
            //To Legion Button
            $('.army-button.slot-remove-button.slot-remove-button-team').parent().append('<div class="army-button btn_add_ai" data-bind="visible: slot.ai() && model.isNotLegion(slot.commander()),click: function() { model.changeLegionAI(slot.playerId());}">To Legion</div>');
            //To Vanilla Button
            $('.army-button.slot-remove-button.slot-remove-button-team').parent().append('<div class="army-button btn_add_ai" data-bind="visible: slot.ai() && !model.isNotLegion(slot.commander()),click: function() { model.changeVanillaAI(slot.playerId());}">To MLA</div>');
            //ENDOF NEED PATCHED lobby.js
        }
        
        model.legionServerModIsloading = ko.computed(function() {
            var legionServerModIsloading = _.intersection(model.gameModIdentifiers(), ['com.pa.legion-expansion-server', ,'com.pa.legion-expansion-server-master', 'com.pa.legion-expansion-server-balance']).length > 0;

            if (legionServerModIsloading && ! legionEnabled) {
                model.enableLegion();
            }

            return legionServerModIsloading;
        });
    }

    try {
        legionExpansion();
    } catch (e) {
        console.error(e);
    }
}
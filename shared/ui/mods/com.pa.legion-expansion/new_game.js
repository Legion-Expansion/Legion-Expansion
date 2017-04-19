var legionExpansionLoaded;

if (!legionExpansionLoaded) {

    legionExpansionLoaded = true;

    function legionExpansion() {

        console.log('legionExpansion new_game.js last tested on 94533+');

        var legionExpansionEnabled = false;

        model.enableLegion = function() {

            if(legionExpansionEnabled) {
                return;
            }
            
            console.log('legionExpansion new_game.js enabled');

            legionExpansionEnabled = true;

            var newBuild = _.isFunction( model.aiPersonalities );

            var aiPersonalities = newBuild ? model.aiPersonalities() : model.aiPersonalities;

            var defaultAiPersonalities = ['Idle', 'Normal', 'Hard', 'Relentless', 'Absurd'];

            _.forEach( aiPersonalities, function(personality, name) {
                if(defaultAiPersonalities.indexOf(name) != -1) {
                    personality.personality_tags = _.union(personality.personality_tags || [], ['Vanilla']);
                }
            });

            if (newBuild) {
                model.aiPersonalities.valueHasMutated();
            } else {
                model.aiPersonalityNames(_.keys(aiPersonalities));
            }  

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


            var themesetting = api.settings.isSet('ui','legionMenuThemeFunction',true) || 'ON';
            if(themesetting === "ON"){
                loadCSS('coui://ui/mods/com.pa.legion-expansion/css/legion_shared.css');
                loadCSS('coui://ui/mods/com.pa.legion-expansion/css/legion_buttons.css');
                loadCSS("coui://ui/mods/com.pa.legion-expansion/css/background_no_logo.css");
                loadCSS('coui://ui/mods/com.pa.legion-expansion/css/new_game.css');                
                $('body').addClass("legion");
            }
            //legion commander picker colouring
            loadCSS('coui://ui/mods/com.pa.legion-expansion/css/legion_commander_picker.css');
            
            //legion welcome screen
            loadCSS('coui://ui/mods/com.pa.legion-expansion/css/welcome.css');  
            $("body").append(loadHtml('coui://ui/mods/com.pa.legion-expansion/new_game/welcome.html'));

            api.mods.getMountedMods('client', function(mods) {
                var legionClientLoaded =  _.intersection( _.pluck( mods, 'identifier' ), [ 'com.pa.legion-expansion-client', ,'com.pa.legion-expansion-client-master', 'com.pa.legion-expansion-client-balance' ] ).length > 0;

                model.legionClientModLoaded(legionClientLoaded);

                if (!legionClientLoaded) {
                    if (model.registerHoldReady) model.registerHoldReady('com.pa.legion-expansion-client', 'Legion Client Mod Missing');
                    if (model.localChatMessage) model.localChatMessage('Legion Expansion', 'Legion Expansion client mod is not installed!');
                }

                if (!model.legionDoNotShowWelcome() && ! model.returnFromLoad()) {
                    model.legionShowWelcome();
                }
            });

            api.mods.getMountedMods('server', function(mods) {
                var hodgepodgeLoaded =  _.pluck( mods, 'identifier' ).indexOf('com.wondible.pa.hodgepodge') != -1

                if (!hodgepodgeLoaded) {
                    if (model.registerHoldReady) model.registerHoldReady('com.wondible.pa.hodgepodge', 'Hodgepodge mod missing');
                    if (model.localChatMessage) model.localChatMessage('Legion Expansion', 'Hodgepodge server mod is not installed! Please exit lobby and toggle Legion to enable new dependencies.');
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
            
            model.isMLA = function(commander,isEmpty){
                if(!isEmpty){
                    return !_.includes(legioncommanders, commander);
                }
            }
            

            //Style Commander Picker Legion
            $('.div-commander-picker-item.btn_std_ix').attr("data-bind","css: {legioncommander: !model.isNotLegion($data)}, click: function () { model.setCommander($index()) }, click_sound: 'default', rollover_sound: 'default'");

            //Style Slot Legion
            $('.slot-player').attr("data-bind","css: {legionslot: !model.isNotLegion($data.commander(),$data.isEmpty()), mlaslot: model.isMLA($data.commander(),$data.isEmpty()), ready: isReady, loading: isLoading}");

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
 
        if (_.intersection(model.gameModIdentifiers(), ['com.pa.legion-expansion-server', 'com.pa.legion-expansion-server-master', 'com.pa.legion-expansion-server-balance']).length > 0) {
               model.enableLegion();
        }
    }

    try {
        legionExpansion();
    } catch (e) {
        console.error(e);
    }
}

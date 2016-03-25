var legionExpansionLoaded, vanillaLock;

if (!legionExpansionLoaded) {

    legionExpansionLoaded = true;

    function legionExpansion() {

        var buildVersion = decode(sessionStorage.build_version);

        var patchName = 'legionExpansion new_game.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 85138');
        //LOAD CUSTOM LEGION CSS
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/new_game.css");

        model.legionclient_isLoaded = ko.observable(false);
        model.legionclient_isChecked = ko.observable(false);

        model.legionclient_checkLoaded = function()
        {
            api.mods.getMountedMods( 'client', function ( mods )
            {
                var loaded =  _.intersection( _.pluck( mods, 'identifier' ), [ 'com.pa.legion-expansion.client','com.pa.legion-expansion.client-balance', 'com.pa.monty-client' ] ).length > 0;
                model.legionclient_isLoaded ( loaded );
                model.legionclient_isChecked(true);
                console.log("legion expansion client mod loaded : " + loaded );
            });

        }

        // once mod data is sent check if client mod is actually loaded
        if ( window.scene_server_mod_list && window.scene_server_mod_list.new_game )
        {
            model.legionclient_checkLoaded();
        }
        else
        {
            model.legion_server_mod_info_updated_handler = handlers.server_mod_info_updated;

            handlers.server_mod_info_updated = function( payload )
            {
                model.legion_server_mod_info_updated_handler( payload );

                model.legionclient_checkLoaded();
            }
        }

        //WELCOME MESSAGE

			model.legionWelcomeDontShow = ko.observable(localStorage.legion_welcome_dontshow);

        //load html dynamically
        legion_loadHtmlTemplate = function(element, url) {
            element.load(url, function () {
                console.log("Loading html " + url);
                element.children().each(function() {
                    ko.applyBindings(model, this);
                });
            });
        };

        legion_openUrl = function(href) {
            engine.call('web.launchPage', href);
        }

        $("body").append("<div id='legion_welcome'></div>");

			// Look through the html file and make all the links clickable.
        $("#legion_welcome").on("DOMSubtreeModified", function() {
            $("#legion_welcome").find("a").unbind("click");
            $("#legion_welcome").find("a").on("click", function(e) {
                var linkTarget = e.delegateTarget.href;
                legion_openUrl(linkTarget);
                return false;
            });
        });

        legion_welcome_dontshow = function() {
			  model.legionWelcomeDontShow("true");
			  localStorage.legion_welcome_dontshow = true;
		  }

		  legion_sendChatMessage = function(message) {
            var msg = {};
            msg.message = message;
            model.send_message("chat_message", msg);
		  }

        isModMounted = function(mod_identifier, modlist) {
            for(i in modlist) {
                if(modlist[i].identifier == mod_identifier) {
						 legion_sendChatMessage("Using Legion Expansion client v" + modlist[i].version);
                    return true;
					  }
            }
            legion_sendChatMessage("Legion Expansion client not installed!");
            return false;
        }

        // Check if client mod is installed and display appropriate welcome message
        api.mods.getMountedMods("client", function(modlist){

            if(isModMounted("com.pa.monty-client", modlist)) {
                if(model.legionWelcomeDontShow() != "true") {
                    legion_loadHtmlTemplate($("#legion_welcome"), "coui://ui/mods/com.pa.legion-expansion/new_game/welcome.html");
                }
            } else {
                model.legionWelcomeDontShow(false);
                localStorage.legion_welcome_dontshow = false;
                legion_loadHtmlTemplate($("#legion_welcome"), "coui://ui/mods/com.pa.legion-expansion/new_game/welcome_noclientmod.html");
            }
        });



        //ADD WARNING MESSAGE CLIENT
        $("#start-error").parent().prepend('<div class="legionalert" data-bind="visible:model.legionclient_isChecked() && !model.legionclient_isLoaded()">Legion Client Mod Missing</div>');

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
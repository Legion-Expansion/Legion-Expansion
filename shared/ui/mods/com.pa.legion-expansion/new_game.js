var legionExpansionLoaded;

if (!legionExpansionLoaded) {

    legionExpansionLoaded = true;
    var legionUINoHostRefreshLoaded;

    function legionExpansion() {

        if( legionUINoHostRefreshLoaded) {
            return;
        }

        var buildVersion = decode(sessionStorage.build_version);

        var patchName = 'legionExpansion new_game.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 85138 no host refresh mod is loaded');
        legionUINoHostRefreshLoaded = true;
        //LOAD CUSTOM LEGION CSS
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/new_game.css");
        
        model.legionserver_isLoaded = ko.observable(false);
        model.legionserver_isHost = ko.computed ( function() {
            return model.isGameCreator() && model.legionserver_isLoaded();
        });
        
        model.legionserver_checkLoaded = function(){
            api.mods.getMountedMods('server', function(mods){
                // check to see if server mod (and optionally a dev version) are loaded
                var loadedserver =  _.intersection( _.pluck( mods, 'identifier' ), [ 'com.pa.legion-expansion-server','com.pa.legion-expansion-server-balance', 'com.pa.monty-server' ] ).length > 0;
                model.legionserver_isLoaded(loadedserver);
            });
        }
        
        
        model.legionclient_isLoaded = ko.observable(false);
        model.legionclient_isChecked = ko.observable(false);

        model.legionclient_checkLoaded = function()
        {
            api.mods.getMountedMods( 'client', function ( mods )
            {
                // check to see if client mod (and optionally a dev version) are loaded
                var loadedclient =  _.intersection( _.pluck( mods, 'identifier' ), [ 'com.pa.legion-expansion-client','com.pa.legion-expansion-client-balance', 'com.pa.monty-client' ] ).length > 0;
                model.legionclient_isLoaded ( loadedclient );
                model.legionclient_isChecked(true);
                console.log("legion expansion client mod loaded : " + loaded );
            });

        }

        // once mod data is sent check if client mod is actually loaded
        if ( window.scene_server_mod_list && window.scene_server_mod_list.new_game )
        {
            model.legionserver_checkLoaded();
            model.legionclient_checkLoaded();
        }
        else
        {
            var legion_server_mod_info_updated_handler = handlers.server_mod_info_updated;

            handlers.server_mod_info_updated = function( payload )
            {
                legion_server_mod_info_updated_handler( payload );
                
                model.legionserver_checkLoaded();
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

        // Check if client mod is installed and display appropriate welcome message
        // Subscribe postpones this code until the check is complete.
        model.legionclient_isChecked.subscribe(function(hasClient) {

            // HACK to prevent clicking ready if the client mod is not present
            model.toggleReady_original = model.toggleReady;
			   model.toggleReady = function () {
			       if(model.legionclient_isLoaded()) {
                    model.toggleReady_original();
                }
            };

            if(model.legionclient_isLoaded()) {

				var gameTicket = model.gameTicket();
                if(model.legionWelcomeDontShow() != "true" && (sessionStorage.legion_lastGameTicket != gameTicket || gameTicket == undefined)) {
                    sessionStorage.legion_lastGameTicket = gameTicket;
                    legion_loadHtmlTemplate($("#legion_welcome"), "coui://ui/mods/com.pa.legion-expansion/new_game/welcome.html");
                }
            } else {
				    // HACK to force the ready button to stay disabled.
				    // This is terrible and will break if the ready button stop being the div that immediately follows #start-error.
				    // Uber why do you almost never give divs IDs?
					 $("#start-error").next().children().addClass("disabled");

                model.legionWelcomeDontShow(false);
                localStorage.legion_welcome_dontshow = false;
                legion_sendChatMessage("Legion Expansion client not installed!");
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
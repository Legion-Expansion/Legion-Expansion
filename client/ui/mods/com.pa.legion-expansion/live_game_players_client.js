
var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{

    legionExpansionLoaded = true;

    function legionExpansion()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'legionExpansion live_game_players_client.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');
        
        //LOAD CUSTOM LEGION CSS
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_players_client.css");
        loadScript("coui://ui/mods/com.pa.legion-expansion/common.js");

        //see global.js
        var legioncomms = legionglobal.commanders;
        var themesetting = api.settings.isSet('ui','legionThemeFunction',true) || 'ON';

        model.isLegionOrMixedOrVanilla = ko.computed(function () {
        try{
            var legioncount = 0;
            var specslength = 0;
            var selectedspecs = model.player().commanders;
            if (selectedspecs !== undefined){
            _.forOwn(selectedspecs, function(value, key){
                if(_.includes(legioncomms, value)){
                legioncount++;
                }
                specslength++; 
            });
            if(legioncount == specslength){
                return "legion";
            }
            else{
                if(legioncount > 0 && legioncount < specslength){
                return "mixed";
                }
                else{
                return "vanilla";
                }
            }
            }
            else{
            return "vanilla";
            }
        }
        catch(e){
            return "";
        }
        });

        model.isLegion = ko.computed(function (){
        if(model.isLegionOrMixedOrVanilla() === "legion"){
            return true;
        }
        else{
            return false;
        }
        });

        model.isMixed = ko.computed(function (){
        if(model.isLegionOrMixedOrVanilla() === "mixed"){
            return true;
        }
        else{
            return false;
        }
        });

        model.legionstart = ko.observable(false);

        model.player.subscribe(function(newval){
            if(!model.legionstart()){
                
                
                if(themesetting === "ON"){
                    var ui = model.isLegionOrMixedOrVanilla();
                    api.Panel.message("selection","legionui", ui);
                    api.Panel.message("planets","legionui", ui);
                    api.Panel.message("control_group_bar","legionui", ui);
                    api.Panel.message("econ","legionui", ui);
                    api.Panel.message("options_bar","legionui", ui);
                    api.Panel.message("build_hover","legionui", ui);
                    api.Panel.message("time_bar","legionui", ui);
                    
                    if(ui === "legion"){
                        
                        var toggleImage = function(open) {
                            return open ? 'coui://ui/mods/com.pa.legion-expansion/img/controls/red/pin_open.png' : 'coui://ui/mods/com.pa.legion-expansion/img/controls/red/pin_closed.png';
                        };
                        
                        model.playerPanelToggleImage = ko.computed(function() { return toggleImage(model.showPlayerListPanel()); });
                        model.spectatorPanelToggleImage = ko.computed(function() { return toggleImage(model.showSpectatorPanel()); });

                        
                        $('img[src="coui://ui/main/shared/img/controls/pin_open.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/controls/red/pin_open.png");
                        $('img[src="coui://ui/main/shared/img/controls/pin_closed.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/controls/red/pin_closed.png");    
                    }
                    if(ui === "mixed"){
                        var toggleImage = function(open) {
                            return open ? 'coui://ui/mods/com.pa.legion-expansion/img/controls/purple/pin_open.png' : 'coui://ui/mods/com.pa.legion-expansion/img/controls/purple/pin_closed.png';
                        };
                        
                        model.playerPanelToggleImage = ko.computed(function() { return toggleImage(model.showPlayerListPanel()); });
                        model.spectatorPanelToggleImage = ko.computed(function() { return toggleImage(model.showSpectatorPanel()); });

                        
                        $('img[src="coui://ui/main/shared/img/controls/red/pin_open.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/controls/purple/pin_open.png");
                        $('img[src="coui://ui/main/shared/img/controls/red/pin_closed.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/controls/purple/pin_closed.png");                        
                        
                    }
                }
                model.legionstart(true);
            }
        });
        
        if(themesetting === "ON"){
            $('.body_panel').attr("data-bind","css: { legionui: model.isLegion(), mixedui: model.isMixed()}, visible: show");
        }
        
    }

    try
    {
        legionExpansion();
    }
    catch (e)
    {
        console.log(e);
        console.log(JSON.stringify(e));
    }
}
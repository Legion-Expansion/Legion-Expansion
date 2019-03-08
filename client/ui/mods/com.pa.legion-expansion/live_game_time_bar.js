
var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{

    legionExpansionLoaded = true;

    function legionExpansion()
    {

        var patchName = 'legionExpansion live_game_time_bar.js';

        console.log(patchName + ' on ' + gBuild + ' last tested on 89755');


        var themesetting = api.settings.isSet('ui','legionThemeFunction',true) || 'ON';
        if(themesetting === "ON"){  
            loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_time_bar.css");
        }

        handlers.legionui = function(payload){
            console.log("SET UI : " + payload);
            if(payload === "legion"){
                $('.body_panel').addClass("legionui");       
            }
            if(payload === "mixed"){
                $('.body_panel').addClass("mixedui");                
            }
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
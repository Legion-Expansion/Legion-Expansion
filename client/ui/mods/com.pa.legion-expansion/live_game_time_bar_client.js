
var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{

    legionExpansionLoaded = true;

    function legionExpansion()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'legionExpansion live_game_time_bar_client.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');

        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_time_bar_client.css");

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
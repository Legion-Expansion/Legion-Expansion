
var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{

    legionExpansionLoaded = true;

    function legionExpansion()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'legionExpansion live_game_planets.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');

        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_planets.css");

        handlers.legionui = function(payload){
            console.log("SET UI : " + payload);
            if(payload === "legion"){
                $('.body_panel').addClass("legionui");
                
                model.toggleImage = ko.computed(function() {
                    return model.showCelestialViewModels() ? 'coui://ui/mods/com.pa.legion-expansion/img/controls/pin_open.png' : 'coui://ui/mods/com.pa.legion-expansion/img/controls/pin_closed.png';
                });  
                $('img[src="coui://ui/main/shared/img/controls/pin_open.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/controls/pin_open.png");
                $('img[src="coui://ui/main/shared/img/controls/pin_closed.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/controls/pin_closed.png");           
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
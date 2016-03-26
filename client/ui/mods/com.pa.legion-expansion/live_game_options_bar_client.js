
var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{
    $(".div_ingame_options_bar_cont").prepend("<div class='watermark'>Legion &nbsp <span>BETA</span></div>");
    
    legionExpansionLoaded = true;

    function legionExpansion()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'legionExpansion live_game_options_bar_client.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');
        
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_options_bar_client.css");
        

        
        handlers.legionui = function(payload){
            console.log("SET UI : " + payload);
            //temporary watermark


            if(payload === "legion"){
                $('.body_panel').addClass("legionui");
                
                model.pipImage = ko.computed(function () {
                    return model.pip() ?
                        'coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/pip_off.png' :
                        'coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/pip_on.png';
                });
                
                model.uberBarImage = ko.computed(function() {
                    return model.uberBar() ?
                        'coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/uberbar_hide.png' :
                        'coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/uberbar_show.png';
                });
                              
                //replace images
                $('img[src="img/ingame_options_bar/pip_off.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/pip_off.png");
                $('img[src="img/ingame_options_bar/pip_on.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/pip_on.png");                
                $('img[src="img/ingame_options_bar/uberbar_hide.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/uberbar_hide.png");
                $('img[src="img/ingame_options_bar/uberbar_show.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/uberbar_show.png");
                $('img[src="img/ingame_options_bar/chronocam.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/chronocam.png");
                $('img[src="img/ingame_options_bar/game_menu.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/red/game_menu.png");
                
            }
            if(payload === "mixed"){
                $('.body_panel').addClass("mixedui");
                
                model.pipImage = ko.computed(function () {
                    return model.pip() ?
                        'coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/pip_off.png' :
                        'coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/pip_on.png';
                });
                
                model.uberBarImage = ko.computed(function() {
                    return model.uberBar() ?
                        'coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/uberbar_hide.png' :
                        'coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/uberbar_show.png';
                });
                              
                //replace images
                $('img[src="img/ingame_options_bar/pip_off.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/pip_off.png");
                $('img[src="img/ingame_options_bar/pip_on.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/pip_on.png");                
                $('img[src="img/ingame_options_bar/uberbar_hide.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/uberbar_hide.png");
                $('img[src="img/ingame_options_bar/uberbar_show.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/uberbar_show.png");
                $('img[src="img/ingame_options_bar/chronocam.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/chronocam.png");
                $('img[src="img/ingame_options_bar/game_menu.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/ingame_options_bar/purple/game_menu.png");                
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
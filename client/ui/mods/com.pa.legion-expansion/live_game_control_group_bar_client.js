
var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{

    legionExpansionLoaded = true;

    function legionExpansion()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'legionExpansion live_game_control_group_bar_client.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');
        

        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_control_group_bar_client.css");

        handlers.legionui = function(payload){
            console.log("SET UI : " + payload);
            if(payload === "legion"){
                $('.body_panel').addClass("legionui");
                
                model.imageSourceForType = function (type) {
                    return 'coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_' + type.toLowerCase() + '.png'
                };                
                $('img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_bot.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_bot.png");
                $('img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_tank.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_tank.png");
                $('img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_air.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_air.png");
                $('img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_naval.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_naval.png");
                $('img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_orbital.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_orbital.png");
                $('img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_advanced.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_advanced.png");
                $('img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_fabber.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_fabber.png"); 
            }
            if(payload === "mixed"){
                $('.body_panel').addClass("mixedui");
                
                model.imageSourceForType = function (type) {
                    return 'coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/purple/icon_category_' + type.toLowerCase() + '.png'
                };                
                $('img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_bot.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/purple/icon_category_bot.png");
                $('img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_tank.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/purple/icon_category_tank.png");
                $('img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_air.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/purple/icon_category_air.png");
                $('img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_naval.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/purple/icon_category_naval.png");
                $('img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_orbital.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/purple/icon_category_orbital.png");
                $('img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_advanced.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/purple/icon_category_advanced.png");
                $('img[src="coui://ui/main/game/live_game/img/control_group_bar/icon_category_fabber.png"]').attr("src","coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/purple/icon_category_fabber.png");                
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
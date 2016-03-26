var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{

    legionExpansionLoaded = true;

    function legionExpansion()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'legionExpansion live_game_action_bar_client.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');
        
        //LOAD CUSTOM LEGION ACTIONBAR CSS
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_action_bar_client.css");
        loadScript("coui://ui/mods/com.pa.legion-expansion/common.js");

        //see global.js
        var legionspecids = legionglobal.commanders;
        
        var themesetting = api.settings.isSet('ui','legionThemeFunction',true) || 'ON';

        model.isLegionOrMixedOrVanilla = function (data) {
          
            if(themesetting === "ON"){    
                try{          
                    var legioncount = 0;
                    var specslength = 0;
                    var selectedspecs = data.selection().spec_ids;
                    
                    _.forOwn(selectedspecs, function(value, key){
                        if(_.includes(legionspecids, key)){
                            legioncount++;
                        }
                        if(key.indexOf("/L_") > 2){
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
            catch(e){
                return "";
            }
          }
          else{
              return "vanilla";
          }
        }

        model.isLegion = function (data){
         if(model.isLegionOrMixedOrVanilla(data) === "legion"){
            return true;
         }
         else{
            return false;
         }
        };

        model.isMixed = function (data){
         if(model.isLegionOrMixedOrVanilla(data) === "mixed"){
            return true;
         }
         else{
            return false;
         }
        };

        //ADD legion class to build_bar_menu
        $('.body_panel').attr("data-bind","css: { legion: model.isLegion($data), mixed: model.isMixed($data)}");

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
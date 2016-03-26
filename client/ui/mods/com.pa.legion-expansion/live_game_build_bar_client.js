var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{

    legionExpansionLoaded = true;

    function legionExpansion()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'legionExpansion live_game_build_bar_client.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');
        
        var themesetting = api.settings.isSet('ui','legionThemeFunction',true) || 'ON';
                    
        ko.computed(function() {
            var buildSet = model.buildSet();
            if (!buildSet)
                return;
            var hotkeys = model.hotkeys();
            var groups = buildSet.tabsByGroup()

            setTimeout(function() {
                // Get tab hotkeys
                _.forEach(buildSet.tabs(), function(tab) {
                    var baseTab = tab.group().replace('L_', '')
                    if (!tab.label()) {
                        tab.label(groups[baseTab].label())
                    }
                    tab.hotkey(hotkeys['tab_' + baseTab] || '');

                    tab.buildGroup = tab.buildGroup || ko.observable(baseTab)
                    tab.buildGroup(baseTab)
                });
            }, 0)
        })
        
        handlers.start_build_sequence = model.startBuildSequence = function(params) {
            var group = params.group;
            var locked = params.locked;

            var tabs = model.buildSet().tabs().filter(function(tab) {
                return tab.visible() && tab.buildGroup() == group
            })
            if (tabs.length < 1) return
            group = tabs[0].group()

            model.activeBuildGroup(group);
            if (locked)
                model.activeBuildGroupLocked(locked);
        };
        
        //LOAD CUSTOM LEGION BUILDBAR CSS
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_build_bar_client.css");
        loadScript("coui://ui/mods/com.pa.legion-expansion/common.js");

        //see global.js
        var legionspecids = legionglobal.builders;

        model.isLegionOrMixedOrVanilla = function (data) {
            if(themesetting === "ON"){     
                try{                         
                    var legioncount = 0;
                    var specslength = 0;
                    var selectedspecs = data.buildSet().selectedSpecs();
                    
                    _.forOwn(selectedspecs, function(value, key){
                        if(_.includes(legionspecids, key)){
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

        //ADD legion / mixed ui
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


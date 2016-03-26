
var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{

    legionExpansionLoaded = true;

    function legionExpansion()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'legionExpansion live_game_selection_client.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');
        //LOAD CUSTOM LEGION CSS
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_selection_client.css");
        loadScript("coui://ui/mods/com.pa.legion-expansion/common.js");

        //see global.js
        var legionspecids = legionglobal.commanders;
        
        var themesetting = api.settings.isSet('ui','legionThemeFunction',true) || 'ON';

        model.isLegion = function (type){
            if(themesetting === "ON"){
                haslegionunit = false;
                try{
                    if(_.includes(legionspecids, type)){
                        haslegionunit = true;
                        return haslegionunit;
                    }
                    if(type.indexOf("/L_") > 2){
                        haslegionunit = true;
                        return haslegionunit;
                    }
                }
                catch(e){
                }

                return haslegionunit;
            }
            else{
                return false;
            }
        };

        //ADD legion class to build_bar_menu
        $('.div_unit_selection').attr("data-bind","css: { legion: model.isLegion($data.type)}, event: { mousedown: function (data, event) { $parent.onSelectionDisplayClick($index(), event) } }");

        handlers.legionui = function(payload){
            console.log("SET UI : " + payload);
            if(payload === "legion"){
                $('.body_panel').addClass("legionui");
                
                var imageSourceForType = function (type) {
                    return 'coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/red/icon_category_' + type.toLowerCase() + '.png'
                };
                
                model.typeArray = ko.computed(function () {

                    var group = model.selectionTypeCounts();

                    var result = _.compact(_.map(model.types(), function (element) {
                        if (!group[element])
                            return null;

                        return {
                            type: element,
                            count: group[element],
                            source: imageSourceForType(element)
                        }
                    }));

                    return result;
                });                
                
            }
            if(payload === "mixed"){
                $('.body_panel').addClass("mixedui");
                
                var imageSourceForType = function (type) {
                    return 'coui://ui/mods/com.pa.legion-expansion/img/control_group_bar/purple/icon_category_' + type.toLowerCase() + '.png'
                };
                
                model.typeArray = ko.computed(function () {

                    var group = model.selectionTypeCounts();

                    var result = _.compact(_.map(model.types(), function (element) {
                        if (!group[element])
                            return null;

                        return {
                            type: element,
                            count: group[element],
                            source: imageSourceForType(element)
                        }
                    }));

                    return result;
                });                      
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

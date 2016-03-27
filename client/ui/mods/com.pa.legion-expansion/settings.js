
var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{

    legionExpansionLoaded = true;

    function legionExpansion()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'legionExpansion settings.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');
       _.extend(api.settings.definitions.ui.settings, {
            legionThemeFunction: {
                title: 'Theme',
                type: 'select',
                default: 'ON',
                options: ['ON','OFF']
            }
        });
      
      
       model.settingDefinitions(api.settings.definitions);
       
        $(".option-list.ui .form-group").append(
            $.ajax({
                type: "GET",
                url: 'coui://ui/mods/com.pa.legion-expansion/settings.html',
                async: false
            }).responseText
        );
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
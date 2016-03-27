
var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{

    legionExpansionLoaded = true;

    function legionExpansion()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'legionExpansion start_client.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/start_client.css");
        $('body').addClass("legion");
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
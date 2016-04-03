
var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{

    legionExpansionLoaded = true;

    function legionExpansion()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'legionExpansion start.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/start.css");
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

// Play intro video one time only

// BLOCKED UNTIL WE HAVE AN INTRO VIDEO
/*var legion_intro_one_time = localStorage.legion_intro_one_time;

if(legion_intro_one_time != "true") {

	var intro_url = "https://www.youtube.com/embed/xGp4NClVm2I?autoplay=1";
	$("body").append("<div id='legion_intro_wrapper'>" +
	"<div id='legion_intro' style='position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 11111;'>" +
	"	<iframe width='100%' height='100%' src='" + intro_url + "' frameborder='0' allowfullscreen></iframe>" +
	"</div>" +
	"<div id='legion_intro_top' style='position: fixed; left: 0; top: 0; width: 100%; height: 50px; z-index: 22222; padding-left: 1px; padding-right: 1px;'>" +
	"	<div style='width: 100%; height: 100%; background-color: black;'>" +
	"		<div style='position: fixed; right: 10px; top: 10px; width: 80px; height: 50px; z-index: 33333; background-image: url(coui://ui/main/shared/img/buttons/btn_lrg_std.png); text-align: center; padding-top: 8px; font-size: 20px;' onclick='$(\"#legion_intro\").remove();$(\"#legion_intro_top\").remove();'>Close</div>" +
	"	</div>" +
	"</div>" +
	"</div>");
	localStorage.legion_intro_one_time = "true";
}

*/


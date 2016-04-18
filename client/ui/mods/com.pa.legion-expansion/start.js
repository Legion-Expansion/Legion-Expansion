
var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{

    legionExpansionLoaded = true;

    function legionExpansion()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'legionExpansion start.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');
        var themesetting = api.settings.isSet('ui','legionThemeFunction',true) || 'ON';
        if(themesetting === "ON"){
          loadCSS("coui://ui/mods/com.pa.legion-expansion/css/start.css");
          $('body').addClass("legion");
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

// Play intro video one time only

// BLOCKED UNTIL WE HAVE AN INTRO VIDEO
var legion_intro_one_time = localStorage.legion_intro_one_time;

if(legion_intro_one_time != "true ") {

	var intro_url = "http://www.htmlcssvqs.com/8ed/examples/chapter-17/paddle-steamer.webm";

	$("body").append("<div id='legion_intro_wrapper'>" +
	"<div id='legion_intro' style='position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 11111; background-color: black;'>" +
	"<video src='" + intro_url + "' width='100%' height='100%' autoplay=''></video>" +
	"</div>" +
	"</div>");
	localStorage.legion_intro_one_time = "true";
}




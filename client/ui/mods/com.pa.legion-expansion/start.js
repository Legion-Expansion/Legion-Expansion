
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
(function() {
	var legion_intro_one_time = localStorage.legion_intro_one_time;

	//load html dynamically
	legion_loadHtmlTemplate = function(element, url) {
		element.load(url, function () {
			console.log("Loading html " + url);
			element.children().each(function() {
				ko.applyBindings(model, this);
			});
		});
	};

	if(legion_intro_one_time != "true") {
	   $("body").append("<div id='legion_intro_wrapper'></div>");
	   legion_loadHtmlTemplate($("#legion_intro_wrapper"), "coui://ui/mods/com.pa.legion-expansion/start/intro.html");
		localStorage.legion_intro_one_time = "true";
	}

})();

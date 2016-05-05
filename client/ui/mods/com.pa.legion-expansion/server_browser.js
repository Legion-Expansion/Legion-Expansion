(function() {
	var processGameBeacon = model.processGameBeacon;
	model.processGameBeacon = function(beacon, region, lobby_id, host, port) {
		var result = processGameBeacon.apply(model, arguments);
		if (result.hasOwnProperty("mod_names")) {
			for (var i = 0; i < result["mod_names"].length; i++) {
				if (result["mod_names"][i].startsWith("Legion Expansion")) {
					result["legion"] = true;
					break;
				} else {
					result["legion"] = false;
				}
			}
		}
		return result;
	}

	$("#game-list .col-md-3").append('<span class="lbl_titans lbl_legion" data-bind="visible: $data.legion"><noloc>Legion<noloc></span>');
	$("#detail-pane div").first().append('<div class="lbl_titans lbl_legion details" data-bind="visible: $data.legion, css: { lbl_titans_missing: $data.is_missing_content }"><loc>Legion Expansion</loc></div>');
})();

//load legion theme
loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_buttons.css");
loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_shared.css");
loadCSS("coui://ui/mods/com.pa.legion-expansion/css/background_no_logo.css");
loadCSS("coui://ui/mods/com.pa.legion-expansion/css/server_browser.css");
var themesetting = api.settings.isSet('ui','legionMenuThemeFunction',true) || 'ON';
if(themesetting === "ON"){
    $('body').addClass("legion");
}
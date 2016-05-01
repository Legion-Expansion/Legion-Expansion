//load legion theme
loadCSS("coui://ui/mods/com.pa.legion-expansion/css/start.css");
loadCSS("coui://ui/mods/com.pa.legion-expansion/css/server_browser.css");
loadCSS("coui://ui/mods/com.pa.legion-expansion/css/settings.css");
loadCSS("coui://ui/mods/com.pa.legion-expansion/css/load_planet.css");
loadCSS("coui://ui/mods/com.pa.legion-expansion/css/background_no_logo.css");
var themesetting = api.settings.isSet('ui','legionThemeFunction',true) || 'ON';
if(themesetting === "ON"){
    $('body').addClass("legion");
}
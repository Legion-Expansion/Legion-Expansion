var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{

    legionExpansionLoaded = true;

    function legionExpansion()
    {

        var buildVersion = decode( sessionStorage.build_version );

        var patchName = 'legionExpansion live_game_build_bar.js';

        console.log(patchName + ' on ' + buildVersion + ' last tested on 89755');
                    
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

        $( ".span_build_bar_tab" ).css( "color", "#FF0000" );
        $( ".span_build_bar_tab" ).css( "text-shadow", "0px 0px 30px #FF0000" );
        $( ".div_build_bar_menu_cont" ).css( "border-image", "url(coui://ui/mods/com.pa.legion-expansion/img/img_build_bar_menu_bground.png) 35 35 23 35 fill" );
        $( ".div_build_bar_page, .div_short_build_bar_page" ).css( "box-shadow", "0px 0px 30px rgba(30,122,161,0.6)" );
        $( ".div_build_bar_page, .div_short_build_bar_page" ).css( "border-top", "1px solid rgba(255, 255, 255, 0.34)" );
        $( ".div_build_bar_page, .div_short_build_bar_page" ).css( "border-left", "1px solid rgba(255, 255, 255, 0.34)" );
        $( ".div_build_item" ).css( "border", "none" );
        $( ".div_build_item" ).css( "border-right", "1px solid rgba(255, 255, 255, 0.34)" );
        $( ".div_build_item" ).css( "border-bottom", "1px solid rgba(255, 255, 255, 0.34)" );
        /*$( ".div_build_item, .receiveMouse" ).hover(function() {
          $(this).css({
            'background': 'rgba(255, 0, 0, 0.65)',
            'border': '1px solid #FF9191',
            'box-shadow': 'inset 0px 0px 20px #FF9191',
            'z-index': '1000',
            '-webkit-animation': 'none',
            '-webkit-transition': 'none'
          });})*/
        $( ".div_build_item, .receiveMouse" ).mousedown(function() {
          $(this).css({
            'background': 'rgba(255, 0, 0, 0.9)',
            'border': '1px solid #FF9191',
            'box-shadow': '0px 0px 30px #FF9191'
          });})
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

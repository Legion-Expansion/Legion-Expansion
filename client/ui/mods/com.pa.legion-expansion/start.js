
var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{

    legionExpansionLoaded = true;

    function onYouTubeIframeAPIReady() {
        model.legionYouTubeIframeAPIReady();
    }
        
    function legionExpansion()
    {

        console.log( 'legionExpansion start.js' );
        
        const LEGION_VIDEO_ID = 'fYsPl8DFW7I';
  
  // temp until fixes in PTE
    
        model.playingDefaultVideo = ko.observable(true);
        
        var playIntroVideo = model.playIntroVideo;
        
        model.playIntroVideo = function() {
            playIntroVideo();
            model.playingDefaultVideo(true); 
        }
        
        var introVideoComplete = model.introVideoComplete;

        model.introVideoComplete = function() {
            introVideoComplete();
            model.playingDefaultVideo(false); 
        }

        var modalBack = model.modalBack;
        
        model.modalBack = function() {
            if (model.playingDefaultVideo()) {
                modalBack();
                return;
            }
            
            model.legionStopVideo();
        }
//
              
        model.showLegionGuidesMenu = ko.observable(false);

        model.legionToggleGuides = function() {
            if(model.showLegionGuidesMenu()) {
                model.showLegionGuidesMenu(false);
            }
            else {
                model.showLegionGuidesMenu(true);
                model.showSinglePlayerMenu(false);
                model.showMultiplayerMenu(false);
            }
        }
        model.navToLegionGuide1 = function(){
            engine.call('web.launchPage', 'http://exodusesports.com/article/planetary-annihilation-titans/');
            model.showLegionGuidesMenu(false);
        }

        model.navToLegionGuide2 = function(){
            engine.call('web.launchPage', 'http://exodusesports.com/article/legion-expansion-community-faction-mod/');
            model.showLegionGuidesMenu(false);
        }

        //ADD GUIDES MENU
        $("#nav_mods").before('<div class="nav_cascade_group"><div class="btn_std_ix nav_item nav_item_text" data-bind="click: legionToggleGuides, click_sound: \'default\', rollover_sound: \'default\', css: { nav_item_text_disabled: !allowNewOrJoinGame(), btn_std_ix_active: showLegionGuidesMenu }">Legion Guides <div class="glyphicon glyphicon-chevron-right nav_carat" aria-hidden="true"></div></div><div class="nav_sub_item" data-bind="visible: showLegionGuidesMenu"><div class="nav_item nav_item nav_item_text btn_std_ix" data-bind="click: navToLegionGuide1, click_sound: \'default\', rollover_sound: \'default\'">TITANS</div><div class="nav_item nav_item nav_item_text btn_std_ix" data-bind="click: navToLegionGuide2, click_sound: \'default\', rollover_sound: \'default\'">LEGION</div></div> </div>')

        var legionOriginalToggleSinglePlayerMenu = model.toggleSinglePlayerMenu;
        var legionOriginalToggleMultiplayerPlayerMenu = model.toggleMultiplayerMenu;
        var legionOriginalHideSubMenus = model.hideSubMenus;

        model.toggleSinglePlayerMenu = function () {
            legionOriginalToggleSinglePlayerMenu();
            model.showLegionGuidesMenu(false);
        };
        
        model.toggleMultiplayerMenu = function () {
          legionOriginalToggleMultiplayerPlayerMenu();
          model.showLegionGuidesMenu(false);
        };


        model.hideSubMenus = function(data, event) {
            legionOriginalHideSubMenus(data, event);
            if (document.getElementById("navigation_panel").contains(event.target))
                return;
            model.showLegionGuidesMenu(false);
        };

// includes some temp CSS until next PTE

        $('div.view_intro').css( 'padding', '5px 2px' ).css( 'text-align', 'center' ).after('<div class="btn_std_ix view_intro" style="padding: 5px 2px; display: none; text-align: center" data-bind="visible: legionYouTubeReady, click: legionPlayVideo, click_sound: \'default\', rollover_sound: \'default\'">Legion Intro</div>');

        $('div.div_watermarks').css( 'bottom', '90px' );

//
        
        delete localStorage.legion_intro_one_time;
        
        model.legionPlayVideoed = ko.observable( false ).extend( { local: 'legion_intro_video_played' } );
        
        model.legionYouTubeReady = ko.observable( false );
        
        model.legionYouTubePlayer = undefined;
        
        model.legionYouTubeIframeAPIReady = function() {
            
            if ( ! model.legionPlayVideoed() ) {
                model.legionPlayVideo();
            }
            else {
                model.legionYouTubeReady( true );
            }
        }


        model.legionPlayVideoerReady = function(event) {
            
            model.legionPlayVideoed(true);
            engine.call('audio.pauseMusic', true);
            engine.call("audio.setVideoVolumeScale", 1);
            
            $('#legionYouTubePlayer').fadeIn();
        }
        
        model.legionStopVideo = function() {

            if ( model.legionYouTubePlayer ) {
                $('#legionYouTubePlayer').fadeOut( function() {
                    model.legionYouTubePlayer.destroy();
                    model.legionYouTubePlayer = false;
                    $('#legionYouTubePlayer').remove();
                    model.legionYouTubeReady(true);
                });
            }
        }
        
        model.legionYouTubePlayerStateChange = function(event) {

            var state = event && event.data;
            
            if ( state == YT.PlayerState.PAUSED || state == YT.PlayerState.ENDED ) {
                model.legionStopVideo();
            }
        }
        
        model.legionYouTubePlayerError = function(event) {
console.error('legionYouTubePlayerError ' + JSON.stringfy(event));
            model.legionStopVideo();
        }
        
        model.legionPlayVideo = function() {

            $('body').append('<div id="legionYouTubePlayer" style="display: none; position: absolute"></div>');
        
            model.legionYouTubePlayer = new YT.Player('legionYouTubePlayer', {
                height: '100%',
                width: '100%',
                videoId: LEGION_VIDEO_ID,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                    iv_load_policy: 3,
                    disablekb : 0,
                    origin: 'https://www.youtube.com'
                },
                events: {
                    onReady: model.legionPlayVideoerReady,
                    onStateChange: model.legionYouTubePlayerStateChange,
                    onError: model.legionYouTubePlayerError
                }            
            });            
        }
  
        var themesetting = api.settings.isSet('ui','legionMenuThemeFunction',true) || 'ON';

        if(themesetting === "ON") {
            loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_buttons.css");
            loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_shared.css");
            loadCSS("coui://ui/mods/com.pa.legion-expansion/css/background_logo.css");
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
        console.error(e);
    }
}


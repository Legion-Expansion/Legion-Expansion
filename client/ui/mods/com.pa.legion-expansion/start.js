
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
        var themesetting = api.settings.isSet('ui','legionThemeFunction',true) || 'ON';
        if(themesetting === "ON"){
          $('body').addClass("legion");
        }
        model.showLegionGuidesMenu = ko.observable(false);
        model.legionToggleGuides = function(){
          model.showLegionGuidesMenu(true);
        }
        model.navToLegionGuide1 = function(){
          engine.call('web.launchPage', 'http://exodusesports.com/article/planetary-annihilation-titans/');
          model.showLegionGuidesMenu(false);
        }
        
        model.navToLegionGuide2 = function(){
          engine.call('web.launchPage', 'http://exodusesports.com/article/legion-community-faction-mod/');
          model.showLegionGuidesMenu(false);
        }        
       
        //ADD GUIDES MENU
        $("#nav_mods").before('<div class="nav_cascade_group"><div class="btn_std_ix nav_item nav_item_text" data-bind="click: legionToggleGuides, click_sound: \'default\', rollover_sound: \'default\', css: { nav_item_text_disabled: !allowNewOrJoinGame(), btn_std_ix_active: showLegionGuidesMenu }">Legion Guides <div class="glyphicon glyphicon-chevron-right nav_carat" aria-hidden="true"></div></div><div class="nav_sub_item" data-bind="visible: showLegionGuidesMenu"><div class="nav_item nav_item nav_item_text btn_std_ix" data-bind="click: navToLegionGuide1, click_sound: \'default\', rollover_sound: \'default\'">TITANS</div><div class="nav_item nav_item nav_item_text btn_std_ix" data-bind="click: navToLegionGuide2, click_sound: \'default\', rollover_sound: \'default\'">LEGION</div></div> </div>')
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


model.legionYTPlayerReady = ko.observable(false);
model.legionYTPlayerOpen = ko.observable(false);

//Youtube video id (can be found in the url)
var legion_introVideoId = 'fYsPl8DFW7I';

//UNCOMMENT TO PLAY EVERY TIME
//localStorage.legion_intro_one_time = false;

// BLOCKED UNTIL WE HAVE AN INTRO VIDEO
var legion_intro_one_time = localStorage.legion_intro_one_time;

$("body").append("<div id='legion_intro' data-bind='visible: legionYTPlayerOpen, css: { legionplayerClosed: !legionYTPlayerOpen(), legionplayerOpen: legionYTPlayerOpen }'><div id='legionplayer'></div></div><script src='http://www.youtube.com/player_api'></script>");
$(".view_intro").after('<div class="btn_std_ix view_intro view_intro_legion" data-bind="visible: legionYTPlayerReady && !legionYTPlayerOpen() , click: playLegionVideo, click_sound: \'default\', rollover_sound: \'default\'">Legion Intro</div>');
$(".view_intro_legion").after('<div class="btn_std_ix view_intro" data-bind="visible: legionYTPlayerReady && legionYTPlayerOpen() , click: stopLegionVideo, click_sound: \'default\', rollover_sound: \'default\'">Stop Intro</div>');

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
model.legionYTplayer = null;
function onYouTubeIframeAPIReady() {
  
  model.legionYTplayer = new YT.Player('legionplayer', {
    height: '100%',
    width: '100%',
    videoId: legion_introVideoId,
    playerVars: {
      controls: 1,
      modestbranding: 1,
      rel: 0,
      iv_load_policy: 3
    },
    events: {
      'onReady': model.onPlayerLegionReady,
      'onStateChange': model.onPlayerLegionStateChange
    }
  });
}

model.onPlayerLegionStateChange = function(event) {
  if(event.data === 0) {
    model.stopLegionVideo();
  }
  console.log("Youtube Player State changed " + event.data);
}

model.stopLegionVideo = function(e) {
  model.legionYTplayer.stopVideo();
  api.audio.pauseMusic(false);
  model.legionYTPlayerOpen(false);
}

model.playLegionVideo = function(){
  engine.call('audio.pauseMusic', true);
  model.legionYTPlayerOpen(true);
  model.legionYTplayer.playVideo();
}

model.onPlayerLegionReady = function(event) {
  model.legionYTPlayerReady(true);
  /* BALLS
  $('#legionplayer').keyup(function(e) {
    if (e.keyCode === 27) model.stopLegionVideo();  console.log("stopped video via esc"); // esc
  });         
   */ 
  // Check if we should play the intro
  if(legion_intro_one_time != "true") {
    model.playLegionVideo();
    localStorage.legion_intro_one_time = "true";
  }
  else{ //fix for people getting stuck and pressing F5 so they can get out of video
    model.stopLegionVideo();
  }    
}

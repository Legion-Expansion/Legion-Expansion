
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

//Youtube video id (can be found in the url)
var legion_introVideoId = '0Bmhjf0rKe8';

//UNCOMMENT TO PLAY EVERY TIME
//localStorage.legion_intro_one_time = false;

// BLOCKED UNTIL WE HAVE AN INTRO VIDEO
/*

var legion_intro_one_time = localStorage.legion_intro_one_time;

// Check if we should play the intro
if(legion_intro_one_time != "true") {

	api.audio.pauseMusic(true);

	$("body").append("<div id='legion_intro_wrapper'><div id='legion_intro' style='display: none; position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 11111; background-color: black;'><div id='player'></div><div style='position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 22222;'></div></div></div><script src='http://www.youtube.com/player_api'></script>");
	localStorage.legion_intro_one_time = "true";
}


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
	 height: '100%',
	 width: '100%',
	 videoId: legion_introVideoId,
	 playerVars: {
		 controls: 0,
		 modestbranding: 1,
		 rel: 0,
iv_load_policy: 3
	 },
	 events: {
		'onReady': onPlayerReady,
		'onStateChange': onPlayerStateChange
	 }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	$("#player").css("border", "none");
  event.target.playVideo();
  	$("#legion_intro").show();

}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if(event.data === 0) {
				legion_introEnded();
  }
}

function legion_introEnded(e) {
  $("#legion_intro_wrapper").remove();
  api.audio.pauseMusic(false);
}

*/
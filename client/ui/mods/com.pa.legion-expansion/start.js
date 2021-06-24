var legionExpansionLoaded;

if (!legionExpansionLoaded) {
  legionExpansionLoaded = true;

  function legionStart() {
    try {
      model.showLegionGuidesMenu = ko.observable(false);

      model.legionToggleGuides = function () {
        if (model.showLegionGuidesMenu()) {
          model.showLegionGuidesMenu(false);
        } else {
          model.showLegionGuidesMenu(true);
          model.showSinglePlayerMenu(false);
          model.showMultiplayerMenu(false);
        }
      };
      model.navToLegionGuide1 = function () {
        engine.call(
          "web.launchPage",
          "http://exodusesports.com/article/planetary-annihilation-titans/"
        );
        model.showLegionGuidesMenu(false);
      };

      model.navToLegionGuide2 = function () {
        engine.call(
          "web.launchPage",
          "http://exodusesports.com/article/legion-expansion-community-faction-mod/"
        );
        model.showLegionGuidesMenu(false);
      };

      //ADD GUIDES MENU
      $("#nav_mods").before(
        '<div class="nav_cascade_group"><div class="btn_std_ix nav_item nav_item_text" data-bind="click: legionToggleGuides, click_sound: \'default\', rollover_sound: \'default\', css: { nav_item_text_disabled: !allowNewOrJoinGame(), btn_std_ix_active: showLegionGuidesMenu }">' +
          loc("!LOC:Legion Guides") +
          '<div class="glyphicon glyphicon-chevron-right nav_carat" aria-hidden="true"></div></div><div class="nav_sub_item" data-bind="visible: showLegionGuidesMenu"><div class="nav_item nav_item nav_item_text btn_std_ix" data-bind="click: navToLegionGuide1, click_sound: \'default\', rollover_sound: \'default\'">TITANS</div><div class="nav_item nav_item nav_item_text btn_std_ix" data-bind="click: navToLegionGuide2, click_sound: \'default\', rollover_sound: \'default\'">LEGION</div></div> </div>'
      );

      var legionOriginalToggleSinglePlayerMenu = model.toggleSinglePlayerMenu;
      var legionOriginalToggleMultiplayerPlayerMenu =
        model.toggleMultiplayerMenu;
      var legionOriginalHideSubMenus = model.hideSubMenus;

      model.toggleSinglePlayerMenu = function () {
        legionOriginalToggleSinglePlayerMenu();
        model.showLegionGuidesMenu(false);
      };

      model.toggleMultiplayerMenu = function () {
        legionOriginalToggleMultiplayerPlayerMenu();
        model.showLegionGuidesMenu(false);
      };

      model.hideSubMenus = function (data, event) {
        legionOriginalHideSubMenus(data, event);
        if (document.getElementById("navigation_panel").contains(event.target))
          return;
        model.showLegionGuidesMenu(false);
      };

      // includes some temp CSS until next PTE

      $("div.view_intro:contains(View Intro)")
        // .css("padding", "flex")
        // .css("text-align", "center")
        // .css("flex-grow", "1")
        // .css("justify-content", "center")
        // .css("flex-direction", "column")
        .after(
          '<div class="btn_std_ix view_intro" style="display: flex; text-align: center; flex-grow: 1; justify-content: center; flex-direction: column" data-bind="click: legionPlayVideo, click_sound: \'default\', rollover_sound: \'default\'"><loc>Legion Intro</loc></div>'
        );
      locUpdateDocument();

      $("div.div_watermarks").css("bottom", "95px");

      model.legionPlayVideo = function () {
        engine.call(
          "web.launchPage",
          "https://gaming.youtube.com/embed/aqzdPnJfKMo?autoplay=1"
        );
      };

      var themesetting =
        api.settings.isSet("ui", "legionMenuThemeFunction", true) || "ON";

      if (themesetting === "ON") {
        loadCSS(
          "coui://ui/mods/com.pa.legion-expansion/css/legion_buttons.css"
        );
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_shared.css");
        loadCSS("coui://ui/mods/com.pa.legion-expansion/css/start.css");
        $("body").addClass("legion");
      }
    } catch (e) {
      console.error(e);
    }
  }
  legionStart();
}

define({
  bodyPanelClass: function (faction) {
    if (faction === "legion") {
      $(".body_panel").addClass("legionui");
    } else if (faction === "mixed") {
      $(".body_panel").addClass("mixedui");
    }
  },
  imageSourceForType: function (path, colour, type) {
    return path + colour + "/icon_category_" + type.toLowerCase() + ".png";
  },
  toggleImage: function (src, path, colour, png1, png2) {
    var imgPath = path + colour + "/";
    var src1 = src + png1 + "']";
    $(src1).attr("src", imgPath + png1);
    if (png2) {
      var src2 = src + png2 + "']";
      $(src2).attr("src", imgPath + png2);
    }
  },
  togglePanel: function (panel, path, colour, png1, png2) {
    var folderPath = path + colour + "/";
    return panel ? folderPath + png1 : folderPath + png2;
  },
  uiColour: function (faction) {
    if (faction === "legion") {
      return "red";
    } else if (faction === "mixed") {
      return "purple";
    }
    return "";
  },
});

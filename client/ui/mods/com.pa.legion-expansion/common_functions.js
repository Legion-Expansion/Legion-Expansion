define({
  bodyPanelClass: function (faction) {
    if (faction === "legion") {
      $(".body_panel").addClass("legionui");
    } else if (faction === "mixed") {
      $(".body_panel").addClass("mixedui");
    } else {
      return;
    }
  },
  panelPath: function (panel, path, colour, png1, png2) {
    return panel ? path + colour + png1 : path + colour + png2;
  },
  uiColour: function (faction) {
    var colour = "";

    if (faction === "legion") {
      colour = "red";
    }
    if (faction === "mixed") {
      colour = "purple";
    }
    return colour;
  },
  toggleImage: function (src, path, colour, png1, png2) {
    var imgPath = path.concat(colour);
    var src1 = src.concat(png1, "']");

    $(src1).attr("src", imgPath + png1);
    if (png2) {
      var src2 = src.concat(png2, "']");
      $(src2).attr("src", imgPath + png2);
    }
  },
});

define({
  bodyPanelClass: function (faction) {
    switch (faction) {
      case "legion":
        $(".body_panel").addClass("legionui");
        break;
      case "mixed":
        $(".body_panel").addClass("mixedui");
    }
  },
  imageSourceForType: function (path, colour, type) {
    return path + colour + "/icon_category_" + type.toLowerCase() + ".png";
  },
  setupSourcePath: function (src, png) {
    var prefixedSource = "img[src='" + src;
    return prefixedSource + png + "']";
  },
  setSourceAttribute: function (src, path, colour, png) {
    var imgPath = path + colour + "/";
    $(src).attr("src", imgPath + png);
  },
  toggleImage: function (src, path, colour, png1, png2) {
    var src1 = this.setupSourcePath(src, png1);
    this.setSourceAttribute(src1, path, colour, png1);
    if (png2) {
      var src2 = this.setupSourcePath(src, png2);
      this.setSourceAttribute(src2, path, colour, png2);
    }
  },
  togglePanel: function (panel, path, colour, png1, png2) {
    var folderPath = path + colour + "/";
    return panel ? folderPath + png1 : folderPath + png2;
  },
  uiColour: function (faction) {
    switch (faction) {
      case "legion":
        return "red";
      case "mixed":
        return "purple";
      default:
        return "";
    }
  },
});

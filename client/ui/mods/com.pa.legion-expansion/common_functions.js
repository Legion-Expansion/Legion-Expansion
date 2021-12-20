define({
  uiColour: function () {
    var ui = model.isLegionOrMixedOrVanilla();
    var colour = "";

    if (ui === "legion") {
      colour = "red";
    }
    if (ui === "mixed") {
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

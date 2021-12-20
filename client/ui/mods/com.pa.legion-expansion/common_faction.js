model.isLegion = function (data) {
  if (model.isLegionOrMixedOrVanilla(data) === "legion") {
    return true;
  }
  return false;
};

model.isMixed = function (data) {
  if (model.isLegionOrMixedOrVanilla(data) === "mixed") {
    return true;
  }
  return false;
};

$(".body_panel").attr(
  "data-bind",
  "css: { legion: model.isLegion($data), mixed: model.isMixed($data)}"
);

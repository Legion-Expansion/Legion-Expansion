handlers.legionui = function (payload) {
  if (payload === "legion") {
    $(".body_panel").addClass("legionui");
  }
  if (payload === "mixed") {
    $(".body_panel").addClass("mixedui");
  }
};

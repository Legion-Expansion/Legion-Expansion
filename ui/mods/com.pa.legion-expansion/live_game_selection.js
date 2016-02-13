//LOAD CUSTOM LEGION NEW GAME CSS
loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_selection.css");
loadScript("coui://ui/mods/com.pa.legion-expansion/common.js");

//see global.js
var legionspecids = legionglobal.commanders;

model.isLegion = function (type){
  haslegionunit = false;
  try{
      if(_.includes(legionspecids, type)){
        haslegionunit = true;
        return haslegionunit;
      }
      if(type.indexOf("/L_") > 2){
          haslegionunit = true;
          return haslegionunit;
      }
  }
  catch(e){
  }

  return haslegionunit;
};

//ADD legion class to build_bar_menu
$('.div_unit_selection').attr("data-bind","css: { legion: model.isLegion($data.type)}, event: { mousedown: function (data, event) { $root.onTypeFilterClick($data.type, event); } }");

handlers.legionui = function(payload){
  console.log("SET UI : " + payload);
  if(payload === "legion"){
    $('.body_panel').addClass("legionui");
  }
  if(payload === "mixed"){
    $('.body_panel').addClass("mixedui");
  }
}

console.log("selection legion");
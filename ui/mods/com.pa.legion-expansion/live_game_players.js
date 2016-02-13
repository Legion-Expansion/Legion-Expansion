//LOAD CUSTOM LEGION NEW GAME CSS
loadCSS("coui://ui/mods/com.pa.legion-expansion/css/legion_players.css");
loadScript("coui://ui/mods/com.pa.legion-expansion/common.js");

//see global.js
var legioncomms = legionglobal.commanders;

model.isLegionOrMixedOrVanilla = function () {
  try{
    var legioncount = 0;
    var specslength = 0;
    var selectedspecs = model.player().commanders;
    
    _.forOwn(selectedspecs, function(value, key){
      if(_.includes(legioncomms, value)){
        legioncount++;
      }
      specslength++; 
    });
    if(legioncount == specslength){
      return "legion";
    }
    else{
      if(legioncount > 0 && legioncount < specslength){
        return "mixed";
      }
      else{
        return "vanilla";
      }
    }
  }
  catch(e){
    return "";
  }
}

model.isLegion = function (){
 if(model.isLegionOrMixedOrVanilla() === "legion"){
    return true;
 }
 else{
    return false;
 }
};

model.isMixed = function (){
 if(model.isLegionOrMixedOrVanilla() === "mixed"){
    return true;
 }
 else{
    return false;
 }
};

api.Panel.message(api.Panel.parentId,'legionui', model.isLegionOrMixedOrVanilla());

$('.body_panel').attr("data-bind","css: { legionui: model.isLegion(), mixedui: model.isMixed()}, visible: show");

console.log("players legion");
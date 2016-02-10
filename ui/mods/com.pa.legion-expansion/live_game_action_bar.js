//LOAD CUSTOM LEGION ACTIONBAR CSS
loadCSS("coui://ui/mods/com.pa.legion-expansion/css/action_bar.css");
loadScript("coui://ui/mods/com.pa.legion-expansion/common.js");

//see global.js
var legionspecids = legionglobal.commanders;

model.isLegion = function (data){
  haslegionunit = false;
  try{
    var selectedspecs = data.selection().spec_ids;
    
    _.forOwn(selectedspecs, function(value, key){
      if(_.includes(legionspecids, key)){
        haslegionunit = true;
        return haslegionunit;
      }
      if(key.indexOf("/L_") > 2){
        haslegionunit = true;
        return haslegionunit;
      }
    });
  }
  catch(e){
  }

  return haslegionunit;
};

//ADD legion class to build_bar_menu
$('.body_panel').attr("data-bind","css: { legion: model.isLegion($data)}");


console.log("actionbar legion");
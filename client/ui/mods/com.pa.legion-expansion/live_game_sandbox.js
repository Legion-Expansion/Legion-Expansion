var legionLiveGameSandboxLoaded;

if (!legionLiveGameSandboxLoaded) {
  legionLiveGameSandboxLoaded = true;

  try {
    if (model.baseGroups) {
      model.baseGroups.splice(
        99,
        0,
        "L_factory",
        "L_combat",
        "L_utility",
        "L_orbital_structure",
        "L_ammo"
      );
    }
    if (model.mobileGroups) {
      model.mobileGroups.splice(
        99,
        0,
        "L_vehicle",
        "L_bot",
        "L_air",
        "L_sea",
        "L_orbital"
      );
    }
  } catch (e) {
    console.error(e);
    console.error(JSON.stringify(e));
  }
}

(function () {
	var buildNumber = decode(sessionStorage['build_version']);

	console.log("Currently Running Legion Faction Mod on " + version + ", last tested on 82834");

    var legionFaction = {};

    legionFaction.newCommanders = [
        "TODO1",
        "TODO2"
    //etc
    ];
    var chosenCommander = ko.observable(legionFaction.newCommanders[0]);
    var lockArmy = function (chosenCommander) {
        if (chosenCommander === 0 /*a legion faction commander, the 0 is in place as a placeholder*/ ) {
            /*prevent other players in the army from choosing a vanilla commander*/
        }
    };
    if (self.toggleShareArmy()) {

    }
})();
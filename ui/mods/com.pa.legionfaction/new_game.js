var legionFactionLoaded;

if ( ! legionFactionLoaded )
{

    legionFactionLoaded = true;
    
    function legionFaction()
    {
    
        var buildVersion = decode( sessionStorage.build_version );
    
        var patchName = 'legionFaction new_game.js';
    
        console.log(patchName + ' on ' + buildVersion + ' last tested on 83796');
        
        var commanderObjectNameToHack = 'ImperialFiveleafclover';
        
        var commanderIdToHack = '/pa/units/commanders/imperial_fiveleafclover/imperial_fiveleafclover.json';
        
       if ( buildVersion == 83796 )
       {
            var catalog = model.extendedCatalog();
            
            var commanderToHack = _.find( catalog, { ObjectName: commanderObjectNameToHack } );
            
            commanderToHack.IsFree = true;
            
            commanderToHack.DisplayName = "Legion Commander";
            
            model.extendedCatalog( catalog );
                
        }
        else
        {
            model.commanders.subscribe( function( commanders )
            {
                commanders.push( commanderIdToHack );
            });
        }
        
        model.selectedCommander.subscribe( function( selectedCommander )
        {
			localStorage.setItem( 'legionFactionSelected', buildVersion == 83796 ? selectedCommander.ObjectName == commanderObjectNameToHack : selectedCommander == commanderIdToHack );
		});
    }
    
    try
    {
        legionFaction();
    }
    catch (e)
    {
        console.log(e);
        console.log(JSON.stringify(e));
    }
}

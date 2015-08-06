var legionFactionLoaded;

if ( ! legionFactionLoaded )
{

    legionFactionLoaded = true;
    
    function legionFaction()
    {
    
        var buildVersion = decode( sessionStorage.build_version );
    
        var patchName = 'legionFaction new_game.js';
    
        console.log(patchName + ' on ' + buildVersion + ' last tested on 85138');
        
        var commanderObjectNameToHack = 'ImperialFiveleafclover';
        
        var commanderIdToHack = '/pa/units/commanders/imperial_fiveleafclover/imperial_fiveleafclover.json';
        
        model.commanders.subscribe( function( commanders )
        {
            commanders.push( commanderIdToHack );
        });
        
        model.selectedCommander.subscribe( function( selectedCommander )
        {
            
            localStorage.setItem( 'legionFactionSelected', selectedCommander == commanderIdToHack );
           
        } );
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

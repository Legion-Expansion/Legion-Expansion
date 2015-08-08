var legionExpansionLoaded;

if ( ! legionExpansionLoaded )
{

    legionExpansionLoaded = true;
    
    function legionExpansion()
    {
    
        var buildVersion = decode( sessionStorage.build_version );
    
        var patchName = 'legionExpansion new_game.js';
    
        console.log(patchName + ' on ' + buildVersion + ' last tested on 85138');
        
        var commanderObjectNameToHack = 'ImperialFiveleafclover';
        
        var commanderIdToHack = '/pa/units/commanders/imperial_fiveleafclover/imperial_fiveleafclover.json';
        
        model.commanders.subscribe( function( commanders )
        {
            commanders.push( commanderIdToHack );
        });
        
        localStorage.setItem( 'legionExpansionSelected', false );
        
        model.selectedCommander.subscribe( function( selectedCommander )
        {
            
            localStorage.setItem( 'legionExpansionSelected', selectedCommander == commanderIdToHack );
           
        } );
    }
    
    try
    {
        legionExpansion();
    }
    catch (e)
    {
        console.log(e);
        console.log(JSON.stringify(e));
    }
}

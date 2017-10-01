class Player
{
	constructor()
	{
		var x;
		var y;
		
		var dead = false;
		
		var scoreAddCounter = 0;
		const SCORE_ADD_AMOUNT = 5;
		
		var beep = new Audio( "audio/beep.wav" );
		var ouch = new Audio( "audio/augh.wav" );
		var step = new Audio( "audio/caminar.wav" );
		
		// 
		this.Init = function()
		{
			x = 4;
			y = 8;
			
			scoreAddCounter = 0;
			
			ouch.volume = 0.7;
			beep.volume = 0.7;
		}
		
		this.Update = function()
		{
			if( !dead )
			{
				if( kbd.KeyDown( 87 ) )
				{
					area.Move( -1 );
					
					dark.PushBack();
					
					if( scoreAddCounter >= SCORE_ADD_AMOUNT )
					{
						beep.play();
						++highScore;
						
						scoreAddCounter = 0;
					}
					else
						++scoreAddCounter;
					
					step.currentTime = 0;
					step.play();
				}
				// else if( kbd.KeyDown( 83 ) )
				// 	area.Move( 1 );
				else if( kbd.KeyDown( 65 ) && x > 0 )
				{
					--x;
					
					step.currentTime = 0;
					step.play();
				}
				else if( kbd.KeyDown( 68 ) && x < 8 )
				{
					++x;
					step.currentTime = 0;
					step.play();
				}
				
				if( area.SpotIsLava( x,y ) || dark.SpotIsDarkness( x,y ) )
				{
					dead = true;
					
					ouch.play();
				}
			}
		}
		
		this.Draw = function( opacity )
		{
			gfx.Rect( x * area.TileSize(),y * area.TileSize(),area.TileSize(),area.TileSize(),"#FA0",opacity );
		}
		
		this.Revive = function()
		{
			dead = false;
		}
		
		this.Alive = function()
		{
			return !dead;
		}
	}
}
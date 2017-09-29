class Player
{
	constructor()
	{
		var x = 4;
		var y = 10;
		
		// 
		this.Update = function()
		{
			if( kbd.KeyDown( 87 ) )
				area.Move( -1 );
			// else if( kbd.KeyDown( 83 ) )
			// 	area.Move( 1 );
			else if( kbd.KeyDown( 65 ) && x > 0 )
				--x;
			else if( kbd.KeyDown( 68 ) && x < 8 )
				++x;
		}
		
		this.Draw = function()
		{
			gfx.Rect( x * area.TileSize(),y * area.TileSize(),area.TileSize(),area.TileSize(),"#FA0" );
		}
	}
}
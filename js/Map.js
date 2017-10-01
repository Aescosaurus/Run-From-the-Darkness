class Map
{
	constructor()
	{
		const RandGround = function()
		{
			// var hexChars = [ '0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F' ];
			var hexChars = [ '3','4','5','6','7','8','9','A','B','C' ];
			
			var hexCode = "#";
			
			const nextChar = hexChars[calc.Random( 0,hexChars.length - 1 )];
			
			for( var i = 0; i < 6; ++i )
				hexCode += nextChar;
			
			return hexCode;
		}
		
		const RandVoid = function()
		{
			var hexChars = [ '8','9','A','B','C','D','E','F' ];
			
			var hexCode = "#";
			
			const nextChar = hexChars[calc.Random( 0,hexChars.length - 1 )];
			
			for( var i = 0; i < 2; ++i )
				hexCode += nextChar;
			
			hexCode += "0000";
			
			return hexCode;
		}
		// 
		const TILE_SIZE = 50; // 15x9 tile grid.
		const WIDTH = gfx.SCREEN_WIDTH / TILE_SIZE;
		const HEIGHT = gfx.SCREEN_HEIGHT / TILE_SIZE;
		
		var tiles = [];
		
		var lastPosX = calc.Random( 1,WIDTH - 1 );
		
		// 
		this.Init = function()
		{
			const LAST_POS_ORIG = lastPosX;
			
			init:
			for( var i = 0; i < HEIGHT; ++i )
			{
				for( var j = 0; j < WIDTH; ++j )
				{
					// gj :)
					if( i == HEIGHT - 7 )
						tiles[i * WIDTH + j] = RandGround();
					else if( i > HEIGHT - 7 )
						tiles[i * WIDTH + j] = RandVoid();
					else
					{
						tiles[i * WIDTH + j] = RandVoid();
						var randNum = calc.Random( 0,2 );
						
						if( lastPosX === j )
						{
							if( randNum === 0 && j > 1 )
							{
								tiles[i * WIDTH + j] = RandGround();
								tiles[i * WIDTH + j - 1] = RandGround();
								
								lastPosX = j - 1;
							}
							else if( randNum === 1 && j < WIDTH - 2 )
							{
								tiles[i * WIDTH + j] = RandGround();
								tiles[i * WIDTH + ++j] = RandGround();
								
								lastPosX = j; //  + 1;
							}
							else
							{
								tiles[i * WIDTH + j] = RandGround();
								
								lastPosX = j;
							}
						}
					}
				}
			}
			
			lastPosX = LAST_POS_ORIG;
		}
		
		this.Update = function()
		{
			
		}
		
		this.Draw = function( opacity )
		{
			for( var i = 0; i < HEIGHT; ++i )
			{
				for( var j = 0; j < WIDTH; ++j )
				{
					const t = tiles[i * WIDTH + j];
					
					gfx.Rect( j * TILE_SIZE,i * TILE_SIZE,TILE_SIZE,TILE_SIZE,t,opacity );
				}
			}
		}
		
		this.Move = function( yMove )
		{
			// lastPosX = 9999;
			// 
			// while( lastPosX === 9999 )
			// {
			// 	for( var j = 0; j < WIDTH; ++j )
			// 	{
			// 		if( tiles[j].substr( 0,5 ) !== "#0000" )
			// 		{
			// 			if( !calc.Random( 0,2 ) )
			// 				lastPosX = j;
			// 			else
			// 				continue;
			// 			
			// 			break;
			// 		}
			// 	}
			// }
			
			// console.log( lastPosX );
			
			for( var j = 0; j < WIDTH; ++j )
				tiles.unshift( RandVoid() );
			
			for( var j = 0; j < WIDTH; ++j )
			{
				if( j === lastPosX )
				{
					const randNum = calc.Random( 0,2 );
					
					if( randNum === 0 && j > 0 )
					{
						tiles[j - 1] = RandGround();
						tiles[j] = RandGround();
						
						lastPosX = j - 1;
					}
					else if( randNum === 1 && j < 8 )
					{
						// tiles[j - 1] = RandGround();
						tiles[j] = RandGround();
						tiles[j + 1] = RandGround();
						
						lastPosX = j + 1;
					}
					else
					{
						tiles[j] = RandGround();
						
						if( !calc.Random( 0,1 ) )
						{
							if( j > 0 )
								tiles[j - 1] = RandGround();
							else if( j < 8 )
								tiles[j + 1] = RandGround();
						}
						
						lastPosX = j;
					}
				
					tiles.splice( tiles.length - 1,1 );
					
					break;
				}
			}
		}
		
		this.SpotXY = function( xPos,yPos )
		{
			return tiles[yPos * WIDTH + xPos];
		}
		
		this.SpotIsLava = function( xPos,yPos )
		{
			return ( tiles[yPos * WIDTH + xPos].substr( 3,4 ) == "0000" );
		}
		
		this.TileSize = function()
		{
			return TILE_SIZE;
		}
		
		this.Width = function()
		{
			return WIDTH;
		}
		
		this.Height = function()
		{
			return HEIGHT;
		}
	}
}
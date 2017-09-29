class Map
{
	constructor()
	{
		const RandGround = function()
		{
			// var hexChars = [ '0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F' ];
			var hexChars = [ '3','4','5','6','7','8' ];
			
			var hexCode = "#";
			
			const nextChar = hexChars[calc.Random( 0,hexChars.length - 1 )];
			
			for( var i = 0; i < 6; ++i )
				hexCode += nextChar;
			
			return hexCode;
		}
		
		const RandVoid = function()
		{
			var hexChars = [ '6','7','8','9','A','B','C','D','E','F' ];
			
			var hexCode = "#0000";
			
			const nextChar = hexChars[calc.Random( 0,hexChars.length - 1 )];
			
			for( var i = 0; i < 2; ++i )
				hexCode += nextChar;
			
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
			
			for( var i = 0; i < HEIGHT; ++i )
			{
				for( var j = 0; j < WIDTH; ++j )
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
					
					// gj :)
					if( i == HEIGHT - 5 )
						tiles[i * WIDTH + j] = RandGround();
				}
			}
			
			lastPosX = LAST_POS_ORIG;
		}
		
		this.Update = function()
		{
			
		}
		
		this.Draw = function()
		{
			for( var i = 0; i < HEIGHT; ++i )
			{
				for( var j = 0; j < WIDTH; ++j )
				{
					const t = tiles[i * WIDTH + j];
					
					gfx.Rect( j * TILE_SIZE,i * TILE_SIZE,TILE_SIZE,TILE_SIZE,t );
				}
			}
		}
		
		this.Move = function( yMove )
		{
			for( var j = 0; j < WIDTH; ++j )
			{
				if( tiles[j].substr( 0,2 ) !== "#0000" )
				{
					lastPosX = j;
					
					break;
				}
			}
			
			console.log( lastPosX );
			
			for( var j = 0; j < WIDTH; ++j )
			{
				tiles.unshift( RandVoid() );
				
				if( j === lastPosX )
				{
					const randNum = calc.Random( 0,2 );
					// console.log( randNum );
					
					if( randNum === 0 && j !== 0 )
					{
						tiles[j - 1] = RandGround();
						tiles[j] = RandGround();
						
						lastPosX = j - 1;
					}
					else if( randNum === 1 && j !== WIDTH - 2 )
					{
						tiles[j] = RandGround();
						tiles[j + 1] = RandGround();
						
						lastPosX = j + 1;
					}
					else
					{
						tiles[j] = RandGround();
						
						lastPosX = j;
					}
				}
				
				// tiles.unshift( RandGround() );
				tiles.splice( tiles.length - 1,1 );
			}
		}
		
		this.SpotXY = function( xPos,yPos )
		{
			return tiles[yPos * WIDTH + xPos];
		}
		
		this.TileSize = function()
		{
			return TILE_SIZE;
		}
	}
}
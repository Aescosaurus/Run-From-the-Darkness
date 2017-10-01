class Darkness
{
	constructor()
	{
		var RandDarkness = function()
		{
			var hexChars = [ '0','1','2','3' ];
			
			var hexCode = "#";
			
			const nextChar = hexChars[calc.Random( 0,hexChars.length - 1 )];
			
			for( var i = 0; i < 6; ++i )
				hexCode += nextChar;
			
			return hexCode;
		}
		// 
		var positions = [];
		
		var MOVE_TIME = 25;
		var moveUpCounter = 0;
		var minMoveUpTime = 1;
		var maxMoveUpTime = 2;
		
		var progress = 3;
		
		// 
		this.Init = function()
		{
			positions = [];
			
			MOVE_TIME = 25;
			moveUpCounter = 0;
			
			progress = 3;
			
			this.GeneratePositions();
		}
		
		this.Update = function()
		{
			if( ++moveUpCounter > MOVE_TIME )
			{
				++progress;
				
				this.GeneratePositions();
				
				moveUpCounter = 0;
				MOVE_TIME = calc.Random( minMoveUpTime,maxMoveUpTime );
			}
		}
		
		this.Draw = function( opacity )
		{
			for( var i in positions )
			{
				const d = positions[i];
				
				gfx.Rect( d.x * area.TileSize(),d.y * area.TileSize(),area.TileSize(),area.TileSize(),RandDarkness(),opacity );
			}
		}
		
		this.GeneratePositions = function()
		{
			positions = [];
			var curPos = 0;
			
			for( var y = area.Height() - progress; y < area.Height(); ++y )
			{
				for( var x = 0; x < area.Width(); ++x )
				{
					if( !calc.Random( 0,1 ) )
						positions[curPos++] = { x,y };
					
					if( !calc.Random( 0,1 ) )
						positions[curPos++] = { x,y };
				}
			}
		}
		
		this.PushBack = function()
		{
			moveUpCounter = 0;
			
			if( progress > 1 )
				--progress;
			
			MOVE_TIME = calc.Random( minMoveUpTime,maxMoveUpTime );
			
			this.GeneratePositions();
		}
		
		this.Positions = function()
		{
			return positions;
		}
		
		this.SpotIsDarkness = function( xPos,yPos )
		{
			for( var i in positions )
			{
				const d = positions[i];
				
				if( d.x === xPos && d.y === yPos )
					return true;
			}
			
			return false;
		}
	}
}
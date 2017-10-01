// Strings
const version = "v2.0.4";

// Numbers
var introBlend = 0.0;
var highScore = 0;

// Booleans
var started = false;

// Arrays
var sizes = [ 5,12,10 ];

// Objects
var calc = new Calc();
var gfx = new Graphics();
var kbd = new Keyboard();
var ms = new Mouse();
// 
var pl = new Player();
var area = new Map();
var dark = new Darkness();

window.onload = function()
{
	const fps = 10;
	setInterval( function()
	{
		Update();
		Draw();
	},1000 / fps );
	Init();
};

function Init()
{
	// Initialize things here.
	kbd.Init();
	ms.Init( gfx.canvas );
	
	gfx.SetSmoothing( true ); // Set false for pixel art.
	
	pl.Init();
	area.Init();
	dark.Init();
	
	console.log( "JSJ Framework " + version + " has loaded successfully!" );
}

function Update()
{
	// Update things here.
	if( started )
	{
		pl.Update();
		
		area.Update();
		
		dark.Update();
	}
	else
	{
		if( kbd.KeyDown( 83 ) )
		{
			if( introBlend < 1.0 )
				introBlend += 0.1;
			else
			{
				started = true;
				
				pl.Revive();
				
				highScore = 0;
			}
		}
		else
			introBlend = 0.0;
	}
}

function Draw()
{
	gfx.Rect( 0,0,gfx.SCREEN_WIDTH,gfx.SCREEN_HEIGHT,"#000" );
	// Draw things here.
	if( started )
	{
		if( !pl.Alive() )
		{
			introBlend -= 0.1;
			
			// gfx.context.globalAlpha = 1.0 - introBlend;
			
			if( introBlend <= 0.1 )
			{
				started = false;
				
				pl.Init();
				area.Init();
				dark.Init();
			}
		}
		
		area.Draw( introBlend );
		
		pl.Draw( introBlend );
		
		dark.Draw( introBlend );
		
		gfx.Write( gfx.SCREEN_WIDTH * 0.47,50,highScore,"#FFF","50PX Comic Sans MS" );
	}
	else
	{
		gfx.context.globalAlpha = 1.0 - introBlend;
		
		gfx.Write( gfx.SCREEN_WIDTH * 0.2,gfx.SCREEN_HEIGHT * 0.3,"Run From the Darkness","#FFF","25PX Tahoma" );
		gfx.Write( gfx.SCREEN_WIDTH * 0.14,gfx.SCREEN_HEIGHT * 0.35,"Hold <S> to start the apocalypse!","#FFF","20PX Comic Sans MS" );
		gfx.Write( gfx.SCREEN_WIDTH * 0.45,gfx.SCREEN_HEIGHT * 0.5,highScore,"#FFF","50PX Tahoma" );
	}
}

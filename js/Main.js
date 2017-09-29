// Strings
const version = "v2.0.4";

// Numbers

// Booleans

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

window.onload = function()
{
	const fps = 5;
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
	
	area.Init();
	
	console.log( "JSJ Framework " + version + " has loaded successfully!" );
}

function Update()
{
	// Update things here.
	pl.Update();
	
	area.Update();
}

function Draw()
{
	gfx.Rect( 0,0,gfx.SCREEN_WIDTH,gfx.SCREEN_HEIGHT,"#000" );
	// Draw things here.
	area.Draw();
	
	pl.Draw();
}

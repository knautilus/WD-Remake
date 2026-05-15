/////////////////////////////////////////////////////////////////////////////////
// def.gs
// General defines file
/////////////////////////////////////////////////////////////////////////////////
#def GAME_SCRW		256			// screen's width (fixed by engine to Z80 screen size)
#def GAME_SCRH		192			// screen's height (fixed by engine to Z80 screen size)
#def AIR_LEVEL		100			// player's air critical level
#def STUN_LEVEL		52			// player's stun critical level
#def DIZ_HURT		1			// default hurt level for "hurt" materials
#def WINDPOW		2			// default wind power
#def DIZ_POW		7			// player's jump power (for default movement)
#def DIZ_STEP		4			// player's walk step (for default movement)
#def JUMPFIXPOW		16			// fix jumper power
#def JUMPPROPOW		16			// pro jumper power limit
#def FLIPX			1			// flip x (bit value)
#def FLIPY			2			// flip y (bit value)
#def FLIPR			4			// flip rotate (bit value)
#def AnimFrameStep	4			// update animation every 4th frame
#def FALL_HURT		15

#def PTILE_IDLE		10			// default player's idle tile id
#def PTILE_WALK		11			// default player's walk tile id
#def PTILE_UP		12
#def PTILE_JUMP		13
#def PTILE_STUN		14
#def PTILE_DEAD		15
#def PTILE_NOAIR1	16
#def PTILE_NOAIR2	17
#def PTILE_NOAIR3	18
#def PTILE_EAT		19
#def PTILE_SWIM		20
#def PTILE_SWIMUP	21
#def PTILE_SWIMJUMP	22
#def PTILE_DROWN	23
#def PTILE_TURN		24
#def PTILE_CLIMB	25
#def PTILE_SIT		26

#def EMOTION_NOAIR1	6			// player's emotion offset for no air1
#def EMOTION_NOAIR2	7			// player's emotion offset for no air2
#def EMOTION_NOAIR3	8			// player's emotion offset for no air3

#def MAT_AIR		0			// void
#def MAT_WATER		1			// water (void); player can drawn in water
#def MAT_HURT		2			// hurt (void); player gets hurt
#def MAT_KILL		3			// kill (void); player gets killed
#def MAT_CLOUD		4			// clouds (medium); player sinks on clouds
#def MAT_CLIMB		5			// stairs (medium); player stands on
#def MAT_WIND		6			// winds (medium); player is pushed up
#def MAT_BLOCK		7			// ground, walls (hard); blocks the player
#def MAT_JUMPFIX	8			// jumper fix (hard)
#def MAT_JUMPPRO	9			// jumper progressive (hard)
#def MAT_LADDER		10			// ladder; player can climb
#def MAT_DOOR		11			// door; player can teleport on action
#def MAT_TELEPORT		12			// teleport; player can teleport on collide

// objects classes
#def CLASS_NONE		0			// default
#def CLASS_ACTION	1			// those objects can be used with action
#def CLASS_HURT		2			// used for objects that should hurt you (no automation implemented)
#def CLASS_KILL		3			// used for objects that should kill you (no automation implemented)
#def CLASS_ITEM		4			// those objects can be picked up in the inventory
#def CLASS_COIN		5			// those objects can be collected as coins
#def CLASS_FOOD		6			// those objects can eaten to grow the life
#def CLASS_LIFE		7			// those objects gives a credit when picked up.
#def CLASS_WAYPOINT	8			// used for dummy waypoints (no automation implemented)

// scores
#def SCORE_ROOM		500
#def SCORE_COIN		250
#def SCORE_FOOD		100

// colors
#def COLOR_BLACK	0xff000000
#def COLOR_BLUE		0xff0000ff
#def COLOR_RED		0xffff0000
#def COLOR_MAGENTA	0xffff00ff
#def COLOR_GREEN	0xff00ff00
#def COLOR_CYAN		0xff00ffff
#def COLOR_YELLOW	0xffffff00
#def COLOR_WHITE	0xffffffff
#def COLOR_DIALOG	0xff00ffff	// dialog default border color

// global variables starting from G_USER=64 up to G_MAX=256
#def G_SHAKE		64			// shake frames counter
#def G_RUMBLE		65			// rumble frames counter
#def G_COVER		66			// if cover screen is painted
#def G_MUSICSAFE	67			// store music for player respawn
#def G_MUSICPOSSAFE	68			// store music pos for player respawn
#def G_GAME			100			// globals representing game logic are recomended to start from this index up to 200 (add them in gamedef.gs)
#def G_STATIC		240			// the rest of the global variables, starting with this one, are not reseted on restart, see HandlerGameStart()
#def G_RESTART		240			// true after first start, false after that, see GameStartLoad()
// ...

// object variables starting from O_USER=32 up to O_MAX=48
#def O_WAYPOINTMOVEDELAY	32	// delay value for class waypoint, used in AIUpdateTrain()
#def O_WAYPOINTFLIP			33	// flip value for class waypoint, used in AIUpdateTrain()

#def O_BUBBLESPEED 	32	// bubble moving speed, set at spawn time, used in AIUpdateBubbles()
#def O_BUBBLETIME 	33	// bubble life time, growing each cycle, used in AIUpdateBubbles()

#def O_SPEEDX		32	// horizontal moving speed (1-10), used in AIUpdateFly()
#def O_SPEEDY		33	// vertical moving speed (1-10), used in AIUpdateFly()
#def O_BOUNDTOP		34	// top boundary y coordinate, used in AIUpdateFly()
#def O_BOUNDBOTTOM	35	// bottom boundary y coordinate, used in AIUpdateFly()
#def O_BOUNDLEFT	36	// left boundary x coordinate, used in AIUpdateFly()
#def O_BOUNDRIGHT	37	// right boundary x coordinate, used in AIUpdateFly()
#def O_DIRX			38	// horizontal moving direction (-1 or 0 = left, 1 = right), used in AIUpdateFly()
#def O_DIRY			39	// vertical moving direction (-1 or 0 = up, 1 = down), used in AIUpdateFly()

// player variables starting from P_USER=64 up to P_MAX=128
#def P_LIFEINC		64
#def P_LIFEDEC		65
#def P_SCORE		66

#def P_FRAME_CTR	67
#def P_FPOW			68

#def P_DIRY			69	// used in climbing mode. -1=up, 1=down

#def P_PHRASE_NUM	70	// used in commenting wrong item

#def P_DEATH		71	// cause of death

// Dangers
#def DANGER_NONE        0
#def DANGER_DEFAULT     1
#def DANGER_WATER       2
#def DANGER_FIRE        3
#def DANGER_SPIKES      4
#def DANGER_CRUSHER     5
#def DANGER_BAT         6
#def DANGER_BIRD        7
#def DANGER_SPIDER      8
#def DANGER_FISH        9
#def DANGER_GHOST       10
#def DANGER_LAVA        11
#def DANGER_RAIN        12
#def DANGER_ACIDRAIN    13
#def DANGER_VAMPIRE     14
#def DANGER_DRAGON      15
#def DANGER_SWAMP       16
#def DANGER_MAGICBOLT   17
#def DANGER_EAGLE       18
#def DANGER_MAGICWALL   19
#def DANGER_OCEAN       98
#def DANGER_FALL        99

#def DLG_TYPE		10

// room variables starting from 0 up to R_MAX=128
#def R_VISITED		0
#def R_STATUS		1
/////////////////////////////////////////////////////////////////////////////////

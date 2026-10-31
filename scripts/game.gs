/////////////////////////////////////////////////////////////////////////////////
// game.gs
// Users write here basic functions specific for their game. Also check the gamedef.gs
// Advanced users may need to adjust other files as well.
//
// Here are the callback functions that usually stay in this file:
//
// Initialization callbacks:
// RoomsSetNames, ObjectsSetNames, RoomSetCustomText, SaveUserData, LoadUserData, BeginNewGame
//
// Rooms interaction callbacks:
// UpdateRoom_RX_RY()			- called by HandlerGameUpdate while player is in room RX,RY (non-latent)
// AfterRoom_RX_RY()			- called by HandlerGameAfterUpdate while player is in room RX,RY (non-latent)
// OpenRoom_RX_RY()				- called by HandlerRoomOpen when room RX,RY is opened (non-latent)
// CloseRoom_RX_RY()			- called by HandlerRoomClose when room RX,RY is closed (non-latent)
// OutRoom_RX_RY()				- called by HandlerRoomOut when player wants to exit room RX,RY (can reposition player here) (non-latent)
//
// Objects interaction callbacks:
// PickupObject_ID()			- called when picking up item ID (latent)
// DropObject_ID()				- called when droping item ID (latent)
// ActionObject_ID()			- called when player hits ACTION key on object ID (latent)
// UseObject_ID( idx )			- called when player wants to use object idx (from inventory) over the ID object (from the map) (latent)
// CollideObject_ID_MODE()		- called when player collides with object ID in mode MODE (0=exit from collision, 1=just entered collision, 2=continuing to collide) (latent)
//
// Player callbacks:
// PlayerDeathMessage( death ) 	- called by PlayerLoseLife and sould just return the death message text. return "" for no death message box (latent)
// RespawnPlayer_DEATH()		- called by PlayerLoseLife for custom death respawns. DEATH is the value of player's P_DEATH property
//
// ID, RX, RY, MODE are to pe replaced with coresponding numbers
//
/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////
// Sets room names (non-latent)
// By default it loads them from the dizzy.nam file, using the RoomsLoadNames() function.
// You can also set the names for each room, by hand, with RoomSetName().
// Ex: RoomSetName( 1,1, "PRESS ACTION TO START" );
/////////////////////////////////////////////////////////////////////////////////
func RoomsSetNames()
{
	RoomsLoadNames(ROOM_NAMESFILE);
}

/////////////////////////////////////////////////////////////////////////////////
// Sets names to object items (non-latent)
// All items tht you might pick up and view in the inventory, must have names set.
// Use the ID you specified for the object in the map editor, to find the object.
// See ObjSetName() and ObjFind().
// Ex: ObjSetName(ObjFind(100),"BUCKET");
/////////////////////////////////////////////////////////////////////////////////
func ObjectsSetNames()
{
	ObjSetName(ObjFind(100), OBJ_100);
	ObjSetName(ObjFind(101), OBJ_101);
	ObjSetName(ObjFind(102), OBJ_102);
	ObjSetName(ObjFind(103), OBJ_103);
	ObjSetName(ObjFind(104), OBJ_104);
	ObjSetName(ObjFind(105), OBJ_105);
	ObjSetName(ObjFind(106), OBJ_106);
	ObjSetName(ObjFind(107), OBJ_107);
	ObjSetName(ObjFind(108), OBJ_108);
	ObjSetName(ObjFind(109), OBJ_109);
	ObjSetName(ObjFind(110), OBJ_110);
	ObjSetName(ObjFind(111), OBJ_111);
	ObjSetName(ObjFind(112), OBJ_112);
	ObjSetName(ObjFind(113), OBJ_113);
	ObjSetName(ObjFind(114), OBJ_114);
	ObjSetName(ObjFind(115), OBJ_115);
	ObjSetName(ObjFind(116), OBJ_116);
	ObjSetName(ObjFind(117), OBJ_117);
	ObjSetName(ObjFind(118), OBJ_118);
	ObjSetName(ObjFind(119), OBJ_119);
	ObjSetName(ObjFind(120), OBJ_120);
	ObjSetName(ObjFind(121), OBJ_121);
	ObjSetName(ObjFind(122), OBJ_122);
	ObjSetName(ObjFind(123), OBJ_123);
	ObjSetName(ObjFind(124), OBJ_124);
	ObjSetName(ObjFind(125), OBJ_125);
	ObjSetName(ObjFind(126), OBJ_126);
	ObjSetName(ObjFind(127), OBJ_127);
	ObjSetName(ObjFind(128), OBJ_128);
	ObjSetName(ObjFind(129), OBJ_129);
	ObjSetName(ObjFind(130), OBJ_130);
}

/////////////////////////////////////////////////////////////////////////////////
// IN: int; rx; room x coordinate
// IN: int; ry; room y coordinate
// IN: int; idx; room custom text index (0-3)
// IN: ref; strref; string reference to the custom text
// Sets custom texts for each room (non-latent)
// There are 4 custom texts per room, that can be set from the map editor.
// They are saved by default in the ROOM_TEXTSFILE file (dizzy.rt)
// Each game receives these texts through this callback when the map is loaded
// and it can interpret them as it wants, for example to fill custom structures
// per each room, like ambient sounds, or any other things.
// Only non-empty strings are saved from the editor.
// This function uses string reference for speed.
/////////////////////////////////////////////////////////////////////////////////
func RoomSetCustomText( rx, ry, idx, refstr )
{
	// println("RCT: ",rx,",",ry,",",idx," = ",(*refstr));
	// ...
}

/////////////////////////////////////////////////////////////////////////////////
// IN: int; death; cause of death
// Returns the player death message. Called by PlayerLoseLife().
// Declare more death defines in gamedef.gs (like DEATH_INFIRE, or DEATH_BATS)
// and set them to hurt and kill objects or just set them in the player's 
// P_DEATH property, then return specific messages in this callback, 
// for each cacuse of death .
/////////////////////////////////////////////////////////////////////////////////
func PlayerDeathMessage( death )
{
	if(death==DANGER_BAT)			return TXT_DEATH_BAT;
	if(death==DANGER_SPIDER)		return TXT_DEATH_SPIDER;
	if(death==DANGER_BIRD)			return TXT_DEATH_BIRD;
	if(death==DANGER_POPPY)			return TXT_DEATH_POPPY;
	if(death==DANGER_FIRE)			return TXT_DEATH_FIRE;
	if(death==DANGER_WATER)			return TXT_DEATH_WATER;
	if(death==DANGER_FALL)			return TXT_DEATH_FALL;
	if(death==DANGER_SNAKE)			return TXT_DEATH_SNAKE;
	if(death==-1)					return "";
	// ...
	return "YOU HAVE DIED!";		// default
}

/////////////////////////////////////////////////////////////////////////////////
// IN: int; file; file handler
// OUT: int; return 0 if something has failed, or 1 if operation was successful
// Saves additional user data.
// Users can save here the additional data (like global GS9 variables) they might need to place in the saved game file.
// Called from SaveGame(). See LoadUserData().
// Ex: if(!gs_filewriteint(g_myvariable,file)) return 0;
/////////////////////////////////////////////////////////////////////////////////
func SaveUserData( file )
{
	// ...
	return 1;
}

/////////////////////////////////////////////////////////////////////////////////
// IN: int; file; file handler
// OUT: int; return 0 if something has failed, or 1 if operation was successful
// Load additional user data.
// Users can load here the additional data (like global GS9 variables) they saved before.
// They can also set various things, that depends on the just loaded data.
// For example, since the room's or object's names are not stored in the saved game, 
// if such a name is changed as the result of a solved puzzle, when the game is loaded, 
// it must be changed again, accordingly to the status of the puzzle.
// Called from LoadGame(). See SaveUserData(). 
// Ex: if(!gs_filereadint(&g_myvariable, file)) return 0;
/////////////////////////////////////////////////////////////////////////////////
func LoadUserData( file )
{
	// ...
	return 1;
}

/////////////////////////////////////////////////////////////////////////////////
// This function is called from MainMenu when a new game begins.
// Users must write here whatever they need their game to do, when it's started.
// For example here can be placed or called an intro sequence.
// In the end, the game must be unpaused, the player must be positioned where he must start, game music can be played, etc.
// In the Default Template this also opens a "Hello World!" message.
// Latent function.
/////////////////////////////////////////////////////////////////////////////////
func BeginNewGame()
{
	PlayerSetPos(PLAYER_BEGINX,PLAYER_BEGINY);	// set begin position
	PlayerSet(P_LIFE,1);
	PlayerSet(P_LIFEDEC, 0);
	PlayerSet(P_LIFEDECSTEP, 1);
	PlayerSet(P_LIFEINC, MAXLIFE-1);
	PlayerSet(P_SCORE, 0);

	GameSet(G_PAUSE,0);							// unpause the game
	PlayerSet(P_DISABLE,0);						// enable player
	MusicFade(0,1);								// set music fade options
	MusicPlay(MUSIC_DEFAULT);					// play default music
}

/////////////////////////////////////////////////////////////////////////////////
// Add to games score
/////////////////////////////////////////////////////////////////////////////////
func AddScore( add )
{
	score = PlayerGet(P_SCORE);
	score += add;
	PlayerSet(P_SCORE,score);
}

/////////////////////////////////////////////////////////////////////////////////
// Interactions
/////////////////////////////////////////////////////////////////////////////////

// Inside Dizzy's hut - the door
func ActionObject_201()
{
	handleIdx = ObjFind(103);
	doorIdx = ObjFind(201);
	if (InventoryFind(handleIdx)!=-1)
	{
		ObjSet(doorIdx, O_MATERIAL, MAT_DOOR);
		EnterDoor( doorIdx );
		InventorySub(handleIdx);
		for(i=900;i<=954;i++)
		{
			itemIdx = BrushFind(i);
			BrushSet(itemIdx,B_TILE,309);
		}
		pogieIdx = ObjFind(203);
		ObjSet(pogieIdx,O_DISABLE,1);
		GameCommand(CMD_REFRESH);
	}
	else
	{
		Message1(TXT_DIZZY_DOOR);
	}
}

// Inside Dizzy's hut - Pogie
func ActionObject_203()
{
	pogieIdx = ObjFind(203);
	pogieStatus = ObjGet(pogieIdx,O_STATUS);
	if (pogieStatus==0)
	{
		Message1(DLG_POGIE_1_D);
		Message2(DLG_POGIE_2);
		ObjSet(pogieIdx,O_STATUS,1);
	}
	else
	{
		Message2(DLG_POGIE_2);
	}
}

// Outside Dizzy's hut - Mayor first dialog
func CollideObject_252_1()
{
	doorAreaIdx = ObjFind(252);
	doorStatus = ObjGet(doorAreaIdx,O_STATUS);
	if (doorStatus==0)
	{
		WaitFrames(8);
		Message2(DLG_MAYOR_1);
		Message1(DLG_MAYOR_2_D);
		Message2(DLG_MAYOR_3);
		Message1(DLG_MAYOR_4_D);
		Message2(DLG_MAYOR_5);
		Message1(DLG_MAYOR_6_D);
		ObjSet(doorAreaIdx,O_STATUS,1);
	}
}

// Outside Dizzy's hut - Daisy dialog
func CollideObject_252_0()
{
	if (GameGet(G_ROOMX) != 12 || GameGet(G_ROOMY) != 4)
	{
		return;
	}

	doorAreaIdx = ObjFind(252);
	doorStatus = ObjGet(doorAreaIdx,O_STATUS);
	if (doorStatus==1)
	{
		daisyIdx = ObjFind(205);
		smokeIdx = ObjFind(206);

		ObjSet(smokeIdx, O_DISABLE, 0);
		ObjPlayAnimFrames( smokeIdx, {0,1,2,3,2,1,0} );
		ObjSet(smokeIdx, O_DISABLE, 1);

		ObjSet(daisyIdx, O_DISABLE, 0);
		ObjPlayAnimFrames( daisyIdx, {0,1,2,3,2,1} );
		Message2(DLG_DAISY_1);

		ObjSet(smokeIdx, O_DISABLE, 0);
		ObjPlayAnimFrames( smokeIdx, {0,1,2,3,2,1,0} );
		ObjSet(smokeIdx, O_DISABLE, 1);
		ObjSet(daisyIdx, O_DISABLE, 1);
		
		ObjSet(doorAreaIdx,O_STATUS,2);
	}
}

// Boots
func ActionObject_100()
{
	bootsIdx = ObjFind(100);
	ObjSet(bootsIdx, O_DISABLE, 1);
	jokeIdx = BrushFind(240);
	BrushSet(jokeIdx, B_LAYER, 6);
	Message1(DLG_MAYOR_7_D);
	Message2(DLG_MAYOR_8);
	Message1(DLG_MAYOR_9_D);
	Message2(DLG_MAYOR_10);
	Message1(DLG_MAYOR_11_D);

	RoomSet(12,4,R_STATUS,1);
}

func UpdateRoom_12_4()
{
	pogieIdx = ObjFind(207);

	// Pogie moving
	if (ObjGet(pogieIdx, O_DISABLE) == 0)
	{
		AIUpdateTrain(pogieIdx);

		if (ObjGet(pogieIdx, O_TARGET) == 0)
		{
			mayorIdx = ObjFind(204);
			ObjSet(mayorIdx, O_STATUS, 1);
			ObjSet(pogieIdx, O_DISABLE, 1);
		}
	}

	status = RoomGet(12,4,R_STATUS);

	if (status == 1)
	{
		RoomSet(12,4,R_STATUS,2);
		fid = gs_fid( "BootsScene" );
		if(fid!=-1)	ScrRequest(fid);
	}

	if (status == 3)
	{
		RoomSet(12,4,R_STATUS,4);
		fid = gs_fid( "WitchAppearScene" );
		if(fid!=-1)	ScrRequest(fid);
	}

	if (status == 5)
	{
		RoomSet(12,4,R_STATUS,6);
		fid = gs_fid( "WitchDialogScene" );
		if(fid!=-1)	ScrRequest(fid);
	}
}

// Outside Dizzy's hut - Pogie
func ActionObject_207()
{
	Message1(DLG_POGIE_3_D);
	Message2(DLG_POGIE_4);
}

func BootsScene()
{
	WaitFrames(48);
	if (GameGet(G_ROOMX) != 12 || GameGet(G_ROOMY) != 4)
	{
		RoomSet(12,4,R_STATUS,1);
		return;
	}
	Message1(DLG_MAYOR_12_D);
	Message2(DLG_MAYOR_13);
	RoomSet(12,4,R_STATUS,3);
}

func WitchAppearScene()
{
	WaitFrames(48);
	if (GameGet(G_ROOMX) != 12 || GameGet(G_ROOMY) != 4)
	{
		RoomSet(12,4,R_STATUS,3);
		return;
	}

	witchIdx = ObjFind(210);
	smokeIdx = ObjFind(211);

	ObjSet(smokeIdx, O_DISABLE, 0);
	ObjPlayAnimFrames( smokeIdx, {0,1,2,3,2,1,0} );
	ObjSet(smokeIdx, O_DISABLE, 1);
	ObjSet(witchIdx, O_DISABLE, 0);

	RoomSet(12,4,R_STATUS,5);
}

func WitchDialogScene()
{
	WaitFrames(4);
	if (GameGet(G_ROOMX) != 12 || GameGet(G_ROOMY) != 4)
	{
		RoomSet(12,4,R_STATUS,5);
		return;
	}

	Message2(DLG_WITCH_1, COLOR_YELLOW);
	Message2(DLG_WITCH_2_M);
	Message1(DLG_WITCH_3_D);
	Message2(DLG_WITCH_4, COLOR_YELLOW);
	Message1(DLG_WITCH_5_D);
	Message2(DLG_WITCH_6, COLOR_YELLOW);
	Message1(DLG_WITCH_7_D);
	Message2(DLG_WITCH_8, COLOR_YELLOW);
	Message1(DLG_WITCH_9_D);

	pogieIdx = ObjFind(207);

	ObjSet(pogieIdx, O_TILE, 175);
	ObjSet(pogieIdx, O_W, 24);
	ObjSet(pogieIdx, O_H, 24);
	ObjSet(pogieIdx, O_MAP+2, 24);
	ObjSet(pogieIdx, O_MAP+3, 24);
	ObjSet(pogieIdx, O_TARGET, 212);

	witchIdx = ObjFind(210);
	smokeIdx = ObjFind(211);

	WaitFrames(52);

	ObjSet(smokeIdx, O_DISABLE, 0);
	ObjPlayAnimFrames( smokeIdx, {0,1,2,3,2,1,0} );
	ObjSet(smokeIdx, O_DISABLE, 1);
	ObjSet(witchIdx, O_DISABLE, 1);

	RoomSet(12,4,R_STATUS,7);
}

// Outside Dizzy's hut - Mayor
func ActionObject_204()
{
	mayorIdx = ObjFind(204);
	mayorStatus = ObjGet(mayorIdx,O_STATUS);
	if (mayorStatus==1)
	{
		Message1(DLG_MAYOR_14_D);
		Message2(DLG_MAYOR_15);
		Message1(DLG_MAYOR_16_D);
		Message2(DLG_MAYOR_17);
		Message1(DLG_MAYOR_18_D);
		Message2(DLG_MAYOR_19);
		Message1(DLG_MAYOR_20_D);
		ObjSet(mayorIdx, O_STATUS, 2);
	}
	else if (mayorStatus==2)
	{
		Message1(DLG_MAYOR_21_D);
		Message2(DLG_MAYOR_22);
		Message1(DLG_MAYOR_23_D);
		Message2(DLG_MAYOR_24);
		Message1(DLG_MAYOR_25_D);
		Message2(DLG_MAYOR_26);
		Message1(DLG_MAYOR_27_D);
		ObjSet(mayorIdx, O_DISABLE, 1);
		keyIdx = ObjFind(101);
		ObjSet(keyIdx, O_DISABLE, 0);
	}
	else
	{
		idxobj = OpenDialogInventory();
		if(idxobj!=-1) DropObject(idxobj);
	}
}

// Inside Munchkin hut - villager 1
func ActionObject_216()
{
	Message2(DLG_VILLAGER);
}

// Inside Munchkin hut - villager 2
func ActionObject_217()
{
	Message2(DLG_VILLAGER);
}

// Closed hut
func ActionObject_273()
{
	PlayerPlayTurnBackForth();
	PlayerEnterIdle();
}

// Yellow gate
func ActionObject_218()
{
	gateIdx = ObjFind(218);
	useItemResult = TryUseItem2(101, 1);
	if (useItemResult == 1)
	{
		leftLeafIdx = BrushFind(219);
		rightLeafIdx = BrushFind(220);
		BrushSet(leftLeafIdx, O_X, BrushGet(leftLeafIdx, O_X)-8);
		BrushSet(rightLeafIdx, O_X, BrushGet(rightLeafIdx, O_X)+8);
		ObjSet(gateIdx, O_MATERIAL, MAT_DOOR);
		GameCommand(CMD_REFRESH);
	}
	else if (useItemResult == -1)
	{
		PlayerPlayTurnBackForth();
		PlayerEnterIdle();
	}
}

func UpdateRoom_15_4()
{
	fishIdx = ObjFind(222);
	AIUpdateFly(fishIdx);
}

func UpdateRoom_16_4()
{
	crowIdx = ObjFind(223);
	AIUpdateFly(crowIdx);
	crowIdx = ObjFind(224);
	AIUpdateFly(crowIdx);
}

// Red gate
func ActionObject_229()
{
	gateIdx = ObjFind(229);
	useItemResult = TryUseItem2(104, 1);
	if (useItemResult == 1)
	{
		leftLeafIdx = BrushFind(227);
		rightLeafIdx = BrushFind(228);
		BrushSet(leftLeafIdx, O_X, BrushGet(leftLeafIdx, O_X)-8);
		BrushSet(rightLeafIdx, O_X, BrushGet(rightLeafIdx, O_X)+8);
		ObjSet(gateIdx, O_MATERIAL, MAT_DOOR);
		GameCommand(CMD_REFRESH);
	}
	else if (useItemResult == -1)
	{
		PlayerPlayTurnBackForth();
		PlayerEnterIdle();
	}
}

// Signpost
func ActionObject_262()
{
	if (TryUseItem(107, 1) == 1)
	{
		Message0(TXT_SIGNPOST);
		signTopIdx = BrushFind(263);
		bridgeIdx = BrushFind(264);
		BrushSet(signTopIdx, B_DRAW, 0);
		BrushSet(bridgeIdx, B_DRAW, 3);
		GameCommand(CMD_REFRESH);
	}
}

// Dozy first dialog
func CollideObject_235_1()
{
	dozyTriggerIdx = ObjFind(235);
	dozyTriggerStatus = ObjGet(dozyTriggerIdx,O_STATUS);
	if (dozyTriggerStatus==0)
	{
		Message2(DLG_DOZY_1);
		Message1(DLG_DOZY_2_D);
		Message2(DLG_DOZY_3);
		Message1(DLG_DOZY_4_D);
		Message2(DLG_DOZY_5);
		Message1(DLG_DOZY_6_D);
		Message2(DLG_DOZY_7);
		Message1(DLG_DOZY_8_D);
		ObjSet(dozyTriggerIdx,O_STATUS,1);
		UpdateDozyTile();
	}
}

func OpenRoom_16_4()
{
	ScrRequest( gs_fid("UpdateDozyTile") );
}

func UpdateDozyTile()
{
	dozyTriggerIdx = ObjFind(235);
	dozyTriggerStatus = ObjGet(dozyTriggerIdx,O_STATUS);
	if (dozyTriggerStatus==1)
	{
		dozyIdx = BrushFind(234);
		BrushSet(dozyIdx,B_TILE,176);
		WaitFrames(48);
		BrushSet(dozyIdx,B_TILE,177);
	}
}

// Hanging Dozy
func ActionObject_236()
{
	dozyTriggerIdx = ObjFind(235);
	dozyTriggerStatus = ObjGet(dozyTriggerIdx,O_STATUS);
	if (dozyTriggerStatus!=1)
	{
		idxobj = OpenDialogInventory();
		if(idxobj!=-1) DropObject(idxobj);
		return;
	}
	useItemResult = TryUseItem2(102, 1);
	if (useItemResult == 1)
	{
		Message1(DLG_DOZY_13_D);
		Message2(DLG_DOZY_14);
		Message1(DLG_DOZY_15_D);
		Message2(DLG_DOZY_16);
		Message1(DLG_DOZY_17_D);
		Message2(DLG_DOZY_18);
		Message1(DLG_DOZY_19_D);
		Message2(DLG_DOZY_20);
		Message1(DLG_DOZY_21_D);
		Message2(DLG_DOZY_22);
		Message1(DLG_DOZY_23_D);
		ObjSet(dozyTriggerIdx, O_STATUS, 2);
		dozyHangIdx = BrushFind(234);
		BrushSet(dozyHangIdx, B_DRAW, 0);
		dozyLieIdx = ObjFind(237);
		ObjSet(dozyLieIdx, O_DISABLE, 0);
	}
	else if (useItemResult == -1)
	{
		Message1(DLG_DOZY_9_D);
		Message2(DLG_DOZY_10);
		Message1(DLG_DOZY_11_D);
		Message2(DLG_DOZY_12);
	}
}

// Lying Dozy
func ActionObject_237()
{
	dozyIdx = ObjFind(237);
	dozyStatus = ObjGet(dozyIdx,O_STATUS);
	if (dozyStatus == 0)
	{
		useItemResult = TryUseItem2(116, 1);
		if (useItemResult == 1)
		{
			Message1(DLG_DOZY_29_D);
			Message1(DLG_DOZY_30_D);
			Message2(DLG_DOZY_31);
			Message1(DLG_DOZY_32_D);
			Message2(DLG_DOZY_33);
			Message1(DLG_DOZY_34_D);
			Message2(DLG_DOZY_35);
			ObjSet(dozyIdx, O_STATUS, 1);
		}
		else if (useItemResult == -1)
		{
			Message1(DLG_DOZY_24_D);
			Message2(DLG_DOZY_25);
			Message1(DLG_DOZY_26_D);
			Message2(DLG_DOZY_27);
			Message1(DLG_DOZY_28_D);
		}
	}
	else if (dozyStatus == 1)
	{
		Message1(DLG_DOZY_36_D);
	}
}

func UpdateRoom_6_4()
{
	spiderIdx = ObjFind(241);
	AIUpdateSpider(spiderIdx);
}

func UpdateRoom_6_3()
{
	batIdx = ObjFind(242);
	AIUpdateFly(batIdx);
}

func UpdateRoom_7_3()
{
	spiderIdx = ObjFind(243);
	AIUpdateSpider(spiderIdx);
}

func UpdateRoom_6_5()
{
	batIdx = ObjFind(250);
	AIUpdateFly(batIdx);
}

// Denzil dialogs
func ActionObject_253()
{
	denzilIdx = ObjFind(253);
	denzilStatus = ObjGet(denzilIdx,O_STATUS);
	if (denzilStatus==0)
	{
		Message2(DLG_DENZIL_1);
		Message1(DLG_DENZIL_2_D);
		Message2(DLG_DENZIL_3);
		Message1(DLG_DENZIL_4_D);
		Message2(DLG_DENZIL_5);
		Message1(DLG_DENZIL_6_D);
		Message2(DLG_DENZIL_7);
		Message1(DLG_DENZIL_8_D);
		ObjSet(denzilIdx, O_STATUS, 1);
	}
	else if (denzilStatus==1)
	{
		useItemResult = TryUseItem2(105, 1);
		if (useItemResult == 1)
		{
			Message1(DLG_DENZIL_11_D);
			Message2(DLG_DENZIL_12);
			Message1(DLG_DENZIL_13_D);
			Message2(DLG_DENZIL_14);
			Message2(DLG_DENZIL_15);
			Message1(DLG_DENZIL_16_D);
			Message2(DLG_DENZIL_17);
			Message1(DLG_DENZIL_18_D);
			Message2(DLG_DENZIL_19);
			Message1(DLG_DENZIL_20_D);
			Message2(DLG_DENZIL_21);
			Message1(DLG_DENZIL_22_D);
			Message2(DLG_DENZIL_23);
			Message1(DLG_DENZIL_24_D);
			Message2(DLG_DENZIL_25);
			axeIdx = ObjFind(108);
			ObjSet(axeIdx, O_DISABLE, 0);
			ObjSet(denzilIdx, O_STATUS, 2);
		}
		else if (useItemResult == -1)
		{
			Message1(DLG_DENZIL_9_D);
			Message2(DLG_DENZIL_10);
		}
	}
	else if (denzilStatus==2)
	{
		Message2(DLG_DENZIL_26);
		Message2(DLG_DENZIL_27);
		Message1(DLG_DENZIL_28_D);
		Message2(DLG_DENZIL_29);
	}
}

func UpdateRoom_5_3()
{
	batIdx = ObjFind(254);
	AIUpdateFly(batIdx);
	batIdx = ObjFind(255);
	AIUpdateFly(batIdx);
}

func UpdateRoom_5_5()
{
	snakeIdx = ObjFind(265);
	AIUpdateSnake(snakeIdx);
}

// Reset Tinker dialog
func OpenRoom_17_4()
{
	RoomSet(18,4,R_STATUS,0);
	tinkerIdx = ObjFind(268);
	tinkerStatus = ObjGet(tinkerIdx, O_STATUS);
	if (tinkerStatus == 3)
	{
		ObjSet(tinkerIdx, O_STATUS, 4);
	}
}

// Reset Tinker dialog
func OpenRoom_19_4()
{
	RoomSet(18,4,R_STATUS,0);
	tinkerIdx = ObjFind(268);
	tinkerStatus = ObjGet(tinkerIdx, O_STATUS);
	if (tinkerStatus == 1)
	{
		ObjSet(tinkerIdx, O_STATUS, 2);
	}
}

// Area near Tinker
func CollideObject_266_2()
{
	tinkerIdx = ObjFind(268);
	tinkerWallIdx = BrushFind(267);
	tinkerStatus = ObjGet(tinkerIdx, O_STATUS);
	roomStatus = RoomGet(18,4,R_STATUS);

	if (tinkerStatus == 0)
	{
		BrushSet(tinkerWallIdx, B_DRAW, 2);
		GameCommand(CMD_REFRESH);

		bandIdx = ObjFind(106);

		if (roomStatus == 0 || InventoryFind(bandIdx)!=-1)
		{
			Message2(DLG_TINKER_1);
			Message2(DLG_TINKER_2);
			Message1(DLG_TINKER_3_D);
			RoomSet(18,4,R_STATUS,1);
			WaitFrames(8);

			if (InventoryFind(bandIdx)!=-1)
			{
				InventorySub(bandIdx);
				Message1(DLG_TINKER_4_D);
				Message2(DLG_TINKER_5);
				BrushSet(tinkerWallIdx, B_DRAW, 0);
				ObjSet(tinkerIdx, O_STATUS, 1);
				GameCommand(CMD_REFRESH);
			}
		}
	}
	else if (tinkerStatus == 2)
	{
		BrushSet(tinkerWallIdx, B_DRAW, 2);
		GameCommand(CMD_REFRESH);

		bellIdx = ObjFind(113);

		if (roomStatus == 0 || InventoryFind(bellIdx)!=-1)
		{
			Message2(DLG_TINKER_1);
			Message2(DLG_TINKER_6);
			Message1(DLG_TINKER_7_D);
			RoomSet(18,4,R_STATUS,1);
			WaitFrames(8);

			if (InventoryFind(bellIdx)!=-1)
			{
				InventorySub(bellIdx);
				Message1(DLG_TINKER_8_D);
				Message2(DLG_TINKER_5);
				BrushSet(tinkerWallIdx, B_DRAW, 0);
				ObjSet(tinkerIdx, O_STATUS, 3);
				GameCommand(CMD_REFRESH);
			}
		}
	}
	else if (tinkerStatus == 4)
	{
		BrushSet(tinkerWallIdx, B_DRAW, 2);
		GameCommand(CMD_REFRESH);

		maskIdx = ObjFind(111);
		maskX = ObjGet(maskIdx, O_X);
		maskY = ObjGet(maskIdx, O_Y);
		forbiddenTop = ObjGet(maskIdx, O_USER);
		forbiddenBottom = ObjGet(maskIdx, O_USER+1);
		forbiddenLeft = ObjGet(maskIdx, O_USER+2);
		forbiddenRight = ObjGet(maskIdx, O_USER+3);
		
		if (maskX > forbiddenLeft && maskX < forbiddenRight && maskY > forbiddenTop && maskY < forbiddenBottom)
		{
			ObjSet(maskIdx, O_X, ObjGet(maskIdx,O_USER+4));
			ObjSet(maskIdx, O_Y, ObjGet(maskIdx,O_USER+5));
		}

		if (roomStatus == 0 || InventoryFind(maskIdx)!=-1)
		{
			Message2(DLG_TINKER_1);
			Message2(DLG_TINKER_9);
			Message1(DLG_TINKER_10_D);
			RoomSet(18,4,R_STATUS,1);
			WaitFrames(8);

			if (InventoryFind(maskIdx)!=-1)
			{
				InventorySub(maskIdx);
				Message1(DLG_TINKER_11_D);
				Message2(DLG_TINKER_5);
				BrushSet(tinkerWallIdx, B_DRAW, 0);
				ObjSet(tinkerIdx, O_STATUS, 5);
				GameCommand(CMD_REFRESH);
			}
		}
	}
}

// Tinker
func ActionObject_268()
{
	tinkerIdx = ObjFind(268);
	tinkerStatus = ObjGet(tinkerIdx, O_STATUS);
	if (tinkerStatus < 5)
	{
		idxobj = OpenDialogInventory();
		if(idxobj!=-1)
		{
			WrongItemDialog();
		}
	}
	else if (tinkerStatus == 5)
	{
		Message2(DLG_TINKER_12);
		Message2(DLG_TINKER_13);
		Message1(DLG_TINKER_14_D);
		ObjSet(tinkerIdx, O_STATUS, 6);
	}
	else if (tinkerStatus == 6)
	{
		useItemResult = TryUseItem2(120, 1);
		if (useItemResult == 1)
		{
			Message1(DLG_TINKER_15_D);
			Message2(DLG_TINKER_16);
			ticketIdx = ObjFind(123);
			ObjSet(ticketIdx, O_DISABLE, 0);
			coinIdx = ObjFind(330);
			ObjSet(coinIdx, O_DISABLE, 0);
			ObjSet(tinkerIdx, O_STATUS, 7);
		}
		else if (useItemResult == -1)
		{
			Message2(DLG_TINKER_12);
			Message2(DLG_TINKER_13);
			Message1(DLG_TINKER_14_D);
		}
	}
	else if (tinkerStatus == 7)
	{
		Message2(DLG_TINKER_12);
		Message2(DLG_TINKER_17);
		Message1(DLG_TINKER_18_D);
		ObjSet(tinkerIdx, O_STATUS, 8);
	}
	else if (tinkerStatus == 8)
	{
		useItemResult = TryUseItem2(122, 1);
		if (useItemResult == 1)
		{
			Message1(DLG_TINKER_19_D);
			Message2(DLG_TINKER_20);
			keyIdx = ObjFind(124);
			ObjSet(keyIdx, O_DISABLE, 0);
			coinIdx = ObjFind(331);
			ObjSet(coinIdx, O_DISABLE, 0);
			ObjSet(tinkerIdx, O_STATUS, 9);
		}
		else if (useItemResult == -1)
		{
			Message2(DLG_TINKER_12);
			Message2(DLG_TINKER_17);
			Message1(DLG_TINKER_18_D);
		}
	}
	else if (tinkerStatus == 9)
	{
		Message2(DLG_TINKER_12);
		Message2(DLG_TINKER_21);
		Message1(DLG_TINKER_22_D);
		ObjSet(tinkerIdx, O_STATUS, 10);
	}
	else if (tinkerStatus == 10)
	{
		useItemResult = TryUseItem2(125, 1);
		if (useItemResult == 1)
		{
			Message1(DLG_TINKER_23_D);
			Message2(DLG_TINKER_24);
			pickaxeIdx = ObjFind(128);
			ObjSet(pickaxeIdx, O_DISABLE, 0);
			coinIdx = ObjFind(335);
			ObjSet(coinIdx, O_DISABLE, 0);
			ObjSet(tinkerIdx, O_STATUS, 11);
		}
		else if (useItemResult == -1)
		{
			Message2(DLG_TINKER_12);
			Message2(DLG_TINKER_21);
			Message1(DLG_TINKER_22_D);
		}
	}
	else if (tinkerStatus == 12)
	{
		Message2(DLG_TINKER_12);
		Message2(DLG_TINKER_25);
		Message1(DLG_TINKER_26_D);
		ObjSet(tinkerIdx, O_STATUS, 13);
	}
	else if (tinkerStatus == 13)
	{
		useItemResult = TryUseItem2(129, 1);
		if (useItemResult == 1)
		{
			//Message1(DLG_TINKER_19_D);
			//Message2(DLG_TINKER_20);
			//pickaxeIdx = ObjFind(128);
			//ObjSet(pickaxeIdx, O_DISABLE, 0);
			//coinIdx = ObjFind(335);
			//ObjSet(coinIdx, O_DISABLE, 0);
			ObjSet(tinkerIdx, O_STATUS, 14);
		}
		else if (useItemResult == -1)
		{
			Message2(DLG_TINKER_12);
			Message2(DLG_TINKER_25);
			Message1(DLG_TINKER_26_D);
		}
	}
}

func UpdateRoom_20_3()
{
	crowIdx = ObjFind(306);
	AIUpdateFly(crowIdx);
}

func UpdateRoom_9_1()
{
	crowIdx = ObjFind(274);
	AIUpdateFly(crowIdx);
}

func UpdateRoom_8_1()
{
	snakeIdx = ObjFind(275);
	AIUpdateSnake(snakeIdx);
}

func UpdateRoom_8_0()
{
	crowIdx = ObjFind(276);
	AIUpdateFly(crowIdx);
}

func UpdateRoom_11_1()
{
	spiderIdx = ObjFind(283);
	AIUpdateSpider(spiderIdx);
}

// Donkey dialogs
func ActionObject_301()
{
	donkeyIdx = ObjFind(301);
	donkeyStatus = ObjGet(donkeyIdx,O_STATUS);
	if (donkeyStatus==0)
	{
		Message1(DLG_DONKEY_1_D);
		Message2(DLG_DONKEY_2);
		Message1(DLG_DONKEY_3_D);
		Message2(DLG_DONKEY_4);
		Message1(DLG_DONKEY_5_D);
		Message2(DLG_DONKEY_6);
		bandIdx = ObjFind(106);
		ObjSet(bandIdx, O_DISABLE, 0);
		ObjSet(donkeyIdx, O_STATUS, 1);
	}
	else if (donkeyStatus==1)
	{
		Message1(DLG_DONKEY_7_D);
		Message2(DLG_DONKEY_8);
		Message2(DLG_DONKEY_9);
		Message1(DLG_DONKEY_10_D);
		Message2(DLG_DONKEY_11);
		Message1(DLG_DONKEY_12_D);
		Message2(DLG_DONKEY_13);
		Message1(DLG_DONKEY_14_D);
		ObjSet(donkeyIdx, O_STATUS, 2);
	}
	else if (donkeyStatus==2)
	{
		// todo: check inventory for magic wand
	}
}

// Bridge lever
func ActionObject_284()
{
	leverIdx = ObjFind(284);

	useItemResult = TryUseItem2(110, 1);
	if (useItemResult == 1)
	{
		ObjSet(leverIdx,O_STATUS,1);
		ObjSet(leverIdx,O_CLASS,0);
	}
	else if (useItemResult == -1)
	{
		OpenDialogMessage(TXT_LEVER, COLOR_RED);
	}
}

// Moving bridge
func UpdateRoom_7_5()
{
	leverIdx = ObjFind(284);

	if (ObjGet(leverIdx, O_STATUS) != 1)
	{
		return;
	}

	bridge1Idx = ObjFind(288);
	bridge2Idx = ObjFind(295);
	bridge3Idx = ObjFind(299);

	AIUpdateTrain(bridge1Idx);
	AIUpdateTrain(bridge2Idx);
	AIUpdateTrain(bridge3Idx);

	bridge1Target = ObjGet(bridge1Idx, O_TARGET);

	if (bridge1Target == 289)
	{
		ObjSet(bridge2Idx, O_TARGET, 296);
		ObjSet(bridge3Idx, O_TARGET, 296);
	}
	else if (bridge1Target == 290)
	{
		ObjSet(bridge2Idx, O_TARGET, 297);
	}
	else if (bridge1Target == 293)
	{
		ObjSet(bridge2Idx, O_TARGET, 296);
	}
	else if (bridge1Target == 294)
	{
		ObjSet(bridge2Idx, O_TARGET, 298);
		ObjSet(bridge3Idx, O_TARGET, 298);
	}
}

func UpdateRoom_18_6()
{
	crowIdx = ObjFind(300);
	AIUpdateFly(crowIdx);
}

// Jester dialogs
func ActionObject_304()
{
	jesterIdx = ObjFind(304);
	jesterStatus = ObjGet(jesterIdx,O_STATUS);
	if (jesterStatus==0)
	{
		Message1(DLG_JESTER_1_D);
		Message2(DLG_JESTER_2);
		Message1(DLG_JESTER_3_D);
		Message2(DLG_JESTER_4);
		Message1(DLG_JESTER_5_D);
		ObjSet(jesterIdx, O_STATUS, 1);
	}
	else if (jesterStatus==1)
	{
		useItemResult = TryUseItem2(121, 1);
		if (useItemResult == 1)
		{
			Message1(DLG_JESTER_8_D);
			Message2(DLG_JESTER_9);
			Message1(DLG_JESTER_10_D);
			Message2(DLG_JESTER_11);
			Message1(DLG_JESTER_12_D);
			Message2(DLG_JESTER_13);
			Message1(DLG_JESTER_14_D);
			diceIdx = ObjFind(122);
			ObjSet(diceIdx, O_DISABLE, 0);
			ObjSet(jesterIdx, O_STATUS, 2);
		}
		else if (useItemResult == -1)
		{
			Message2(DLG_JESTER_6);
			Message1(DLG_JESTER_7_D);
		}
	}
	else if (jesterStatus==2)
	{
		Message2(DLG_JESTER_15);
	}
}

// Dora dialogs
func ActionObject_305()
{
	doraIdx = ObjFind(305);
	doraStatus = ObjGet(doraIdx,O_STATUS);
	if (doraStatus==0)
	{
		Message1(DLG_DORA_1_D);
		Message2(DLG_DORA_2);
		Message1(DLG_DORA_3_D);
		Message2(DLG_DORA_4);
		Message1(DLG_DORA_5_D);
		Message2(DLG_DORA_6);
		Message1(DLG_DORA_7_D);
		Message2(DLG_DORA_8);
		Message1(DLG_DORA_9_D);
		ObjSet(doraIdx, O_STATUS, 1);
	}
	else if (doraStatus==1)
	{
		dragonVisited = RoomGet(0,5,R_VISITED);
		if (dragonVisited == 0)
		{
			Message1(DLG_DORA_10_D);
			Message2(DLG_DORA_11);
			Message1(DLG_DORA_12_D);
		}
		else
		{
			Message1(DLG_DORA_13_D);
			Message2(DLG_DORA_14);
			Message1(DLG_DORA_15_D);
			Message2(DLG_DORA_16);
			Message1(DLG_DORA_17_D);
			Message2(DLG_DORA_18);
			Message1(DLG_DORA_19_D);
			Message2(DLG_DORA_20);
			Message1(DLG_DORA_21_D);
			Message2(DLG_DORA_22);
			Message2(DLG_DORA_23);
			Message1(DLG_DORA_24_D);
			ObjSet(doraIdx, O_STATUS, 2);
		}
	}
	else if (doraStatus==2)
	{
		useItemResult = TryUseItem2(109, 1);
		if (useItemResult == 1)
		{
			Message1(DLG_DORA_27_D);
			Message2(DLG_DORA_28);
			Message2(DLG_DORA_29);
			Message1(DLG_DORA_30_D);
			Message2(DLG_DORA_31);
			Message2(DLG_DORA_32);
			potionIdx = ObjFind(126);
			ObjSet(potionIdx, O_DISABLE, 0);
			ObjSet(doraIdx, O_STATUS, 3);
		}
		else if (useItemResult == -1)
		{
			Message2(DLG_DORA_25);
			Message1(DLG_DORA_26_D);
		}
	}
	else if (doraStatus==3)
	{
		useItemResult = TryUseItem2(127, 1);
		if (useItemResult == 1)
		{
			//Message1(DLG_DORA_27_D);
			//Message2(DLG_DORA_28);
			//spellIdx = ObjFind(128);
			//ObjSet(spellIdx, O_DISABLE, 0);
			//ObjSet(doraIdx, O_STATUS, 4);
		}
		else if (useItemResult == -1)
		{
			Message2(DLG_DORA_33);
			Message1(DLG_DORA_34_D);
		}
	}
}

func ActionObject_307()
{
	ActionWaterfall();
}

func ActionObject_308()
{
	ActionWaterfall();
}

func ActionWaterfall()
{
	if (TryUseItem(108, 1) == 1)
	{
		Message0(TXT_WATERFALL);
		fullBucketIdx = ObjFind(114);
		InventoryAdd(fullBucketIdx);
	}
}

func UpdateRoom_4_4()
{
	snakeIdx = ObjFind(309);
	AIUpdateSnake(snakeIdx);
}

func UpdateRoom_10_5()
{
	fishIdx = ObjFind(310);
	AIUpdateFly(fishIdx);
}

func UpdateRoom_11_5()
{
	crowIdx = ObjFind(311);
	AIUpdateFly(crowIdx);
	crowIdx = ObjFind(312);
	AIUpdateFly(crowIdx);
}

// Dylan dialogs
func ActionObject_313()
{
	dylanIdx = ObjFind(313);
	dylanStatus = ObjGet(dylanIdx,O_STATUS);
	if (dylanStatus==0)
	{
		Message2(DLG_DYLAN_1);
		Message1(DLG_DYLAN_2_D);
		Message2(DLG_DYLAN_3);
		Message1(DLG_DYLAN_4_D);
		Message2(DLG_DYLAN_5);
		Message1(DLG_DYLAN_6_D);
		Message2(DLG_DYLAN_7);
		Message1(DLG_DYLAN_8_D);
		Message2(DLG_DYLAN_9);
		Message1(DLG_DYLAN_10_D);
		Message2(DLG_DYLAN_11);
		Message1(DLG_DYLAN_12_D);
		Message2(DLG_DYLAN_13);
		Message1(DLG_DYLAN_14_D);
		Message2(DLG_DYLAN_15);
		tiaraIdx = ObjFind(117);
		ObjSet(tiaraIdx, O_DISABLE, 0);
		ObjSet(dylanIdx, O_STATUS, 1);
	}
	else if (dylanStatus==1)
	{
		Message2(DLG_DYLAN_16);
		Message1(DLG_DYLAN_17_D);
		Message2(DLG_DYLAN_18);
		Message1(DLG_DYLAN_19_D);
		Message2(DLG_DYLAN_20);
	}
}

// Daisy dialogs
func ActionObject_344()
{
	daisyIdx = ObjFind(344);
	daisyStatus = ObjGet(daisyIdx,O_STATUS);
	if (daisyStatus==0)
	{
		Message1(DLG_DAISY_2_D);
		Message2(DLG_DAISY_3);
		Message1(DLG_DAISY_4_D);
		Message2(DLG_DAISY_5);
		Message1(DLG_DAISY_6_D);
		Message2(DLG_DAISY_7);
		Message1(DLG_DAISY_8_D);
		Message2(DLG_DAISY_9);
		Message1(DLG_DAISY_10_D);
		ObjSet(daisyIdx, O_STATUS, 1);
		ObjSet(daisyIdx, O_TILE, 190);
		ObjSet(daisyIdx, O_DELAY, 10);
	}
	else if (daisyStatus==1)
	{
		useItemResult = TryUseItem2(117, 1);
		if (useItemResult == 1)
		{
			Message1(DLG_DAISY_16_D);
			Message2(DLG_DAISY_17);
			Message1(DLG_DAISY_18_D);
			Message2(DLG_DAISY_19);
			Message1(DLG_DAISY_20_D);
			Message2(DLG_DAISY_21);
			wandIdx = ObjFind(119);
			ObjSet(wandIdx, O_DISABLE, 0);
			ObjSet(daisyIdx, O_STATUS, 2);
		}
		else if (useItemResult == -1)
		{
			Message2(DLG_DAISY_11);
			Message1(DLG_DAISY_12_D);
			Message2(DLG_DAISY_13);
			Message1(DLG_DAISY_14_D);
			Message2(DLG_DAISY_15);
		}
	}
	else if (daisyStatus==2)
	{
		// if no wand in inventory
		Message1(DLG_DAISY_22_D);
		Message2(DLG_DAISY_23);
		Message1(DLG_DAISY_24_D);
		// else
	}
}

// Crystal palace door
func ActionObject_321()
{
	doorIdx = ObjFind(321);
	doorStatus = ObjGet(doorIdx,O_STATUS);
	if (doorStatus==0)
	{
		Message1(TXT_CRYSTAL_DOOR_D);
	}
}

// Spec dialogs
func ActionObject_323()
{
	specIdx = ObjFind(323);
	specStatus = ObjGet(specIdx,O_STATUS);

	if (specStatus == 0)
	{
		ActionSpecComm();
	}
	else if (specStatus == 1)
	{
		crashIdx = ObjFind(112);
		zzapIdx = ObjFind(115);
		if (InventoryFind(crashIdx)!=-1 || InventoryFind(zzapIdx)!=-1)
		{
			idxobj = OpenDialogInventory();
			if (idxobj==crashIdx)
			{
				InventorySub(idxobj);
				Message1(DLG_SPEC_9_D);
				Message2(DLG_SPEC_10, COLOR_YELLOW);
				ObjSet(specIdx, O_STATUS, 2);
			}
			else if (idxobj==zzapIdx)
			{
				Message1(DLG_SPEC_7_D);
				Message2(DLG_SPEC_8, COLOR_YELLOW);
			}
			else
			{
				WrongItemDialog();
			}
		}
		else
		{
			Message2(DLG_SPEC_4, COLOR_YELLOW);
			Message1(DLG_SPEC_5_D);
			Message2(DLG_SPEC_6, COLOR_YELLOW);
		}
	}
	else if (specStatus == 2)
	{
		Message2(DLG_SPEC_11, COLOR_YELLOW);
	}
}

// Comm dialogs
func ActionObject_324()
{
	commIdx = ObjFind(324);
	commStatus = ObjGet(commIdx,O_STATUS);

	if (commStatus == 0)
	{
		ActionSpecComm();
	}
	else if (commStatus == 1)
	{
		crashIdx = ObjFind(112);
		zzapIdx = ObjFind(115);
		if (InventoryFind(crashIdx)!=-1 || InventoryFind(zzapIdx)!=-1)
		{
			idxobj = OpenDialogInventory();
			if (idxobj==zzapIdx)
			{
				InventorySub(idxobj);
				Message1(DLG_COMM_11_D);
				Message2(DLG_COMM_12);
				ObjSet(commIdx, O_STATUS, 2);
			}
			else if (idxobj==crashIdx)
			{
				Message1(DLG_COMM_9_D);
				Message2(DLG_COMM_10);
			}
			else
			{
				WrongItemDialog();
			}
		}
		else
		{
			Message1(DLG_COMM_7_D);
			Message2(DLG_COMM_8);
		}
	}
	else if (commStatus == 2)
	{
		Message2(DLG_COMM_13);
	}
}

func ActionSpecComm()
{
	Message2(DLG_SPECCOMM_1_S, COLOR_YELLOW);
	Message1(DLG_SPECCOMM_2_D);
	Message2(DLG_SPECCOMM_3_S, COLOR_YELLOW);
	Message2(DLG_SPECCOMM_4_C);
	Message2(DLG_SPECCOMM_5_S, COLOR_YELLOW);
	Message2(DLG_SPECCOMM_6_C);
	Message2(DLG_SPECCOMM_7_S, COLOR_YELLOW);
	Message1(DLG_SPECCOMM_8_D);
	Message1(DLG_SPECCOMM_9_D);
	Message2(DLG_SPECCOMM_10_C);
	Message2(DLG_SPECCOMM_11_S, COLOR_YELLOW);
	Message1(DLG_SPECCOMM_12_D);
	Message2(DLG_SPECCOMM_13_S, COLOR_YELLOW);
	Message2(DLG_SPECCOMM_14_C);
	Message1(DLG_SPECCOMM_15_D);
	Message2(DLG_SPECCOMM_16_S, COLOR_YELLOW);

	specIdx = ObjFind(323);
	commIdx = ObjFind(324);
	ObjSet(specIdx, O_STATUS, 1);
	ObjSet(commIdx, O_STATUS, 1);
}

// Emerald city door
func ActionObject_325()
{
	doorIdx = ObjFind(325);
	doorStatus = ObjGet(doorIdx,O_STATUS);
	specIdx = ObjFind(323);
	specStatus = ObjGet(specIdx,O_STATUS);
	commIdx = ObjFind(324);
	commStatus = ObjGet(commIdx,O_STATUS);

	if (doorStatus<2 && specStatus==2 && commStatus==2)
	{
		ObjSet(doorIdx, O_STATUS, 2);
	}
	else if (commStatus==2 && doorStatus==1)
	{
		ObjSet(doorIdx, O_STATUS, 0);
	}
	else if (specStatus==2 && doorStatus==0)
	{
		ObjSet(doorIdx, O_STATUS, 1);
	}

	doorStatus = ObjGet(doorIdx,O_STATUS);

	if (specStatus<2 && doorStatus==0)
	{
		Message2(DLG_SPEC_1, COLOR_YELLOW);
		Message1(DLG_SPEC_2_D);
		Message2(DLG_SPEC_3, COLOR_YELLOW);

		if (commStatus<2)
		{
			ObjSet(doorIdx, O_STATUS, 1);
		}
	}
	else if (commStatus<2 && doorStatus==1)
	{
		Message2(DLG_COMM_1);
		Message1(DLG_COMM_2_D);
		Message2(DLG_COMM_3);
		Message1(DLG_COMM_4_D);
		Message2(DLG_COMM_5);
		Message1(DLG_COMM_6_D);

		if (specStatus<2)
		{
			ObjSet(doorIdx, O_STATUS, 0);
		}
	}
	else if (doorStatus == 2)
	{
		useItemResult = TryUseItem2(118, 1);
		if (useItemResult == 1)
		{
			Message0(TXT_EMERALD_DOOR_2);
			ObjSet(doorIdx, O_STATUS, 3);
			leftLeafIdx = BrushFind(326);
			rightLeafIdx = BrushFind(327);
			BrushSet(leftLeafIdx, O_MAP, BrushGet(leftLeafIdx, O_MAP)-16);
			BrushSet(leftLeafIdx, O_MAP+2, BrushGet(leftLeafIdx, O_MAP+2)-16);
			BrushSet(leftLeafIdx, O_X, BrushGet(leftLeafIdx, O_X)-8);
			BrushSet(rightLeafIdx, O_MAP, BrushGet(rightLeafIdx, O_MAP)+16);
			BrushSet(rightLeafIdx, O_MAP+2, BrushGet(rightLeafIdx, O_MAP+2)+16);
			BrushSet(rightLeafIdx, O_X, BrushGet(rightLeafIdx, O_X)+8);
			ObjSet(doorIdx, O_STATUS, 3);
			ObjSet(doorIdx, O_MATERIAL, MAT_DOOR);
			GameCommand(CMD_REFRESH);
		}
		else if (useItemResult == -1)
		{
			Message0(TXT_EMERALD_DOOR);
		}
	}
}

func UpdateRoom_1_5()
{
	batIdx = ObjFind(332);
	AIUpdateFly(batIdx);
}

// Secret door
func ActionObject_333()
{
	doorIdx = ObjFind(333);
	doorStatus = ObjGet(doorIdx,O_STATUS);
	if (doorStatus==0)
	{
		useItemResult = TryUseItem2(105, 0);
		if (useItemResult == 1)
		{
			ObjSet(doorIdx, O_STATUS, 1);
			ObjSet(doorIdx, O_MATERIAL, MAT_DOOR);
			GameCommand(CMD_REFRESH);
		}
		else if (useItemResult == -1)
		{
			Message0(TXT_SECRET_DOOR);
		}
	}
}

// Boulder
func ActionObject_338()
{
	if (TryUseItem(128, 1) == 1)
	{
		Message0(TXT_BOULDER);
		boulderIdx = BrushFind(336);
		BrushSet(boulderIdx, B_DRAW, 0);
		boulderWallIdx = BrushFind(337);
		BrushSet(boulderWallIdx, B_DRAW, 0);
		GameCommand(CMD_REFRESH);
	}
}

// Tiger
func ActionObject_341()
{
	if (TryUseItem2(129, 1) == 1)
	{
		doorIdx = ObjFind(341);
		Message0(TXT_EYE);
		mouthIdx = BrushFind(339);
		BrushSet(mouthIdx, O_Y, BrushGet(mouthIdx, O_Y)+8);
		eyeIdx = BrushFind(340);
		BrushSet(eyeIdx, B_DRAW, 0);
		ObjSet(doorIdx, O_MATERIAL, MAT_DOOR);
		GameCommand(CMD_REFRESH);
	}
}

// Exit from the secret tunnel
func CollideObject_322_1()
{
	exitIdx = ObjFind(322);
	exitStatus = ObjGet(exitIdx,O_STATUS);
	if (exitStatus == 0)
	{
		doorIdx = ObjFind(321);
		doorStatus = ObjGet(doorIdx,O_STATUS);
		Message1(TXT_TUNNEL_DOOR_D);
		ObjSet(doorIdx, O_MATERIAL, MAT_DOOR);
		ObjSet(exitIdx,O_STATUS,1);
		ObjSet(doorIdx,O_STATUS,1);
		GameCommand(CMD_REFRESH);
	}
}

/////////////////////////////////////////////////////////////////////////////////

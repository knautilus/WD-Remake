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
		Message1(TXT_DOOR);
		MessagePop();
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
		MessagePop();
		Message2(DLG_POGIE_2);
		MessagePop();
		ObjSet(pogieIdx,O_STATUS,1);
	}
	else
	{
		Message2(DLG_POGIE_2);
		MessagePop();
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
		MessagePop();
		Message1(DLG_MAYOR_2_D);
		MessagePop();
		Message2(DLG_MAYOR_3);
		MessagePop();
		Message1(DLG_MAYOR_4_D);
		MessagePop();
		Message2(DLG_MAYOR_5);
		MessagePop();
		Message1(DLG_MAYOR_6_D);
		MessagePop();
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
		MessagePop();

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
	MessagePop();
	Message2(DLG_MAYOR_8);
	MessagePop();
	Message1(DLG_MAYOR_9_D);
	MessagePop();
	Message2(DLG_MAYOR_10);
	MessagePop();
	Message1(DLG_MAYOR_11_D);
	MessagePop();

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
	MessagePop();
	Message2(DLG_POGIE_4);
	MessagePop();
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
	MessagePop();
	Message2(DLG_MAYOR_13);
	MessagePop();
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
	MessagePop();
	Message2(DLG_WITCH_2_M);
	MessagePop();
	Message1(DLG_WITCH_3_D);
	MessagePop();
	Message2(DLG_WITCH_4, COLOR_YELLOW);
	MessagePop();
	Message1(DLG_WITCH_5_D);
	MessagePop();
	Message2(DLG_WITCH_6, COLOR_YELLOW);
	MessagePop();
	Message1(DLG_WITCH_7_D);
	MessagePop();
	Message2(DLG_WITCH_8, COLOR_YELLOW);
	MessagePop();
	Message1(DLG_WITCH_9_D);
	MessagePop();

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
		MessagePop();
		Message2(DLG_MAYOR_15);
		MessagePop();
		Message1(DLG_MAYOR_16_D);
		MessagePop();
		Message2(DLG_MAYOR_17);
		MessagePop();
		Message1(DLG_MAYOR_18_D);
		MessagePop();
		Message2(DLG_MAYOR_19);
		MessagePop();
		Message1(DLG_MAYOR_20_D);
		MessagePop();
		ObjSet(mayorIdx, O_STATUS, 2);
	}
	else if (mayorStatus==2)
	{
		Message1(DLG_MAYOR_21_D);
		MessagePop();
		Message2(DLG_MAYOR_22);
		MessagePop();
		Message1(DLG_MAYOR_23_D);
		MessagePop();
		Message2(DLG_MAYOR_24);
		MessagePop();
		Message1(DLG_MAYOR_25_D);
		MessagePop();
		Message2(DLG_MAYOR_26);
		MessagePop();
		Message1(DLG_MAYOR_27_D);
		MessagePop();
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
	MessagePop();
}

// Inside Munchkin hut - villager 2
func ActionObject_217()
{
	Message2(DLG_VILLAGER);
	MessagePop();
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
		MessagePop();
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
		MessagePop();
		Message1(DLG_DOZY_2_D);
		MessagePop();
		Message2(DLG_DOZY_3);
		MessagePop();
		Message1(DLG_DOZY_4_D);
		MessagePop();
		Message2(DLG_DOZY_5);
		MessagePop();
		Message1(DLG_DOZY_6_D);
		MessagePop();
		Message2(DLG_DOZY_7);
		MessagePop();
		Message1(DLG_DOZY_8_D);
		MessagePop();
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
		MessagePop();
		Message2(DLG_DOZY_14);
		MessagePop();
		Message1(DLG_DOZY_15_D);
		MessagePop();
		Message2(DLG_DOZY_16);
		MessagePop();
		Message1(DLG_DOZY_17_D);
		MessagePop();
		Message2(DLG_DOZY_18);
		MessagePop();
		Message1(DLG_DOZY_19_D);
		MessagePop();
		Message2(DLG_DOZY_20);
		MessagePop();
		Message1(DLG_DOZY_21_D);
		MessagePop();
		Message2(DLG_DOZY_22);
		MessagePop();
		Message1(DLG_DOZY_23_D);
		MessagePop();
		ObjSet(dozyTriggerIdx,O_STATUS,2);
		dozyHangIdx = BrushFind(234);
		BrushSet(dozyHangIdx,B_DRAW,0);
		dozyLieIdx = ObjFind(237);
		ObjSet(dozyLieIdx,O_DISABLE,0);
	}
	else if (useItemResult == -1)
	{
		Message1(DLG_DOZY_9_D);
		MessagePop();
		Message2(DLG_DOZY_10);
		MessagePop();
		Message1(DLG_DOZY_11_D);
		MessagePop();
		Message2(DLG_DOZY_12);
		MessagePop();
	}
}

// Lying Dozy
func ActionObject_237()
{
	Message1(DLG_DOZY_24_D);
	MessagePop();
	Message2(DLG_DOZY_25);
	MessagePop();
	Message1(DLG_DOZY_26_D);
	MessagePop();
	Message2(DLG_DOZY_27);
	MessagePop();
	Message1(DLG_DOZY_28_D);
	MessagePop();
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
		MessagePop();
		Message1(DLG_DENZIL_2_D);
		MessagePop();
		Message2(DLG_DENZIL_3);
		MessagePop();
		Message1(DLG_DENZIL_4_D);
		MessagePop();
		Message2(DLG_DENZIL_5);
		MessagePop();
		Message1(DLG_DENZIL_6_D);
		MessagePop();
		Message2(DLG_DENZIL_7);
		MessagePop();
		Message1(DLG_DENZIL_8_D);
		MessagePop();
		ObjSet(denzilIdx, O_STATUS, 1);
	}
	else if (denzilStatus==1)
	{
		useItemResult = TryUseItem2(105, 1);
		if (useItemResult == 1)
		{
			Message1(DLG_DENZIL_11_D);
			MessagePop();
			Message2(DLG_DENZIL_12);
			MessagePop();
			Message1(DLG_DENZIL_13_D);
			MessagePop();
			Message2(DLG_DENZIL_14);
			MessagePop();
			Message2(DLG_DENZIL_15);
			MessagePop();
			Message1(DLG_DENZIL_16_D);
			MessagePop();
			Message2(DLG_DENZIL_17);
			MessagePop();
			Message1(DLG_DENZIL_18_D);
			MessagePop();
			Message2(DLG_DENZIL_19);
			MessagePop();
			Message1(DLG_DENZIL_20_D);
			MessagePop();
			Message2(DLG_DENZIL_21);
			MessagePop();
			Message1(DLG_DENZIL_22_D);
			MessagePop();
			Message2(DLG_DENZIL_23);
			MessagePop();
			Message1(DLG_DENZIL_24_D);
			MessagePop();
			Message2(DLG_DENZIL_25);
			MessagePop();
			axeIdx = ObjFind(108);
			ObjSet(axeIdx, O_DISABLE, 0);
			ObjSet(denzilIdx, O_STATUS, 2);
		}
		else if (useItemResult == -1)
		{
			Message1(DLG_DENZIL_9_D);
			MessagePop();
			Message2(DLG_DENZIL_10);
			MessagePop();
		}
	}
	else if (denzilStatus==2)
	{
		Message2(DLG_DENZIL_26);
		MessagePop();
		Message2(DLG_DENZIL_27);
		MessagePop();
		Message1(DLG_DENZIL_28_D);
		MessagePop();
		Message2(DLG_DENZIL_29);
		MessagePop();
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
			MessagePop();
			Message2(DLG_TINKER_2);
			MessagePop();
			Message1(DLG_TINKER_3_D);
			MessagePop();
			RoomSet(18,4,R_STATUS,1);
			WaitFrames(8);

			if (InventoryFind(bandIdx)!=-1)
			{
				InventorySub(bandIdx);
				Message1(DLG_TINKER_4_D);
				MessagePop();
				Message2(DLG_TINKER_5);
				MessagePop();
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
			MessagePop();
			Message2(DLG_TINKER_6);
			MessagePop();
			Message1(DLG_TINKER_7_D);
			MessagePop();
			RoomSet(18,4,R_STATUS,1);
			WaitFrames(8);

			if (InventoryFind(bellIdx)!=-1)
			{
				InventorySub(bellIdx);
				Message1(DLG_TINKER_8_D);
				MessagePop();
				Message2(DLG_TINKER_5);
				MessagePop();
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
			MessagePop();
			Message2(DLG_TINKER_9);
			MessagePop();
			Message1(DLG_TINKER_10_D);
			MessagePop();
			RoomSet(18,4,R_STATUS,1);
			WaitFrames(8);

			if (InventoryFind(maskIdx)!=-1)
			{
				InventorySub(maskIdx);
				Message1(DLG_TINKER_11_D);
				MessagePop();
				Message2(DLG_TINKER_5);
				MessagePop();
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
	idxobj = OpenDialogInventory();
	if(idxobj!=-1)
	{
		WrongItemDialog();
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
		MessagePop();
		Message2(DLG_DONKEY_2);
		MessagePop();
		Message1(DLG_DONKEY_3_D);
		MessagePop();
		Message2(DLG_DONKEY_4);
		MessagePop();
		Message1(DLG_DONKEY_5_D);
		MessagePop();
		Message2(DLG_DONKEY_6);
		MessagePop();
		bandIdx = ObjFind(106);
		ObjSet(bandIdx, O_DISABLE, 0);
		ObjSet(donkeyIdx, O_STATUS, 1);
	}
	else if (donkeyStatus==1)
	{
		Message1(DLG_DONKEY_7_D);
		MessagePop();
		Message2(DLG_DONKEY_8);
		MessagePop();
		Message2(DLG_DONKEY_9);
		MessagePop();
		Message1(DLG_DONKEY_10_D);
		MessagePop();
		Message2(DLG_DONKEY_11);
		MessagePop();
		Message1(DLG_DONKEY_12_D);
		MessagePop();
		Message2(DLG_DONKEY_13);
		MessagePop();
		Message1(DLG_DONKEY_14_D);
		MessagePop();
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
		MessagePop();
		Message2(DLG_JESTER_2);
		MessagePop();
		Message1(DLG_JESTER_3_D);
		MessagePop();
		Message2(DLG_JESTER_4);
		MessagePop();
		Message1(DLG_JESTER_5_D);
		MessagePop();
		ObjSet(jesterIdx, O_STATUS, 1);
	}
	else if (jesterStatus==1)
	{
		// todo: check inventory for x box

		Message2(DLG_JESTER_6);
		MessagePop();
		Message1(DLG_JESTER_7_D);
		MessagePop();
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
		MessagePop();
		Message2(DLG_DORA_2);
		MessagePop();
		Message1(DLG_DORA_3_D);
		MessagePop();
		Message2(DLG_DORA_4);
		MessagePop();
		Message1(DLG_DORA_5_D);
		MessagePop();
		Message2(DLG_DORA_6);
		MessagePop();
		Message1(DLG_DORA_7_D);
		MessagePop();
		Message2(DLG_DORA_8);
		MessagePop();
		Message1(DLG_DORA_9_D);
		MessagePop();
		ObjSet(doraIdx, O_STATUS, 1);
	}
	else if (doraStatus==1)
	{
		// todo: check inventory for magic staff

		Message1(DLG_DORA_10_D);
		MessagePop();
		Message2(DLG_DORA_11);
		MessagePop();
		Message1(DLG_DORA_12_D);
		MessagePop();
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
		MessagePop();
		fullBucketIdx = ObjFind(114);
		InventoryAdd(fullBucketIdx);
	}
}
/////////////////////////////////////////////////////////////////////////////////

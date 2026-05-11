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
	ObjSetName(ObjFind(100),"Boots");
	ObjSetName(ObjFind(101),"Yellow gate key");
	ObjSetName(ObjFind(102),"Pair of scissors");
	ObjSetName(ObjFind(103),"Door handle");
	ObjSetName(ObjFind(104),"Red gate key");
	ObjSetName(ObjFind(108),"Woodman's axe");
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
	if(death==DANGER_SPIDER)		return "You're beaten by\na spider!";
	if(death==DANGER_BIRD)			return "You were pecked\nby a bird!";
	if(death==DANGER_WATER)			return "You fell in the\nwater and drowned!";
	if(death==DANGER_FALL)			return "You hit the ground\ntoo hard!";
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
	doorStatus = ObjGet(doorIdx,O_STATUS);
	if (doorStatus==1 || InventoryFind(handleIdx)!=-1)
	{
		PlayerPlayAnimFrames(PTILE_TURN,{0,1,2,3});
		PlayerSetPos(3168,685);
		PlayerEnterIdle();
		if (doorStatus==0)
		{
			InventorySub(handleIdx);
			for(i=900;i<=954;i++)
			{
				itemIdx = BrushFind(i);
				BrushSet(itemIdx,B_TILE,309);
			}
			ObjSet(doorIdx,O_STATUS,1);
			pogieIdx = ObjFind(203);
			ObjSet(pogieIdx,O_DISABLE,1);
		}
	}
}

// Inside Dizzy's hut - Pogie
func ActionObject_203()
{
	pogieIdx = ObjFind(203);
	pogieStatus = ObjGet(pogieIdx,O_STATUS);
	if (pogieStatus==0)
	{
		Message1("Gosh Pogie,\nthat really shook\nthe hut, are you ok?");
		MessagePop();
		Message2("Squeak.");
		MessagePop();
		ObjSet(pogieIdx,O_STATUS,1);
	}
	else
	{
		Message2("Squeak.");
		MessagePop();
	}
}

// Outside Dizzy's hut - the door
func ActionObject_202()
{
	PlayerPlayAnimFrames(PTILE_TURN,{0,1,2,3});
	PlayerSetPos(3200,550);
	PlayerEnterIdle();
}

// Outside Dizzy's hut - Mayor first dialog
func CollideObject_202_1()
{
	doorIdx = ObjFind(202);
	doorStatus = ObjGet(doorIdx,O_STATUS);
	if (doorStatus==0)
	{
		WaitFrames(8);
		Message2("Oh my! Oh my! You've\nlanded on the wicked\nwitch of the east!");
		MessagePop();
		Message1("Who are you?");
		MessagePop();
		Message2("I'm Boq the Munchkin mayor.\nYou appear to have crushed\nthe witch! Who are you?");
		MessagePop();
		Message1("I'm Dizzy,\nbut where am I?");
		MessagePop();
		Message2("You are in Munchkin village,\nin the wonderful\nworld of Oz.");
		MessagePop();
		Message1("Oh... It's sooo colourful,\nin a kind of attributed\nlow resolution, limited\ncolour palette sort\nof style!");
		MessagePop();
		ObjSet(doorIdx,O_STATUS,1);
	}
}

// Outside Dizzy's hut - Daisy dialog
func CollideObject_202_0()
{
	if (GameGet(G_ROOMX) != 12 || GameGet(G_ROOMY) != 4)
	{
		return;
	}

	doorIdx = ObjFind(202);
	doorStatus = ObjGet(doorIdx,O_STATUS);
	if (doorStatus==1)
	{
		daisyIdx = ObjFind(205);
		smokeIdx = ObjFind(206);

		ObjSet(smokeIdx, O_DISABLE, 0);
		ObjPlayAnimFrames( smokeIdx, {0,1,2,3,2,1,0} );
		ObjSet(smokeIdx, O_DISABLE, 1);

		ObjSet(daisyIdx, O_DISABLE, 0);
		ObjPlayAnimFrames( daisyIdx, {0,1,2,3,2,1} );
		Message2("Quickly, take her boots.\nThey'll protect you.");
		MessagePop();

		ObjSet(smokeIdx, O_DISABLE, 0);
		ObjPlayAnimFrames( smokeIdx, {0,1,2,3,2,1,0} );
		ObjSet(smokeIdx, O_DISABLE, 1);
		ObjSet(daisyIdx, O_DISABLE, 1);
		
		ObjSet(doorIdx,O_STATUS,2);
	}
}

// Boots
func ActionObject_100()
{
	bootsIdx = ObjFind(100);
	ObjSet(bootsIdx, O_DISABLE, 1);
	jokeIdx = BrushFind(240);
	BrushSet(jokeIdx, B_LAYER, 6);
	Message1("Nice! Strangely they fit\nperfectly. Who kney I had\nsimilar feet to a witch!");
	MessagePop();
	Message2("And they'll keep\nyou safe too!");
	MessagePop();
	Message1("Safe?");
	MessagePop();
	Message2("Oh yes! When her sister,\nthe wicked witch of the west\nfinds out what you did,\nshe'll be furious!");
	MessagePop();
	Message1("That doesn't sound good!");
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

func BootsScene()
{
	WaitFrames(48);
	if (GameGet(G_ROOMX) != 12 || GameGet(G_ROOMY) != 4)
	{
		RoomSet(12,4,R_STATUS,1);
		return;
	}
	Message1("Wow! They really are magic.\nI seem to take on the colour\nof the background when\nI'm wearing them!");
	MessagePop();
	Message2("Funny side\neffect I guess!");
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

	Message2("Arh!!! Who did this?", COLOR_YELLOW);
	MessagePop();
	Message2("I think it was\na freak accident!");
	MessagePop();
	Message1("I'm sorry, I really\ndidn't plan it. There\nwas this whirlwind...");
	MessagePop();
	Message2("Who are you? Arh...\nYou are wearing her boots!\nHow dare you!", COLOR_YELLOW);
	MessagePop();
	Message1("I'm sorry. Couldn't\nyou just...");
	MessagePop();
	Message2("What's that?", COLOR_YELLOW);
	MessagePop();
	Message1("Oh, he's my pet...\nPogie. He won't hurt you.");
	MessagePop();
	Message2("Well let's hope he tastes\nas good as he looks!", COLOR_YELLOW);
	MessagePop();
	Message1("No!");
	MessagePop();

	pogieIdx = ObjFind(207);

	ObjSet(pogieIdx, O_TILE, 319);
	ObjSet(pogieIdx, O_W, 24);
	ObjSet(pogieIdx, O_H, 24);
	ObjSet(pogieIdx, O_MAP+2, 24);
	ObjSet(pogieIdx, O_MAP+3, 24);
	ObjSet(pogieIdx, O_TARGET, 212);

	witchIdx = ObjFind(210);
	smokeIdx = ObjFind(211);

	WaitFrames(48);

	ObjSet(smokeIdx, O_DISABLE, 0);
	ObjPlayAnimFrames( smokeIdx, {0,1,2,3,2,1,0} );
	ObjSet(smokeIdx, O_DISABLE, 1);
	ObjSet(witchIdx, O_DISABLE, 1);

	RoomSet(12,4,R_STATUS,7);
}

// Outside Dizzy's hut - Pogie
func ActionObject_207()
{
	Message1("Don't worry Pogie,\nI'll keep you safe.");
	MessagePop();
	Message2("Squeak! Squeak...");
	MessagePop();
}

// Outside Dizzy's hut - Mayor
func ActionObject_204()
{
	mayorIdx = ObjFind(204);
	mayorStatus = ObjGet(mayorIdx,O_STATUS);
	if (mayorStatus==1)
	{
		Message1("Where did the witch\ntake Pogie?");
		MessagePop();
		Message2("Probably to dread\ncastle where she lives.");
		MessagePop();
		Message1("How do I get there?");
		MessagePop();
		Message2("Follow the red brick road,\nbut it's dangerous, so we\nlocked the gate!");
		MessagePop();
		Message1("But I must try and\nrescue him.");
		MessagePop();
		Message2("Sorry, I can't help you.\nI lost the key.");
		MessagePop();
		Message1("I'll look for it.\nIt's what I do!");
		MessagePop();
		ObjSet(mayorIdx, O_STATUS, 2);
	}
	else if (mayorStatus==2)
	{
		Message1("Also, do you know\nhow I can get home?");
		MessagePop();
		Message2("Sorry, no. But maybe the\ngreat wizard of Oz\nwill know.");
		MessagePop();
		Message1("How do I find him?");
		MessagePop();
		Message2("Follow the yellow brick\nroad to the emerald city.");
		MessagePop();
		Message1("That sounds easy.");
		MessagePop();
		Message2("Beware the cursed poppy\nfield. Here's the yellow\ngate key.");
		MessagePop();
		Message1("Thanks!");
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

// Outside Munchkin hut - the door
func ActionObject_214()
{
	PlayerPlayAnimFrames(PTILE_TURN,{0,1,2,3});
	PlayerSetPos(3486,558);
	PlayerEnterIdle();
}

// Inside Munchkin hut - the door
func ActionObject_215()
{
	PlayerPlayAnimFrames(PTILE_TURN,{0,1,2,3});
	PlayerSetPos(3398,693);
	PlayerEnterIdle();
}

// Inside Munchkin hut - villager 1
func ActionObject_216()
{
	Message2("Hi!");
	MessagePop();
}

// Inside Munchkin hut - villager 2
func ActionObject_217()
{
	Message2("Hi!");
	MessagePop();
}

// Closed hut
func ActionObject_213()
{
	PlayerPlayAnimFrames(PTILE_TURN,{0,1,2,3,4,4,4,3,2,1,0});
	PlayerEnterIdle();
}

// Yellow gate
func ActionObject_218()
{
	gateIdx = ObjFind(218);
	gateStatus = ObjGet(gateIdx, O_STATUS);
	if (gateStatus == 0)
	{
		if (TryUseItem2(101, 1) == 1)
		{
			ObjSet(gateIdx, O_STATUS, 1);
			leftLeafIdx = BrushFind(219);
			rightLeafIdx = BrushFind(220);
			BrushSet(leftLeafIdx, O_X, BrushGet(leftLeafIdx, O_X)-8);
			BrushSet(rightLeafIdx, O_X, BrushGet(rightLeafIdx, O_X)+8);
		}
	}
	else if (gateStatus == 1)
	{
		PlayerPlayAnimFrames(PTILE_TURN,{0,1,2,3});
		PlayerSetPos(3858,677);
		PlayerEnterIdle();
	}
}

func CollideObject_221_1()
{
	PlayerSetPos(3811,685);
	PlayerEnterIdle();
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

// Passage to the palace
func ActionObject_225()
{
	PlayerPlayAnimFrames(PTILE_TURN,{0,1,2,3});
	PlayerSetPos(4362,405);
	PlayerEnterIdle();
}

func CollideObject_226_1()
{
	PlayerSetPos(4456,685);
	PlayerEnterIdle();
}

// Red gate
func ActionObject_229()
{
	gateIdx = ObjFind(229);
	gateStatus = ObjGet(gateIdx, O_STATUS);
	if (gateStatus == 0)
	{
		if (TryUseItem2(104, 1) == 1)
		{
			ObjSet(gateIdx, O_STATUS, 1);
			leftLeafIdx = BrushFind(227);
			rightLeafIdx = BrushFind(228);
			BrushSet(leftLeafIdx, O_X, BrushGet(leftLeafIdx, O_X)-8);
			BrushSet(rightLeafIdx, O_X, BrushGet(rightLeafIdx, O_X)+8);
		}
	}
	else if (gateStatus == 1)
	{
		PlayerPlayAnimFrames(PTILE_TURN,{0,1,2,3});
		PlayerSetPos(2800,685);
		PlayerEnterIdle();
	}
}

func CollideObject_230_1()
{
	PlayerSetPos(2840,685);
	PlayerEnterIdle();
}

// Signpost
func ActionObject_231()
{
	if (TryUseItem(108, 1) == 1)
	{
		Message0("Using the woodman's\naxe you are able to\nchop the post down\nand make a bridge.");
		MessagePop();
		signTopIdx = BrushFind(232);
		bridgeIdx = BrushFind(233);
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
		Message2("Hey you!");
		MessagePop();
		Message1("Who me?");
		MessagePop();
		Message2("Yes you! You couldn't\nget me down, could you?");
		MessagePop();
		Message1("Why, you're a\ntalking scarecrow!");
		MessagePop();
		Message2("No, I just fell\nasleep and when\nI woke up, I found\nmyself tied up here!");
		MessagePop();
		Message1("It's so tight,\nI can't undo it.");
		MessagePop();
		Message2("Perharps you could\ncut the rope?");
		MessagePop();
		Message1("That's a good idea. Let me\nlook for something to cut\nit with and I'll be back.");
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
		BrushSet(dozyIdx,B_TILE,329);
		WaitFrames(48);
		BrushSet(dozyIdx,B_TILE,330);
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
	useItemResult = TryUseItem3(102, 1);
	if (useItemResult == 1)
	{
		Message1("I'm back! And this\ntime with scissors!");
		MessagePop();
		Message2("Whoa! You gave me a\nfright. You've got\nto stop creeping up\non me like that!");
		MessagePop();
		Message1("Let me cut that rope\nand get you down.");
		MessagePop();
		Message2("Oh thank you.\nI feel so silly.\nSometimes I think\nI don't have a brain.");
		MessagePop();
		Message1("Why that's ridiculous!\nIt wasn't your falut\nyou were mistaken for\na scarecrow.");
		MessagePop();
		Message2("I suffer from narcolepsy,\nmeaning I keep falling\nasleep. I'm sure my head\nis stuffed with straw\nrather than brains.");
		MessagePop();
		Message1("We all have our faults,\nit's what makes us unique.\nI'm a kleptomaniac, but\nyou are clever and your\nhead isn't stuffed\nwith straw.");
		MessagePop();
		Message2("You think?");
		MessagePop();
		Message1("It was your idea\nto cut the rope.");
		MessagePop();
		Message2("It was obvious.");
		MessagePop();
		Message1("I know you are clever,\nand I'll convince you.");
		MessagePop();
		ObjSet(dozyTriggerIdx,O_STATUS,2);
		dozyHangIdx = BrushFind(234);
		BrushSet(dozyHangIdx,B_DRAW,0);
		dozyLieIdx = ObjFind(237);
		ObjSet(dozyLieIdx,O_DISABLE,0);
	}
	else if (useItemResult == -1)
	{
		Message1("I'm still looking!");
		MessagePop();
		Message2("Wow! You frightened me.\nI was just having\na little nap.");
		MessagePop();
		Message1("I'll keep looking.\nI don't want to keep\nyou hanging around.");
		MessagePop();
		Message2("Please do. I think\nthese birds might\nstart pecking me soon.");
		MessagePop();
	}
}

// Lying Dozy
func ActionObject_237()
{
	Message1("Hey scarecrow! Wake up!\nI need your help.");
	MessagePop();
	Message2("Zzzz zzzz");
	MessagePop();
	Message1("Come on! Wake up!");
	MessagePop();
	Message2("Zzzz zzzz");
	MessagePop();
	Message1("It's no use, I'm never\ngoing to be able to\nwake him this way.");
	MessagePop();
}

// Passage to the chateau
func ActionObject_238()
{
	PlayerPlayAnimFrames(PTILE_TURN,{0,1,2,3});
	PlayerSetPos(4362,965);
	PlayerEnterIdle();
}

func CollideObject_239_1()
{
	PlayerSetPos(4527,685);
	PlayerEnterIdle();
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

// Outside tree hut - the door
func ActionObject_244()
{
	PlayerPlayAnimFrames(PTILE_TURN,{0,1,2,3});
	PlayerSetPos(2000,380);
	PlayerEnterIdle();
}

// Inside tree hut - the door
func ActionObject_245()
{
	PlayerPlayAnimFrames(PTILE_TURN,{0,1,2,3});
	PlayerSetPos(1840,524);
	PlayerEnterIdle();
}

// Dense dark forest - stairway up
func ActionObject_246()
{
	PlayerPlayAnimFrames(PTILE_TURN,{0,1,2,3});
	PlayerSetPos(1955,597);
	PlayerEnterIdle();
}

// Dense dark forest - stairway down
func ActionObject_247()
{
	PlayerPlayAnimFrames(PTILE_TURN,{0,1,2,3});
	PlayerSetPos(1955,653);
	PlayerEnterIdle();
}

/////////////////////////////////////////////////////////////////////////////////

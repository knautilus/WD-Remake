/////////////////////////////////////////////////////////////////////////////////
// messages.gs
// Utility functions for displaying conversation message boxes.
// Users can define more functions, with specific color settings for
// their most common game characters.
/////////////////////////////////////////////////////////////////////////////////

int g_msglastx; 	// position x of the last message
int g_msglasty; 	// position y of the last message
int g_msglastink; 	// ink color of the last message
int g_msglastborder;// border color of the last message
str g_msglastcaption;

/////////////////////////////////////////////////////////////////////////////////
// IN: str; text; message text
// IN: int; colorink; the text color
// IN: int; colorborder; the border color
// Stores colors and caption, for use with the MessageNext() function.
// This does not closes the dialog. Needs DialogPop(), DialogPopAll(), or usually MessagePop().
/////////////////////////////////////////////////////////////////////////////////
func Message( text, colorink, colorborder, caption)
{
	g_msglastink = colorink;
	g_msglastborder = colorborder;
	g_msglastcaption = caption;

	GamePause(1);
	DialogPush();
	DialogSetCaption(caption);
	DialogSetText("{c:0x"+(str "%x")colorink+"}"+text);
	DialogSetColor(colorborder);
	DialogFitCenter();
	DialogRun();
	GamePause(0);
}

/////////////////////////////////////////////////////////////////////////////////
// IN: str; text; message text
// Opens another dialog message in cascade, using the position and the colors of the last message.
// This does not closes the dialog. Needs DialogPop(), DialogPopAll(), or usually MessagePop(). See Message().
/////////////////////////////////////////////////////////////////////////////////
func MessageNext( text )
{
	Message( text, g_msglastink, g_msglastborder, g_msglastcaption );
}

/////////////////////////////////////////////////////////////////////////////////
// Closes all opened messages, same as DialogPopAll().
/////////////////////////////////////////////////////////////////////////////////
func MessagePop()
{
	DialogPopAll();
}

/////////////////////////////////////////////////////////////////////////////////
// IN: str; text; message text
// quick call for Message() with story teller color settings
/////////////////////////////////////////////////////////////////////////////////
func Message0( text )
{
	Message( text, COLOR_WHITE, COLOR_RED, "" );
}

/////////////////////////////////////////////////////////////////////////////////
// IN: str; text; message text
// quick call for Message() with player color settings
/////////////////////////////////////////////////////////////////////////////////
func Message1( text )
{
	Message( text, COLOR_WHITE, COLOR_GREEN, "Dizzy" );
}

/////////////////////////////////////////////////////////////////////////////////
// IN: str; text; message text
// [IN]: int; bordercolor=COLOR_WHITE; border color
// quick call for Message() with other characters color settings
/////////////////////////////////////////////////////////////////////////////////
func Message2( text, bordercolor )
{
	if(!?bordercolor) bordercolor = COLOR_CYAN;
	Message( text, COLOR_WHITE, bordercolor, "" );
}

/////////////////////////////////////////////////////////////////////////////////

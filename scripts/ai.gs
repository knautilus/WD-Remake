/////////////////////////////////////////////////////////////////////////////////
// ai.gs
// Deals with A.I. beahaviours
// Those are functions used to update specified objects in an 'intelligent' way.
// Like spiders moving up and down, elevators, bubbles, etc.
// Users can add more AI functions for the characters or devices in their game.
/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////
// IN: int; idx; object index
// Train AI
// Those are objects that move from a waypoint to another.
// Can be used for elevators, moving platforms or a walking creature, like a rat.
// Uses a target waypoint from where it takes delay (O_WAYPOINTMOVEDELAY) and flip (O_WAYPOINTFLIP).
// When target waypoint is reached, it gets a new target from the waypoint.
// O_TARGET = id of the current target waypoint
// O_STATUS = enable state, 1=moves, 0=stays
// Waypoint object:
// O_USER = delay value (O_WAYPOINTMOVEDELAY)
// O_USER+1 = flip value (O_WAYPOINTFLIP)
/////////////////////////////////////////////////////////////////////////////////
func AIUpdateTrain( idx )
{
	if(idx==-1) return;
	if(ObjGet(idx,O_DISABLE)) return;
	if(ObjGet(idx,O_STATUS)!=1) return;
	id2 = ObjGet(idx,O_TARGET);
	if(id2==0) return;
	idx2 = ObjFind(id2);
	if(idx2==-1) return;
	if(!IsUpdate(ObjGet(idx2,O_WAYPOINTMOVEDELAY))) return;
	speed = 1;
	flip = ObjGet(idx2,O_WAYPOINTFLIP);
	x2 = ObjGet(idx2,O_X);
	y2 = ObjGet(idx2,O_Y);
	x = ObjGet(idx,O_X);
	y = ObjGet(idx,O_Y);
	ObjSet(idx,O_FLIP,flip);
	
	if(x<x2) { x+=speed; if(x>x2) x=x2; }
	if(x>x2) { x-=speed; if(x<x2) x=x2; }
	if(y<y2) { y+=speed; if(y>y2) y=y2; }
	if(y>y2) { y-=speed; if(y<y2) y=y2; }
	if(x==x2 && y==y2) // reached waypoint, change target
	{
		target = ObjGet(idx2,O_TARGET);
		ObjSet(idx,O_TARGET,target);
	}
	
	ObjSet(idx,O_X,x);
	ObjSet(idx,O_Y,y);
}

/////////////////////////////////////////////////////////////////////////////////
// IN: int; idx; object index
// ChainLink AI
// Updates chain's height, down to the target's y position.
// Used for elevator's chains or spiders wires.
// O_TARGET = target object's id
/////////////////////////////////////////////////////////////////////////////////
func AIUpdateChainLink( idx )
{
	if(idx==-1) return;
	id2 = ObjGet(idx,O_TARGET);
	if(id2==0) return;
	idx2 = ObjFind(id2);
	if(idx2==-1) return;
	len = ObjGet(idx2,O_Y)-ObjGet(idx,O_Y);	
	ObjSet(idx,O_H,len);
}

/////////////////////////////////////////////////////////////////////////////////
// IN: int; idx; object index
// Spider AI
// Moves up and down between two positions.
// Used for classic Dizzy spiders.
// O_USER = upper y value
// O_USER+1 = lower y value
// O_USER+2 = movement delay
// O_STATUS = direction 0=up, 1=down
/////////////////////////////////////////////////////////////////////////////////
func AIUpdateSpider( idx )
{
	if(idx==-1) return;
	if(ObjGet(idx,O_DISABLE)) return;
	if(!IsUpdate(ObjGet(idx,O_USER+2))) return;
	y = ObjGet(idx,O_Y);
	if(ObjGet(idx,O_STATUS)==0) // up
	{
		ty = ObjGet(idx,O_USER);
		if(y>ty)
			y-=1;
		else
			ObjSet(idx,O_STATUS,1);
	}
	else // down
	{
		ty = ObjGet(idx,O_USER+1);
		if(y<ty)
			y+=1;
		else
			ObjSet(idx,O_STATUS,0);
	}
	ObjSet(idx,O_Y,y);
}

/////////////////////////////////////////////////////////////////////////////////
// IN: int; id; first bubble object's id
// IN: int; count; maximum number of bubble objects, with ids starting from id, id+1, id+2, etc
// IN: int; debit; the spawning debit delay factor, higher values means rare spawns, 0 means stopped
// IN: int; speed; the moving speed factor of bubbles (with some random variation)
// IN: int; life; the number of cycles a bubble lives, until respawned (with some random variation)
// This is used to manage the air bubbles the player spawns, while in water.
// O_DISABLE = if bubble is active or not (default must be disabled)
// O_USER+0 = bubble particular speed value (O_BUBBLESPEED)
// O_USER+1 = bubble life timer (O_BUBBLETIME)
// User can call it from player update.
// Make sure all bubbles are disabled by default !
/////////////////////////////////////////////////////////////////////////////////
func AIUpdateBubbles( id, count, debit, speed, life )
{
	roomw = GameGet(G_ROOMW);
	roomh = GameGet(G_ROOMH);

	activecount = 0;
	freecount = 0;
	for(i=0;i<count;i++)
	{
		idx = ObjFind(id+i);
		if( ObjGet(idx,O_DISABLE) ) { freecount++; continue; } // inactive
		
		// time and life
		time = ObjGet(idx,O_BUBBLETIME);
		time++;
		if( time > life + gs_rand(10) ) { ObjSet(idx,O_DISABLE,1); continue; } // die
		ObjSet(idx,O_BUBBLETIME,time);
		
		// position
		ofs = (ObjGet(idx,O_MAP+2) - ObjGet(idx,O_MAP))/2;
		speedy = ObjGet(idx,O_BUBBLESPEED);
		speedx = gs_rand(3) ? 0 : (speedy/2 - gs_rand(speedy));
		x = ObjGet(idx,O_X) + speedx;
		y = ObjGet(idx,O_Y) - speedy;

		if( MaterialRead(x%roomw+ofs,y%roomh+ofs,1,1)!=(1<<MAT_WATER) ) { ObjSet(idx,O_DISABLE,1); continue; } // blocked
		ObjSet(idx,O_Y,y);
		ObjSet(idx,O_X,x);
		
		ObjSet(idx,O_DISABLE,0);
		activecount++;
	}

	// spawn
	if( PlayerGet(P_MATCENTER) != MAT_WATER ) return; // player not in water
	if( PlayerGet(P_LIFE)==0) return; // player dead
	if( debit==0 ) return; // stopped
	if( freecount>0 && gs_rand(debit)==0 ) // if we have free bubbles and debit random
	{
		idxfree = -1;
		pick = gs_rand(freecount);
		freecount2 = 0;
		for(i=0;i<count;i++)
		{
			idx = ObjFind(id+i);
			if( ObjGet(idx,O_DISABLE) ) 
			{ 
				if(freecount2==pick) { idxfree=idx; break; }
				freecount2++; 
			}
		}
		
		ofs = (ObjGet(idx,O_MAP+2) - ObjGet(idx,O_MAP))/2;

		// reset bubble around player
		x = PlayerGet(P_X) + 8 - gs_rand(16);
		y = PlayerGet(P_Y) - 16;
		if( MaterialRead(x%roomw,y%roomh,1,1)!=(1<<MAT_WATER) ) return; // out of water
		ObjSet(idxfree,O_DISABLE,0);
		ObjSet(idxfree,O_X,x-ofs);
		ObjSet(idxfree,O_Y,y-ofs);
		ObjSet(idxfree,O_BUBBLESPEED,speed/2+gs_rand(speed));
		ObjSet(idxfree,O_BUBBLETIME,0);
		ObjPresent(idxfree);
	}
}

func AIUpdateFly( idx )
{
	if(idx==-1)
		return;

	if(ObjGet(idx,O_DISABLE)==1)
		return;

	// Get idx boundaries
	t = ObjGet(idx,O_BOUNDTOP);	
	b = ObjGet(idx,O_BOUNDBOTTOM);
	l = ObjGet(idx,O_BOUNDLEFT);
	r = ObjGet(idx,O_BOUNDRIGHT);

	dirx = ObjGet(idx,O_DIRX);
	diry = ObjGet(idx,O_DIRY);
	if (dirx==0)
		dirx=-1;
	if (diry==0)
		diry=-1;

	x = ObjGet(idx,O_X);
	y = ObjGet(idx,O_Y);

	speedx = MIN(10, MAX(1, ObjGet(idx,O_SPEEDX)));
	speedy = MIN(10, MAX(1, ObjGet(idx,O_SPEEDY)));
	delayx = 11-speedx;
	delayy = 11-speedy;

	if (IsUpdate(delayy))
	{
		if(diry<0)
			y--;
		else
			y++;
		ObjSet(idx,O_Y,y);
		if(y<=t||y>=b)
		{
			diry=-1*diry;
			ObjSet(idx, O_DIRY, diry);
		}
	}

	if (IsUpdate(delayx))
	{
		if(dirx<0)
			x--;
		else
			x++;
		ObjSet(idx,O_X,x);
		if(x<=l||x>=r)
		{
			dirx=-1*dirx;
			ObjSet(idx, O_DIRX, dirx);
			flip = ObjGet(idx,O_FLIP);
			if (flip==0)
				ObjSet(idx, O_FLIP, 1);
			else
				ObjSet(idx, O_FLIP, 0);
		}
	}
}

/////////////////////////////////////////////////////////////////////////////////

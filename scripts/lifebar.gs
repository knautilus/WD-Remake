// This function provides animation to the players lifebar
// when being replenished
func PlayerLifeBarUpdate() 
{
  lifeinc = PlayerGet(P_LIFEINC);
  lifedec = PlayerGet(P_LIFEDEC);

  // if the deduct has a value greater than 1 then deduct it from the players lifeforce
  if (lifedec >= 1)
  {
    PlayerLifeBarDeduct();
  }

  // if the lifeinc is set to 0 then no increase is needed so exit.
  if (lifeinc == 0)
  {
    return;
  }

  l = PlayerGet(P_LIFE);
  if (l >= MAXLIFE)
  {
    lifeinc = 0;
    PlayerSet(P_LIFEINC, lifeinc);
    return;
  }
  
  l += 1;
  lifeinc -= 1;
  PlayerSet(P_LIFE,l);
  
  if (lifeinc <= 0)
  {
    lifeinc = 0;
  }

  PlayerSet(P_LIFEINC, lifeinc);
  PlayLifeBarFX(l);
}

func PlayerLifeBarDeduct() 
{
  lifedec = PlayerGet(P_LIFEDEC); 
  l = PlayerGet(P_LIFE);
  
  if (l == 0)
  {
    lifedec = 0;
    PlayerSet(P_LIFEDEC, lifedec);
    return;
  }
  
  l -= 1;
  lifedec -= 1;
  
  PlayerSet(P_LIFE, l);

  if (lifedec <= 0)
  {
    lifedec=0;
  }

  PlayerSet(P_LIFEDEC, lifedec);
  PlayLifeBarFX(l);
}

func PlayLifeBarFX( life )
{
  l2 = ((int)life/(MAXLIFE/40)) - 1;
  if (l2 <= FX_LIFEBAR)
  {
    l2 = FX_LIFEBAR;
  }
  SamplePlay(l2);
}
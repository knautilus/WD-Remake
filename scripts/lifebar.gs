int p_lifebar
int p_lifebardeduct

// This function provides animation to the players lifebar
// when being replenished
func PlayerLifeBar() 
{
  // if the deduct has a value greater than 1 then deduct it from the players lifeforce
  if (p_lifebardeduct >= 1)
  	PlayerLifeBarDeduct();

  // if the lifebar is set to 0 then no increase is needed so exit.
  if (p_lifebar == 0)
  	return;

  l = PlayerGet(P_LIFE);
  if (l >= MAXLIFE)
  {
  	p_lifebar = 0;
  	return;
  }
  
  l += 1;
  p_lifebar -= 1;
  PlayerSet(P_LIFE,l);
  
  if (p_lifebar <= 0)
  	p_lifebar = 0;
  	
  PlayLifeBarFX(l);
}

func PlayerLifeBarDeduct() 
{
  l = PlayerGet(P_LIFE);
  
  if (l == 0)
  {
  	p_lifebardeduct = 0;
  	return;
  }
  
  l -= 1;
  p_lifebardeduct -= 1;
  
  PlayerSet(P_LIFE, l);

  if (p_lifebardeduct <= 0)
  	p_lifebardeduct=0;
  	
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
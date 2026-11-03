// This function provides animation to the players lifebar
// when being replenished
func PlayerLifeBarUpdate() 
{
	life = PlayerGet(P_LIFE);

	if (life == 0)
	{
		PlayerSet(P_LIFEINC, 0);
		PlayerSet(P_LIFEDEC, 0);
		return;
	}

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

	if (life >= MAXLIFE)
	{
		lifeinc = 0;
		PlayerSet(P_LIFEINC, lifeinc);
		return;
	}
	
	life += 1;
	lifeinc -= 1;
	PlayerSet(P_LIFE,life);
	
	if (lifeinc <= 0)
	{
		lifeinc = 0;
	}

	PlayerSet(P_LIFEINC, lifeinc);
	PlayLifeBarFX(life);
}

func PlayerLifeBarDeduct() 
{
	lifedec = PlayerGet(P_LIFEDEC);
	lifedecStep = PlayerGet(P_LIFEDECSTEP); 
	life = PlayerGet(P_LIFE);
	if (lifedecStep == 0)
	{
		lifedecStep = 1;
	}

	if (life == 0)
	{
		lifedec = 0;
		PlayerSet(P_LIFEDEC, lifedec);
		return;
	}
	
	life -= lifedecStep;
	if (life <= 0)
	{
		life = 0;
	}
	PlayerSet(P_LIFE, life);

	lifedec -= lifedecStep;
	if (lifedec <= 0)
	{
		lifedec = 0;
	}
	PlayerSet(P_LIFEDEC, lifedec);
	
	PlayLifeBarFX(life);
}

func PlayLifeBarFX( life )
{
	sample = ((int)life/(MAXLIFE/40)) - 1;
	if (sample <= FX_LIFEBAR)
	{
		sample = FX_LIFEBAR;
	}
	SamplePlay(sample);
}
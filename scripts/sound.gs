/////////////////////////////////////////////////////////////////////////////////
// sound.gs
// Deals with music and samples
// Supported formats: YM, MOD, IT, XM, S3M, WAV, OGG
// NOTE: music is streamed from hard disk, but samples are fully loaded in memory, so they can't be too big
/////////////////////////////////////////////////////////////////////////////////

// The sound ID defines corespond to the avaliable sound files, for a more elegant use in scripts.
// Users should change or add more defines like these when they change or add more sound files.

#def MUSIC_NONE		-1
#def MUSIC_A		1
#def MUSIC_B		2
#def MUSIC_C		3
// ...

#def FX_LIFEBAR		1
#def FX_COIN		40
#def FX_JUMP		41
#def FX_RESPAWN		42
// ...

/////////////////////////////////////////////////////////////////////////////////

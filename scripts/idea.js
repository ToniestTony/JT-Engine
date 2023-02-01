var idea={
	genres:["Platformer",
	"Metroidvania",
	"Tower defense",
	"Party",
	"Shooter",
	"Beat-Em-Up",
	"Action",
	"Strategy",
	"Simulation",
	"Adventure",
	"RPG",
	"Text Adventure",
	"Arcade",
	"Survival",
	"Clicker",
	"Sandbox",
	"Open World",
	"Fighting",
	"Racing",
	"Turn-based",
	"Puzzle",
	"Stealth",
	"Roguelike",
	"Sports",
	"Horror",
	"Strategy",
	"Rhythm",
	"Visual novel"],

	themes:["Aliens",
	"Alternate History",
	"Athletes",
	"City",
	"Comedy",
	"Cyberpunk",
	"Dance",
	"Detective",
	"Dungeon",
	"Evolution",
	"Fantasy",
	"Game Dev",
	"Hacking",
	"History",
	"Horror",
	"Hospital",
	"Hunting",
	"Life",
	"Martial Arts",
	"Medieval",
	"Military",
	"Modern",
	"Based on movies",
	"Based on games",
	"Sequel",
	"Remake",
	"Demake",
	"Music",
	"Ninja",
	"Pirate",
	"Apocalyptic",
	"Prison",
	"Racing",
	"School",
	"Sci-Fi",
	"Space",
	"Spy",
	"Superheroes",
	"Time Travel",
	"Transport",
	"UFO",
	"Vampire",
	"Virtual Pet",
	"Vocabulary",
	"Wild West",
	"Zombies"],
	
	getIdea:function(genreString,themeString){
		var genre=jt.choose(this.genres);
		var theme=jt.choose(this.themes);
		if(genreString!=undefined){
			genre=genreString;
		}
		if(themeString!=undefined){
			theme=themeString;
		}
		
		var gen=genre+" + "+theme;
		return gen;
	}
}
//Create character object for storing all stats urls for character specific displays
var character = [
	{
		'name': 					"Sans", 
		'health-points': 			0,
		'base-attack-power': 		0,
		'base-hp': 					0,
		'counter-attack-power': 	0,
		'attack-power': 			0,
		'hp': 						0,
		'menu-picture-url': 		"assets/images/menu-sans.jpg",
		'battle-picture-url': 		"assets/images/battle-sans.gif",
		'arena-picture-url': 		"assets/images/arena-sans.jpg",
		'is-user-character': 		false,
		'is-alive': 				true
	}, 
	{
		'name': 					"Mario", 
		'health-points': 			0,
		'base-attack-power': 		0,
		'base-hp': 					0,
		'counter-attack-power': 	0,
		'attack-power': 			0,
		'hp': 						0,
		'menu-picture-url': 		"assets/images/menu-mario.jpg",
		'battle-picture-url': 		"assets/images/battle-mario.png",
		'arena-picture-url': 		"assets/images/arena-mario.jpg",
		'is-user-character': 		false,
		'is-alive': 				true
	}, 
	{
		'name': 					"Solid-Snake", 
		'health-points': 			0,
		'base-attack-power': 		0,
		'base-hp': 					0,
		'counter-attack-power': 	0,
		'attack-power': 			0,
		'hp': 						0,
		'menu-picture-url': 		"assets/images/menu-snake.jpg",
		'battle-picture-url': 		"assets/images/battle-snake.png",
		'arena-picture-url': 		"assets/images/arena-snake.jpg",
		'is-user-character': 		false,
		'is-alive': 				true
	}, 
	{
		'name': 					"Brook", 
		'health-points': 			0,
		'base-attack-power': 		0,
		'base-hp': 					0,
		'counter-attack-power': 	0,
		'attack-power': 			0,
		'hp': 						0,
		'menu-picture-url': 		"assets/images/menu-brook.png",
		'battle-picture-url': 		"assets/images/battle-brook.jpg",
		'arena-picture-url': 		"assets/images/arena-brook.jpg",
		'is-user-character': 		false,
		'is-alive': 				true
	}, 
	{
		'name': 					"Robin", 
		'health-points': 			0,
		'base-attack-power': 		0,
		'base-hp': 					0,
		'counter-attack-power': 	0,
		'attack-power': 			0,
		'hp': 						0,
		'menu-picture-url': 		"assets/images/menu-robin.png",
		'battle-picture-url': 		"assets/images/battle-robin.webp",
		'arena-picture-url': 		"assets/images/arena-robin.png",
		'is-user-character': 		false,
		'is-alive': 				true
	}, 
	{
		'name': 					"Kuma", 
		'health-points': 			0,
		'base-attack-power': 		0,
		'base-hp': 					0,
		'counter-attack-power': 	0,
		'attack-power': 			0,
		'hp': 						0,
		'menu-picture-url': 		"assets/images/menu-kuma.jpg",
		'battle-picture-url': 		"assets/images/battle-kuma.png",
		'arena-picture-url': 		"assets/images/arena-kuma.png",
		'is-user-character': 		false,
		'is-alive': 				true
	}
]

var isUserCharacterChosen = false;

//--End global variables------------------------------------------//
//--Function definitions------------------------------------------//

//Display text instruction user to choose character, and load heroes (images and on click events)
function loadheroes() {
	$('.heroes').append('<h2>');
	$('.heroes h2').text('Choose your character!');

	//display all pictures of characters
	for (var i=0; i < character.length; i++) {
		var heroPic = $('<img>');
		heroPic.attr('src', character[i]['menu-picture-url']);
		heroPic.on("click", function() {heroClick()})
		$('.heroes').append(heroPic);
	}
}

//Function called whenever one of the character pictures is clicked for choosing the user character or next enemy
function heroClick() {
	if (isUserCharacterChosen === false) {
		chooseHero();
		isUserCharacterChosen = true;
	}
	else {
		chooseEnemy();
	}
}

function chooseHero() {
	character
}

//--End function definitions--------------------------------------//
//--Program-------------------------------------------------------//

loadheroes();

//--End program---------------------------------------------------//
//Create character object for storing all stats urls for character specific displays
var character = [
	{
		'name': 				"Sans", 
		'baseAttackPower': 		5,
		'baseHp': 				50,
		'counterAttackPower': 	0,
		'attackPower': 			0,
		'hp': 					0,
		'menuPictureUrl': 		"assets/images/menu-sans.jpg",
		'battlePictureUrl':		"assets/images/battle-sans.gif",
		'arenaPictureUrl': 		"assets/images/arena-sans.jpg",
		'isAlive': 				true,
	}, 
	{
		'name': 				"Mario", 
		'baseAttackPower': 		0,
		'baseHp': 				100,
		'counterAttackPower': 	4,
		'attackPower': 			0,
		'hp': 					0,
		'menuPictureUrl': 		"assets/images/menu-mario.jpg",
		'battlePictureUrl':		"assets/images/battle-mario.png",
		'arenaPictureUrl': 		"assets/images/arena-mario.jpg",
		'isAlive': 				true,
	}, 
	{
		'name': 				"Solid Snake", 
		'baseAttackPower': 		0,
		'baseHp': 				30,
		'counterAttackPower': 	0,
		'attackPower': 			0,
		'hp': 					0,
		'menuPictureUrl': 		"assets/images/menu-snake.jpg",
		'battlePictureUrl':		"assets/images/battle-snake.png",
		'arenaPictureUrl': 		"assets/images/arena-snake.jpg",
		'isAlive': 				true,
	}, 
	{
		'name': 				"Brook", 
		'baseAttackPower': 		0,
		'baseHp': 				40,
		'counterAttackPower': 	0,
		'attackPower': 			0,
		'hp': 					0,
		'menuPictureUrl': 		"assets/images/menu-brook.png",
		'battlePictureUrl':		"assets/images/battle-brook.jpg",
		'arenaPictureUrl': 		"assets/images/arena-brook.jpg",
		'isAlive': 				true,
	}, 
	{
		'name': 				"Robin", 
		'baseAttackPower': 		0,
		'baseHp': 				50,
		'counterAttackPower': 	0,
		'attackPower': 			0,
		'hp': 					0,
		'menuPictureUrl': 		"assets/images/menu-robin.png",
		'battlePictureUrl':		"assets/images/battle-robin.webp",
		'arenaPictureUrl': 		"assets/images/arena-robin.png",
		'isAlive': 				true,
	}, 
	{
		'name': 				"Kuma", 
		'baseAttackPower': 		0,
		'baseHp': 				60,
		'counterAttackPower': 	0,
		'attackPower': 			0,
		'hp': 					0,
		'menuPictureUrl': 		"assets/images/menu-kuma.jpg",
		'battlePictureUrl':		"assets/images/battle-kuma.png",
		'arenaPictureUrl': 		"assets/images/arena-kuma.png",
		'isAlive': 				true,
	}
]

var isUserCharacterChosen;
var userCharacter;
var activeEnemy;
//--End global variables------------------------------------------//
//--Function definitions------------------------------------------//

//Initialize the game
function initialize() {
	$('.heroes').children().remove();
	$('.heroes').append('<h2>');
	isUserCharacterChosen = false;
	for (var i=0; i < character.length; i++) {
		character[i].isAlive = true;
		character[i].attackPower = character[i].baseAttackPower;
		character[i].hp = character[i].baseHp;
	}
	loadheroes();
	chooseHero();
}

//Load all heros with text to display on top menu
function loadheroes() {
	//display all pictures of characters
	for (var i=0; i < character.length; i++) {
		var heroContainer = $('<div>');
		var heroPic = $('<img>');
		var heroText = $('<p>');
		heroPic.attr('src', character[i].menuPictureUrl);
		heroText.text(`${character[i].name}: ${character[i].baseHp}`).addClass('menu-text');
		heroContainer.addClass('hero-container').attr('hero-index', i).attr('is-user-character', false).attr('is-active-enemy', false).attr('can-click', true).append(heroPic).append(heroText);
		$('.heroes').append(heroContainer);
	}
	//Add click event
	$('.hero-container').click(function() {
		heroClick($(this));
	});
}

//Function called whenever one of the character pictures is clicked for choosing the user character or next enemy
function heroClick(clickedHero) {
	if(clickedHero.attr('can-click') == 'true') {
		if (isUserCharacterChosen === false) {
			//If user character is chosen
			userCharacter = character[clickedHero.attr('hero-index')];
			clickedHero.attr('is-user-character', true).attr('can-click', false);
			clickedHero.isUserCharacter = true;
			isUserCharacterChosen = true;
			moveHero(clickedHero, $('div.attacker'));
			//Change to battle picture
			clickedHero.children().attr("src", character[clickedHero.attr('hero-index')].battlePictureUrl);
			chooseEnemy();
		}
		else {
			//If enemy character is chosen
			activeEnemy = character[clickedHero.attr('hero-index')];
			clickedHero.attr('is-active-enemy', true);
			chooseEnemy();
			clickedHero.isActiveEnemy = true;
			moveHero(clickedHero, $('div.defender'));
			//Change to battle picture
			clickedHero.children().attr("src", character[clickedHero.attr('hero-index')].battlePictureUrl);
			//Turn off ability to click any character buttons
			toggleClicks('soft', false);
			beginBattle();
		}
		
	}
}

function chooseHero() {
	$('.heroes h2').text('Choose your character!');
}
function chooseEnemy() {
	$('.heroes h2').text('Choose the enemy!');
}
function beginBattle() {
	$('.heroes h2').text('FIGHT!');
}

function moveHero(from, to) {
	var xOffset = to.offset().left - from.offset().left;
	var yOffset = to.offset().top - from.offset().top;
	from.animate({left: xOffset, top: yOffset});
}

function fight() {
	var userContainer = $('.hero-container[is-user-character="true"]');
	var enemyContainer = $('.hero-container[is-active-enemy="true"]');
	activeEnemy.hp = activeEnemy.hp - userCharacter.attackPower;
	enemyContainer.children().text(`${activeEnemy.name}: ${activeEnemy.hp}`);
	//Is the enemy dead?
	if (activeEnemy.hp <= 0) {
		activeEnemy.isAlive = false;
		moveHero(enemyContainer, $('div.graveyard'));
		enemyContainer.attr('is-active-enemy', false);
		var anyOneLeft = false;
		for (i=0; i < character.length; i++) {
			//Is there anyone left to fight now that this character is defeated?
			if( character[i].isAlive === true && i != userContainer.attr('hero-index') ) {
				anyOneLeft = true;
			}
		}
		if (anyOneLeft === true) {
			toggleClicks('soft', true);
			chooseEnemy();
		}
		else {
			alert('VICTORY');
			initialize;
		}
	}
	else {
		userCharacter.hp = userCharacter.hp - activeEnemy.counterAttackPower;
		userContainer.children().text(`${userCharacter.name}: ${userCharacter.hp}`);
		if (userCharacter.hp <= 0) {
			alert('defeat...');
			initialize();
		}
		else {
			userCharacter.attackPower = userCharacter.attackPower + userCharacter.baseAttackPower;
		}
	}
}

// Change all 'can-click' attributes to either true or false
// Only characters that are both still alive and not the user character will be toggled unless 'hard' is input for the changeType parameter
//changeTo tells whether to change the attribute value to true or false
function toggleClicks(changeType, changeTo) {
	for (i=0; i < character.length; i++) {
	var checker = $('.hero-container[hero-index='+i+']');
		if ((changeType === 'hard') || (checker.attr('is-user-character') === 'false' && character[i].isAlive === true)) {
			checker.attr('can-click', changeTo);
		}
	}
}
//--End function definitions--------------------------------------//

//--Event handlers----------------------------------------------//
$('.start-button').click(function() {
	initialize();
});

$('.fight-button').click(function() {
	fight();
});
//--End event handlers------------------------------------------//
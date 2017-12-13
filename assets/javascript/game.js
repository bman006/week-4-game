//Create character object for storing all stats urls for character specific displays
var character = [
	{
		'name': 				"Sans", 
		'baseAttackPower': 		0,
		'baseHp': 				0,
		'counterAttackPower': 	0,
		'attackPower': 			0,
		'hp': 					0,
		'menuPictureUrl': 		"assets/images/menu-sans.jpg",
		'battlePictureUrl':		"assets/images/battle-sans.gif",
		'arenaPictureUrl': 		"assets/images/arena-sans.gif",
		'isAlive': 				true,
	}, 
	{
		'name': 				"Mario", 
		'baseAttackPower': 		0,
		'baseHp': 				0,
		'counterAttackPower': 	0,
		'attackPower': 			0,
		'hp': 					0,
		'menuPictureUrl': 		"assets/images/menu-mario.jpg",
		'battlePictureUrl':		"assets/images/battle-mario.png",
		'arenaPictureUrl': 		"assets/images/arena-mario.png",
		'isAlive': 				true,
	}, 
	{
		'name': 				"Solid Snake", 
		'baseAttackPower': 		0,
		'baseHp': 				0,
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
		'baseHp': 				0,
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
		'baseHp': 				0,
		'counterAttackPower': 	0,
		'attackPower': 			0,
		'hp': 					0,
		'menuPictureUrl': 		"assets/images/menu-robin.png",
		'battlePictureUrl':		"assets/images/battle-robin.gif",
		'arenaPictureUrl': 		"assets/images/arena-robin.png",
		'isAlive': 				true,
	}, 
	{
		'name': 				"Kuma", 
		'baseAttackPower': 		0,
		'baseHp': 				0,
		'counterAttackPower': 	0,
		'attackPower': 			0,
		'hp': 					0,
		'menuPictureUrl': 		"assets/images/menu-kuma.jpg",
		'battlePictureUrl':		"assets/images/battle-kuma.png",
		'arenaPictureUrl': 		"assets/images/arena-kuma.png",
		'isAlive': 				true,
	}
]

var loopattacks = 	[12, 2, 8, 4, 6, 10];
var loophps = 		[250, 300, 100, 50, 150, 200];
var loopcounters = 	[12, 6, 3, 18, 9, 15];

for (var i=0; i < character.length; i++) {
	character[i].baseAttackPower = loopattacks[i];
	character[i].baseHp = loophps[i];
	character[i].counterAttackPower = loopcounters[i];

}

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
	$('.battlefield').hide();
	$('.graveyard').hide();
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
		$('.heroes').hide();
		$('.heroes h2').hide();
		$('.hero-container').hide();
	}
	//show character menu box
	$('.heroes').show(1000,function() {
		//show box text
		$('.heroes h2').show(500, function() {
			//Show character boxes
			for (i=0; i < character.length; i++) {
				$('.hero-container[hero-index='+i+']').show(500);
			}	
		})
		
	});
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
			//Update battlefield background
			$('.battlefield').css('background-image', 'url('+character[clickedHero.attr('hero-index')].arenaPictureUrl+')')
			$('.battlefield').show(200, function() {
				$('.graveyard').show(200, function() {
					moveHero(clickedHero, $('div.attacker'));
					//Change to battle picture
					clickedHero.children().attr("src", character[clickedHero.attr('hero-index')].battlePictureUrl);
					chooseEnemy();					
				});

			});

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

function fight() {
	var userContainer = $('.hero-container[is-user-character="true"]');
	var enemyContainer = $('.hero-container[is-active-enemy="true"]');
	activeEnemy.hp = activeEnemy.hp - userCharacter.attackPower;
	enemyContainer.children().text(`${activeEnemy.name}: ${activeEnemy.hp}`);
	//Is the enemy dead?
	if (activeEnemy.hp <= 0) {
		//if statement to avoid console error on extra fight button presses
		if (activeEnemy.isAlive === true) {
			moveHero(enemyContainer, $('div.graveyard'));
		}
		activeEnemy.isAlive = false;
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

//Move the hero containers between each section when selected or defeated
function moveHero(from, to) {
	from.removeAttr('style');
	var xOffset = to.offset().left - from.offset().left;
	var yOffset = to.offset().top - from.offset().top;
	from.animate({left: xOffset, top: yOffset});
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
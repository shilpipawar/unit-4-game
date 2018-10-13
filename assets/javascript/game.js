$(document).ready(function () {
	//////////////////////////////////Declaring All objects and variables////////////////////////////////////////////////////////////////
	//Ben Object
	var Ben = {
		nickName: 'ben',
		name: 'Ben Kenobi',
		healthpoints: 100,
		attackPoints: 11,
		image: ' <img src="assets/images/c.png" class="image img-responsive" style="width:100%;Height:100%" />'
	};

	// KyloRen object
	var KyloRen = {
		nickName: 'kylo',
		name: 'Kylo Ren',
		healthpoints: 120,
		attackPoints: 8,
		image: '<img src="assets/images/KyloRen_IMAGE.jpg" class="image img-responsive" style="width:100%;Height:100%" />'
	};

	// Obi object
	var Obi = {
		nickName: 'obi',
		name: 'Obi Wan',
		healthpoints: 150,
		attackPoints: 2,
		image: '<img src="assets/images/Start.jpeg" class="image img-responsive" style="width:100%;Height:100%" />'
	};

	// Darth object
	var Darth = {
		nickName: 'darth',
		name: 'Darth Maul',
		healthpoints: 80,
		attackPoints: 7,
		image: ' <img src="assets/images/DARTH_IMAGE.jpg" class="image img-responsive" style="width:100%;Height:100%" />'
	};

	//Declaring all globlal objects here 	
	var players = [];
	var $yourCharacter;
	var $currentEnemy;
	// Character's healthpoints and attack
	var yourHealth;
	var yourAttack;
	// current's enemy's healthpoints and attack
	var currentEnemyHealth = 0;
	var currentEnemyAttack = 0;

	var counter = 0;
	var totalAttackPoints = 0;
	var compoundAttack;
	
	var isThereOpponent = false;

	var charobjarray = [Ben, KyloRen, Obi, Darth];

	////////////////////////////////////////Declaring Functions////////////////////////////////////////////////////////////////////
	//Creating function to Start Game and place all character///
	function createPlayers(obj) {
		if (obj.length === 4) {
			console.log("I am in")

			for (var i = 0; i < obj.length; i++) {

				// jQuery Object that takes the attributes of each character
				var $Player = $('<div id=' + obj[i].nickName + '>');
				$Player.append('<div class="PlayerName">' + obj[i].name);
				$Player.append(obj[i].image);
				$Player.append('<div class="PlayerHealth">' + obj[i].healthpoints);
				$Player.attr('data_nickName', obj[i].nickName);
				$Player.attr("data_name", obj[i].name);
				$Player.attr('data_attack', obj[i].attackPoints);
				$Player.attr('data_health', obj[i].healthpoints);
				$Player.attr('class', 'character col-sm-3');

				players.push(obj[i].nickName);

				$("#players").append($Player);
				console.log("value of i" + i + obj.length);
			}
		} // end of if statement
		else if (obj.length <= 3) {
			$('#remainingEnemies').empty()

			players = [];
			console.log("obj.length" + obj.length);

			$('#remainingEnemies').append('<div class="title">Remaining Enemies</div>')
			for (var i = 0; i < obj.length; i++) {

				// jQuery Object that takes the attributes of each character
				var $Player = $('<div id=' + obj[i].nickName + '>');
				$Player.append('<div class="PlayerName">' + obj[i].name);
				$Player.append(obj[i].image);
				$Player.append('<div class="PlayerHealth">' + obj[i].healthpoints);
				// att data attributes to use with the logic of the game
				$Player.attr('data_nickName', obj[i].nickName);
				$Player.attr("data_name", obj[i].name);
				$Player.attr('data_attack', obj[i].attackPoints);
				$Player.attr('data_health', obj[i].healthpoints);
				$Player.attr('class', 'enemy');

				players.push(obj[i].nickName);

				$('#remainingEnemies').append($Player);
			}

			if (!$currentEnemy) {
				pickYourOpponent();
			}
		}
	}; // CLOSING createCharacter

	//Function to Pick Your a Player
	function pickYourPlayer() {
		// this function should pick your player and then automaticaly make the other charaters enemies.
		$('.character').on('click', function () {
			$('#players').empty();
			$('#players').append('<div class="title">Your Player</div>')

			$yourCharacter = $(this);
			$yourCharacter.addClass('yourCharacter');
			$yourCharacter.removeClass('col-sm-3 players');

			yourHealth = parseInt($yourCharacter.attr('data_health'));
			yourAttack = parseInt($yourCharacter.attr('data_attack'));

			$('#players').append($yourCharacter);

			$('#remainingEnemies').append('<div class="title">Pick Your Enemy</div>');

			// remove the chosen character and then run the createPlayers function again to recreate the 'enemies'
			var indexRemove = players.indexOf($yourCharacter.attr('data_nickName'))
			charobjarray.splice(indexRemove, 1);

			// call createCharacters function again, but this time there are only 3
			createPlayers(charobjarray);

		});
	};

	//Function for Pick Opponents
	function pickYourOpponent() {

		$('.enemy').on('click', function () {
			$('#players').empty();
			$('#currentEnemy').empty();
			$('#AttackBtn').empty();

			// enemy picked
			$currentEnemy = $(this);

			$currentEnemy.addClass('currentEnemy');
			$currentEnemy.removeClass('enemy');

			// append your character and enemy picked to the fighting area
			$('#yourCharacter').append($yourCharacter);

			//Add Attack Button
			$('#AttackBtn').append('<button type="button" class="btn btn-danger" id ="fightStart">Attack</button>');

			$('#currentEnemy').append($currentEnemy);

			//Set flag true - found enemy
			isThereOpponent = true;

			//Remove character from the index and call createCharacters again
			var indexRemove = players.indexOf($currentEnemy.attr('data_nickName'));
			console.log("indexRemove" + indexRemove);
			charobjarray.splice(indexRemove, 1);

			createPlayers(charobjarray);

			currentEnemyAttack = 0;
			console.log(currentEnemyAttack);

			// Your enemy's health and attack
			currentEnemyAttack = parseInt($currentEnemy.attr('data_attack'));
			console.log("CURRENT ENEMY ATTACK: ", currentEnemyAttack);
			currentEnemyHealth = parseInt($currentEnemy.attr('data_health'));

			console.log('IS THERE OPPONENT: ' + isThereOpponent);
			console.log("currentEnemyHealth: " + currentEnemyHealth);

			// // Check if there is an opponent
			$('#fightStart').on('click', function () {
				if (isThereOpponent) {
					AttackFun();
				} else {
					$("#GameMessage").html('YOU NEED TO PICK AN OPPONENT');
				}
			});
		});
	};

	//Functio for Fighting
	function AttackFun() {

		//Function on Attack button clicked - Game logic ti Win or Loose
		counter++;

		compoundAttack = parseInt(yourAttack);

		compoundAttack += yourAttack;

		console.log("COMPOUND ATTACK: ", compoundAttack);

		// After attack
		currentEnemyHealth = currentEnemyHealth - compoundAttack;
		yourHealth = yourHealth - currentEnemyAttack;
		console.log("CURRENT ENEMY ATTACK: ", currentEnemyAttack);
		console.log("ENEMY HEALTH: ", currentEnemyHealth);
		console.log("YOUR HEALTH: ", yourHealth);

		//Update UI with the current score//////////////
		$('.currentEnemy > .characterHealth').html(currentEnemyHealth).animate({
			fontSize: 60,
			color: '#FF0000'
		}, 300, function () {
			$(this).animate({
				fontSize: 20,
				color: 'white'
			}, 300);
		});
		$('.yourCharacter > .characterHealth').html(yourHealth).animate({
			fontSize: 60,
			color: '#FF0000'
		}, 300, function () {
			$(this).animate({
				fontSize: 20,
				color: 'white'
			}, 300);
		});
		///////////////////////////////////////////////
		if (currentEnemyHealth <= 0 && yourHealth > 0) {

			isThereOpponent = false;
			yourHealth = yourHealth - currentEnemyAttack;

			console.log("YOU HAVE DEFEATED " + $currentEnemy.attr('data_nickName'));
			console.log('IS THERE OPPONENT: ' + isThereOpponent)

			$('#currentEnemy').empty();

			if (players.length === 0) {
				alert("!!!!You WON!!!!");
				restartGame();
			} else {
				pickYourOpponent();
			};
		}else if (yourHealth <= 0) {
			alert("You have been defeated");
			alert("Play again---Restarting Game 3,2,1.....");
			location.reload();
		};
	};

	//Restart the game
	
	//New Function for Fight
	// function fight() {

	// 	// We need to isolate the lightsabers click function in order to create some conditions that allow me to stop the game when it doesn't meet some parameters

	// 		counter++;
	// 		compoundAttack = parseInt(yourAttack);

	// 		//compoundAttack += yourAttack;
			
	// 		if(isNaN(compoundAttack))
	// 		{
	// 			alert("NaN Compound attack");
	// 		}
			
	// 		if(isNaN(yourAttack))
	// 		{
	// 			alert("Yes yourhealth NaN");
	// 		}
			
	// 		console.log("COMPOUND ATTACK: ", compoundAttack);

	// 		// After attack
	// 		currentEnemyHealth = currentEnemyHealth - compoundAttack;
	// 		yourHealth = yourHealth - currentEnemyAttack;
	// 		console.log("CURRENT ENEMY ATTACK: ", currentEnemyAttack);
	// 		console.log("ENEMY HEALTH: ",currentEnemyHealth);
	// 		console.log("YOUR HEALTH: ",yourHealth);


	// 		$('.currentEnemy > .characterHealth').html(currentEnemyHealth).animate({
	// 			fontSize: 60,
	// 			color: '#FF0000'
	// 		}, 300, function() {
	// 			$(this).animate({
	// 				fontSize: 20,
	// 				color: 'white'
	// 			}, 300);
	// 		});
	// 		$('.yourCharacter > .characterHealth').html(yourHealth).animate({
	// 			fontSize: 60,
	// 			color: '#FF0000'
	// 		}, 300, function() {
	// 			$(this).animate({
	// 				fontSize: 20,
	// 				color: 'white'
	// 			}, 300);
	// 		});

	// 		if (currentEnemyHealth <= 0 && yourHealth > 0) {

	// 			isThereOpponent = false;
	// 			yourHealth = yourHealth - currentEnemyAttack;

	// 			console.log("YOU HAVE DEFEATED " + $currentEnemy.attr('data_nickName'));
	// 			console.log('IS THERE OPPONENT: ' + isThereOpponent)

	// 			$('#currentEnemy').empty();

	// 			// currentEnemyAttack = 0;

	// 			if (players.length === 0) {
	// 				alert("Congrats, You WON");
	// 				restartGame();
	// 			} else {
	// 				pickYourOpponent();
	// 			};
	// 		}

	// 		else if (yourHealth <= 0) {
	// 			alert("You have been defeated");
	// 			alert("try again");
	// 			restartGame();
	// 		};
	// };

	
	
	function restartGame() {
		$('#RestartButton').on('click', function () {
			location.reload();
		})
	}

	//Main Function to start the game
	function startGame() {
		createPlayers(charobjarray);

		pickYourPlayer();

		pickYourOpponent();
		AttackFun();
	}
	//TEST CALL
	//createPlayers(charobjarray);

	// Start the game
	startGame();

	//Button Click Events
	$('#RestartButton').on('click', function () {
		location.reload();
	})

	// Check if there is an opponent
	// $('#AttackBtn').on('click', function() {
	// 	if (isThereOpponent) {
	// 		AttackFun();
	// 	} else {
	// 		$("#GameMessage").html('YOU NEED TO PICK AN OPPONENT');
	// 	}
	// 	console.log("Attack clicked" + isThereOpponent)
	// });

});

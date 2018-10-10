 $(document).ready(function () {
    //Ben Object
    var Ben= {
		nickName: 'ben',
		name: 'Ben Kenobi',
		healthpoints: 100,
		attack: 10,
		image: ' <img src="assets/images/Ben Kenobi.jpg" class="image img-responsive" style="width:100%;Height:100%" />'
	};

	// KyloRen object
	var KyloRen = {
		nickName: 'kylo',
		name: 'KyloRen',
		healthpoints: 120,
		attack: 8,
		image: '<img src="assets/images/KyloRen.png" class="image img-responsive" style="width:100%;Height:100%" />'
	};

	// Obi object
	var Obi = {
		nickName: 'obi',
		name: 'Obi Wan',
		healthpoints: 150,
		attack: 2,
		image: '<img src="assets/images/obi-wan-spin-off.jpg" class="image img-responsive" style="width:100%;Height:100%" />'
	};

	// Darth object
	var Darth = {
		nickName: 'darth',
		name: 'Darth Maul',
		healthpoints: 80,
		attack: 7,
		image: ' <img src="assets/images/Darth.jpeg" class="image img-responsive" style="width:100%;Height:100%" />'
    };
    
    //Declaring all globlal objects here 	
	var characters = [];
	var $yourCharacter;
	var $currentEnemy;
	// Character's healthpoints and attack
	var yourHealth;
	var yourAttack;
	// current's enemy's healthpoints and attack
	var currentEnemyHealth = 0;
	var currentEnemyAttack = 0;

	var counter = 0;
	var compoundAttack = 0;
    var isThereOpponent = false;
    
    var charobjarray = [Ben,KyloRen,Obi,Darth];
});

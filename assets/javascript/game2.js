/*
* FUNCTIONS
*/

// Returns a string version of contents of gameLetters seperated
// by a space
function gameStringForm(arr){
	var result = "";

	for(var i = 0; i < arr.length; i++){
		result += arr[i];

		if(i != arr.length - 1){
			result += " ";
		}
	}

	return result;
}

// Updates gameLetters in html
function outputGameLetters(){
	document.getElementById("gameLetters").innerHTML = gameStringForm(gameLetters);
}

// Updates usedLetters in html
function outputUsedLetters(){
	document.getElementById("usedLetters").innerHTML = gameStringForm(usedLetters);
}

// Has the user won?
function checkWin(){
	for(var i = 0; i < gameLetters.length; i++){
		if(gameLetters[i] === "_"){
			return false; // User still has letters to guess
		}
	}
	return true; // All letters have been guessed
}

// Resets game by refreshing page
function resetGame(){
	window.location.reload();
}

// Checks if the key is an alphabetic letter
function isALetter(key){
	var result = true;

	var invalidKeys = ["Enter", "Meta", "Control", "Alt", "CapsLock", "Shift", "ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"];
	var alphabet = /^[a-zA-Z]+$/i;

	// Checks against alphabetic characters
	if(!alphabet.test(key)){
		result = false;
	}

	// Checks against other invalid keys
	for(var i = 0; i < invalidKeys.length; i++){
		if(key === invalidKeys[i]){
			result = false;
		}
	}

	// Input is valid
	return result;
}

/*
* LOGIC
*/
// Amount of chances each game
var totalChances = 6;
var chancesLeft = totalChances;

// Wordbank
// Add ANY word and the logic should work
var wordbank = ["pig", "cow", "zebra", "lion", "animal", "sahara", "jungle"];

// Choose random word from the wordbank
var word = wordbank[Math.floor(wordbank.length * Math.random())];

// Image files for losing chances
var images = [];
images.push("assets/images/hangman2.jpg");
images.push("assets/images/hangman3.jpg");
images.push("assets/images/hangman4.jpg");
images.push("assets/images/hangman5.jpg");
images.push("assets/images/hangman6.jpg");
images.push("assets/images/hangman7.jpg");

// Creates an array representing the game's current state.
// Underscores represent missing letters
var gameLetters = []
for(var i = 0; i < word.length; i++){
	gameLetters.push("_");
}

// Array for storing user's guesses
var usedLetters = [];

// Initializes letter views on html page
outputGameLetters();
outputUsedLetters();

var gameOver = false;
document.onkeydown = function keyUp(event) {
	// If the game has not ended and the user input a valid entry
	if(!gameOver && isALetter(event.key)){
		// If user's selected character is in the word
		if(word.indexOf(event.key) >= 0){
			// Replaces every respective underscore in gameLetters to its corresponding letter
			for(var i = 0; i < word.length; i++){
				if(word.charAt(i) === event.key){
					gameLetters[i] = String(event.key);
				}
			}
			outputGameLetters();

			// Check if player won
			if(checkWin()){
				// Player wins
				document.getElementById("message").innerHTML = "You Win!";
				console.log("Player wins! Game over.");
				gameOver = true;
			}
		}else{
			if(usedLetters.indexOf(event.key) < 0){
				chancesLeft--;

				// Add the guessed letter to the usedLetters array
				usedLetters.push(event.key);
				outputUsedLetters();

				// Updates hangman image to corresponding chancesLeft
				document.getElementById("image1").src = images[(totalChances - chancesLeft) - 1];

				// Check if player lost
				if(chancesLeft == 0){
					// Player loses
					document.getElementById("message").innerHTML = "You Lose!";
					console.log("Player loses! Game over.");
					gameOver = true;
				}
			}
		}
	}else if(gameOver == true){

		// Allows user to restart game by pressing 'Enter' after game has ended
		if(event.key === "Enter"){
			resetGame();
		}
	}
}
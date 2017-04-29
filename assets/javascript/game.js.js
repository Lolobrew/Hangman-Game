var reset = function(){
	window.location.reload();
}

var wordArray = ["rattlesnake", "boots", "lasso", "yeeha", "giddiup", "coyotes", "horses", "cattle", "cactus", "mesa"];

var word = wordArray[Math.floor(Math.random() * wordArray.length)];


var wordLettersArray = [];
for (var l = 0; l < word.length; l++) {
	wordLettersArray[l] = "_";
}
document.getElementById("underscoredword").innerHTML = ("The Word: <br>" + wordLettersArray.join(" "));

var wrongLettersArray = [];
document.getElementById("wrongletters").innerHTML = ("Wrong Un's Pardner: <br>" + wrongLettersArray);

var remainingLettersInWord = word.length;
var lettersLeft = remainingLettersInWord;


var chances = 6;
var chancesLeft = chances;
document.getElementById("chancesleft").innerHTML = ("Tries till the noose: <br>" + chancesLeft);


var message = "Press a letter to guess the word. You only have 6 chances before Ronnie hangs.";
document.getElementById("message").innerHTML = (message);


document.onkeydown = function keyUp (event){
	if(word.indexOf(event.key) >= 0){//document.write("this " + event.key +" works");
		for (var i = (word.indexOf(event.key)); i < word.length; i++) {
			if(word.charAt(i) === event.key) {
				wordLettersArray[i] = event.key;
				document.getElementById("underscoredword").innerHTML =("The Word: <br>" + wordLettersArray.join(" "));
				lettersLeft--;
				if (lettersLeft === 0){
					document.getElementById("message").innerHTML = ("You Win! Yippi!");
					alert("Nice Win Cowboy, wanna saddle back up?");
						if(confirm){
							reset();
						}
				}
			}
		}
	}else if (word.indexOf(event.key) < 0){
		wrongLettersArray.push(event.key);
		document.getElementById("wrongletters").innerHTML = ("Wrong Un's Pardner: <br>" + wrongLettersArray.join(" "));
		chancesLeft--;
			if (chancesLeft === 5) {
				document.getElementById("picture").src = "assets/images/hangman2.jpg";
				}
				if (chancesLeft === 4) {
					document.getElementById("picture").src = "assets/images/hangman3.jpg";
				}
				if (chancesLeft === 3) {
					document.getElementById("picture").src = "assets/images/hangman4.jpg";
				}
				if (chancesLeft === 2) {
					document.getElementById("picture").src = "assets/images/hangman5.jpg";
				}
				if (chancesLeft === 1) {
					document.getElementById("picture").src = "assets/images/hangman6.jpg";
				}		
				if (chancesLeft === 0) {
					document.getElementById("picture").src = "assets/images/hangman7.jpg";
					document.getElementById("message").innerHTML = "You Lose! Tarnations!";
					alert("Heavens to Betsy, that was a rough ride. Want to go again?");
					if (confirm){
						reset();
					}
				}
			}	
	}	

	
	

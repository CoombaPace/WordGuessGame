// $('body').css('background-image', 'url("images/hop_lineup.jpg")');

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var answers = ["bosstweed", "bluepantspilsner", "motherofinvention", "peanutbutterjellycrime", 
            "candybarpinstripe", "morecowbell", "vanillathehun", "purpledrank", "lapechemode", 
            "defyinggravity", "steppinrazor", "decos", "dayofthejuice", "hazeisgood", "allnightlong", 
            "honestabe", "hubbardscave", "uneannee"];

var answered = false;
var word; // The Answer
var hashmarks; // The _ _ _ _ representation variable.
var maxGuess; //How many guesses you get.
var guessed; // holds guessed letters.
var wins = 0; // Win counter.
var losses = 0; // Loss counter.
var chooser; // The word chosen to be the answer from answers array.
var wordArr = []; // Holds the answer.
var dashArr = []; // Holds the dash form of the answer.


      // Answer Generator resets conditions. Generates new word, hashmarks, set ansewered to true, empties the guessed letter array.
function initialize() {
	answered = true;
	guessed = [];

  // Chooser: .random * 18: returns a # between 0 and 1, * 18 choices to return a # greater than 1  
  // in the answers array. .floor returns an interger by rounding down to the nearest whole number.
	chooser = Math.floor(Math.random() * 18); 
	word = answers[chooser];			
	maxGuess = 10;	// User has 10 incorrect guesses before losing.
  	wordArr = word.split(''); // .split('') is used to seperate the answer (a string) in sub-strings.
                              // Using '' as the returns the individual characters as the substrings.      
  // Display hasmarks on the page the length of the word.
	hashmarks = makeIntoDashes(word);	
  dashArr = hashmarks.split('');		
  document.getElementById("word").innerHTML = hashmarks;
  
  // Guessed letters and guesses remaining displayed on page.
	document.getElementById("guessed").innerHTML = "--";
	document.getElementById("maxGuess").innerHTML = maxGuess;
}

// Make hashes the length of the answer.
function makeIntoDashes(word) {
	var dashes = "";
	for (i = 0; i < word.length - 1; i++) {
		dashes += "_ ";
	}
	dashes += "_";
	return dashes;
}

// Main Game Loop
function startUp(letter) {
	var letter = letter.toLowerCase();

	// Checks if key pressed is a letter
	if (alphabet.indexOf(letter) > -1) { // Gets the index of the key pressed, if a letter, from the alphabet var.
		if (wordArr.indexOf(letter) > -1) { // If the index of letter in word is greater than -1 it is present in the answer.
			display(letter); // Calls display(letter), which checks if letter is in the solution 
		}                   // array (wordArr).
		else {
			if (guessed.indexOf(letter) > -1) { // If index of letter is not negative: 
				return;                           // Return it/stop loop.
			}
			else { // Else, decrement guesses remaining, display it on the page.
				maxGuess--;
				document.getElementById("maxGuess").innerHTML = maxGuess;
				guessed.push(letter); // Put letter into guessed letters on page.
				document.getElementById("guessed").innerHTML = guessed.join(' ');
				if (maxGuess == 0) { // Losing condition. Tease the User if they lose.
					alert("When you become a real beer nerd, try again. The answer is: " + word);
					initialize();
          // Each loss is kept track of unless page is refreshed.
          losses++; // Increment losses by 1, and display it on the page.
					document.getElementById("losses").innerHTML = losses;
				}
			}
		}
	}
}

// Replaces proper hashmark in dashArr with the correctly guessed letter.
function display(letter) {
	for (i = 0; i < word.length; i++) {
		if (letter == wordArr[i]) {
			dashArr[i * 2] = letter;
      // console.log(dashArr);
		}
	}
	document.getElementById("word").innerHTML = dashArr.join("");
	checkForWin(); // 
}

// If dashes array gets to -1, user wins the game.
function checkForWin() {
	if (dashArr.indexOf("_") === -1) {
		alert("There it is! " + word + " is the answer!");
		wins++;
		document.getElementById("wins").innerHTML = wins;
		initialize();
	}
}

document.onkeyup = function(evt) {
	if (!answered) {
		initialize();
		document.getElementById("word").innerHTML = hashmarks.split(",");
		console.log(word);
		answered = true;
	}
	else {
		startUp(evt.key);
	}
}

function background() {
	document.body.style.backgroundImage = "url('images/The-Juice-Strikes-Back.jpg')";
}
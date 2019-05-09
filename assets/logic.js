//UTILITY FUNCTIONS START 

var okLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

//1.0 - gameWords variable
var gameWords = ["choux", "biscuits", "millefeuille", "frangipane", "palvova", "meringue", "bread", "pies", "madaleines", "sponge"]

//so result paragraphs change
var result_p = document.querySelector(".result > p"); 

//SETTING UP GAME

//1.1 - randomWord function
var randomWord = function(gameWords) {
    var guessWord = gameWords[Math.floor(Math.random() * gameWords.length)];
    return guessWord;
};

//1.2 - isCorrectGuess function
var isCorrectGuess = function(word, letter) {
    for (var i = 0; i <= word.length; i++) {
    if (word[i] === letter) {
        return true;
     } 
    }
    return false;
}

//1.3 - getBlanks function
var getBlanks = function(word) {
    var blank = [];
    for (var i = 0; i < word.length; i++) {
        blank[i] = "_";
    }
    return blank; 
}

//1.4 - fillBlanks function
function fillBlanks(word, puzzleState, letter) {
    if(isCorrectGuess(word, letter)){
        for (var i = 0; i < word.length; i++) {
           if(word[i] === letter) {
               puzzleState[i] = letter;
           }   
        }
    }
   return puzzleState;
}

//END SETTING UP THE UTILITY FUNCTIONS 
//START GAME FUNCTION 

//1.5 - setupRound function
function setupRound(word) {
    var setUp = {
        word: word,
        guessesLeft: 9,
        wrongGuesses: [],
        puzzleState: getBlanks(word),
    }
    return setUp;
 }

 //1.6 - updateRound function
function updateRound(setUp, letter) {
    if (isCorrectGuess(setUp.word, letter) === false) {
        setUp.guessesLeft--;
        setUp.wrongGuesses.push(letter);
    }
    else {
        fillBlanks(setUp.word, setUp.puzzleState, letter)
    }
    return setUp;
}

//1.7 - hasWon function
function hasWon(puzzleState) {
    for (var i = 0; i < puzzleState.length; i++) {
    if (puzzleState[i] === "_") {
        return false;
     } 
    }
    return true;
}

//1.8 - hasLost function
function hasLost(guessesLeft) {
    if (guessesLeft === 0) {
        return true;
    }
    return false;
}

//1.9 - isEndOfRound function
function isEndOfRound(setUp) {
    if (setUp.guessesLeft === 0) {
    return true;
}
    if (hasWon(setUp.puzzleState)) {
        return true;
    }
return false;
}

//1.10 - setupGame function
function setupGame(gameWords, wins, losses) {
    var game = {
        words: gameWords,
        wins: wins,
        losses: losses,
        round: setupRound(randomWord(gameWords)),   
        }
    return game;
 }

 //1.11 - startNewRound function
function startNewRound(game) {
    var puzzleState = game.round.puzzleState;
    if (hasWon(puzzleState) === true) {
       game.wins++;
       alert("You won! You knew the word was " + game.round.word + "! Prue would be proud!")
       //changing result paragraph
       result_p.innerHTML = "You won! You're on 🔥🔥🔥";
    }
    else {
        game.losses++;
        alert("Sorry, mate, but the word was " + game.round.word + ". Soggy bottoms. Give it another go?")
        //changing result paragraph 
        result_p.innerHTML = "Better luck this time!";
    }
    return game;
}
var myGame = setupGame(gameWords, 0, 0);
console.log(myGame);
//END GAME FUNCTION 

//PAGE SET UP

/*need these elements in the page:
puzzle-state -- have it 
wrong-guesses -- have it
guesses-left -- have it 
win-counter -- have it 
loss-counter -- have it 
*/

//adding the _ _ _ _ for the puzzle length on page 
var puzzle = document.getElementById("puzzle-state");
puzzle.innerHTML = myGame.round.puzzleState.join(" ");

// Event function to input and output user experience
var keyPressed;
document.onkeyup = function (event) {

    keyPressed = event.key.toLowerCase() 
    console.log("The letter " + keyPressed + " was pressed");
        isCorrectGuess(myGame.round.word, keyPressed);
        fillBlanks(myGame.round.word, myGame.round.puzzleState, keyPressed);
        updateRound(myGame.round, keyPressed);
        hasWon(myGame.round.puzzleState);
        hasLost(myGame.round.guessesLeft);

    if (isEndOfRound(myGame.round)){
        myGame = startNewRound(myGame);
        myGame.round = setupRound(randomWord(gameWords));
    }
//HTML CHANGING AREA
//SETTING UP PUZZLE
    document.getElementById("puzzle-state").innerText = myGame.round.puzzleState.join(" ");

//WRONG GUESSES
    document.getElementById("wrong-guesses").innerText = myGame.round.wrongGuesses.join(" ");

//WIN STUFF
// shows  updated number of wins
    document.getElementById("win-counter").innerText = myGame.wins;

//LOSS STUFF
    document.getElementById("loss-counter").innerText = myGame.losses;


//LIVES LEFT STUFF
    document.getElementById("guesses-left").innerText = myGame.round.guessesLeft;
}

//RESET THE GAME
function gameReset() {
    myGame.round.guessesLeft = 0;
    hasLost(myGame.round.guessesLeft);

    if (isEndOfRound(myGame.round)) {
        myGame = startNewRound(myGame);
        myGame.round = setupRound(randomWord(gameWords));
    }
}



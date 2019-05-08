//logic2 to go with index2 and style2 to try out a next user interface
//UTILITY FUNCTIONS START 
//LETTERS FOR BUTTONS & WORDS FOR GAME
// var wordLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var gameWords = ["choux", "biscuits", "millefeuille", "frangipane", "palvova", "meringue", "bread", "pies", "madaleines", "sponge"]
var result_p = document.querySelector(".result > p"); //so the results paragraph changes


//SETTING UP GAME
var randomWord = function(gameWords) {
    var guessWord = gameWords[Math.floor(Math.random() * gameWords.length)];
    return guessWord;
};

var isCorrectGuess = function(word, letter) {
    for (var i = 0; i <= word.length; i++) {
    if (word[i] === letter) {
        return true;
     } 
    }
    return false;
}

var getBlanks = function(word) {
    var answer = [];
    for (var i = 0; i < word.length; i++) {
        answer[i] = "_";
    }
    return answer; 
}

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

function setupRound(word) {
    var object = {
        word: word,
        guessesLeft: 9,
        wrongGuesses: [ ],
        puzzleState: getBlanks(word),
    }
    return object;
 }

function updateRound(object, letter) {
    if (isCorrectGuess(object.word, letter) === false) {
        object.guessesLeft--;
        object.wrongGuesses.push(letter);
    }
    else {
        fillBlanks(object.word, object.puzzleState, letter)
    }
    return object;
}

function hasWon(puzzleState) {
    for (var i = 0; i < puzzleState.length; i++) {
    if (puzzleState[i] === "_") {
        return false;
     } 
    }
    return true;
}

function hasLost(guessesLeft) {
    if (guessesLeft === 0) {
        return true;
    }
    return false;
}

function isEndOfRound(object) {
    if (object.guessesLeft === 0) {
    return true;
}
    if (hasWon(object.puzzleState)) {
        return true;
    }
return false;
}

function setupGame(gameWords, wins, losses) {
    var game = {
        words: gameWords,
        wins: wins,
        losses: losses,
        round: setupRound(randomWord(gameWords)),   
        }
    return game;
 }

function startNewRound(game) {
    var puzzleState = game.round.puzzleState;
    if (hasWon(puzzleState) === true) {
       game.wins++;
       alert("You won! You knew the word was " + game.round.word + "! Prue would be proud!")
       //i want to figure out how to insert this on the page and not have an alert
       result_p.innerHTML = "You won! You're on 🔥🔥🔥";
    }
    else {
        game.losses++;
        alert("Sorry, mate, but the word was " + game.round.word + ". Soggy bottoms. Try again?")
        //i want to figure out how to insert this on the page and not have an alert
        result_p.innerHTML = "Sorry, mate, better luck this try!";
    }
    return game;
}
var myGame = setupGame(gameWords, 0, 0);

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


function gameReset() {
    myGame.round.guessesLeft = 0;
    hasLost(myGame.round.guessesLeft);

    if (isEndOfRound(myGame.round)) {
        myGame = startNewRound(myGame);
        myGame.round = setupRound(randomWord(gameWords));
    }
}



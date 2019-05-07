var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
/*
GAME LOGIC PART 1
1. word array = gameWords --- DONE & PASSES
2. randomWord function --- DONE  & PASSES
3. isCorrectGuess function --- DONE & PASSES
4. getBlanks function --- DONE & PASSES 
5. var blanks = getBlanks(word) --- DONE & PASSES 
6. fillBlanks --- DONE & PASSES 
*/

//UTILITY FUNCTIONS START 
//word array -- setting up 10 baked good word choices. Longest word 12 letters & shortest 4.
var gameWords = ["choux", "biscuits", "millefeuille", "frangipane", "palvova", "meringue", "bread", "pies", "madaleines", "sponge"]

//randomWord function -- making the words generate 
var randomWord = function(gameWords) {
    var guessWord = gameWords[Math.floor(Math.random() * gameWords.length)];
    return guessWord;
};

//isCorrectGuess function -- determing if words are right  
var isCorrectGuess = function(word, letter) {
    for (var i = 0; i <= word.length; i++) {
    if (word[i] === letter) {
        return true;
     } 
    }
    return false;
}
// getBlanks function -- generating blanks per letter
//changed ansWordArr to answer CHANGE THIS LATER AND REMOVE IT 
var getBlanks = function(word) {
    var answer = [];
    for (var i = 0; i < word.length; i++) {
        answer[i] = "_";
    }
    return answer; 
}

// blank replaced with the correct letter
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

/*GAME LOGIC PART 2
1. setupRound function --- DONE & PASS
2. updateRound function --- DONE & PASS 
3. hasWon function --- TO DO
4. hasLost function --- TO DO
5. isEndOfRound function --- TO DO
6. setupGame function --- TO DO
7. startNewRound function --- TO DO 
*/  

//START GAME FUNCTION 

//setupRound function & returned object-- sets up the game round 
function setupRound(word) {
    var object = {
        word: word,
        guessesLeft: 9,
        wrongGuesses: [],
        puzzleState: getBlanks(word),
    }
    return object;
 }


// updateRound -- updates the round based on the guessed
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

// hasWon -- logs whether the user won
function hasWon(puzzleState) {
    for (var i = 0; i < puzzleState.length; i++) {
    if (puzzleState[i] === "_") {
        return false;
     } 
    }
    return true;
}

// hasLost -- determines if the user has lost 
function hasLost(guessesLeft) {
    if (guessesLeft === 0) {
        return true;
    }
    return false;
}

//isEndOfRound -- function for notification that the round is over 
function isEndOfRound(object) {
    if (object.guessesLeft === 0) {
    return true;
}
    if (hasWon(object.puzzleState)) {
        return true;
    }
return false;
}

//setupGame function -- setting up the game 
function setupGame(gameWords, wins, losses) {
    var game = {
        words: gameWords,
        wins: wins,
        losses: losses,
        round: setupRound(randomWord(gameWords)),   
        }
    return game;
 }

//startNewRound function -- setting up a new round after a previous round 
function startNewRound(game) {
    var puzzleState = game.round.puzzleState;
    if (hasWon(puzzleState) === true) {
       game.wins++;
       alert("You won! You knew the word was " + game.round.word + "! Prue would be proud!")
       //i want to figure out how to insert this on the page and not have an alert
    }
    else {
        game.losses++;
        alert("Sorry, mate, but the word was " + game.round.word + ". Paul wouldn't be pleased.")
        //i want to figure out how to insert this on the page and not have an alert
    }
    return game;
}

//myGame var so that this can be added to the contents of the page
var myGame = setupGame(gameWords, 0, 0);

// //creating letter buttons 
//       for (var i = 0; i < alphabet.length; i++) {
//         var button = document.createElement('button');
//         button.textContent = alphabet[i];
//         button.setAttribute('class', 'letter');
//         button.setAttribute('id', 'letter_' + alphabet[i]);
//         document.getElementById('buttons').appendChild(button);
//         // button.setAttribute('onclick', 'clickme("' + allowedchars[i] + '")');     //onclick in html trick...works!
//         document.getElementById('letter_' + alphabet[i]).onclick = getClickCallback(alphabet[i]);     //solution without the onclick
//     }

//END GAME FUNCTION 

//PAGE SET UP

/*need these elements in the page:
puzzle-state -- have it 
wrong-guesses -- hover button/stuff works maybe? 
guesses-left -- have it 
win-counter -- have it 
loss-counter -- have it 
*/

//adding the _ _ _ _ for the puzzle length on page 
var puzzle = document.getElementById("puzzle-state");
puzzle.innerHTML = myGame.round.puzzleState.join(" ");

// console.log(puzzle);

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

// determines win or not and guesses left
    if (isEndOfRound(myGame.round)){
        myGame = startNewRound(myGame);
        myGame.round = setupRound(randomWord(gameWords));
    }

// Uses the ramdom word and displays the empty blanks
    document.getElementById("puzzle-state").innerText = myGame.round.puzzleState.join(" ");

// shows the letters that are wrong guesses
    document.getElementById("wrong-guesses").innerText = myGame.round.wrongGuesses;

//WIN STUFF
// shows  updated number of wins
    document.getElementById("win-counter").innerText = myGame.wins;

//First win-counter to 0
    document.getElementById("win-counter").innerHTML.to.equal("0");

//LOSS STUFF
// shows the updated object for total losses
    document.getElementById("loss-counter").innerText = myGame.losses;
//First loss-counter to 0
    document.getElementById("loss-counter").innerHTML.to.equal("0");


//LIVES LEFT STUFF
// shows updated number of guesses left
    document.getElementById("guesses-left").innerText = myGame.round.guessesLeft;

} // ------------ end of onclick event

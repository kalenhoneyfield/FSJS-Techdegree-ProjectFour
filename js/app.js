/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

// Create a new instance of the Game class 
// and add event listeners for the start button and onscreen keyboard buttons:
// Add a click event listener to the "Start Game" button which creates a new Game object 
//     and starts the game by calling the startGame() method.
// Add click event listeners to each of the onscreen keyboard buttons, 
//     so that clicking a button calls the handleInteraction() method on the Game object. 
//     Event delegation can also be used in order to avoid having to add an event listener 
//     to each individual keyboard button. 
//     Clicking the space between and around the onscreen keyboard buttons 
//     should not result in the handleInteraction() method being called.

// Resetting the gameboard between games.
// After a game is completed, the gameboard needs to be reset so that clicking the "Start Game" button will successfully load a new game.
// Remove all li elements from the Phrase ul element.
// Enable all of the onscreen keyboard buttons and update each to use the key CSS class, and not use the chosen or wrong CSS classes.
// Reset all of the heart images (i.e. the player's lives) in the scoreboard at the bottom of the gameboard to display the liveHeart.png image.

const startResetGamebtn = document.getElementById('btn__reset')
const onScreenKeyboard = document.querySelectorAll('.key')
const overlay = document.getElementById('overlay')
let game
const bgArray = ['five', 'four', 'three', 'two', 'one']

startResetGamebtn.addEventListener('click', () => {
    game = null
    game = new Game()
    game.startGame()
})

//event listen for the on screen keyboard
onScreenKeyboard.forEach(key =>{
    key.addEventListener('click', (e) => {
        const letter = e.target.innerText
        game.handleInteraction(letter)
    })
})

//add event listener for the keyboard
document.body.addEventListener('keyup', (e) => { 
    if(overlay.classList.contains('hidden')){ //if the overlay is hidden we should do something with the keys
        const regex = new RegExp(/(^Key)([A-Z])/) //we only care about the letters
        if(regex.test(e.code)){
            const letter = e.code.replace(regex, '$2').toLowerCase()
            game.handleInteraction(letter)
            
        }
    }
    else if(!overlay.classList.contains('hidden')){ //if the overlay is showing, then allow the user to start the game with the enter key
        if(e.code === 'Enter'){
            game = null
            game = new Game()
            game.startGame()
        }
    }
    
    
})

//play a predetermined mp3 file
const playSound = (status, volume) => {
    const audio = {
        typing: 'typewriter.mp3',
        typingDud: 'typewriter-dud.mp3',
        win: 'Ta-da-orchestra-fanfare.mp3',
        lose: 'Sad-trombone.mp3',
    }
    let snd = new Audio("audio/" + audio[status]);
    snd.volume = volume;
    snd.play();
}

/*
Code derived from the function published at https://animate.style/
This is the site that the animate.css is now hosted at
*/
const addRemoveAnimation = (elem, animationName, callback) =>
    
    new Promise((resolve, reject) => {

    elem.classList.add(`animated`, animationName) 

    const handleAnimationEnd = () => {
        elem.classList.remove(`animated`, animationName)
        elem.removeEventListener('animationend', handleAnimationEnd)
        
        callback ? callback() : false //if we have a callback, run it, otherwise ignore
        resolve('Animation ended')
    }

    elem.addEventListener('animationend', handleAnimationEnd)
});
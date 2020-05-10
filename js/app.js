/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const startResetGamebtn = document.getElementById('btn__reset')
const onScreenKeyboard = document.querySelectorAll('.key')
const overlay = document.getElementById('overlay')
let game //we'll use this to hold the new Game object
const bgArray = ['five', 'four', 'three', 'two', 'one'] //an array of background styles 

startResetGamebtn.addEventListener('click', () => {
    game = null //regardless of whther we are starting a brand new game, or just finished the last one, lets make sure we're good
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

        const hasAnimationEnded = () => {
            elem.classList.remove(`animated`, animationName)
            elem.removeEventListener('animationend', hasAnimationEnded)
            
            callback ? callback() : false //if we have a callback, run it, otherwise ignore
            resolve('Animation ended')
        }

        elem.addEventListener('animationend', hasAnimationEnded)
});
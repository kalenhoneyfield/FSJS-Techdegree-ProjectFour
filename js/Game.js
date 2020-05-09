/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor(){
        this.missed = 0
        this.phrases = [
            {phrase: 'fencepost error'},
            {phrase: 'This is Sparta'},
            {phrase: 'Infinite Monkey Theorem'},
            {phrase: 'Close But No Cigar'},
            {phrase: 'Number five is alive'},
        ]
        this.activePhrase = null //to hold the string for the current active phrase
        this.gamePhrase = null //to hold the active Phrase object for $this game
    }

    startGame(){
        // hides the start screen overlay, calls the getRandomPhrase() method, 
        // and sets the activePhrase property with the chosen phrase. 
        // It also adds that phrase to the board by calling 
        // the addPhraseToDisplay() method on the active Phrase object.
        this.resetGame()
        const overlay = document.getElementById('overlay')
        overlay.classList.add('animated', 'flipOutX')
        this.activePhrase = this.getRandomPhrase()
        this.gamePhrase = new Phrase(this.activePhrase)
        this.gamePhrase.addPhraseToDisplay()
    } 

    getRandomPhrase(){ 
        // this method randomly retrieves one of the phrases stored 
        // in the phrases array and returns it. 
        const index = Math.floor(Math.random() * this.phrases.length)
        return this.phrases[index].phrase
    }
    
    handleInteraction(letter){
        // this method controls most of the game logic. 
        // It checks to see if the button clicked by the player matches a letter in the phrase, 
        // and then directs the game based on a correct or incorrect guess. This method should:

        // Disable the selected letter’s onscreen keyboard button.
        // If the phrase does not include the guessed letter, 
        //     add the wrong CSS class to the selected letter's keyboard button and call the removeLife() method.
        // If the phrase includes the guessed letter, 
        //     add the chosen CSS class to the selected letter's keyboard button, 
        //     call the showMatchedLetter() method on the phrase, 
        //     and then call the checkForWin() method. 
        //     If the player has won the game, also call the gameOver() method.
        const onScreenKeyboard = document.querySelectorAll('.key')
        let selectedKey = null
        onScreenKeyboard.forEach(key => { //figure out which key was press or selected
            if(key.innerText === letter){
                selectedKey = key //assign the DOM elem to the key
            }
        })
        if( this.gamePhrase.checkLetter(letter) ){
            selectedKey.classList.add('chosen', 'animated', 'bounceIn')
            this.gamePhrase.showMatchedLetter(letter)
        }
        else{
            selectedKey.classList.add('wrong', 'animated', 'wobble')
            this.removeLife()
        }
    }

    removeLife(){
        // this method removes a life from the scoreboard, 
        // by replacing one of the liveHeart.png images with a lostHeart.png image 
        // (found in the images folder) and increments the missed property. 
        // If the player has five missed guesses 
        // (i.e they're out of lives), then end the game by calling the gameOver() method.
        const tries = document.querySelectorAll('.tries')
        if(this.missed < 4){
            const index = this.missed
            tries[index].classList.add('animated', 'hinge') //sad heart
            setTimeout(() => { //a timeout to allow enough time for the animation to occur
                tries[index].firstChild.src = 'images/lostHeart.png'
                tries[index].classList.remove('animated', 'hinge')
            }, 2000);
            console.log(this.missed)
            this.missed++
        }
        else{
            this.gameOver()
        }
    }

    checkForWin(){ 
        // this method checks to see if the player has revealed all of the letters in the active phrase. 
    }

    gameOver(){ 
        // this method displays the original start screen overlay, 
        // and depending on the outcome of the game, 
        // updates the overlay h1 element with a friendly win or loss message, 
        // and replaces the overlay’s start CSS class with either the win or lose CSS class.
        
        // const overlay = document.getElementById('overlay')
        // overlay.classList.remove('animated', 'flipOutX')
        const ani = document.querySelectorAll('.animated')
        ani.forEach(elem => {
            elem.classList.remove('animated', 'flipOutX', 'hinge', 'hinge', 'wobble', 'bounceIn' )
        })
    }

    resetGame(){
        //clear the board and start fresh
        const letters = document.querySelectorAll('.letter')
        letters.forEach(item => {
            item.remove()
        })
        const onScreenKeyboard = document.querySelectorAll('.key')
        onScreenKeyboard.forEach(key => {
            key.classList.remove('wrong', 'chosen')
        })
        const tries = document.querySelectorAll('.tries')
        tries.forEach(item => {
            item.firstChild.src = 'images/liveHeart.png'
        })
        
        this.missed = 0
    }
}
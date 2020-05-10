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
        this.gameWin = null //did we win?
    }

    startGame(){
        // hides the start screen overlay, calls the getRandomPhrase() method, 
        // and sets the activePhrase property with the chosen phrase. 
        // It also adds that phrase to the board by calling 
        // the addPhraseToDisplay() method on the active Phrase object.
        this.resetGame()
        const overlay = document.getElementById('overlay')
        addRemoveAnimation(overlay, 'flipOutX', ()=>{
            overlay.classList.add('hidden')
        })
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
        if(selectedKey.classList.contains('disabled')){ //check is we have already used this letter
            playSound('typingDud', 0.5)
            return null
        }
        else if( this.gamePhrase.checkLetter(letter) ){
            playSound('typing', 1)
            selectedKey.classList.add('chosen','disabled')
            addRemoveAnimation(selectedKey, 'bounceIn')
            
            this.gamePhrase.showMatchedLetter(letter)
            // this.checkForWin()
            if( this.checkForWin() ){
                this.gameOver()
            }
        }
        else{
            playSound('typing', 1)
            selectedKey.classList.add('wrong', 'disabled')
            addRemoveAnimation(selectedKey, 'wobble')
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
            addRemoveAnimation(tries[index], 'hinge', ()=>{
                tries[index].firstChild.src = 'images/lostHeart.png'
            })
            this.missed++
            document.body.className = bgArray[this.missed]
        }
        else{
            this.gameOver()
        }
    }

    checkForWin(){ 
        // this method checks to see if the player has revealed all of the letters in the active phrase. 
        let winning = true
        const phraseLetters = document.getElementById('phrase').getElementsByTagName('ul')[0].querySelectorAll('.letter')
        phraseLetters.forEach(item => {
            if(item.classList.contains('hide')){
                winning = false
            }
        })
        this.gameWin = winning
        return winning

    }

    gameOver(){ 
        // this method displays the original start screen overlay, 
        // and depending on the outcome of the game, 
        // updates the overlay h1 element with a friendly win or loss message, 
        // and replaces the overlay’s start CSS class with either the win or lose CSS class.
        // ready = false
        startResetGamebtn.disabled = true //disable the start game button long enough for animations to complete, this is really only needed for the edge case where someone is spamming through games
        setTimeout(()=>{
            startResetGamebtn.disabled = false
        }, 2000)
        const overlay = document.getElementById('overlay')
        const msg = document.getElementById('game-over-message')
        overlay.classList.remove('hidden')
        overlay.style.zIndex = 99 //animate.css causes some animations to still be visiable through the overlay lets fix that
        if(this.gameWin){
            addRemoveAnimation(overlay, 'rollIn')
            msg.innerHTML = `Congratulations <br> You guessed <br> <span> ${this.activePhrase} </span> <br> correctly`
            overlay.classList.remove('start')
            overlay.classList.add('win')
            playSound('win', 1)
        }
        else{
            addRemoveAnimation(overlay, 'lightSpeedIn')
            msg.innerHTML = `Doh! <br> <span> ${this.activePhrase} </span><br> was the correct phrase`
            overlay.classList.remove('start')
            overlay.classList.add('lose')
            playSound('lose', 1)
        }
        
        
    }

    resetGame(){
        //clear the board and start fresh
        //this method is used to ensure that regardless of how the user gets to the start new game portion, there is consistency across use cases
        const letters = document.querySelectorAll('.letter')
        letters.forEach(item => {
            item.remove()
        })
        const onScreenKeyboard = document.querySelectorAll('.key')
        onScreenKeyboard.forEach(key => {
            key.classList.remove('wrong', 'chosen', 'disabled')
        })
        const tries = document.querySelectorAll('.tries')
        tries.forEach(item => {
            item.firstChild.src = 'images/liveHeart.png'
        })
        overlay.classList.remove('win','lose')
        overlay.classList.add('start')
        this.missed = 0
        document.body.className = bgArray[this.missed]
    }

}
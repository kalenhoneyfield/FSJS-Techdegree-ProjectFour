/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor(){
        this.missed = 0
        this.phrases = [ //why only five? :-/
            {phrase: 'fencepost error'},
            {phrase: 'This is Sparta'},
            {phrase: 'Infinite Monkey Theorem'},
            {phrase: 'Close But No Cigar'},
            {phrase: 'Number five is alive'},
        ]
        this.activePhrase = null //to hold the active Phrase object for $this game
        this.gamePhrase = null //to hold the string for the current active phrase
        this.gameWin = null //did we win?
    }

    startGame(){
        this.resetGame() //lets just clear up anything that may be on the board
        const overlay = document.getElementById('overlay')
        addRemoveAnimation(overlay, 'flipOutX', ()=>{
            overlay.classList.add('hidden')
        })
        this.gamePhrase = this.getRandomPhrase()
        this.activePhrase = new Phrase(this.gamePhrase)
        this.activePhrase.addPhraseToDisplay()
    } 

    getRandomPhrase(){ 
        const index = Math.floor(Math.random() * this.phrases.length)
        return this.phrases[index].phrase
    }
    
    handleInteraction(letter){       
        const onScreenKeyboard = document.querySelectorAll('.key')
        let selectedKey = null
        onScreenKeyboard.forEach(key => { //figure out which key was pressed or selected
            if(key.innerText === letter){
                selectedKey = key //assign the DOM elem to the key
            }
        })
        if(selectedKey.classList.contains('disabled')){ //check is we have already used this letter
            playSound('typingDud', 0.5)
            return null
        }
        else if( this.activePhrase.checkLetter(letter) ){
            playSound('typing', 1)
            selectedKey.classList.add('chosen','disabled')
            addRemoveAnimation(selectedKey, 'bounceIn')
            
            this.activePhrase.showMatchedLetter(letter)
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
        const tries = document.querySelectorAll('.tries')
        if(this.missed < 4){ //we start at zero, so 4 is the last heart
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
        let winning = true //default to true, everyone can be a winner!!
        const phraseLetters = document.getElementById('phrase').getElementsByTagName('ul')[0].querySelectorAll('.letter')
        phraseLetters.forEach(item => {
            if(item.classList.contains('hide')){ //if any of the letters are still hidden then we haven't won
                winning = false
            }
        })
        this.gameWin = winning
        return winning

    }

    gameOver(){ 
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
            msg.innerHTML = `Congratulations <br> You guessed <br> <span> "${this.gamePhrase}" </span> <br> correctly`
            overlay.classList.remove('start')
            overlay.classList.add('win')
            playSound('win', 1)
        }
        else{
            addRemoveAnimation(overlay, 'lightSpeedIn')
            msg.innerHTML = `Doh! <br> <span> "${this.gamePhrase}" </span><br> was the correct phrase`
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
        const spaces = document.querySelectorAll('.space')
        spaces.forEach(item => {
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
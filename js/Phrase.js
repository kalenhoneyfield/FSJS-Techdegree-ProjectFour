/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
    constructor(phrase){
        this.phrase = phrase.toLowerCase()
    }

    addPhraseToDisplay(){
        const phaseUl = document.getElementById('phrase').getElementsByTagName('ul')[0]
        const phraseArray = this.phrase.split('') //split the phrase into an array of letters and spaces 

        phraseArray.forEach(letter => { //create an li for each letter/space in the array then add it to the DOM
            const elemLi = document.createElement('li')
            elemLi.innerHTML = letter
            if(/\s/.test(letter)){
                elemLi.classList.add('space')
            }
            else{
                elemLi.classList.add('letter', 'hide', letter)
            }
            phaseUl.append(elemLi)
        })

    }

    checkLetter(test){
        const letterMaybe = document.querySelectorAll(`.${test.toLowerCase()}`) //in the very unlikely chance than an uppercase character slips in here, lets handle that gracefully
        return letterMaybe.length > 0 ? true : false
    }

    showMatchedLetter(letter){
        const letterClass = document.querySelectorAll(`.${letter.toLowerCase()}`) //like the checkLetter function, just in case
        letterClass.forEach(item => {
            item.classList.remove('hide')
            addRemoveAnimation(item, 'rubberBand')
            item.classList.add('show')
        })
        
    }

 }
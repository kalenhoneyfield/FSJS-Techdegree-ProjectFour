/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
    constructor(phrase){
        this.phrase = phrase.toLowerCase()
    }

    addPhraseToDisplay(){
        // this adds letter placeholders to the display when the game starts. 
        // Each letter is presented by an empty box, one li element for each letter. 
        // See the example_phrase_html.txt file for an example of what the rendered 
        // HTML for a phrase should look like when the game starts, 
        // including any id or class attributes needed. When the player correctly 
        // guesses a letter, the empty box is replaced with the matched letter 
        // (see the showMatchedLetter() method below). 
        // Make sure the phrase displayed on the screen uses the letter CSS class 
        // for letters and the space CSS class for spaces.

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
        // checks to see if the letter selected by the player matches a letter in the phrase.
        const letterMaybe = document.querySelectorAll(`.${test.toLowerCase()}`)
        return letterMaybe.length > 0 ? true : false
    }

    showMatchedLetter(letter){
        // reveals the letter(s) on the board that matches the player's selection. 
        // To reveal the matching letter(s), select all of the letter DOM elements 
        // that have a CSS class name that matches the selected letter and replace 
        // each selected element's hide CSS class with the show CSS class.
        const letterClass = document.querySelectorAll(`.${letter.toLowerCase()}`)
        letterClass.forEach(item => {
            item.classList.remove('hide')
            addRemoveAnimation(item, 'rubberBand')
            item.classList.add('show')
        })
        
    }

 }
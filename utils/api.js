import { AsyncStorage } from 'react-native'

export const DECK_STORAGE = 'Flashcards:decks'

const decks = {
    React: {
        title: 'React',
        questions: [
        {
            question: 'What is React?',
            answer: 'A library for managing user interfaces',
            correctAns: 'true'
        },
        {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event',
            correctAns: 'true'
        }
        ]
    },
    Python: {
        title: 'Python',
        questions: []
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
        {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.',
            correctAns: 'true'
        }
        ]
    }
    
    
}
export const getData = () =>{
    return decks;
}

export function getDecks (){
    AsyncStorage.removeItem(DECK_STORAGE)
    return AsyncStorage.getItem(DECK_STORAGE)
        .then(results =>{
            if (results === null){
                AsyncStorage.setItem(DECK_STORAGE, JSON.stringify(decks))
                return decks
            }else{
                return JSON.parse(results)
            }
        })
}

export function saveNewDeck (title) {
    return getDecks()
        .then((decks) => {
            return {
            ...decks,
            [title]: {
                title,
                questions: [],
            }
            }
        })
        .then((newDecks) => {
            AsyncStorage.setItem(DECK_STORAGE, JSON.stringify(newDecks))
        })
  }

  export function addCardToDeck(card, title){
      getDecks()
        .then((decks) =>{
            return{
                ...decks,
                [title]:{
                    questions: decks[title].questions.concat([card])
                }
            }
        })
        .then((newDecks) =>{
            AsyncStorage.setItem(DECK_STORAGE, JSON.stringify(newDecks))
        })
  }
import { ADD_DECK, RECEIVE_DECKS, ADD_CARD, CLEAR_DECKS } from '../actions';

function decks (state={}, action){
    switch (action.type){
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK :
            const { deck } = action
            return {
                ...state,
                decks:{
                    ...state.decks,
                    [deck.title]: deck
                }
            }
        case ADD_CARD:
            const { card, title } = action
            return{
                ...state,
                decks:{
                    ...state.decks,
                    [title]:{
                        title: title,
                        questions: state.decks[title].questions.concat([card])
                    }
                }
            }
        case CLEAR_DECKS:
            return {
                ...state,
                decks: {},
            }
        default:
            return state
    };
};

export default decks;
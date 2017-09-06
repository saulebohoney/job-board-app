import reducer from '../reducers';
import * as actions from '../actions';

const initialState = {
    currentUser:null,
    getUser: false, //If user tries to use an access token get them
    error: null, //If user has bad credentials reject them
    jobs:[],
    job:null,
    loading:false
};

// const dummyState = {
//     currentUser: '59a714e5b61dcf1da3c8d7ae',
//     getUser: true, //If user tries to use an access token get them
//     error: null, //If user has bad credentials reject them
//     jobs:[
//         {
//             'user': '59a714e5b61dcf1da3c8d7ae',
//             'id': '59a8b0d6485cba2c0741dcb5',
//             'position': 'example3',
//             'JobDescription': 'example',
//             'Company': 'example',
//             'NetworkingContact': 'example',
//             'Applied': 'example',
//             'LastContacted': 'example',
//             'Link': 'example',
//             'ResumeUsed': 'example',
//             'Notes': 'example'
//         }
//     ],
//     job:'59a8b0d6485cba2c0741dcb5',
//     loading:false
// };

describe('reducerBaseCases', () => {
    it('sets the initialState when nothing is passed in', () => {
        const state = reducer(undefined, {type: '_UNKNOWN'});
        expect(state).toEqual(initialState);
    });

    it('returns the state when action is unknown and state is given', () => {
        const currentState = {};
        const state = reducer(currentState, {type: ''});
        expect(state).toEqual(currentState);
    });
});


// describe('newGame()',() => {
//     it ('should start the newGame',() =>{
//         const currentState = {
//             guesses: [3,78,90],
//             feedback: 'Make your guess!',
//             correctAnswer: 50,
//             showInfoModal: true
//         };
//         const state=reducer(currentState,actions.newGame(50));
//         expect(state).toEqual(initialState);
//     });
// });

// describe('makeGuess()', () => {
//     it('should not make a guess with invalid input', () => {
//         const currentState = Object.assign({}, dummyState);

//         const expectedState = Object.assign(
//             {}, 
//             currentState, 
//             {feedback: 'Please enter a valid number'});
//         const guessWithNotNumber = 
//                 reducer(currentState, actions.makeGuess('foobar'));
        
//         expect(guessWithNotNumber).toEqual(expectedState);
//     });
    
// });

// describe('makeGuess()', () => {
//     it('should give the correct feedback and updates the state when the valid guess is made', () => {
//         const currentState = Object.assign({}, dummyState);
//         const usersGuess=100;
//         const expectedState = Object.assign(
//             {}, 
//             currentState,
//             {guesses:[...currentState.guesses,usersGuess],feedback: 'You\'re Ice Cold...'});
//         const guessWithValidNumber = 
//                 reducer(currentState, actions.makeGuess(usersGuess));
        
//         expect(guessWithValidNumber).toEqual(expectedState);
//     });
    
//});
import _ from 'lodash';
import { 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
 } from "../actions/types";

 export default (state = {}, action) => {
     switch (action.payload) {
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') }
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload } // action.payload = response.data
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        default: 
            return state;
     }
 }

// Array-based approach
// const streamReducer = (state = [], action) => {
//     switch (action.type) {
//         case EDIT_STREAM:
//             return state.map(stream => {
//                 if (stream.id === action.payload.id) {
//                     return action.payload;
//                 } else {
//                     return stream;
//                 }
//             });
//         default:
//             return state;
//     }
// }

// Object-based approach
// const streamReducer = (state = {}, action) => {
//     switch (action.type) {
//         case EDIT_STREAM:
//             Method 1
//             const newState = { ...state };
//             newState[action.payload.id] = action.payload;
//             return newState;

//             Method 2
//             return { ...state, [action.payload.id]: action.payload }; // Key interpolation
            
//             default:
//                 return state;
//     }
// };

// EXAMPLE
// const animalSounds = { cat: 'meow', dog: 'bark' };
// const animal = 'lion';
// const sound = 'roar';
// console.log({ ...animalSounds, [animal]: sound }); // { cat: 'meow', dog: 'bark', lion: 'roar' }
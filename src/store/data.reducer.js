import defaultState from './defaultState';

export default function dataReducer(state = defaultState, action) {
    switch (action.type) {
        case 'SET_DATA':
            return null;

        default:
            return state;
    }
}

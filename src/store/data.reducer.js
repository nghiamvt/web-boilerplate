import defaultState from './defaultState';
import handleObjectData from './data.reducer.object';

export default function dataReducer(state = defaultState, action) {
    switch (action.type) {
        case 'SET_DATA':
            return handleObjectData({ state, ...action });

        default:
            return state;
    }
}

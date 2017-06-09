import defaultState from './defaultState';
import { set, get, remove, toggle, merge } from '../utils/immutable';

export default function dataReducer(state = defaultState, action) {
    // TODO: using if/else not switch and shorten this implementation
    switch (action.type) {
        // TODO: throw error if path is empty
        case 'SET_DATA':
            return set(state, action.meta.path, action.payload);

        case 'GET_DATA':
            return get(state, action.meta.path);

        case 'REMOVE_DATA':
            return remove(state, action.meta.path);

        case 'TOGGLE_DATA':
            return toggle(state, action.meta.path);

        case 'MERGE_DATA':
            return merge(state, action.meta.path, action.payload);

        default:
            console.log('action.type :', action.type);
            return state;
    }
}

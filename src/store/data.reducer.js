import defaultState from './defaultState';

export default function dataReducer(state = defaultState, action) {
    switch (action.type) {
        case 'OBJECT_ADD':
            console.log('111111 :', 111111);
            return state;

        default:
            console.log('action.type :', action.type);
            return state;
    }
}

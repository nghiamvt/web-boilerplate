/**
 * Logs all actions and states after they are dispatched.
 */
// const logger2 = store => next => action => {
//     console.group(action.type);
//     console.info('dispatching 2: ', action);
//     const result = next(action);
//     console.log('next state 2: ', store.getState());
//     console.groupEnd(action.type);
//     return result;
// }
//
// export default logger2;

import createAction from '../utils/createAction';

// TODO: shorten this

const payloadCreator = ({ path, ...payload }) => payload;
const metaCreator = data => ({ path: data.path });

export const SET_DATA = createAction('SET_DATA', payloadCreator, metaCreator);
export const GET_DATA = createAction('GET_DATA', payloadCreator, metaCreator);
export const REMOVE_DATA = createAction('REMOVE_DATA', payloadCreator, metaCreator);
export const TOGGLE_DATA = createAction('TOGGLE_DATA', payloadCreator, metaCreator);

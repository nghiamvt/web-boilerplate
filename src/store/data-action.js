import createAction from '@/utils/create-action';

export const dataActionConst = {
  ADD_DATA: 'ADD_DATA',
  REMOVE_DATA: 'REMOVE_DATA',
  UPDATE_DATA: 'UPDATE_DATA',
};

const payloadCreator = (data) => data.payload;
const metaCreator = (data) => {
  if (!(data.meta || {})._path) throw Error('_path is required in meta');
  return {
    _type: data.type,
    ...data.meta,
  };
};

const createDataAction = (_type) => {
  return createAction(_type, payloadCreator, metaCreator);
};

export const ADD_DATA = createDataAction(dataActionConst.ADD_DATA);
export const REMOVE_DATA = createDataAction(dataActionConst.REMOVE_DATA);
export const UPDATE_DATA = createDataAction(dataActionConst.UPDATE_DATA);

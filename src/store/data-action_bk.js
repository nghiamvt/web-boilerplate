import createAction from '@/utils/create-action';

const dataPayloadCreator = ({ _value }) => _value;
const dataMetaCreator = data => {
  if (!data._path) throw Error('_path is required in dataAction');
  if (!data.type) throw Error('type is required in dataAction');
  return { _path: data._path };
};
const createDataAction = (type) => {
  return createAction(type, dataPayloadCreator, dataMetaCreator);
};

export const dataActionConst = {
  SET_DATA: 'SET_DATA',
  REMOVE_DATA: 'REMOVE_DATA',
  MERGE_DATA: 'MERGE_DATA',
  TOGGLE_DATA: 'TOGGLE_DATA',
};

export const SET_DATA = createDataAction(dataActionConst.SET_DATA);
export const REMOVE_DATA = createDataAction(dataActionConst.REMOVE_DATA);
export const MERGE_DATA = createDataAction(dataActionConst.MERGE_DATA);
export const TOGGLE_DATA = createDataAction(dataActionConst.TOGGLE_DATA);

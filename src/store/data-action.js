import createAction from '@/utils/create-action';
import invariant from '@/utils/invariant';
import { isEmpty } from '@/utils/is';

const dataPayloadCreator = ({ _value }) => _value;
const dataMetaCreator = data => {
	invariant(!isEmpty(data._path), '_path is required');
	return { _path: data._path };
};
const createDataAction = (type) => {
	return createAction(type, dataPayloadCreator, dataMetaCreator);
};

export const dataActionConst = {
	SET_DATA: 'SET_DATA',
	GET_DATA: 'GET_DATA',
	REMOVE_DATA: 'REMOVE_DATA',
	MERGE_DATA: 'MERGE_DATA',
	TOGGLE_DATA: 'TOGGLE_DATA',
};

export const SET_DATA = createDataAction(dataActionConst.SET_DATA);
export const REMOVE_DATA = createDataAction(dataActionConst.REMOVE_DATA);
export const GET_DATA = createDataAction(dataActionConst.GET_DATA);
export const MERGE_DATA = createDataAction(dataActionConst.MERGE_DATA);
export const TOGGLE_DATA = createDataAction(dataActionConst.TOGGLE_DATA);

import * as immutable from '@/utils/immutable';
import defaultState from './default-state';
import { dataActionConst } from './data-action';

const DataKey = '_DATA/';

export default function dataReducer(state = defaultState, action) {
  const rIndex = action.type.indexOf(DataKey);
  const type = (rIndex >= 0) ? action.type.substring(0, rIndex + (DataKey.length - 1)) : action.type;
  if (Object.keys(dataActionConst).includes(type)) {
    return immutable[type.toLowerCase()](state, action.meta._path, action.payload);
  }
  return state;
}

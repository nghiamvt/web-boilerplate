import * as immutable from '@/utils/immutable';
import defaultState from './default-state';
import { dataActionConst } from './data-action';

export default function dataReducer(state = defaultState, action) {
  const type = action.type.substring(0, action.type.indexOf('_DATA/') + 5);
  if (Object.keys(dataActionConst).includes(type)) {
    return immutable[type.toLowerCase()](state, action.meta._path, action.payload);
  }
  return state;
}

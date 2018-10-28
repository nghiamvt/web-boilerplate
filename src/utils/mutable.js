/* eslint-disable camelcase,no-param-reassign */
import { original } from 'immer';
import { pathToArray } from '@/utils/array';

function dataByPath(data, pathArr) {
  return pathArr.reduce((result, pathFragment) => {
    return result ? result[pathFragment] : data[pathFragment];
  }, null);
}

function add_data(draft, path, data) {
  const state = original(draft);
  const pathArr = pathToArray(path);
  // const pathData = dataByPath(state, pathArr);
  // draft.app.test.a = data;
  dataByPath(draft, pathArr, (d) => d = data);
  // if (Array.isArray(pathData)) {
  //   draftPath.push(data);
  //   // draft.app.test.push(data);
  // }
}

function remove_data() {

}

export default {
  add_data,
  remove_data,
};

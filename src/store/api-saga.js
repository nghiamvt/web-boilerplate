import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { apiActionRequest, apiActionSuccess, apiActionFailed } from './api-action';

/**
 * Call API
 * @param _path The location of Store which will be updated
 * @param type redux type
 * @param method POST/GET (apiGet/apiPost)
 * @param data The data sent to server
 * @param url The Url to call
 * @returns {*}
 */
function* callApi({ type, method = 'GET', data, pathUrl, baseUrl, headers = {} }) {
  if (!pathUrl || !type) throw new Error('path_url & type are required');
  yield put(apiActionRequest({ type }));
  const url = baseUrl ? `${baseUrl}/${pathUrl}` : pathUrl;

  try {
    const finalHeaders = Object.assign({}, { 'Content-Type': 'application/json' }, headers);
    // if (url.startsWith(BASE_API.BASE_URL) && local.get(APP.AUTH_TOKEN)) {
    //   completedHeaders.Payload = token;
    // }
    const response = yield call(axios, { url, data, method, headers: finalHeaders });
    if ([200, 201].includes(response.status)) {
      yield put(apiActionSuccess({ type }));
      return response.data;
    }
    console.error('callAPI (status): ', response);
    return { status: 0, message: response.statusText };
  } catch (e) {
    console.error('failed to callAPI: ', e);
    yield put(apiActionFailed({ type }));
    return { status: 0, message: e };
  }
}

function* apiGet(actions) {
  return yield callApi({ ...actions, method: 'GET' });
}

function* apiPost(actions) {
  return yield callApi({ ...actions, method: 'POST' });
}

export { apiGet, apiPost, callApi };

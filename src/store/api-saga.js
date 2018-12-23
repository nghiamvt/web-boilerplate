import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import {
  apiActionRequest,
  apiActionSuccess,
  apiActionFailed,
} from './api-action';

/**
 * Call API
 * @param type redux type
 * @param method POST/GET (apiGet/apiPost)
 * @param data The data sent to server
 * @param pathUrl The relative url to call
 * @param baseUrl The root url to call
 * @param headers customize http headers
 * @returns {*}
 */
function* callApi({
  type,
  method = 'GET',
  data,
  pathUrl,
  baseUrl,
  headers = {},
}) {
  if (!pathUrl || !type) throw new Error('pathUrl & type are required');
  yield put(apiActionRequest({ type }));
  const url = baseUrl ? `${baseUrl}/${pathUrl}` : pathUrl;

  try {
    const finalHeaders = Object.assign(
      {},
      { 'Content-Type': 'application/json' },
      headers,
    );
    // if (url.startsWith(BASE_API.BASE_URL) && local.get(APP.AUTH_TOKEN)) {
    //   completedHeaders.Payload = token;
    // }
    const response = yield call(axios, {
      url,
      data,
      method,
      headers: finalHeaders,
    });
    if ([200, 201].includes(response.status)) {
      yield put(apiActionSuccess({ type, payload: response.data }));
      return response.data;
    }
    console.error('callAPI (status): ', response);
    throw response.statusText;
  } catch (e) {
    console.error('failed to callAPI: ', e);
    yield put(apiActionFailed({ type, payload: e }));
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

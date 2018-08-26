import { call, put } from 'redux-saga/effects';
import apiAction from './api-action';

/**
 * Call API
 * @param _path The location of Store which will be updated
 * @param url The Url to call
 * @param method POST/GET (apiGet/apiPost)
 * @param data The data sent to server
 * @param options Use to customize fetch's options such as headers, body or credentials
 * @returns {*}
 */
function* callApi({ _path, url, method, data, options }) {
  if (!url) throw new Error('url required for ajax call');
  if (_path) yield put(apiAction.preFetch({ _path }));
  const fetchOptions = Object.assign({}, {
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  }, options, { method });
  let respond; // { status, result, error }
  try {
    const response = yield call(fetch, url, fetchOptions);
    const { status } = response;
    if (status === 200) {
      const json = yield response.json();
      respond = { status, result: json };
    } else {
      console.error('callAPI: ', response);
      respond = { status, error: response.statusText };
    }
    return respond;
  } catch (error) {
    console.error('callAPI: ', error);
    respond = { error };
    return respond;
  } finally {
    if (_path) {
      yield put(apiAction.postFetch({ _path, ...respond }));
    }
  }
}

function* apiGet(actions) {
  return yield callApi({ ...actions, method: 'GET' });
}

function* apiPost(actions) {
  return yield callApi({ ...actions, method: 'POST' });
}

export { apiGet, apiPost, callApi };

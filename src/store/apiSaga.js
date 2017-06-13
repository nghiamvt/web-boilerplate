import { call, put } from 'redux-saga/effects';
import apiAction from './apiAction';

function* callApi({ path, endpoint, method, data, options }) {
    if (!endpoint) throw new Error('Endpoint required for ajax call');
    if (path) yield put(apiAction.preFetch({ path }));
    const fetchOptions = Object.assign({}, {
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
        },
        body: data ? JSON.stringify(data) : {},
    }, options, { method });
    let respond; // { status, result, error }
    try {
        const response = yield call(fetch, endpoint, fetchOptions);
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
        if (path) {
            yield put(apiAction.postFetch({ path, ...respond }));
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

import { call, put } from 'redux-saga/effects';
import apiAction from './apiAction';

// TODO: test on IE and add polyfill (https://github.com/github/fetch)

export default function* callApi(action) {
    const { method, data, endpoint, path } = action;

    if (!endpoint) throw new Error('Endpoint required for ajax call');
    if (path) yield put(apiAction.preFetch(action));

    let respond; // { status, result, error }
    try {
        const response = yield call(fetch, `http://${window.location.origin}/${endpoint}`, {
            method: method || 'GET',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: data ? JSON.stringify(data) : undefined,
        });

        const { status } = response;
        const json = yield response.json();
        if (status >= 200 && status < 300) {
            respond = { status, result: json };
        } else {
            // eslint-disable-next-line
            console.error(status, json);
            respond = { status, error: json };
        }
        return respond;
    } catch (e) {
        // eslint-disable-next-line
        console.error('callApi: ', e);
        respond = { error: e };
        return respond;
    } finally {
        if (path) {
            yield put(apiAction.postFetch({ path, ...respond }));
        }
    }
}

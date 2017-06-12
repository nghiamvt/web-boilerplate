import { call, put } from 'redux-saga/effects';
import apiAction from './apiAction';

// TODO: handle to catch errors
export default function* callApi(action) {
    const { method, data, endpoint, path } = action;

    if (!endpoint) throw new Error('Endpoint required for ajax call');
    if (path) yield put(apiAction.preFetch(action));

    let respond; // { status, result, error }
    try {
        const response = yield call(fetch, endpoint, {
            method: method || 'GET',
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json',
            },
            body: data ? JSON.stringify(data) : {},
        });
        const { status } = response;
        if (status === 200) {
            const json = yield response.json();
            respond = { status, result: json };
        } else {
            // eslint-disable-next-line
            console.error('callAPI: ', status, response);
            respond = { status, error: response.statusText };
        }
        return respond;
    } catch (error) {
        // eslint-disable-next-line
        console.error('callAPI: ', error);
        respond = { error };
        return respond;
    } finally {
        if (path) {
            yield put(apiAction.postFetch({ path, ...respond }));
        }
    }
}

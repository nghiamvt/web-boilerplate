import { call, put, cancelled } from 'redux-saga/effects';
import ajaxAction from './ajax.action';

export default function* callApi(action) {
    const { method, data, endpoint, statePath } = action;

    if (!endpoint) throw new Error('Endpoint required for ajax call');

    if (statePath) yield put(ajaxAction.preAjax(action));

    try {
        const response = yield call(
            fetch,
            `http://${window.location.hostname}:3000/${endpoint}`,
            {
                method: method || 'GET',
                credentials: 'same-origin',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data ? JSON.stringify(data) : undefined,
            },
        );

        const { status } = response;
        const json = yield response.json();
        if (status === 200 || status === 304) {
            // Get data successful
            if (statePath) {
                yield put(ajaxAction.postAjax({
                    status,
                    statePath,
                    result: json,
                }));
            }
            return {
                result: json,
            };
        } else {
            if (status === 401) yield put(ajaxAction.unauthorized());
            // There are error from server
            if (statePath) {
                yield put(ajaxAction.postAjax({
                    status,
                    statePath,
                    error: json,
                }));
            }
            return {
                error: json,
            };
        }
    } catch (e) {
        // There are error when trying to connect
        if (statePath) {
            yield put(ajaxAction.postAjax({
                statePath,
                error: e,
            }));
        }
        return {
            error: e,
        };
    } finally {
        if (yield cancelled()) {
            if (statePath) {
                yield put(ajaxAction.postAjax({
                    statePath,
                }));
            }
        }
    }
}

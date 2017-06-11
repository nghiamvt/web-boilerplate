import { takeEvery, call } from 'redux-saga/effects';
import callApi from './apiSaga';

function* testAPI() {
    // 200: http://www.mocky.io/v2/593e75c9100000880747f147
    // 401: http://www.mocky.io/v2/593e74ec100000850747f146
    const result = yield call(callApi, { endpoint: 'http://www.mocky.io/v2/593e74ec100000850747f146' });
    console.log('result :', result);
    return result;
}

export default function* rootSaga() {
    yield takeEvery('TEST_API', testAPI);
}

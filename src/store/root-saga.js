import { takeEvery, call } from 'redux-saga/effects';
import { apiGet } from './apiSaga';

function* testAPI() {
    // 200: http://www.mocky.io/v2/593e75c9100000880747f147
    // 401: http://www.mocky.io/v2/593e74ec100000850747f146
    const result = yield call(apiGet, { url: '/v2/594231191200001303ddc32c' });
    console.log('result :', result);
    return result;
}

export default function* rootSaga() {
    yield takeEvery('TEST_SAGA', () => console.log(123));
    yield takeEvery('TEST_API', testAPI);
}

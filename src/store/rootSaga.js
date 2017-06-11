import { takeEvery, call } from 'redux-saga/effects';
import callApi from './apiSaga';

function* testAPI() {
    return yield call(callApi, { endpoint: 'http://www.mocky.io/v2/593cce35110000f2047229e7' });
}

export default function* rootSaga() {
    yield takeEvery('TEST_API', testAPI);
}

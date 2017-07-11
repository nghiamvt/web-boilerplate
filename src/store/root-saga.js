import { takeEvery } from 'redux-saga/effects';

export default function* rootSaga() {
	yield takeEvery('TEST_SAGA', () => console.warn(123));
}

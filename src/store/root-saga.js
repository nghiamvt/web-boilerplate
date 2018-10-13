/* eslint-disable no-constant-condition,func-names */
import { takeEvery, spawn, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

function* testSaga() {
  yield takeEvery('INIT_SAGA', () => {
    console.info('init');
  });
}

export default function* rootSaga() {
  const sagaList = [
    testSaga,
  ];

  yield sagaList.map(saga => spawn(function* () {
    while (true) {
      try {
        yield call(saga);
        console.error('Unexpected root saga termination!');
      } catch (e) {
        console.error('[Error] The saga will be restarted \n', e);
      }
      yield delay(3000);
    }
  }));
}

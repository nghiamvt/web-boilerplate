/* eslint-disable no-constant-condition,func-names */
import { apiGet } from '@/store/api-saga';
import { delay } from 'redux-saga';
import { call, spawn, takeEvery } from 'redux-saga/effects';

function* testSaga() {
  yield takeEvery('INIT_SAGA', function*() {
    const res = yield call(apiGet, {
      pathUrl: 'https://reqres.in/api/users?delay=3',
      type: 'test_api',
    });
    // eslint-disable-next-line
    console.log('res', res);
  });
}
// eslint-disable-next-line
function* rootSagaRestartable() {
  const sagaList = [testSaga];

  yield sagaList.map(saga =>
    spawn(function*() {
      while (true) {
        try {
          yield call(saga);
          console.error('Unexpected root saga termination!');
        } catch (e) {
          console.error('[Error] The saga will be restarted \n', e);
        }
        yield delay(3000);
      }
    }),
  );
}

export default function* rootSaga() {
  yield spawn(testSaga);
}

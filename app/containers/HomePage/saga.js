import { call, put, takeEvery, all } from 'redux-saga/effects';
import NProgress from 'nprogress';
import { SAVE_ACCOUNT_DATA } from './constants';
import { saveAccountDataSuccess, saveAccountDataFailure } from './actions';
import api from '../../utils/api';

export function* saveAccountData({ name, accountId }) {
  NProgress && NProgress.start();
  try {
    const { data, error } = yield call(
      api.post,
      `//localhost:4000/api/account/add`,
      {
        name,
        accountId,
      },
    );
    if (!error) {
      yield put(saveAccountDataSuccess({ data }));
    } else {
      yield put(saveAccountDataFailure());
    }
  } catch (err) {
    console.log(err);
    yield put(saveAccountDataFailure());
  }
  NProgress && NProgress.done();
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield takeEvery(SAVE_ACCOUNT_DATA, saveAccountData);
}

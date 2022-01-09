import { call, put, takeEvery, all } from 'redux-saga/effects';
import NProgress from 'nprogress';
import { MINT_NFT_DATA, FETCH_NFT_DATA } from './constants';
import {
  mintNftDataSuccess,
  mintNftDataFailure,
  fetchNftDataSuccess,
  fetchNftDataFailure,
} from './actions';
import api from '../../utils/api';

export function* mintNftData({ pvtkey, accountId, cid }) {
  NProgress && NProgress.start();
  try {
    const { error } = yield call(api.post, `//localhost:4000/api/nft/mint`, {
      pvtkey,
      accountId,
      cid,
    });
    if (!error) {
      yield put(mintNftDataSuccess());
    } else {
      yield put(mintNftDataFailure());
    }
  } catch (err) {
    console.log(err);
    yield put(mintNftDataFailure());
  }
  NProgress && NProgress.done();
}

export function* fetchNftData({ accountId }) {
  NProgress && NProgress.start();
  try {
    const { data, error } = yield call(
      api.post,
      `//localhost:4000/api/nft/fetch`,
      {
        accountId,
      },
    );
    if (!error) {
      yield put(fetchNftDataSuccess({ data }));
    } else {
      yield put(fetchNFftDataFailure());
    }
  } catch (err) {
    console.log(err);
    yield put(fetchNftDataFailure());
  }
  NProgress && NProgress.done();
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield takeEvery(MINT_NFT_DATA, mintNftData);
  yield takeEvery(FETCH_NFT_DATA, fetchNftData);
}

/*
 *
 * Ugc reducer
 *
 */
import produce from 'immer';
import {
  MINT_NFT_DATA,
  MINT_NFT_DATA_SUCCESS,
  MINT_NFT_DATA_FAILURE,
  MINT_NFT_DATA_UNINITIALIZE,
  FETCH_NFT_DATA,
  FETCH_NFT_DATA_SUCCESS,
  FETCH_NFT_DATA_FAILURE,
  FETCH_NFT_DATA_UNINITIALIZE,
} from './constants';

export const initialState = {
  mint: {
    status: 'uninitiated',
  },
  fetch: {
    status: 'uninitiated',
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const ugcReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case MINT_NFT_DATA:
        draft.mint.status = 'inprogress';
        break;
      case MINT_NFT_DATA_SUCCESS:
        draft.mint.status = 'success';
        break;
      case MINT_NFT_DATA_FAILURE:
        draft.mint.status = 'failure';
        break;
      case MINT_NFT_DATA_UNINITIALIZE:
        draft.mint.status = 'uninitiated';
        break;
      case FETCH_NFT_DATA:
        draft.fetch.status = 'inprogress';
        break;
      case FETCH_NFT_DATA_SUCCESS:
        draft.fetch.status = 'success';
        draft.fetch.data = action.data.nfts.split(',');
        break;
      case FETCH_NFT_DATA_FAILURE:
        draft.fetch.status = 'failure';
        break;
      case FETCH_NFT_DATA_UNINITIALIZE:
        draft.fetch.status = 'uninitiated';
        break;
    }
  });

export default ugcReducer;

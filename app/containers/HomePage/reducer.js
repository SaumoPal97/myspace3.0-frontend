/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import {
  SAVE_ACCOUNT_DATA,
  SAVE_ACCOUNT_DATA_SUCCESS,
  SAVE_ACCOUNT_DATA_FAILURE,
} from './constants';

export const initialState = {
  acountId: null,
  name: null,
  uuid: null,
  blance: null,
  status: 'uninitiated',
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAVE_ACCOUNT_DATA:
        draft.accountId = action.accountId;
        draft.name = action.name;
        draft.status = 'inprogress';
        break;
      case SAVE_ACCOUNT_DATA_SUCCESS:
        draft.status = 'success';
        draft.uuid = action.data.uuid;
        draft.balance = action.data.balance;
        break;
      case SAVE_ACCOUNT_DATA_FAILURE:
        draft.status = 'failure';
        break;
    }
  });

export default homePageReducer;

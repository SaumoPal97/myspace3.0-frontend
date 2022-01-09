/*
 *
 * HomePage actions
 *
 */

import {
  SAVE_ACCOUNT_DATA,
  SAVE_ACCOUNT_DATA_SUCCESS,
  SAVE_ACCOUNT_DATA_FAILURE,
} from './constants';

export function saveAccountData({ name, accountId }) {
  return {
    type: SAVE_ACCOUNT_DATA,
    name,
    accountId,
  };
}

export function saveAccountDataSuccess({ data }) {
  return {
    type: SAVE_ACCOUNT_DATA_SUCCESS,
    data,
  };
}

export function saveAccountDataFailure() {
  return {
    type: SAVE_ACCOUNT_DATA_FAILURE,
  };
}

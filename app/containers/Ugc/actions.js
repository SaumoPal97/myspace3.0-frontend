/*
 *
 * Ugc actions
 *
 */

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

export function mintNftData({ pvtkey, accountId, cid }) {
  return {
    type: MINT_NFT_DATA,
    pvtkey,
    accountId,
    cid,
  };
}

export function mintNftDataSuccess() {
  return {
    type: MINT_NFT_DATA_SUCCESS,
  };
}

export function mintNftDataFailure() {
  return {
    type: MINT_NFT_DATA_FAILURE,
  };
}

export function mintNftDataUninitialize() {
  return {
    type: MINT_NFT_DATA_UNINITIALIZE,
  };
}

export function fetchNftData({ accountId }) {
  return {
    type: FETCH_NFT_DATA,
    accountId,
  };
}

export function fetchNftDataSuccess({ data }) {
  return {
    type: FETCH_NFT_DATA_SUCCESS,
    data,
  };
}

export function fetchNftDataFailure() {
  return {
    type: FETCH_NFT_DATA_FAILURE,
  };
}

export function fetchNftDataUninitialize() {
  return {
    type: FETCH_NFT_DATA_UNINITIALIZE,
  };
}

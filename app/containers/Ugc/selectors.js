import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ugc state domain
 */

const selectUgcDomain = state => state.ugc || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Ugc
 */

const makeSelectFetchData = () =>
  createSelector(
    selectUgcDomain,
    state => (state.fetch || {}).data,
  );

const makeSelectFetchStatus = () =>
  createSelector(
    selectUgcDomain,
    state => (state.fetch || {}).status,
  );

const makeSelectMintStatus = () =>
  createSelector(
    selectUgcDomain,
    state => (state.mint || {}).status,
  );

export { makeSelectFetchData, makeSelectFetchStatus, makeSelectMintStatus };

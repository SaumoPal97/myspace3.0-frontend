import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

const makeSelectAccountId = () =>
  createSelector(
    selectHomePageDomain,
    state => state.accountId,
  );

const makeSelectAccountStatus = () =>
  createSelector(
    selectHomePageDomain,
    state => state.status,
  );

const makeSelectAccountName = () =>
  createSelector(
    selectHomePageDomain,
    state => state.name,
  );

const makeSelectAccountUuid = () =>
  createSelector(
    selectHomePageDomain,
    state => state.uuid,
  );

const makeSelectAccountBalance = () =>
  createSelector(
    selectHomePageDomain,
    state => state.balance,
  );

export {
  makeSelectAccountId,
  makeSelectAccountStatus,
  makeSelectAccountName,
  makeSelectAccountUuid,
  makeSelectAccountBalance,
};

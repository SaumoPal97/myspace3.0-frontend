/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'
import storageSession from 'redux-persist/lib/storage/session';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['homePage', 'ugc'],
};

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return persistReducer(persistConfig, rootReducer);
}

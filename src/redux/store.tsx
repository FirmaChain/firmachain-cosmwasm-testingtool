import { createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['modal'],
  version: 1,
  migrate: (state: any) => {
    if (state && state._persist && state._persist.version < 1) {
      if (state.query && !state.query.queryResult) {
        state.query.queryResult = ['', '', '', '', '', '', '', '', ''];
      }
    }
    return Promise.resolve(state);
  },
};

export default createStore(persistReducer(persistConfig, reducers), applyMiddleware(ReduxThunk));

import { applyMiddleware, compose, createStore } from 'redux';
import { AsyncStorage } from 'react-native';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import * as modules from '../modules';

const rootName = 'root';
const composer = __DEV__ ? composeWithDevTools : compose;

// Pull out reducers from modules
const reducers = Object.keys(modules).reduce(
  (acc, key) => ({
    ...acc,
    [key]: modules[key].reducer
  }),
  {}
);

const config = {
  key: rootName,
  storage: AsyncStorage,
  version: 1
};

const appReducer = persistCombineReducers(config, reducers);

const rootReducer = (state, action) => {
  // APP_RESET action resets entire app state to default
  if (action.type === 'APP_RESET') {
    AsyncStorage.clear();
    state = undefined;
  }
  return appReducer(state, action);
};

// Create redux middleware for react-navigation
const navMiddleWare = createReactNavigationReduxMiddleware(
  state => state.navigation
);

// Bring entire store together for app
const configureStore = state => {
  const store = createStore(
    rootReducer,
    state,
    composer(applyMiddleware(thunkMiddleware, navMiddleWare))
  );
  const persistor = persistStore(store);
  return { persistor, store };
};

export default configureStore;

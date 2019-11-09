import React, { useState, useRef } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import Navigation from './nav';

import theme, { disableText } from './theme';
import configureStore from './store';

const { persistor, store } = configureStore();

const mergeTheme = () => {
  const storeTheme = store.getState().settings.theme.color;
  return {
    ...theme,
    color: {
      ...theme.color,
      ...storeTheme,
      disabled: disableText(storeTheme.textDefault)
    }
  };
};

const Main = () => {
  const [modifiedTheme, setModifiedTheme] = useState(mergeTheme());
  const updateTheme = useRef(() => setModifiedTheme(mergeTheme()));
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={modifiedTheme}>
          <Navigation
            screenProps={{
              theme: modifiedTheme,
              updateTheme: updateTheme.current
            }}
          />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default Main;

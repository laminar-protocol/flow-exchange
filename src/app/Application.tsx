import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useShallowEqualSelector } from '../hooks';
import { actions } from '../types';
import Main from './Main';
import GlobalStyle from '../theme/globalStyle';
import { AppState } from '../reducers';

library.add(fas);

const Application: React.FC = () => {
  const dispatch = useDispatch();

  const currentTheme = useShallowEqualSelector<AppState, string>((state: AppState) => state.setting.currentTheme);

  useEffect(() => {
    dispatch(actions.app.init.trigger());
  }, [dispatch]);

  return (
    <ThemeProvider theme={{ mode: currentTheme }}>
      <>
        <GlobalStyle />
        <Main />
      </>
    </ThemeProvider>
  );
};

export default Application;

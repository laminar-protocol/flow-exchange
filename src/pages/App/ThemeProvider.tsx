import 'antd/dist/antd.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import React, { useMemo } from 'react';
import { ThemeProvider as JSSThemeProvider } from 'react-jss';

import { makeTheme, useGlobalStyles } from '../../styles';

library.add(fas);

interface ThemeProviderProps {
  mode: 'light' | 'dark';
}

const InnerThemeProvider: React.FC = ({ children }) => {
  useGlobalStyles();

  return <>{children}</>;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ mode, children }) => {
  const theme = useMemo(() => {
    return makeTheme({ mode });
  }, [mode]);

  return (
    <JSSThemeProvider theme={theme}>
      <InnerThemeProvider>{children}</InnerThemeProvider>
    </JSSThemeProvider>
  );
};

export default ThemeProvider;

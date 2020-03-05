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

const ThemeProvider: React.FC<ThemeProviderProps> = ({ mode, children }) => {
  useGlobalStyles();

  const theme = useMemo(() => {
    return makeTheme({ mode });
  }, [mode]);

  return <JSSThemeProvider theme={theme}>{children}</JSSThemeProvider>;
};

export default ThemeProvider;

import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Main from 'app/main/main';
import GlobalStyle from 'theme/globalStyle';

library.add(fas);

const Component = ({ currentTheme, onInit }) => {
  useEffect(() => {
    onInit();
  }, [onInit]);

  return (
    <ThemeProvider theme={{ mode: currentTheme }}>
      <GlobalStyle />
      <Main />
    </ThemeProvider>
  );
};

export default Component;

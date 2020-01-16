import React from 'react';

import { addDecorator } from '@storybook/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';

import GlobalStyle from '../src/theme/globalStyle';

library.add(fas);

addDecorator(storyFn => (
  <ThemeProvider theme={{ mode: 'light' }}>
    <>
      <GlobalStyle />
      {storyFn()}
    </>
  </ThemeProvider>
));

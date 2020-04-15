import 'antd/dist/antd.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { addDecorator } from '@storybook/react';
import React from 'react';

import ThemeProvider from '../src/pages/App/ThemeProvider';

library.add(fas);

addDecorator(storyFn => <ThemeProvider mode="light">{storyFn()}</ThemeProvider>);

import React from 'react';

import * as Sentry from '@sentry/browser';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';

import './i18n';
import App from './pages/App';

const render = (App: React.ComponentType) => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

render(App);

if ((module as any).hot) {
  (module as any).hot.accept('./pages/App', () => {
    // eslint-disable-next-line
    const NextApp = require('./pages/App').default;
    render(NextApp);
  });
}

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: 'https://d480bdd4a4314799a685468721b3e891@sentry.io/1814370' });
}

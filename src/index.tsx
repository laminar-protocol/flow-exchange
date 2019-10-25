import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'rxjs';

import Application from 'app/application/application.connect';
import * as serviceWorker from 'serviceWorker';

import store, { history } from './store';

import 'antd/dist/antd.css';

library.add(fas);

const render = (App: React.ComponentType) => {
  ReactDOM.render(
    (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    ),
    document.getElementById('root'),
  );
};

render(Application);

serviceWorker.unregister();

if ((module as any).hot) {
  (module as any).hot.accept('./app/application/application.connect', () => {
    // eslint-disable-next-line
    const NextApp = require('./app/application/application.connect').default;
    render(NextApp);
  });
}

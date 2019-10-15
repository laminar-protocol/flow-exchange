import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'rxjs';

import store, { history } from 'store';

import Application from 'app/application/application.connect';
import * as serviceWorker from 'serviceWorker';

import 'antd/dist/antd.css';

library.add(fas);

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Application />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();

import rootEpic from '_app/epics';
import { errorLogger } from '_app/middleware';
import createRootReducer from '_app/reducers';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

export const history = createBrowserHistory();

// Debug
const devToolEnhancer = [];

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-underscore-dangle
  const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof devToolsExtension === 'function') {
    devToolEnhancer.push(devToolsExtension());
  }
}

// Root Epic
const epicMiddleware = createEpicMiddleware();

// Router
const combinedMiddleware = applyMiddleware(errorLogger, routerMiddleware(history), epicMiddleware);

const composedEnhancers = compose(combinedMiddleware, ...devToolEnhancer);

const store = createStore(createRootReducer(history), {}, composedEnhancers);

epicMiddleware.run(rootEpic);

export default store;

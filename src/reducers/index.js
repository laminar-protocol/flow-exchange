import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const reducersContext = require.context('./', true, /\.reducer\.js$/);

const reducers = {};
const reducerRegex = /\.\/(.*?)\./;

reducersContext.keys().forEach((key) => {
  const reducerKey = key.match(reducerRegex)[1];
  if (reducerKey != null) {
    reducers[reducerKey] = reducersContext(key).default;
  }
});

export default (history) => combineReducers({
  router: connectRouter(history),
  ...reducers,
});

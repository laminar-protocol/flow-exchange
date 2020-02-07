import { combineEpics } from 'redux-observable';

const epicsContext = require.context('./', true, /\.epic\.(j|t)s?$/);
const multipleEpicsContext = require.context('./', true, /\.epics\.(j|t)s?$/);

const epics = [];

epicsContext.keys().forEach(key => {
  epics.push(epicsContext(key).default);
});

multipleEpicsContext.keys().forEach(key => {
  epics.push(...Object.values(multipleEpicsContext(key)));
});

const rootEpic = combineEpics(...epics);

export default rootEpic;

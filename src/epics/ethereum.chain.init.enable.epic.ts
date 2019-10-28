import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import types from 'types';
import { Epic } from 'reducers';

const epic: Epic = (action$) => action$.pipe(
  ofType(types.app.init.trigger),
  mergeMap(() => of({ type: types.ethereum.enable.requested })),
);

export default epic;

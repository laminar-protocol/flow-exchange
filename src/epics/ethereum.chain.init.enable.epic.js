import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import types from 'types';

const epic = (action$) => action$.pipe(
  ofType(types.applicationInit.changed),
  mergeMap(() => of({ type: types.ethereumEnable.requested })),
);

export default epic;

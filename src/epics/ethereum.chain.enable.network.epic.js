import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import types from 'types';

const epic = (action$) => action$.pipe(
  ofType(types.ethereumEnable.completed),
  mergeMap(() => of({ type: types.ethereumNetwork.requested })),
);

export default epic;

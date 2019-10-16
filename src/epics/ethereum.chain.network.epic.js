import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import types from 'types';

const epic = (action$) => action$.pipe(
  ofType(types.ethereumNetwork.completed),
  mergeMap(() => of({ type: types.daiBalance.requested })),
);

export default epic;

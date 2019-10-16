import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import types from 'types';

const epic = (action$) => action$.pipe(
  ofType(types.daiGrant.completed),
  mergeMap(() => of({ type: types.daiAuthorization.requested })),
);

export default epic;

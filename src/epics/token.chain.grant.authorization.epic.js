import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import types from 'types';

const epic = (action$) => action$.pipe(
  ofType(types.tokenGrant.completed),
  mergeMap((action) => of({
    type: types.tokenAuthorization.requested,
    payload: { symbol: action.payload.symbol },
  })),
);

export default epic;

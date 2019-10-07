import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import types from 'types';

const epic = (action$) => action$.pipe(
  ofType(types.token.requested),
  mergeMap((action) => of({
    type: types.token.completed,
    payload: {
      token: action.payload.accessToken,
    },
  })),
);

export default epic;

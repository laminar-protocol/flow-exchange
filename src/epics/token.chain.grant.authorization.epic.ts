import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import types from 'types';
import { Epic } from 'reducers';

const epic: Epic = action$ =>
  action$.pipe(
    ofType(types.token.grant.completed),
    mergeMap(action =>
      of({
        type: types.token.authorization.requested,
        payload: { symbol: action.payload.symbol },
      })
    )
  );

export default epic;

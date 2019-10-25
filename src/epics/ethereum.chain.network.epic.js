import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { tokens } from 'config';

import types from 'types';

const epic = (action$) => action$.pipe(
  ofType(types.ethereumNetwork.completed),
  mergeMap(() => {
    const values = Object.values(tokens);

    const tokenRequests = values.flatMap(({ symbol: key }) => [
      { type: types.tokenBalance.requested, payload: { symbol: key } },
      { type: types.tokenAuthorization.requested, payload: { symbol: key } },
    ]);

    return of(
      { type: types.marketSymbols.changed, payload: tokens },

      // Token
      ...tokenRequests,
    );
  }),
);

export default epic;

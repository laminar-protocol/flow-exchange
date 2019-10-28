import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { tokens } from 'config';

import types from 'types';
import { Epic } from 'reducers';

const epic: Epic = (action$) => action$.pipe(
  ofType(types.ethereum.network.completed),
  mergeMap(() => {
    const values = Object.values(tokens);

    const tokenRequests: any = values.flatMap(({ symbol: key }) => [
      { type: types.token.balance.requested, payload: { symbol: key } },
      { type: types.token.authorization.requested, payload: { symbol: key } },
    ]);

    return of(
      { type: types.market.symbols.changed, payload: tokens },

      // Token
      ...tokenRequests,
    );
  }),
);

export default epic;

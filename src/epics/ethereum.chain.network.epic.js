import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { symbols } from 'config';

import types from 'types';

const epic = (action$, state$) => action$.pipe(
  ofType(types.ethereumNetwork.completed),
  mergeMap(() => {
    const { value: { ethereum: { network } } } = state$;

    const availableSymbols = symbols[network];
    const keys = Object.keys(availableSymbols);

    const tokenRequests = keys.flatMap((key) => [
      { type: types.tokenBalance.requested, payload: { symbol: key } },
      { type: types.tokenAuthorization.requested, payload: { symbol: key } },
    ]);

    return of(
      { type: types.marketSymbols.changed, payload: availableSymbols },

      // Flow
      { type: types.flowOracle.requested },
      { type: types.flowMoneyMarket.requested },

      // Token
      ...tokenRequests,
    );
  }),
);

export default epic;

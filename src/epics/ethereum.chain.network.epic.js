import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { symbols } from 'config';

import types from 'types';

const epic = (action$, state$) => action$.pipe(
  ofType(types.ethereumNetwork.completed),
  mergeMap(() => {
    const { value: { ethereum: { network } } } = state$;

    const networkSymbols = symbols[network];

    return of(
      { type: types.marketSymbols.changed, payload: networkSymbols },

      // Flow
      { type: types.flowOracle.requested },
      { type: types.flowMoneyMarket.requested },

      // DAI
      { type: types.daiBalance.requested },
      { type: types.daiAuthorization.requested },
    );
  }),
);

export default epic;

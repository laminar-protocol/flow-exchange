import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';

const epic = (action$, state$) => action$.pipe(
  ofType(types.spotRate.requested),
  mergeMap(async (action) => {
    try {
      const {
        value: {
          market: {
            symbols,
          },
        },
      } = state$;

      const symbol = action.payload;
      const token = symbols[symbol];

      if (token && token.isBase) {
        return { type: types.spotRate.failed };
      }

      const price = await ethereum.oracleContract.methods.getPrice(token.contract).call();
      const bidSpread = await ethereum.poolContract.methods.getBidSpread(token.contract).call();
      const askSpread = await ethereum.poolContract.methods.getAskSpread(token.contract).call();

      return {
        type: types.spotRate.completed,
        payload: {
          symbol, price, bidSpread, askSpread,
        },
      };
    } catch {
      return { type: types.spotRate.failed };
    }
  }),
);

export default epic;

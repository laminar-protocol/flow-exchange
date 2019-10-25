import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import { tokens } from 'config';
import types from 'types';

const epic = (action$) => action$.pipe(
  ofType(types.spotRate.requested),
  mergeMap(async (action) => {
    try {
      const symbol = action.payload;

      const contract = ethereum.getTokenContract(symbol);

      if (contract === ethereum.getTokenContract(tokens.baseToken.symbol)) {
        return { type: types.spotRate.failed };
      }

      const price = await ethereum.oracleContract.methods.getPrice(contract.options.address).call();
      const bidSpread = await ethereum.poolContract.methods.getBidSpread(contract.options.address).call();
      const askSpread = await ethereum.poolContract.methods.getAskSpread(contract.options.address).call();

      return {
        type: types.spotRate.completed,
        payload: {
          symbol, price, bidSpread, askSpread,
        },
      };
    } catch (error) {
      console.error(error);
      return { type: types.spotRate.failed };
    }
  }),
);

export default epic;

import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import { tokens } from 'config';
import types from 'types';
import { Epic } from 'reducers';

const epic: Epic = (action$) => action$.pipe(
  ofType(types.spot.rate.requested),
  mergeMap(async (action) => {
    try {
      const symbol = action.payload;

      const contract = ethereum.getTokenContract(symbol);

      if (contract === ethereum.getTokenContract(tokens.baseToken.symbol)) {
        return { type: types.spot.rate.failed };
      }

      const price = await ethereum.oracleContract.methods.getPrice(contract.options.address).call();
      const bidSpread = await ethereum.poolContract.methods.getBidSpread(contract.options.address).call();
      const askSpread = await ethereum.poolContract.methods.getAskSpread(contract.options.address).call();

      return {
        type: types.spot.rate.completed,
        payload: {
          symbol, price, bidSpread, askSpread,
        },
      };
    } catch (error) {
      console.error(error);
      return { type: types.spot.rate.failed };
    }
  }),
);

export default epic;

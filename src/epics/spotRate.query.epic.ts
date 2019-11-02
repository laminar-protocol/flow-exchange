import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types from 'types';
import { Epic } from 'reducers';

const epic: Epic = (action$) => action$.pipe(
  ofType(types.spot.rate.requested),
  mergeMap(async (action) => {
    try {
      const symbol = action.payload;

      const contract = ethereum.getTokenContract(symbol);

      if (symbol === 'DAI') { // TODO: improve this
        return { type: types.spot.rate.failed };
      }

      const price = await ethereum.oracle.methods.getPrice(contract.options.address).call();
      // TODO: handle multiple pool
      const bidSpread = await ethereum.liquidityPool.methods.getBidSpread(contract.options.address).call();
      const askSpread = await ethereum.liquidityPool.methods.getAskSpread(contract.options.address).call();

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

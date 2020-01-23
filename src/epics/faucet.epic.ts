import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';
import { toWei } from 'helpers/unitHelper';
import types from 'types';

const epic: Epic = (action$, state$) =>
  action$.pipe(
    ofType(types.faucet.dai.requested),
    mergeMap(async action => {
      const {
        payload: { symbol, amount },
      } = action;
      try {
        const {
          value: {
            ethereum: { account },
          },
        } = state$;
        const contract = ethereum.getFaucetContract(symbol);
        await contract.methods.allocateTo(account, toWei(amount)).send({ from: account });

        return { type: types.faucet.dai.completed, payload: { amount } };
      } catch (error) {
        return { type: types.faucet.dai.failed, payload: null, error };
      }
    }),
  );

export default epic;

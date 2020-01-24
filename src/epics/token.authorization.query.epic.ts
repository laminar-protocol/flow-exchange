import { combineLatest } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';
import types from 'types';

const epic: Epic = (action$, state$) =>
  combineLatest(
    action$.pipe(ofType(types.ethereum.network.completed), take(1)),
    action$.pipe(ofType(types.token.authorization.requested)),
  ).pipe(
    mergeMap(async ([, action]) => {
      const {
        payload: { symbol, address },
      } = action;

      try {
        const {
          value: {
            ethereum: { account },
          },
        } = state$;

        const grantAddress = address || ethereum.flowProtocol.options.address;
        const contract = ethereum.getTokenContract(symbol);
        const balance = await contract.methods.allowance(account, grantAddress).call();
        return {
          type: types.token.authorization.completed,
          payload: { symbol, balance, address: grantAddress },
        };
      } catch (error) {
        return { type: types.token.authorization.failed, payload: { symbol }, error };
      }
    }),
  );

export default epic;

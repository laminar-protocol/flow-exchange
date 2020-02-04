import BN from 'bn.js';
import { toWei } from 'helpers/unitHelper';
import { Action as ReduxAction } from 'redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import ethereum from 'services/ethereum';
import types from 'types';

interface Action extends ReduxAction<string> {
  payload: { poolAddr: string; amount: BN };
}

const epic: Epic = (action$: ActionsObservable<Action>, state$) =>
  action$.pipe(
    ofType(types.liquidityPool.deposit.requested),
    withLatestFrom(state$),
    switchMap(async ([{ payload }, state]) => {
      const {
        ethereum: { account },
      } = state;
      if (!account) {
        return { type: types.liquidityPool.deposit.failed, error: new Error('No account') };
      }
      const { poolAddr, amount } = payload;
      try {
        const contract = ethereum.getLiquidityPoolContract(poolAddr);
        const success = await contract.methods.depositLiquidity(toWei(amount)).send({ from: account });
        return { type: types.liquidityPool.deposit.completed, payload: success };
      } catch (error) {
        return { type: types.liquidityPool.deposit.failed, error };
      }
    }),
  );

export default epic;

import { take, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import { fromWei } from 'helpers/unitHelper';
import { createEpic } from 'helpers/apiLoadable';
import types, { actions } from 'types';
import { AppState, Epic } from 'reducers';

export const changeAccount: Epic = (action$) => action$.pipe(
  ofType(types.ethereum.account.changed),
  map(() => actions.margin.allowance.requested()),
);

export const allowance = createEpic(
  actions.margin.allowance,
  async (_params, state: AppState) => {
    await ethereum.ready;
    const { ethereum: { account } } = state;
    if (!account) { // TODO: improve this
      return Promise.reject(new Error('No account'));
    }
    const protocolAddress = ethereum.flowMarginProtocol.options.address;
    const result = await ethereum.baseTokenContract.methods.allowance(account, protocolAddress).call();
    return Number(fromWei(result));
  },
  (action$) =>
    action$.pipe(ofType(types.ethereum.network.completed), take(1)),
);

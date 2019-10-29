import { take, map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import { fromWei, UINT256_MAX, UINT256_MIN } from 'helpers/unitHelper';
import { createEpic } from 'helpers/apiLoadable';
import types, { actions } from 'types';
import { AppState, Epic } from 'reducers';
import { of } from 'rxjs';

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

export const toggleEnable = createEpic(
  actions.margin.toggleTrading,
  async (enable, state: AppState) => {
    await ethereum.ready;
    const { ethereum: { account } } = state;
    if (!account) { // TODO: improve this
      return Promise.reject(new Error('No account'));
    }
    const protocolAddress = ethereum.flowMarginProtocol.options.address;
    const amount = enable ? UINT256_MAX : UINT256_MIN;
    await ethereum.baseTokenContract.methods.approve(protocolAddress, amount).send({ from: account });
    return Number(fromWei(amount));
  },
);

export const updateAllowance: Epic = (action$) => action$.pipe(
  ofType(types.margin.toggleTrading.completed),
  mergeMap(({ payload }) => of(
    actions.margin.allowance.cancelled(),
    actions.margin.allowance.completed(payload),
  )),
);

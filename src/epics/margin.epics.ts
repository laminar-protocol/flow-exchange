import ethereum from 'services/ethereum';

import { fromWei } from 'helpers/unitHelper';
import { createEpic } from 'helpers/apiLoadable';
import { actions } from 'types';
import { AppState } from 'reducers';

// TODO: refresh after account changed

export const allowance = createEpic(actions.margin.allowance, async (_params, state: AppState) => {
  await ethereum.ready;
  const { ethereum: { account } } = state;
  if (!account) { // TODO: improve this
    return Promise.reject(new Error('No account'));
  }
  const protocolAddress = ethereum.flowMarginProtocol.options.address;
  const result = await ethereum.baseTokenContract.methods.allowance(account, protocolAddress).call();
  return Number(fromWei(result));
});

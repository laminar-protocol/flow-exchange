import ethereum from 'services/ethereum';

import { createEpic } from 'helpers/apiLoadable';
import { actions } from 'types';
import { AppState } from 'reducers';

// TODO: refresh after account changed

export const allowance = createEpic(actions.margin.allowance, async (_params, state: AppState) => {
  await ethereum.ready;
  const { ethereum: { account } } = state;
  const protocolAddress = ethereum.flowMarginProtocol.options.address;
  return ethereum.baseTokenContract.methods.allowance(account, protocolAddress).call();
});

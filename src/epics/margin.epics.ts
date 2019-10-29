import ethereum from 'services/ethereum';

import { createEpic } from 'helpers/apiLoadable';
import { actions } from 'types';
import { AppState } from 'reducers';

export const allowance = createEpic(actions.margin.allowance, async (_params, state: AppState) => {
  await ethereum.ready;
  const { ethereum: { account } } = state;
  const protocolAddress = ethereum.flowMarginProtocol.options.address;
  const bal = await ethereum.baseTokenContract.methods.allowance(account, protocolAddress);
  console.log(bal);
  return bal;
});

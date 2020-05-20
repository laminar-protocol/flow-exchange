import { TokenId, TokenInfo } from '../services';
import useAccountStore from '../store/useAccount';
import { useTokenInfo } from './useGetTokenInfo';

export const useAccountBalance = (filter?: TokenId | ((a: TokenInfo) => boolean)) => {
  const balances = useAccountStore(state => state.balances);
  const baseToken = useTokenInfo(filter);

  return balances.find(item => item.tokenId === baseToken?.id);
};

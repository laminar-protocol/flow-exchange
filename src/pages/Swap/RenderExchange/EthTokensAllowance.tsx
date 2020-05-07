import { useLayoutEffect } from 'react';
import { combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { useApi, useCurrentAccount } from '../../../hooks';
import useSwap from '../hooks/useSwap';

const EthTokensAllowance = () => {
  const api = useApi();
  const { address } = useCurrentAccount();
  const setState = useSwap(state => state.setState);
  const tokensAllowanceUpdate = useSwap(state => state.tokensAllowanceUpdate);

  useLayoutEffect(() => {
    if (api.isEthereum) {
      const s = api.asEthereum.currencies
        .tokens()
        .pipe(
          switchMap((tokens: any) => {
            return combineLatest(
              tokens.map((token: any) => {
                return api.asEthereum.synthetic.allowance(address, token.id).pipe(
                  map((allowance: string) => {
                    setState(state => {
                      state.tokensAllowance[token.id] = allowance;
                    });
                  }),
                );
              }),
            );
          }),
        )
        .subscribe();

      return () => s && s.unsubscribe();
    }
  }, [api, tokensAllowanceUpdate, address, setState]);

  return null;
};

export default EthTokensAllowance;

import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types, { actions } from 'types';
import { Epic } from 'reducers';

const networkDecimalToString: any = {
  1: 'mainnet',
  2: 'morden',
  3: 'ropsten',
  4: 'rinkeby',
  5: 'goerli',
  42: 'kovan',
};

const epic: Epic = action$ =>
  action$.pipe(
    ofType(types.ethereum.enable.requested),
    mergeMap(
      () =>
        new Observable(observable => {
          try {
            ethereum.provider
              .enable()
              .then(([account]: string[]) => observable.next(actions.ethereum.enable.completed(account)))
              .catch(() => observable.next(actions.ethereum.enable.failed()));
          } catch {
            ethereum.web3.eth.getAccounts((_error, accounts) => {
              if (accounts && accounts[0]) {
                observable.next(actions.ethereum.enable.completed(accounts[0]));
              }
            });
          }
          try {
            ethereum.provider.on('accountsChanged', ([account]: string[]) => {
              observable.next(actions.ethereum.account.changed(account));
            });
          } catch {
            // ignore
          }
          try {
            ethereum.provider.on('networkChanged', (network: string) => {
              observable.next(
                actions.ethereum.network.completed({
                  network: networkDecimalToString[network] || 'unknown',
                })
              );
            });
          } catch {
            // ignore
          }
        })
    )
  );

export default epic;

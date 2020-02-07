import { networkById } from 'config';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import ethereum from 'services/ethereum';
import types, { actions } from 'types';

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
              if (accounts?.[0]) {
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
            ethereum.provider.on('networkChanged', (networkId: string) => {
              observable.next(
                actions.ethereum.network.completed({
                  network: networkById(Number(networkId)),
                }),
              );
            });
          } catch {
            // ignore
          }
        }),
    ),
  );

export default epic;

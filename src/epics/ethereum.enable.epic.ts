import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ethereum from 'services/ethereum';

import types, { actions } from 'types';
import { Epic } from 'reducers';

const epic: Epic = (action$) => action$.pipe(
  ofType(types.ethereum.enable.requested),
  mergeMap(() => new Observable((observable) => {
    ethereum.provider.enable()
      .then(([account]: string[]) => observable.next(actions.ethereum.enable.completed(account)))
      .catch(() => observable.next(actions.ethereum.enable.failed()));
    ethereum.provider.on('accountsChanged', ([account]: string[]) => {
      observable.next(actions.ethereum.account.changed(account));
    // TODO: ethereum.provider.on('networkChanged')
    });
  })),
);

export default epic;

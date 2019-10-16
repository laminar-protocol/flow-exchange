import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { symbols } from 'config';

import types from 'types';

const epic = (action$, state$) => action$.pipe(
  ofType(types.ethereumNetwork.completed),
  mergeMap(() => {
    const { value: { ethereum: { network } } } = state$;

    const networkSymbols = symbols[network];

    return of(
      { type: types.symbols.changed, payload: networkSymbols },
      { type: types.daiBalance.requested },
      { type: types.daiAuthorization.requested },
    );
  }),
);

export default epic;

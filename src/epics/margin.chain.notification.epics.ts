import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { empty, of } from 'rxjs';
import { notification } from 'antd';
import types, { actions } from 'types';

import { Epic } from 'reducers';

export const notificationEpic: Epic = action$ =>
  action$.pipe(
    ofType(types.margin.openPosition.completed, types.margin.closePosition.completed),
    mergeMap(() => {
      notification.success({
        message: 'Order Successful',
      });
      return empty();
    })
  );

export const refreshEpic: Epic = action$ =>
  action$.pipe(
    ofType(types.margin.openPosition.completed, types.margin.closePosition.completed),
    mergeMap(() => of(actions.token.balance.requested({ symbol: 'DAI' })))
  );

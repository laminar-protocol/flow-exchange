import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { empty } from 'rxjs';
import { notification } from 'antd';

import types from 'types';
import { Epic } from 'reducers';

const epic: Epic = action$ =>
  action$.pipe(
    ofType(types.swap.mint.completed, types.swap.redeem.completed),
    mergeMap(() => {
      notification.success({
        message: 'Swap Successful',
      });
      return empty();
    })
  );

export default epic;

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import types from 'types';
import { UINT256_MAX, UINT256_MIN } from 'helpers/unitHelper';
import { AppState } from 'reducers';
import { getAuthorization, getIsQueryingAuthorization, getIsGranting } from 'reducers/token.reducer';

import GrantSwitch, { OwnProps } from './grantSwitch';

const mapStateToProps = ({ token }: AppState, { symbol, visibleGranted }: OwnProps) => {
  const authorization = getAuthorization(symbol, token);
  const isGranting = getIsGranting(symbol, token);
  const isQueryingAuthorization = getIsQueryingAuthorization(symbol, token);

  let granted = true;
  if (authorization && Number(authorization) <= 0) {
    granted = false;
  }

  return {
    symbol,
    visibleGranted,
    isQueryingAuthorization,
    isGranting,
    granted,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onQuery: (symbol: string) => {
    dispatch({ type: types.token.authorization.requested, payload: { symbol } });
  },

  onGrant: (symbol: string, granted: boolean) => {
    if (granted) {
      dispatch({ type: types.token.grant.requested, payload: { symbol, balance: UINT256_MIN } });
    } else {
      dispatch({ type: types.token.grant.requested, payload: { symbol, balance: UINT256_MAX } });
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GrantSwitch);

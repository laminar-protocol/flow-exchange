import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import types from 'types';
import { UINT256_MAX, UINT256_MIN, fromWei } from 'helpers/unitHelper';
import { AppState } from 'reducers';
import {
  getAuthorization,
  getIsQueryingAuthorization,
  getIsGranting,
} from 'reducers/token.reducer';

import Component from './grantSwitch';

interface OwnProps {
  symbol: string;
  visibleGranted?: boolean;
}

const mapStateToProps = ({ token }: AppState, { symbol, visibleGranted }: OwnProps) => {
  const authorization: string = getAuthorization(symbol, token);
  const isQueryingAuthorization: boolean = getIsQueryingAuthorization(symbol, token);
  const isGranting: boolean = getIsGranting(symbol, token);
  const granted: boolean = (Number(fromWei(authorization)) > 0);
  return {
    symbol,
    isGranting,
    isQueryingAuthorization,
    granted,
    visibleGranted,
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

export default connect(mapStateToProps, mapDispatchToProps)(Component);

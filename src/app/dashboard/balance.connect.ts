import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import types from 'types';
import { AppState } from 'reducers';
import { getBalance, getIsQueryingBalance } from 'reducers/token.reducer';

import Balance, { OwnProps } from './balance';

const mapStateToProps = ({ token }: AppState, { symbol }: OwnProps) => ({
  balance: getBalance(symbol, token),
  isQueryingBalance: getIsQueryingBalance(symbol, token),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onBalanceQuery: (symbol: string) => {
    dispatch({ type: types.token.balance.requested, payload: { symbol } });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Balance);

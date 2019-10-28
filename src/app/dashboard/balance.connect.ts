import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import types from 'types';
import { AppState } from 'reducers';

import Balance from './balance';

const mapStateToProps = ({ token }: AppState) => ({
  token,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onBalanceQuery: (symbol: string) => {
    dispatch({ type: types.token.balance.requested, payload: { symbol } });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Balance);

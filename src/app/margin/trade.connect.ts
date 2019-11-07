import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from 'types';
import { AppState } from 'reducers';

import Component, { OwnProps } from './trade';

const mapStateToProps = ({ margin: { allowance, openPosition } }: AppState, { symbol, pool }: OwnProps) => {
  const allowanceValue = allowance.value || 0;
  return {
    symbol,
    pool,
    isEnabled: allowanceValue > 0,
    isOpening: openPosition.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onOpenPosition: (name?: string, amount?: number, pool?: string) => {
    if (name === undefined || amount === undefined || pool === undefined) {
      return;
    }
    dispatch(actions.margin.openPosition.requested({ params: { name, amount, pool } }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);

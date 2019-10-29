import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from 'types';
import { withInit } from 'helpers/hoc';
import { AppState } from 'reducers';

import Component from './margin';

const mapStateToProps = ({ margin: { allowance, trading } }: AppState) => {
  const allowanceValue = allowance.value || 0;
  return {
    isEnabled: allowanceValue > 0,
    isLoadingAllowance: allowance.loading,
    isTogglinigTrading: trading.loading,
    allowance: allowanceValue > 1e10 ? 'MAX' : allowanceValue.toFixed(2),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  init: () => {
    dispatch(actions.margin.allowance.requested());
  },
  uninit: () => {
    dispatch(actions.margin.allowance.cancelled());
  },
  onToggleTrading: (enable: boolean) => {
    dispatch(actions.margin.toggleTrading.requested({ params: enable }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withInit(Component));

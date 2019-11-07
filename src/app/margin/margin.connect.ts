import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from 'types';
import { withInit } from 'helpers/hoc';
import { AppState } from 'reducers';

import Component from './margin';

const mapStateToProps = ({
  margin: {
    allowance,
    trading,
  },
  setting: {
    currentTheme,
  },
}: AppState) => {
  const allowanceValue = allowance.value || 0;
  return {
    currentTheme,
    isEnabled: allowanceValue > 0,
    isLoadingAllowance: allowance.loading,
    isGranting: trading.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  init: () => {
    dispatch(actions.margin.allowance.requested());
  },
  deinit: () => {
    dispatch(actions.margin.allowance.cancelled());
  },

  onGrant: (enable: boolean) => {
    dispatch(actions.margin.toggleTrading.requested({ params: enable }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withInit(Component));

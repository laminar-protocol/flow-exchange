import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from 'types';
import { withInit } from 'helpers/hoc';
import { AppState } from 'reducers';

import Component from './margin';

const mapStateToProps = ({ margin: { allowance } }: AppState) => {
  const allowanceValue = allowance.value || 0;
  return {
    isEnabled: allowanceValue > 0,
    isLoadingAllowance: allowance.loading,
    allowance: allowanceValue,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  init: () => {
    dispatch(actions.margin.allowance.requested());
  },
  uninit: () => {
    dispatch(actions.margin.allowance.cancelled());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withInit(Component));

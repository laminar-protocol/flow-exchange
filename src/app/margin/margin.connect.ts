import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from 'types';
import { withInit } from 'helpers/hoc';

import Component from './margin';

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  init: () => {
    dispatch(actions.margin.allowance.requested());
  },
  uninit: () => {
    dispatch(actions.margin.allowance.cancelled());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withInit(Component));

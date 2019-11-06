import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from 'types';
import { AppState } from 'reducers';

import Component from './trade';

const mapStateToProps = ({ margin: { allowance, openPosition } }: AppState) => {
  const allowanceValue = allowance.value || 0;
  return {
    isEnabled: allowanceValue > 0,
    isOpening: openPosition.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClosePosition: (name: string, id: string) => {
    dispatch(actions.margin.closePosition.requested({ params: { name, id } }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from 'types';
import { AppState } from 'reducers';

import Component from './application';

const mapStateToProps = ({ setting }: AppState) => ({
  currentTheme: setting.currentTheme,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onInit: () => {
    dispatch(actions.app.init.trigger());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);

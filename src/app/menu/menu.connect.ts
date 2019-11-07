import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { actions } from 'types';
import { AppState } from 'reducers';

import Component from './menu';

const mapStateToProps = ({ setting: { currentTheme } }: AppState) => ({
  currentTheme,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChangeTheme: (currentTheme: string) => {
    const theme = (currentTheme === 'light') ? 'dark' : 'light';
    dispatch(actions.app.theme.changed(theme));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);

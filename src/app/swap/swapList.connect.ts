import { connect } from 'react-redux';
import { AppState } from 'reducers';

import SwapList from './swapList';

const mapStateToProps = ({ ethereum: { account } }: AppState) => ({
  account,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SwapList);

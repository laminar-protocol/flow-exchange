import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { actions } from 'types';
import { AppState } from 'reducers';

import Component, { OwnProps } from './openTrade';

const mapStateToProps = (
  {
    margin: {
      allowance,
      openPosition,
      closePosition,
    },
    ethereum: {
      account,
    },
  }: AppState,
  {
    amount,
    closeSpread,
    liquidationFee,
    liquidityPool,
    openPrice,
    pair,
    positionId,
    openTxhash,
  }: OwnProps,
) => {
  const allowanceValue = allowance.value || 0;
  return {
    amount,
    closeSpread,
    liquidationFee,
    liquidityPool,
    openPrice,
    pair,
    positionId,
    openTxhash,
    account,
    isEnabled: allowanceValue > 0,
    isOpening: openPosition.loading,
    isClosing: closePosition.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClosePosition: (name: string, id: string) => {
    dispatch(actions.margin.closePosition.requested({ params: { name, id } }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);

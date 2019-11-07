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
    bidSpread,
    liquidationFee,
    liquidityPool,
    openPrice,
    pair,
    positionId,
  }: OwnProps,
) => {
  const allowanceValue = allowance.value || 0;
  return {
    amount,
    bidSpread,
    liquidationFee,
    liquidityPool,
    openPrice,
    pair,
    positionId,
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

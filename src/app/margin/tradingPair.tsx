import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppState } from 'reducers';
import { actions } from 'types';
import { Panel, Text, SolidButton } from 'components';
import { tradingPairs } from 'config';

interface OwnProps {
  name: string;
}

interface Props extends OwnProps {
  base: string;
  quote: string;
  leverage: number;
  isLong: boolean;
}

const Container = styled(Panel)`
  display: flex;
  flex-direction: column;
  > * {
    margin-top: 0.5rem;
    > * {
      margin-right: 1rem;
    }
  }
`;

const TradingPair: React.FC<Props> = ({ base, quote, leverage, isLong }) => (
  <Container>
    <div>
      <Text>Tradingi Pair: {base} {quote}</Text>
      <Text>Leverage: x{leverage} {isLong ? 'Long' : 'Short'}</Text>
      <SolidButton>Open Position</SolidButton>
    </div>
  </Container>
);


const mapStateToProps = (_state: AppState, { name }: OwnProps) => {
  const pair = tradingPairs[name as keyof typeof tradingPairs];
  return {
    base: pair.base,
    quote: pair.quote,
    leverage: Math.abs(pair.leverage),
    isLong: pair.leverage > 0,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  init: () => {
    dispatch(actions.margin.allowance.requested());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TradingPair);

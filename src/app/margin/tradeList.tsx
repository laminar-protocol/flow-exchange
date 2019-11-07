import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  Text, Spinner,
} from 'components';
import * as theme from 'theme';

import OpenTrade from './openTrade.connect';
import CloseTrade from './closeTrade';

// ----------
// Style
// ----------

const Container = styled.div``;

const CenterContainer = styled.div`
  flex: 1;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListHeader = styled.div`
  color: ${theme.lightForegroundColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  border-bottom: 1px solid ${theme.borderColor};
  padding-bottom: 1rem;

  .column {
    font-weight: ${theme.boldWeight};
    text-transform: uppercase;
    width: 12.5%;
  }
`;

// ----------
// Query
// ----------
const positionQuery = gql`
  subscription marginPositionEntities($owner: Bytes!) {
    marginPositionEntities(first: 25, orderBy: openTime, orderDirection: desc, where: { owner: $owner }) {
      positionId
      liquidityPool
      amount
      openPrice
      bidSpread
      liquidationFee
      closePrice
      liquidator
      closeOwnerAmount
      openTime
      pair {
        id
      }
    }
  }
`;

// ----------
// Interface
// ----------

export interface StateProps {
  account: string;
}

type Props = StateProps;

// ----------

const TradeList: React.FC<Props> = ({
  account,
}) => {
  // TODO: Fix type
  const { loading: isLoading, data } = useSubscription(positionQuery, {
    variables: {
      owner: account,
    },
  });

  const positions = useMemo(() => data && data.marginPositionEntities.map((event: any) => ({
    ...event,
  })), [data]);

  if (isLoading) {
    return (
      <CenterContainer><Spinner /></CenterContainer>
    );
  }

  // TODO: Refactor

  if (!positions || (positions as Array<any>).length <= 0) {
    return (
      <CenterContainer>
        <Text light size="l">
          No Transaction
        </Text>
      </CenterContainer>
    );
  }

  return (
    <Container>
      <ListHeader>
        <div className="column pair">
          Symbol
        </div>
        <div className="column amount">
          B/S
        </div>
        <div className="column leverage">
          Leverage
        </div>
        <div className="column amount">
          Amount
        </div>
        <div className="column openPrice">
          Open
        </div>
        <div className="column closePrice">
          Close
        </div>
        <div className="column profit">
          P&amp;L
        </div>
        <div className="column action">
          &nbsp;
        </div>
      </ListHeader>
      {
        positions.map((position: any) => {
          if (!position.closePrice) {
            return (
              <OpenTrade
                key={`${position.pair.id}-${position.positionId}`}
                positionId={position.positionId}
                openPrice={position.openPrice}
                liquidityPool={position.liquidityPool}
                amount={position.amount}
                bidSpread={position.bidSpread}
                liquidationFee={position.liquidationFee}
                pair={position.pair.id}
              />
            );
          }
          return (
            <CloseTrade
              key={`${position.pair.id}-${position.positionId}`}
              openPrice={position.openPrice}
              closePrice={position.closePrice}
              amount={position.amount}
              pair={position.pair.id}
              closeOwnerAmount={position.closeOwnerAmount}
            />
          );
        })
      }
    </Container>
  );
};

export default TradeList;

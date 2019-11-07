import React from 'react';
import styled from 'styled-components';

import { FormatProfit, FormatRate } from 'components/format';
import { findTradingPairByAddress, findTradingSybmolByPairAddress } from 'config';
import * as theme from 'theme';

import { calculateRate } from './rate';
// ----------
// Style
// ----------

const Container = styled.div``;

const ListRow = styled.div`
  color: ${theme.lightForegroundColor};
  border-bottom: 1px solid ${theme.borderColor};

  padding-bottom: 1rem;
  padding-top: 1rem;
  font-size: ${theme.textSmallSize};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .column {
    width: 12.5%;
  }

  .action {
    text-align: right;
    text-transform: uppercase;
  }

  .openPrice, .amount {

  }
  .direction {
    text-transform: uppercase;
  }
`;

// ----------
// Interface
// ----------
export interface Props {
  amount: string;
  openPrice: string;
  pair: string;
  closePrice: string;
  closeOwnerAmount: string;
}

// ----------

const OpenTrade: React.FC<Props> = ({
  amount,
  openPrice,
  closePrice,
  closeOwnerAmount,
  pair,
}) => {
  // TODO: Fix type
  const tradingPair: any = findTradingPairByAddress(pair);
  const symbolInfo: any = findTradingSybmolByPairAddress(pair);

  const { symbol: tradingSymbol, direction } = symbolInfo;
  const openRate = calculateRate(0, tradingSymbol.inverted, direction, Number(openPrice));
  const closeRate = calculateRate(0, tradingSymbol.inverted, direction, Number(closePrice));
  const profit = Number(closeOwnerAmount) - Number(amount);

  return (
    <Container>
      <ListRow>
        <div className="column pair">
          {tradingSymbol.name}
        </div>

        <div className="column direction">
          { direction }
        </div>

        <div className="column lerverage">
          { Math.abs(Number(tradingPair.leverage)) }×
        </div>

        <div className="column amount">
          <FormatProfit value={amount} />
        </div>

        <div className="column openPrice">
          <FormatRate value={openRate} options={{ mantissa: tradingSymbol.precision }} />
        </div>

        <div className="column closePrice">
          <FormatRate value={closeRate} options={{ mantissa: tradingSymbol.precision }} />
        </div>

        <div className="column profit">
          <FormatProfit value={profit} />
        </div>

        <div className="column action">
            Closed
        </div>


      </ListRow>
    </Container>
  );
};

export default OpenTrade;

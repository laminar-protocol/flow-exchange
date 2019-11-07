import React from 'react';
import styled from 'styled-components';

import { FormatBalance, FormatPrice } from 'components/format';

import { findTradingPairByAddress, findTradingSybmolByPairAddress } from 'config';
import * as theme from 'theme';

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
}

// ----------

const OpenTrade: React.FC<Props> = ({
  amount,
  openPrice,
  closePrice,
  pair,
}) => {
  // TODO: Fix type
  const tradingPair: any = findTradingPairByAddress(pair);
  const symbolInfo: any = findTradingSybmolByPairAddress(pair);

  const { symbol: tradingSymbol, direction } = symbolInfo;

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
          <FormatBalance value={amount} />
        </div>

        <div className="column openPrice">
          <FormatPrice value={openPrice} options={{ mantissa: tradingSymbol.sp }} />
        </div>

        <div className="column closePrice">
          <FormatPrice value={closePrice} options={{ mantissa: tradingSymbol.sp }} />
        </div>

        <div className="column profit">
          &nbsp;
        </div>

        <div className="column action">
            Closed
        </div>


      </ListRow>
    </Container>
  );
};

export default OpenTrade;

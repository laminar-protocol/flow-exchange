import React from 'react';
import styled from 'styled-components';

import {
  LightButton,
} from 'components';
import { FormatProfit, FormatRate } from 'components/format';

import { usePriceRate } from 'hooks/useOraclePrice';
import { findTradingPairByAddress, findTradingSybmolByPairAddress } from 'config';
import * as theme from 'theme';
import { calculateRate } from './rate';

// ----------
// Style
// ----------

const Container = styled.div``;

const ListRow = styled.div`
  color: ${theme.foregroundColor};
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

  .profit {
    font-weight: ${theme.boldWeight};
    text-align: right;
  }

  .direction {
    text-transform: uppercase;
  }
`;

// ----------
// Interface
// ----------
export interface OwnProps {
  amount: string;
  closeSpread: string;
  liquidationFee: string;
  liquidityPool: string;
  openPrice: string;
  pair: string;
  positionId: number;
}

export interface StateProps {
  isEnabled: boolean;
  isOpening: boolean;
  isClosing: boolean;
  account: string;
  onClosePosition: (name: string, id: string) => void;
}

type Props = OwnProps & StateProps;

// ----------

const OpenTrade: React.FC<Props> = ({
  amount,
  closeSpread,
  liquidationFee,
  openPrice,
  pair,
  positionId,
  isEnabled,
  isOpening,
  isClosing,
  onClosePosition,
}) => {
  // TODO: Fix type
  const tradingPair: any = findTradingPairByAddress(pair);
  const symbolInfo: any = findTradingSybmolByPairAddress(pair);

  const { symbol: tradingSymbol, direction } = symbolInfo;
  const { data: rate } = usePriceRate(tradingPair.quote, tradingPair.base);
  const openRate = calculateRate(0, tradingSymbol.inverted, direction, Number(openPrice));

  // TODO: Refactor and common inverted logics
  let profit;
  if (rate) {
    if (tradingSymbol.inverted) {
      const closeRate = rate * (1.0 + Number(closeSpread));
      const percent = (closeRate - Number(openPrice)) / Number(openPrice);
      profit = -(percent * (Number(amount) - Number(liquidationFee)) * Number(tradingPair.leverage));
    } else {
      const closeRate = rate * (1.0 - Number(closeSpread));
      const percent = (closeRate - Number(openPrice)) / Number(openPrice);
      profit = percent * (Number(amount) - Number(liquidationFee)) * Number(tradingPair.leverage);
    }
  }

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
          &nbsp;
        </div>

        <div className="column profit">
          { profit ? <FormatProfit value={profit} /> : '—' }
        </div>
        <div className="column action">
          <LightButton
            size="small"
            disabled={!isEnabled || (isClosing || isOpening)}
            onClick={() => { onClosePosition(tradingPair.symbol, positionId.toString()); }}
          >
            Close
          </LightButton>
        </div>


      </ListRow>
    </Container>
  );
};

export default OpenTrade;

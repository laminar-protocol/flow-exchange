import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import { usePriceRate } from '../../hooks';
import { tradingSymbols, tradingPairs, liquidityPools } from '../../config';
import { FormatRate } from '../../components';
import * as theme from '../../theme';

import { calculateRate } from './rate';

interface RowProps {
  highlight?: boolean;
}

const SymbolRow = styled.div<RowProps>`
  color: ${theme.foregroundColor};
  background-color: ${props => (props.highlight ? theme.backgroundColor : 'transparent')};

  border-bottom: 1px solid ${theme.borderColor};

  padding-bottom: 1rem;
  padding-top: 1rem;
  font-size: ${theme.textNormalSize};

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .symbol {
    width: 30%;
  }

  .bid,
  .ask {
    width: 35%;
    text-align: right;
    font-variant-numeric: tabular-nums;
    font-weight: ${theme.boldWeight};
  }
`;

// ----------
// Interface
// ----------

interface Props {
  symbol: string;
  pool: string;
}

// ----------

const Symbol: React.FC<Props> = ({ symbol, pool }) => {
  const { tradingSymbol: selectedSymbol } = useParams();

  // TODO: Fix type
  const tradingSymbol = (tradingSymbols as any)[symbol];
  const liquidityPool = (liquidityPools as any)[pool];
  const tradingPair = (tradingPairs as any)[tradingSymbol.long];

  const { data: rate } = usePriceRate(tradingPair.quote, tradingPair.base);

  return (
    <Link to={`/margin/${liquidityPool.key}/${tradingSymbol.name}`}>
      <SymbolRow highlight={tradingSymbol.name === selectedSymbol}>
        <div className="symbol">{tradingSymbol.name}</div>
        <div className="bid">
          <FormatRate
            value={calculateRate(liquidityPool.spread, tradingSymbol.inverted, 'bid', rate)}
            options={{ mantissa: tradingSymbol.precision }}
          />
        </div>
        <div className="ask">
          <FormatRate
            value={calculateRate(liquidityPool.spread, tradingSymbol.inverted, 'ask', rate)}
            options={{ mantissa: tradingSymbol.precision }}
          />
        </div>
      </SymbolRow>
    </Link>
  );
};

export default Symbol;

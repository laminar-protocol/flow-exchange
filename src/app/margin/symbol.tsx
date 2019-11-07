import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import { usePriceRate } from 'hooks/useOraclePrice';
import { tradingSymbols, tradingPairs, liquidityPools } from 'config';
import * as theme from 'theme';

import { formatRate } from './format';

interface RowProps {
  highlight?: boolean;
}

const SymbolRow = styled.div<RowProps>`
  color: ${theme.foregroundColor};
  background-color: ${(props) => (props.highlight ? theme.backgroundColor : 'transparent')};

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

  .bid, .ask {
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

  const { loading, data } = usePriceRate(tradingPair.quote, tradingPair.base);

  return (
    <Link to={`/margin/${liquidityPool.key}/${tradingSymbol.name}`}>
      <SymbolRow highlight={tradingSymbol.name === selectedSymbol}>
        <div className="symbol">
          {tradingSymbol.name}
        </div>
        <div className="bid">
          { (loading || !data) ? '—' : formatRate(data, liquidityPool.spread, tradingSymbol.prefixUSD, tradingSymbol.isJPY, 'bid') }
        </div>
        <div className="ask">
          { (loading || !data) ? '—' : formatRate(data, liquidityPool.spread, tradingSymbol.prefixUSD, tradingSymbol.isJPY, 'ask') }
        </div>
      </SymbolRow>
    </Link>
  );
};

export default Symbol;

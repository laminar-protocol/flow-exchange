import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { Panel } from 'components';
import * as theme from 'theme';
import { tradingSymbols, liquidityPools } from 'config';

import Symbol from './symbol';
import Pool from './pool';

const Container = styled(Panel)`
  flex: 1;
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const SymbolContainer = styled.div``;

const PoolContainer = styled.div`
  margin-top: 2rem;
`;

const SymbolHeader = styled.div`
  color: ${theme.lightForegroundColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  border-bottom: 1px solid ${theme.borderColor};
  padding-bottom: 1rem;

  .symbol,
  .bid,
  .ask {
    font-weight: ${theme.boldWeight};
    text-transform: uppercase;
  }

  .symbol {
    width: 30%;
  }
  .bid,
  .ask {
    width: 35%;
    text-align: right;
  }
`;

const PoolHeader = styled.div`
  color: ${theme.lightForegroundColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  border-bottom: 1px solid ${theme.borderColor};
  padding-bottom: 1rem;

  .pool,
  .available {
    font-weight: ${theme.boldWeight};
    text-transform: uppercase;
  }

  .pool {
    width: 65%;
  }
  .available {
    width: 35%;
    text-align: right;
  }
`;

// ----------

const SymbolList: React.FC = () => {
  const symbols = Object.keys(tradingSymbols);
  const pools = Object.keys(liquidityPools);

  const { tradingSymbol: selectedSymbol, pool: selectedPool } = useParams();
  if (!selectedSymbol || !selectedPool) {
    return null;
  }

  return (
    <Container padding={0}>
      <SymbolContainer>
        <SymbolHeader>
          <div className="symbol">Symbol</div>
          <div className="bid">Bid</div>
          <div className="ask">Ask</div>
        </SymbolHeader>
        {symbols.map(symbol => (
          <Symbol key={symbol} symbol={symbol} pool={selectedPool} />
        ))}
      </SymbolContainer>
      <PoolContainer>
        <PoolHeader>
          <div className="pool">Liquidity Pool</div>
          <div className="available">Available</div>
        </PoolHeader>
        {pools.map(pool => (
          <Pool key={pool} pool={pool} symbol={selectedSymbol} />
        ))}
      </PoolContainer>
    </Container>
  );
};

export default SymbolList;

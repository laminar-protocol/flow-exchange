import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import { liquidityPools } from 'config';
import { FormatBalance } from 'components/format';
import * as theme from 'theme';

interface RowProps {
  highlight?: boolean;
}

const PoolRow = styled.div<RowProps>`
  color: ${theme.foregroundColor};
  background-color: ${(props) => (props.highlight ? theme.backgroundColor : 'transparent')};

  border-bottom: 1px solid ${theme.borderColor};

  padding-bottom: 1rem;
  padding-top: 1rem;
  font-size: ${theme.textNormalSize};

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .pool {
    width: 65%;
  }

  .available {
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

const LiquidityPool: React.FC<Props> = ({ symbol, pool }) => {
  const { pool: selectedPool } = useParams();

  // TODO: Fix type
  const liquidityPool = (liquidityPools as any)[pool];

  return (
    <Link to={`/margin/${liquidityPool.key}/${symbol}`} key={liquidityPool.key}>
      <PoolRow highlight={liquidityPool.key === selectedPool}>
        <div className="symbol">
          {liquidityPool.name}
        </div>
        <div className="ask">
          <FormatBalance value={liquidityPool.availability} options={{ currencySymbol: '$' }} />
        </div>
      </PoolRow>
    </Link>
  );
};

export default LiquidityPool;

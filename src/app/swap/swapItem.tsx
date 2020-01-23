import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Text, FormatBalance } from '../../components';
import { tokens, explorer } from '../../config';
import * as theme from '../../theme';

const Line = styled.div`
  margin: 0.75rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${theme.borderColor};
  padding-bottom: 0.75rem;

  ${theme.respondTo.sm`
    flex-direction: column;
    align-items: flex-start;
  `};
`;

const Symbol = styled.div`
  width: 35%;
  ${theme.respondTo.sm`
    width: 100%;
  `};
`;

const Amount = styled.div`
  width: 35%;
  ${theme.respondTo.sm`
    width: 100%;
  `};
`;

const Timestamp = styled.div`
  width: 25%;
  ${theme.respondTo.sm`
    width: 100%;
  `};
`;

const View = styled.div`
  width: 5%;
  text-align: right;
  ${theme.respondTo.sm`
    width: 100%;
  `};
`;

// ----------
// Interface
// ----------
export interface StateProps {
  tx: string;
  kind: string;
  baseTokenAmount: string;
  flowTokenAmount: string;
  timestamp: number;
  symbol: TokenSymbol;
}

// ----------

const SwapItem: React.FC<StateProps> = ({ tx, kind, baseTokenAmount, flowTokenAmount, timestamp, symbol }) => {
  const { name, currencySymbol } = tokens[symbol];
  const { name: baseTokenName, currencySymbol: baseTokenCurrencySymbol } = tokens.DAI;
  const date = new Date(timestamp * 1000);
  const isMint = kind === 'Minted';
  return (
    <Line>
      <Symbol>
        <Text>{isMint ? `${baseTokenName} → ${name}` : `${name} → ${baseTokenName}`}</Text>
      </Symbol>
      <Amount>
        <Text>
          {isMint ? (
            <>
              <FormatBalance value={baseTokenAmount} options={{ prefix: baseTokenCurrencySymbol }} />
              &nbsp;→&nbsp;
              <FormatBalance value={flowTokenAmount} options={{ prefix: currencySymbol }} />
            </>
          ) : (
            <>
              <FormatBalance value={flowTokenAmount} options={{ prefix: currencySymbol }} />
              &nbsp;→&nbsp;
              <FormatBalance value={baseTokenAmount} options={{ prefix: baseTokenCurrencySymbol }} />
            </>
          )}
        </Text>
      </Amount>
      <Timestamp>
        <Text light>{date.toLocaleString()}</Text>
      </Timestamp>
      <View>
        <Text>
          <a href={`${explorer}/tx/${tx}`} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon="external-link-alt" />
          </a>
        </Text>
      </View>
    </Line>
  );
};

export default SwapItem;

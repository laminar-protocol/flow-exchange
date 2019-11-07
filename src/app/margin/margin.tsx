import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import {
  Text, Panel, Switch,
} from 'components';
import * as theme from 'theme';
import { tradingSymbols } from 'config';

import BalanceLine from 'app/balanceLine/balanceLine.connect';
import ChartWidget from 'app/chartWidget/chartWidget';

import SymbolList from './symbolList';
import Trade from './trade.connect';
import TradeList from './tradeList.connect';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SummaryPanel = styled(Panel)`
  display: flex;
  align-items: center;
`;

const SummaryHeader = styled.div`
  flex: 1;
  ${theme.respondTo.md`
    display: none;
  `};
`;

const AccountSummary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  ${theme.respondTo.md`
    flex: 1;
    justify-content: space-between;
  `};
`;

const SummaryCell = styled.div`
  .header {
    margin-bottom:  0.5rem;
    text-transform:  uppercase;
  }

  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: flex-end;

  margin-left: 1.5rem;
  padding-left: 1.5rem;
  border-left: 1px solid ${theme.borderColor};

  &:first-child {
    border-left: 0;
  }
`;

const MainPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MarketPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 2rem 0;
  min-height: 50vh;


  ${theme.respondTo.lg`
    flex-direction: column;
  `};

`;

const Chart = styled.div`
  flex: 1;
  align-self: stretch;
  display: flex;
  ${theme.respondTo.lg`
    min-height: 30vh;
  `};

`;

const MarketList = styled.div`
  width: 30%;
  margin-left: 2rem;
  display: flex;
  align-self: stretch;

  ${theme.respondTo.lg`
    width: auto;
    margin-top: 2rem;
    margin-left: 0;
  `};
`;

const TradePanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  ${theme.respondTo.lg`
    flex-direction: column-reverse;
  `};
`;

const TradeView = styled(Panel)`
  flex: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
`;

const TradeControl = styled(Panel)`
  width: 30%;
  margin-left: 2rem;
  ${theme.respondTo.lg`
    width: 100%;
    margin-bottom: 2rem;
    margin-left: 0;
  `};
`;

// ----------
// Interface
// ----------

interface Props {
  currentTheme: string;

  isEnabled: boolean;
  isLoadingAllowance: boolean;
  isGranting: boolean;
  allowance: string;

  onGrant: (enable: boolean) => void;
}

// ----------

const Margin: React.FC<Props> = ({
  currentTheme,
  isEnabled,
  isLoadingAllowance,
  isGranting,
  onGrant,
}) => {
  // ----------
  // URL
  // ----------
  // TODO: Refactor
  let { tradingSymbol: symbol, pool } = useParams();
  if (!symbol) {
    symbol = 'EURUSD';
  }
  if (!pool) {
    pool = 'POOL1';
  }
  const tradingSymbol = (tradingSymbols as any)[symbol];

  return (
    <Container>
      <SummaryPanel>
        <SummaryHeader>
          <Text size="l">
            Acccount Summary
          </Text>
        </SummaryHeader>
        <AccountSummary>
          <SummaryCell>
            <div className="header">
              <Text light>
                Balance
              </Text>
            </div>
            <div>
              <BalanceLine symbol="DAI" lite />
            </div>
          </SummaryCell>

          <SummaryCell>
            <div className="header">
              <Text light>
                Enable Trading
              </Text>
            </div>
            <div>
              <Switch
                checked={isEnabled}
                disabled={isLoadingAllowance || isGranting}
                onClick={() => { onGrant(!isEnabled); }}
              />
            </div>
          </SummaryCell>

        </AccountSummary>
      </SummaryPanel>
      <MainPanel>
        <MarketPanel>
          <Chart>
            <ChartWidget symbol={tradingSymbol.chartSymbol} currentTheme={currentTheme} />
          </Chart>
          <MarketList>
            <SymbolList />
          </MarketList>
        </MarketPanel>
        <TradePanel>
          <TradeView>
            <TradeList />
          </TradeView>
          <TradeControl>
            <Trade symbol={symbol} pool={pool} />
          </TradeControl>
        </TradePanel>
      </MainPanel>
    </Container>
  );
};

export default Margin;

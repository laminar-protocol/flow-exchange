import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Panel, Switch, Text } from '../../components';
import { tradingSymbols } from '../../config';
import { useDispatch, useShallowEqualSelector } from '../../hooks';
import * as theme from '../../theme';
import { actions } from '../../types';
import ChartWidget from '../chartWidget/chartWidget';
import SymbolList from './symbolList';
import Trade from './trade';
import TradeList from './tradeList';

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
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: flex-end;

  margin-left: 1.5rem;
  padding-left: 1.5rem;
  border-left: 1px solid ${theme.borderColor};

  ${theme.respondTo.md`
    align-items: flex-start;
    margin-left: 0;
    padding-left: 0;
    border-left: 0;
  `};

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

export type StateProps = {
  currentTheme: string;

  isEnabled: boolean;
  isLoadingAllowance: boolean;
  isGranting: boolean;
};

// ----------

const Margin: React.FC = () => {
  const dispatch = useDispatch();

  const { currentTheme, isEnabled, isLoadingAllowance, isGranting } = useShallowEqualSelector<AppState, StateProps>(
    ({ margin: { allowance, trading }, setting: { currentTheme } }: AppState) => {
      const allowanceValue = allowance.value || 0;
      return {
        currentTheme,
        isEnabled: allowanceValue > 0,
        isLoadingAllowance: allowance.loading,
        isGranting: trading.loading,
      };
    },
  );

  useEffect(() => {
    dispatch(actions.margin.allowance.requested());
    return () => {
      dispatch(actions.margin.allowance.cancelled());
    };
  }, [dispatch]);

  const onGrant = useCallback(
    (enable: boolean) => {
      dispatch(actions.margin.toggleTrading.requested({ params: enable }));
    },
    [dispatch],
  );

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
          <Text size="l">Margin Trading</Text>
        </SummaryHeader>
        <AccountSummary>
          <SummaryCell>
            <div className="header">
              <Text light>Balance</Text>
            </div>
            <div>{/* <BalanceLine symbol="DAI" lite /> */}</div>
          </SummaryCell>

          <SummaryCell>
            <div className="header">
              <Text light>Enable Trading</Text>
            </div>
            <div>
              <Switch
                checked={isEnabled}
                disabled={isLoadingAllowance || isGranting}
                onClick={() => {
                  onGrant(!isEnabled);
                }}
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

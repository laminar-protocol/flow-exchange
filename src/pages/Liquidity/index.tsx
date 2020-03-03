import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  Panel,
  PrimaryButton,
  SegmentedControl,
  SegmentedControlItem,
  Separator,
  TabPane,
  Tabs,
  Text,
} from '../../components';
import { getIsReady, useApp } from '../../hooks/useApp';
import { getPoolOptions, usePools } from '../../hooks/usePools';
import { theme } from '../../styles';
import Layout from '../Layout';
import LiquidityProvider from './LiquidityProvider';

const Liquidity: React.FC = () => {
  const [filterType, setFilterType] = useState<'swap' | 'trade'>('swap');
  const isReady = useApp(getIsReady);
  const tradingPairs = useApp(state => state.tradingPairs);
  const tokens = useApp(state => state.tokens);
  const pools = usePools(state => state.pools);
  const updatePoolTokenOptionsByToken = usePools(state => state.updatePoolTokenOptionsByToken);

  const [tabs, setTabs] = useState<{ name: string; key: string }[]>([]);
  const [activeTabKey, setActiveTabKey] = useState<typeof tokens[number]['id'] | ''>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tokens && tokens.length) {
      // console.log(tokens)
      setActiveTabKey(tokens[0].id);
    }
  }, [tokens, setActiveTabKey]);

  useEffect(() => {
    if (!isReady || !activeTabKey) return;
    if (filterType === 'swap') {
      setLoading(true);
      updatePoolTokenOptionsByToken(activeTabKey).finally(() => setLoading(false));
    }
  }, [activeTabKey, filterType, isReady]);

  useEffect(() => {
    if (filterType === 'swap') {
      setTabs(
        tokens.map(token => ({
          name: token.name,
          key: token.id,
        })),
      );
    } else if (filterType === 'trade') {
      setTabs([]);
    }
  }, [filterType, tokens, tradingPairs]);

  return (
    <Layout>
      <Container>
        <p>
          <Text size="h">Liquidity Pools</Text>
        </p>
        <Separator />
        <Panel>
          <div className="liquidity__control">
            <div className="liquidity__radio">
              <SegmentedControl buttonStyle="solid" value={filterType} onChange={e => setFilterType(e.target.value)}>
                <SegmentedControlItem value="swap">fToken Swap</SegmentedControlItem>
                <SegmentedControlItem value="trade">Margin Trade</SegmentedControlItem>
              </SegmentedControl>
            </div>

            <Tabs
              activeKey={activeTabKey}
              onTabClick={(tabKey: any) => {
                setActiveTabKey(tabKey);
              }}
            >
              {tabs.map(({ name, key }) => (
                <TabPane tab={name} key={key} />
              ))}
            </Tabs>
          </div>
          {pools &&
            activeTabKey &&
            pools.map(pool => <LiquidityProvider key={pool.id} pool={pool} tokenId={activeTabKey} loading={loading} />)}
        </Panel>
        <Separator />
        {/* <Action> */}
        {/* <PrimaryButton disabled>Provide Liquidity</PrimaryButton> */}
        {/* </Action> */}
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  .liquidity__control {
    display: flex;
    margin-bottom: 30px;
    ${theme.respondTo.lg`
      flex-direction: column;
      margin-bottom: 16px;
    `}
  }
  .liquidity__radio {
    max-width: 500px;
    margin-top: 10px;
    margin-right: 16px;
  }
`;

export default Liquidity;

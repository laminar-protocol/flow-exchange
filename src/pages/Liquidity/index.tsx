import React, { useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

import {
  Col,
  Panel,
  Row,
  SegmentedControl,
  SegmentedControlItem,
  Separator,
  SolidButton,
  TabPane,
  Tabs,
  Title,
} from '../../components';
import { isReadySelector, useApp } from '../../store/useApp';
import { poolsSelector, usePools } from '../../store/usePools';
import LiquidityProvider from './LiquidityProvider';
import RenderAddPool from './RenderAddPool';

const Liquidity: React.FC = () => {
  const classes = useStyles();

  const sss = useCallback((state: any) => {
    return poolsSelector(state);
  }, []);

  const [filterType, setFilterType] = useState<'swap' | 'trade'>('swap');
  const isReady = useApp(isReadySelector);
  const tradingPairs = useApp(state => state.tradingPairs);
  const tokens = useApp(state => state.tokens);
  const pools = usePools(sss);
  const updatePoolTokenOptionsByToken = usePools(state => state.updatePoolTokenOptionsByToken);

  const [tabs, setTabs] = useState<{ name: string; key: string }[]>([]);
  const [activeTabKey, setActiveTabKey] = useState<typeof tokens[number]['id'] | ''>('');
  const [loading, setLoading] = useState(false);
  const [addPoolVisible, setAddPoolVisible] = useState(false);

  useEffect(() => {
    if (tokens && tokens.length) {
      setActiveTabKey(tokens[0].id);
    }
  }, [tokens, setActiveTabKey]);

  useEffect(() => {
    if (!isReady || !activeTabKey) return;
    if (filterType === 'swap') {
      setLoading(true);
      updatePoolTokenOptionsByToken(activeTabKey).finally(() => setLoading(false));
    }
  }, [activeTabKey, filterType, isReady, updatePoolTokenOptionsByToken]);

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
    <div>
      <Title type="page">Liquidity Pools</Title>
      <Separator />
      <Panel>
        <div className={classes.control}>
          <div className={classes.radio}>
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
          pools.map(pool => (
            <LiquidityProvider key={pool.id + pool.name} pool={pool} tokenId={activeTabKey} loading={loading} />
          ))}
      </Panel>
      <Separator />
      <Row justify="end" gutter={24}>
        <Col>
          <SolidButton onClick={() => setAddPoolVisible(true)}>
            <Link to={`/liquidity/new`}>Create A Pool</Link>
          </SolidButton>
        </Col>
        <Col>
          <SolidButton onClick={() => setAddPoolVisible(true)}>Add Existing Pool</SolidButton>
        </Col>
      </Row>
      <RenderAddPool
        visible={addPoolVisible}
        onCancel={() => {
          setAddPoolVisible(false);
        }}
        onOk={() => {
          setAddPoolVisible(false);
        }}
      />
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  control: {
    display: 'flex',
    marginBottom: 30,
    [theme.breakpoints.down('lg')]: {
      flexdirection: 'column',
      marginbottom: '16px',
    },
  },
  radio: {
    maxWidth: 500,
    marginTop: 10,
    marginRight: 16,
  },
}));

export default Liquidity;

import React, { useMemo, useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import {
  AmountInput,
  DefaultButton,
  Panel,
  RadioButton,
  RadioGroup,
  Row,
  Select,
  Space,
  Text,
  OraclePrice,
} from '../../components';
import { AppState } from '../../store/useApp';
import { useCurrentAccount, useApi, useTradingPair } from '../../hooks';
import { getLeverageEnable, notificationHelper, toPrecision } from '../../utils';

type RenderTradeProps = {
  poolInfo: AppState['margin']['poolInfo']['string'];
  pairId: string;
};

const RenderTrade: React.FC<RenderTradeProps> = ({ poolInfo, pairId }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [amount, setAmount] = useState('');

  const [mode, setMode] = useState<'basic' | 'advanced'>('basic');
  const [leverage, setLeverage] = useState('');
  const [actionLoading, setActionLoading] = useState('');
  const api = useApi();
  const account = useCurrentAccount();
  const pairInfo = useTradingPair(poolInfo?.poolId, pairId);

  const leverages = useMemo(() => {
    return pairInfo ? getLeverageEnable(pairInfo.enabledTrades) : {};
  }, [pairInfo]);

  // set default leverage
  useLayoutEffect(() => {
    if (Object.keys(leverages).length && !leverage) {
      setLeverage(Object.keys(leverages)[0]);
    }
  }, [leverages, leverage]);

  const openPosition = async (direction: 'ask' | 'bid') => {
    if (!amount || !api.margin?.openPosition || !poolInfo.poolId || !pairInfo?.pair || !leverages[leverage][direction])
      return;
    try {
      setActionLoading(direction);
      await notificationHelper(
        api.margin.openPosition(
          account.address,
          poolInfo.poolId,
          pairInfo.pair as any,
          leverages[leverage][direction] as any,
          toPrecision(amount),
          direction === 'ask' ? toPrecision('1000000000') : toPrecision('0'),
        ),
      );
      setAmount('');
    } finally {
      setActionLoading('');
    }
  };

  return (
    <Panel className={classes.container}>
      <Space direction="vertical" size={16}>
        <RadioGroup value={mode} onChange={e => setMode(e.target.value)}>
          <RadioButton value="basic">
            <Text className={classes.radioButton}>Basic</Text>
          </RadioButton>
          <RadioButton value="advanced" disabled>
            <Text className={classes.radioButton}>Advanced</Text>
          </RadioButton>
        </RadioGroup>
        <Row align="middle" justify="space-between">
          <Text>{pairId}</Text>
          <Select
            value={leverage}
            style={{ width: '12rem' }}
            onSelect={value => setLeverage(value as string)}
            disabled={!Object.keys(leverages).length}
          >
            {Object.keys(leverages).map(label => (
              <Select.Option value={label} key={label}>
                {label}
              </Select.Option>
            ))}
          </Select>
        </Row>
        <AmountInput
          value={amount}
          placeholder="Amount"
          className={classes.input}
          onChange={event => setAmount(event.target.value)}
        />
        <div className={classes.actions}>
          <div className={classes.actionItem}>
            <DefaultButton
              loading={actionLoading === 'ask'}
              className={classes.buyButton}
              onClick={() => openPosition('ask')}
              tooltip={!leverages[leverage]?.ask ? 'NOT SUPPORT' : ''}
              disabled={!leverages[leverage]?.ask}
            >
              {t('Buy')}
            </DefaultButton>
            {pairInfo ? (
              <OraclePrice
                baseTokenId={pairInfo.pair.base}
                quoteTokenId={pairInfo.pair.quote}
                spread={pairInfo.askSpread}
                direction="ask"
              />
            ) : null}
          </div>
          <div className={classes.actionItem}>
            <DefaultButton
              loading={actionLoading === 'bid'}
              className={classes.sellButton}
              onClick={() => openPosition('bid')}
              tooltip={!leverages[leverage]?.bid ? 'NOT SUPPORT' : ''}
              disabled={!leverages[leverage]?.bid}
            >
              {t('Sell')}
            </DefaultButton>
            {pairInfo ? (
              <OraclePrice
                baseTokenId={pairInfo.pair.base}
                quoteTokenId={pairInfo.pair.quote}
                spread={pairInfo.bidSpread}
                direction="bid"
              />
            ) : null}
          </div>
        </div>
      </Space>
    </Panel>
  );
};

const useStyles = createUseStyles(theme => ({
  container: {
    padding: '1.5rem',
  },
  radioButton: {
    padding: '0.7rem',
  },
  input: {
    width: '100%',
    'font-size': '1rem',
  },
  buyButton: {
    '&.ant-btn, &.ant-btn:hover, &.ant-btn:focus, &.ant-btn:active': {
      border: 0,
      fontWeight: theme.boldWeight,
      color: theme.alwaysWhiteForegroundColor,
      background: '#10b887',
    },
  },
  sellButton: {
    '&.ant-btn, &.ant-btn:hover, &.ant-btn:focus, &.ant-btn:active': {
      border: 0,
      fontWeight: theme.boldWeight,
      color: theme.alwaysWhiteForegroundColor,
      background: '#fa5352',
    },
  },
  actionItem: {
    display: 'flex',
    flex: 1,
    'flex-direction': 'column',
    'justify-content': 'space-between',
    'text-align': 'center',
    '&:not(:last-child)': {
      'margin-right': '2rem',
    },
  },
  actions: {
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    width: '100%',
    '& $buyButton,& $sellButton': {
      flex: 1,
      'margin-bottom': '0.5rem',
    },
  },
}));

export default RenderTrade;

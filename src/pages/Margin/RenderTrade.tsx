import React, { useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import {
  AmountInput,
  DefaultButton,
  OraclePrice,
  Panel,
  RadioButton,
  RadioGroup,
  Row,
  Select,
  Space,
  Text,
  Description,
  Amount,
} from '../../components';
import { useApi, useCurrentAccount, useTradingPair } from '../../hooks';
import { MarginPoolsState } from '../../store/useMarginPools';
import { getLeverageEnable, notificationHelper, toPrecision } from '../../utils';
import useMarginEnable from './hooks/useMarginEnable';

type RenderTradeProps = {
  poolInfo: MarginPoolsState['poolInfo']['string'];
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
  const allowanceEnable = useMarginEnable();

  const leverages = useMemo(() => {
    return pairInfo ? getLeverageEnable(pairInfo.enabledTrades) : {};
  }, [pairInfo]);

  // set default leverage
  useLayoutEffect(() => {
    if (Object.keys(leverages).length && !leverage) {
      setLeverage(Object.keys(leverages)[0]);
    }
  }, [leverages, leverage]);

  const buyDisabledTip = useMemo(() => {
    if (!allowanceEnable) {
      return 'NOT ENABLED';
    }
    if (!leverages[leverage]?.ask) {
      return 'NOT SUPPORTED';
    }
    return '';
  }, [allowanceEnable, leverages, leverage]);

  const sellDisabledTip = useMemo(() => {
    if (!allowanceEnable) {
      return 'NOT ENABLED';
    }
    if (!leverages[leverage]?.bid) {
      return 'NOT SUPPORTED';
    }
    return '';
  }, [allowanceEnable, leverages, leverage]);

  const openPosition = async (direction: 'ask' | 'bid') => {
    if (!amount || !api.margin?.openPosition || !poolInfo.poolId || !pairInfo?.pair || !leverages[leverage][direction])
      return;
    try {
      setActionLoading(direction);
      await notificationHelper(
        api.margin.openPosition(
          account.address,
          poolInfo.poolId,
          pairInfo.pair,
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
        <RadioGroup value={mode} size="large" onChange={e => setMode(e.target.value)}>
          <RadioButton value="basic">
            <Text>Basic</Text>
          </RadioButton>
          <RadioButton value="advanced" disabled>
            <Text>Advanced</Text>
          </RadioButton>
        </RadioGroup>
        <Row align="middle" justify="space-between">
          <Text>{pairId}</Text>
          <Select
            value={leverage}
            onSelect={value => setLeverage(value as string)}
            disabled={!Object.keys(leverages).length}
            className={classes.selectLeverge}
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
          tokenId={pairInfo?.pair.base}
          showSuffix={true}
          className={classes.input}
          onChange={event => setAmount(event.target.value)}
        />
        <div className={classes.actions}>
          <div className={classes.actionItem}>
            <Description label={`${t('Price')}: `} space="0">
              {pairInfo ? (
                <OraclePrice
                  baseTokenId={pairInfo.pair.base}
                  quoteTokenId={pairInfo.pair.quote}
                  spread={pairInfo.askSpread}
                  direction="ask"
                  render={(price: number) => (
                    <Amount
                      value={price}
                      tokenId={pairInfo.pair.quote}
                      withPrecision={true}
                      mantissa={5}
                      hasPostfix={true}
                    />
                  )}
                />
              ) : null}
            </Description>
            <DefaultButton
              size="large"
              loading={actionLoading === 'ask'}
              className={classes.buyButton}
              onClick={() => openPosition('ask')}
              tooltip={buyDisabledTip}
              disabled={!!buyDisabledTip}
            >
              {t('Buy/Long')}
            </DefaultButton>
          </div>
          <div className={classes.actionItem}>
            <Description label={`${t('Price')}: `} space="0">
              {pairInfo ? (
                <OraclePrice
                  baseTokenId={pairInfo.pair.base}
                  quoteTokenId={pairInfo.pair.quote}
                  spread={pairInfo.bidSpread}
                  direction="bid"
                  render={(price: number) => (
                    <Amount
                      value={price}
                      tokenId={pairInfo.pair.quote}
                      withPrecision={true}
                      mantissa={5}
                      hasPostfix={true}
                    />
                  )}
                />
              ) : null}
            </Description>
            <DefaultButton
              size="large"
              loading={actionLoading === 'bid'}
              className={classes.sellButton}
              onClick={() => openPosition('bid')}
              tooltip={sellDisabledTip}
              disabled={!!sellDisabledTip}
            >
              {t('Sell/Short')}
            </DefaultButton>
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
  input: {
    width: '100%',
  },
  buyButton: {
    '&.ant-btn, & .ant-btn': {
      border: 0,
      width: '100%',
      fontWeight: theme.boldWeight,
      color: theme.alwaysWhiteForegroundColor,
      background: '#10b887',
    },
  },
  sellButton: {
    '&.ant-btn, &.ant-btn:hover, & .ant-btn, & .ant-btn:hover': {
      border: 0,
      width: '100%',
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
    '& > *': {
      'margin-bottom': '0.5rem',
    },
  },
  selectLeverge: {
    width: '10rem',
  },
  actions: {
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    width: '100%',
    '& $buyButton,& $sellButton': {
      flex: 1,
    },
  },
}));

export default RenderTrade;

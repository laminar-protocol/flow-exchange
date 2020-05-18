import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import {
  Amount,
  AmountInput,
  DefaultButton,
  Description,
  OraclePrice,
  Panel,
  RadioButton,
  RadioGroup,
  Row,
  Select,
  Space,
  Text,
} from '../../components';
import { useApi, useCurrentAccount, useTraderInfo, useTradingPair } from '../../hooks';
import { TraderPairOptions } from '../../services';
import { useLoadTraderInfo, useLoadPoolInfo } from '../../store/useMarginPools';
import { getLeverageEnable, notificationHelper, toPrecision } from '../../utils';
import useMarginEnableStore from './hooks/useMarginEnable';
import BN from 'bn.js';

type TradeDataProps = {
  type: 'price' | 'cost' | 'max';
  data?: TraderPairOptions;
  direction: 'ask' | 'bid';
  extra: {
    leverage?: string;
    amount?: string;
    freeMargin?: string;
  };
};

const TradeInfoItem: React.FC<TradeDataProps> = ({
  direction,
  type,
  data,
  extra: { leverage, freeMargin, amount },
}) => {
  const { t } = useTranslation();

  const spread = direction === 'ask' ? data?.askSpread : data?.bidSpread;

  const render = useCallback(
    (price: number) => {
      if (!data) return;

      if (type === 'price') {
        return <Amount value={toPrecision(price)} tokenId={data.pair.quote} mantissa={5} hasPostfix={true} />;
      }

      if (type === 'cost') {
        const value = leverage && amount ? (price / Number(leverage)) * Number(amount) : 0;
        return <Amount value={toPrecision(value)} tokenId={data.pair.quote} mantissa={2} hasPostfix={true} />;
      }

      if (type === 'max') {
        const value =
          leverage && freeMargin ? new BN(freeMargin).div(toPrecision(price / Number(leverage))) : new BN(0);
        return <Amount value={value} tokenId={data.pair.base} mantissa={2} hasPostfix={true} />;
      }
    },
    [type, leverage, freeMargin, amount, data],
  );

  const label = useMemo(() => {
    if (type === 'price') return t('Price');
    if (type === 'cost') return t('Cost');
    if (type === 'max') return t('Max');
  }, [type, t]);

  return (
    <Description label={`${label}: `} space="0">
      {data ? (
        <OraclePrice
          baseTokenId={data.pair.base}
          quoteTokenId={data.pair.quote}
          spread={spread}
          direction={direction}
          render={render}
        />
      ) : null}
    </Description>
  );
};

type RenderTradeProps = {
  poolId: string;
  pairId: string;
};

const RenderTrade: React.FC<RenderTradeProps> = ({ poolId, pairId }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [amount, setAmount] = useState('');

  const [mode, setMode] = useState<'basic' | 'advanced'>('basic');
  const [leverage, setLeverage] = useState('');
  const [actionLoading, setActionLoading] = useState('');
  const api = useApi();
  const account = useCurrentAccount();

  const { forceUpdate: updateTraderInfo } = useLoadTraderInfo({ variables: { poolId }, isQuery: true, lazy: true });
  useLoadPoolInfo({ variables: { poolId } });

  const allowanceEnable = useMarginEnableStore();
  const pairInfo = useTradingPair(poolId, pairId);
  const traderInfo = useTraderInfo(poolId);

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
    if (!amount || !poolId || !pairInfo?.pair || !leverages[leverage][direction]) return;
    try {
      setActionLoading(direction);
      await notificationHelper(
        api.margin.openPosition(
          account.address,
          poolId,
          pairInfo.pair,
          leverages[leverage][direction] as any,
          toPrecision(amount),
          direction === 'ask' ? toPrecision('1000000000') : toPrecision('0'),
        ),
      );
      setAmount('');
    } finally {
      updateTraderInfo();
      setActionLoading('');
    }
  };

  const tradeInfoExtra = {
    leverage,
    amount,
    freeMargin: traderInfo?.freeMargin,
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
                {`x${label}`}
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
            <TradeInfoItem data={pairInfo} direction="ask" type="price" extra={tradeInfoExtra} />
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
            <TradeInfoItem data={pairInfo} direction="ask" type="cost" extra={tradeInfoExtra} />
            <TradeInfoItem data={pairInfo} direction="ask" type="max" extra={tradeInfoExtra} />
          </div>
          <div className={classes.actionItem}>
            <TradeInfoItem data={pairInfo} direction="bid" type="price" extra={tradeInfoExtra} />
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
            <TradeInfoItem data={pairInfo} direction="bid" type="cost" extra={tradeInfoExtra} />
            <TradeInfoItem data={pairInfo} direction="bid" type="max" extra={tradeInfoExtra} />
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

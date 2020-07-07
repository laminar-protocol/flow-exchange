import BN from 'bn.js';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
import { take } from 'rxjs/operators';
import {
  Amount,
  AmountInput,
  DefaultButton,
  Description,
  Panel,
  RadioButton,
  RadioGroup,
  Row,
  Select,
  Space,
  Text,
  Dropdown,
  Menu,
} from '../../components';
import {
  useApi,
  useBaseTokenInfo,
  useCurrentAccount,
  useGetOraclePrice,
  useTraderInfo,
  useTradingPair,
  useMarginPoolInfo,
} from '../../hooks';
import { TraderPairOptions } from '../../services';
import { useLoadPoolInfo, useLoadTraderInfo } from '../../store/useMarginPools';
import { getLeverageEnable, notificationHelper, toPrecision } from '../../utils';
import useMarginEnableStore from './hooks/useMarginEnable';
import { Link } from 'react-router-dom';

type TradeDataProps = {
  type: 'price' | 'cost' | 'max';
  data?: TraderPairOptions;
  direction: 'long' | 'short';
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
  const baseToken = useBaseTokenInfo();
  const getOraclePrice = useGetOraclePrice(data?.pair.base, data?.pair.quote);

  const spread = direction === 'long' ? data?.askSpread : data?.bidSpread;

  const { value: price } =
    useMemo(() => {
      return getOraclePrice(spread, direction);
    }, [getOraclePrice, spread, direction]) || {};

  const render = useCallback(
    (price: number) => {
      if (!data) return;

      if (type === 'price') {
        return <Amount value={toPrecision(price)} tokenId={data.pair.quote} mantissa={5} hasPostfix={true} />;
      }

      if (type === 'cost') {
        let value = leverage && amount ? (price / Number(leverage)) * Number(amount) : 0;

        if (baseToken?.id !== data.pair.quote) {
          const originalPrice = getOraclePrice('0', 'long');
          if (originalPrice) {
            value = value / originalPrice.value;
          }
        }
        return <Amount value={toPrecision(value.toFixed(18))} tokenId={baseToken?.id} mantissa={2} hasPostfix={true} />;
      }

      if (type === 'max') {
        let unitPrice = 0;
        if (baseToken?.id !== data.pair.quote) {
          const originalPrice = getOraclePrice('0', 'long');
          if (originalPrice) {
            unitPrice = price / Number(leverage) / originalPrice.value;
          }
        } else {
          unitPrice = price / Number(leverage);
        }

        const value =
          leverage && freeMargin ? new BN(freeMargin).mul(toPrecision(1)).div(toPrecision(unitPrice)) : new BN(0);

        return <Amount value={value} tokenId={data.pair.base} mantissa={2} hasPostfix={true} />;
      }
    },
    [type, leverage, freeMargin, amount, data, baseToken, getOraclePrice],
  );

  const label = useMemo(() => {
    if (type === 'price') return t('Price');
    if (type === 'cost') return t('Cost');
    if (type === 'max') return t('Max');
  }, [type, t]);

  return (
    <Description label={`${label}: `} space="0">
      {data && price ? render(price) : null}
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
  const poolInfo = useMarginPoolInfo(poolId);

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
    if (!leverages[leverage]?.long) {
      return 'NOT SUPPORTED';
    }
    return '';
  }, [allowanceEnable, leverages, leverage]);

  const sellDisabledTip = useMemo(() => {
    if (!allowanceEnable) {
      return 'NOT ENABLED';
    }
    if (!leverages[leverage]?.short) {
      return 'NOT SUPPORTED';
    }
    return '';
  }, [allowanceEnable, leverages, leverage]);

  const openPosition = async (direction: 'long' | 'short') => {
    if (!amount || !poolId || !pairInfo?.pair || !leverages[leverage][direction]) return;
    try {
      setActionLoading(direction);
      if (api.isEthereum) {
        const contractAddress = api.asEthereum.margin.marginFlowProtocolSafety.options.address;
        const allowance = await api.asEthereum.margin
          .allowance(account.address, contractAddress)
          .pipe(take(1))
          .toPromise();

        if (!allowance || allowance === '0') {
          await notificationHelper(api.asEthereum.margin.grant(account.address, contractAddress));
        }
      }
      await notificationHelper(
        api.margin.openPosition(
          account.address,
          poolId,
          pairInfo.pair,
          leverages[leverage][direction] as any,
          toPrecision(amount),
          direction === 'long' ? toPrecision('1000000000') : toPrecision('0'),
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

  const menuDisabled = poolInfo ? poolInfo.options.length <= 1 : true;

  const menu = (
    <Menu>
      {poolInfo && !menuDisabled
        ? poolInfo.options.map(option => {
            return (
              <Menu.Item key={`/margin/${poolInfo.poolId}/${option.pairId}`}>
                <Link to={`/margin/${poolInfo.poolId}/${option.pairId}`}>{option.pairId}</Link>
              </Menu.Item>
            );
          })
        : null}
    </Menu>
  );

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
          <Dropdown overlay={menu} disabled={menuDisabled}>
            <span style={{ cursor: 'pointer' }}>
              <Text>{pairId}</Text>
              {!menuDisabled && (
                <span style={{ position: 'relative', top: 4 }}>
                  <svg height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(102, 102, 102)">
                    <path d="M16 9v2l-4 4.24L8 11V9h8z" fill="rgb(102, 102, 102)" />
                  </svg>
                </span>
              )}
            </span>
          </Dropdown>

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
            <TradeInfoItem data={pairInfo} direction="long" type="price" extra={tradeInfoExtra} />
            <DefaultButton
              size="large"
              loading={actionLoading === 'long'}
              className={classes.buyButton}
              onClick={() => openPosition('long')}
              tooltip={buyDisabledTip}
              disabled={!!buyDisabledTip}
            >
              {t('Buy/Long')}
            </DefaultButton>
            <TradeInfoItem data={pairInfo} direction="long" type="cost" extra={tradeInfoExtra} />
            <TradeInfoItem data={pairInfo} direction="long" type="max" extra={tradeInfoExtra} />
          </div>
          <div className={classes.actionItem}>
            <TradeInfoItem data={pairInfo} direction="short" type="price" extra={tradeInfoExtra} />
            <DefaultButton
              size="large"
              loading={actionLoading === 'short'}
              className={classes.sellButton}
              onClick={() => openPosition('short')}
              tooltip={sellDisabledTip}
              disabled={!!sellDisabledTip}
            >
              {t('Sell/Short')}
            </DefaultButton>
            <TradeInfoItem data={pairInfo} direction="short" type="cost" extra={tradeInfoExtra} />
            <TradeInfoItem data={pairInfo} direction="short" type="max" extra={tradeInfoExtra} />
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
      background: theme.indicatorGreenColor,
    },
  },
  sellButton: {
    '&.ant-btn, &.ant-btn:hover, & .ant-btn, & .ant-btn:hover': {
      border: 0,
      width: '100%',
      fontWeight: theme.boldWeight,
      color: theme.alwaysWhiteForegroundColor,
      background: theme.indicatorRedColor,
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

import React, { useLayoutEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Panel, Spinner, SwitchChain, Text } from '../../../components';
import { useApi, useCurrentAccount, useOraclePrice, useSyntheticPoolInfo } from '../../../hooks';
import useApp from '../../../store/useApp';
import useSyntheticPools from '../../../store/useSyntheticPools';
import { notificationHelper, toFixed, toPrecision } from '../../../utils';
import useSwap from '../hooks/useSwap';
import useTokenEnable from '../hooks/useTokenEnable';
import EthTokensAllowance from './EthTokensAllowance';
import SwapButton from './SwapButton';
import SwapExchange from './SwapExchange';
import SwapInput from './SwapInput';

type RenderExchangeProps = {};

const RenderExchange: React.FC<RenderExchangeProps> = () => {
  const classes = useStyles();
  const tokens = useApp(state => state.tokens);
  const api = useApi();
  const account = useCurrentAccount();
  const selectPoolId = useSwap(state => state.selectPoolId);
  const setSwapState = useSwap(state => state.setState);
  const poolInfo = useSyntheticPoolInfo(selectPoolId);
  const poolEntities = useSyntheticPools(state => state.poolEntities.byId);

  const baseToken = useSwap(state => state.baseToken);
  const exchangeToken = useSwap(state => state.exchangeToken);
  const isRedeem = useSwap(state => state.isRedeem);
  const tokenEnabled = useTokenEnable();

  const [baseAmount, setBaseAmount] = useState('');
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [changingInput, setChangingInput] = useState<'base' | 'exchange' | ''>('');
  const [swapping, setSwapping] = useState(false);

  const option = useMemo(
    () => (poolInfo && exchangeToken ? poolInfo.options.find(({ tokenId }) => tokenId === exchangeToken.id) : null),
    [poolInfo, exchangeToken],
  );

  const baseTokens = useMemo(() => tokens.filter(({ isBaseToken, isNetworkToken }) => !isNetworkToken && isBaseToken), [
    tokens,
  ]);

  const exchangeTokens = useMemo(() => {
    let supportTokens: string[] = [];
    for (const poolId of Object.keys(poolEntities)) {
      supportTokens = supportTokens.concat(
        poolEntities[poolId].options
          .filter(({ bidSpread, askSpread }) => bidSpread && askSpread)
          .map(({ tokenId }) => tokenId),
      );
    }

    return tokens.filter(
      ({ isBaseToken, isNetworkToken, id }) => !isNetworkToken && !isBaseToken && supportTokens.includes(id),
    );
  }, [tokens, poolEntities]);

  const { value: askRate } =
    useOraclePrice(exchangeToken?.id, baseToken?.id, option?.askSpread || undefined, 'long') || {};

  const { value: bidRate } =
    useOraclePrice(exchangeToken?.id, baseToken?.id, option?.bidSpread || undefined, 'short') || {};

  const predictBaseAmount = useMemo(() => {
    if (!askRate || !bidRate || !exchangeAmount) return '';
    return toFixed(!isRedeem ? Number(exchangeAmount) * Number(askRate) : Number(exchangeAmount) * Number(bidRate), 5);
  }, [askRate, bidRate, isRedeem, exchangeAmount]);

  const predictExchangeAmount = useMemo(() => {
    if (!askRate || !bidRate || !baseAmount) return '';
    return toFixed(!isRedeem ? Number(baseAmount) / Number(askRate) : Number(baseAmount) / Number(bidRate), 5);
  }, [askRate, bidRate, isRedeem, baseAmount]);

  useLayoutEffect(() => {
    if (changingInput === 'exchange') {
      setBaseAmount(predictBaseAmount);
    }
    if (changingInput === 'base') {
      setExchangeAmount(predictExchangeAmount);
    }
  }, [predictBaseAmount, predictExchangeAmount, changingInput]);

  const baseInput = (
    <SwapInput
      label={!isRedeem ? 'Send' : 'Recieve'}
      locked={!isRedeem && !tokenEnabled}
      tokens={baseTokens}
      amount={baseAmount}
      token={baseToken}
      disabled={!askRate || !bidRate || !tokenEnabled}
      onChangeAmount={amount => setBaseAmount(amount)}
      onInput={() => setChangingInput('base')}
      onChangeToken={token => {
        setChangingInput('base');
        setSwapState(state => {
          state.baseToken = token;
        });
      }}
    />
  );

  const exchangeInput = (
    <SwapInput
      label={isRedeem ? 'Send' : 'Recieve'}
      locked={isRedeem && !tokenEnabled}
      tokens={exchangeTokens}
      amount={exchangeAmount}
      token={exchangeToken}
      disabled={!askRate || !bidRate || !tokenEnabled}
      onChangeAmount={amount => setExchangeAmount(amount)}
      onInput={() => setChangingInput('exchange')}
      onChangeToken={token => {
        setChangingInput('exchange');
        setSwapState(state => {
          state.exchangeToken = token;
        });
      }}
    />
  );

  const onSwap = async () => {
    if (api?.synthetic && account.address && exchangeToken && exchangeAmount && baseAmount && poolInfo) {
      setSwapping(true);
      return notificationHelper(
        isRedeem
          ? api.synthetic.redeem(account.address, poolInfo.poolId, exchangeToken.id, toPrecision(exchangeAmount))
          : api.synthetic.mint(account.address, poolInfo.poolId, exchangeToken.id, toPrecision(baseAmount)),
      )
        .then(() => {
          setExchangeAmount('');
          setBaseAmount('');
        })
        .finally(() => {
          setSwapping(false);
        });
    }
  };

  return (
    <Panel className={classes.root}>
      <SwitchChain renderEthereum={() => <EthTokensAllowance />} />
      <div className={classes.swap}>
        {!isRedeem ? baseInput : exchangeInput}
        <SwapExchange
          onClick={() =>
            setSwapState(state => {
              state.isRedeem = !state.isRedeem;
            })
          }
        />
        {isRedeem ? baseInput : exchangeInput}
        <SwapButton
          loading={swapping}
          onClick={() => onSwap()}
          disabled={!askRate || !bidRate || !exchangeAmount || !exchangeToken || !tokenEnabled}
        />
      </div>
      <div className={classes.rateContainer}>
        {baseToken && exchangeToken && option?.askSpread && option?.bidSpread ? (
          <Text>
            {!isRedeem
              ? `1 ${baseToken.symbol} ≈ ${toFixed(1 / Number(askRate), 5)} ${exchangeToken.symbol}`
              : `1 ${exchangeToken.symbol} ≈ ${toFixed(Number(bidRate), 5)} ${baseToken.symbol}`}
          </Text>
        ) : (
          <Spinner />
        )}
      </div>
    </Panel>
  );
};

const useStyles = createUseStyles(theme => ({
  root: {
    padding: '1.5rem',
  },
  swap: {
    display: 'flex',
  },
  rateContainer: { 'margin-top': '1.5rem' },
}));

export default RenderExchange;

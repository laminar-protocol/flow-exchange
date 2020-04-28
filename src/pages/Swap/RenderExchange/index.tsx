import React, { useLayoutEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';

import useSwap from '../useSwap';
import { Panel, Spinner, Text } from '../../../components';
import { useCurrentAccount, useApi, useOraclePrice } from '../../../selectors';
import useApp from '../../../store/useApp';
import useSyntheticPools from '../../../store/useSyntheticPools';
import { notificationHelper, toPrecision } from '../../../utils';
import SwapButton from './SwapButton';
import SwapExchange from './SwapExchange';
import SwapInput from './SwapInput';

type RenderExchangeProps = {
  selectPoolId: string;
};

const RenderExchange: React.FC<RenderExchangeProps> = ({ selectPoolId }) => {
  const classes = useStyles();
  const tokens = useApp(state => state.tokens);
  const api = useApi();
  const account = useCurrentAccount();
  const poolInfo = useSyntheticPools(state => (selectPoolId ? state.poolInfo[selectPoolId] : null));
  const setSwapState = useSwap(state => state.setState);

  const baseToken = useSwap(state => state.baseToken);
  const exchangeToken = useSwap(state => state.exchangeToken);
  const isRedeem = useSwap(state => state.isRedeem);

  const [baseAmount, setBaseAmount] = useState('');
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [changingInput, setChangingInput] = useState<'base' | 'exchange' | ''>('');
  const [swapping, setSwapping] = useState(false);

  const option = useMemo(
    () => (poolInfo && exchangeToken ? poolInfo.options.find(({ tokenId }) => tokenId === exchangeToken.id) : null),
    [poolInfo, exchangeToken],
  );

  const enabledTokens = useMemo(
    () =>
      poolInfo
        ? poolInfo.options.filter(({ askSpread, bidSpread }) => askSpread && bidSpread).map(({ tokenId }) => tokenId)
        : [],
    [poolInfo],
  );

  const baseTokens = useMemo(() => tokens.filter(({ isBaseToken, isNetworkToken }) => !isNetworkToken && isBaseToken), [
    tokens,
  ]);

  const exchangeTokens = useMemo(
    () =>
      tokens.filter(
        ({ id, isBaseToken, isNetworkToken }) => enabledTokens.includes(id) && !isNetworkToken && !isBaseToken,
      ),
    [tokens, enabledTokens],
  );

  const askRate = useOraclePrice(
    exchangeToken?.id || null,
    baseToken?.id || null,
    option ? option.askSpread : null,
    'ask',
  );

  const bidRate = useOraclePrice(
    exchangeToken?.id || null,
    baseToken?.id || null,
    option ? option.bidSpread : null,
    'bid',
  );

  const predictBaseAmount = useMemo(() => {
    if (!askRate || !bidRate || !exchangeAmount) return '';
    return (!isRedeem ? Number(exchangeAmount) * Number(askRate) : Number(exchangeAmount) * Number(bidRate)).toFixed(5);
  }, [askRate, bidRate, isRedeem, exchangeAmount]);

  const predictExchangeAmount = useMemo(() => {
    if (!askRate || !bidRate || !baseAmount) return '';
    return (!isRedeem ? Number(baseAmount) / Number(askRate) : Number(baseAmount) / Number(bidRate)).toFixed(5);
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
      tokens={baseTokens}
      amount={baseAmount}
      token={baseToken}
      disabled={!askRate || !bidRate}
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
      tokens={exchangeTokens}
      amount={exchangeAmount}
      token={exchangeToken}
      disabled={!askRate || !bidRate}
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
          disabled={!askRate || !bidRate || !exchangeAmount || !exchangeToken}
        />
      </div>
      <div className={classes.rateContainer}>
        {baseToken && exchangeToken && option?.askSpread && option?.bidSpread ? (
          <Text>
            {!isRedeem
              ? `1 ${baseToken.name} ≈ ${(1 / Number(askRate)).toFixed(5)} ${exchangeToken.name}`
              : `1 ${exchangeToken.name} ≈ ${Number(bidRate).toFixed(5)} ${baseToken.name}`}
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

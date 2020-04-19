import React, { useMemo, useState, useLayoutEffect } from 'react';
import { createUseStyles } from 'react-jss';

import { OraclePrice, Panel, Spinner, Text } from '../../../components';
import { useApiSelector, useAccountSelector, useOraclePriceSelector } from '../../../selectors';
import { TokenId, options } from '../../../services';
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
  const api = useApiSelector();
  const account = useAccountSelector();
  const poolInfo = useSyntheticPools(state => (selectPoolId ? state.poolInfo[selectPoolId] : null));

  const [baseTokenId, setBaseTokenId] = useState<TokenId | ''>('');
  const [isRedeem, setIsRedeem] = useState(false);
  const [baseAmount, setBaseAmount] = useState('');
  const [exchangeTokenId, setExchangeTokenId] = useState<TokenId | ''>('');
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [changingInput, setChangingInput] = useState<'base' | 'exchange' | ''>('');
  const [swapping, setSwapping] = useState(false);

  const option = useMemo(
    () => (poolInfo && exchangeTokenId ? poolInfo.options.find(({ tokenId }) => tokenId === exchangeTokenId) : null),
    [poolInfo, exchangeTokenId],
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

  const askRate = useOraclePriceSelector(
    baseTokenId || null,
    exchangeTokenId || null,
    option ? option.askSpread : null,
    'ask',
  );

  const bidRate = useOraclePriceSelector(
    exchangeTokenId || null,
    baseTokenId || null,
    option ? option.bidSpread : null,
    'bid',
  );

  const predictBaseAmount = useMemo(() => {
    if (!askRate || !bidRate || !exchangeAmount) return '';
    return (!isRedeem ? Number(exchangeAmount) / Number(askRate) : Number(exchangeAmount) * Number(bidRate)).toFixed(5);
  }, [askRate, bidRate, isRedeem, exchangeAmount]);

  const predictExchangeAmount = useMemo(() => {
    if (!askRate || !bidRate || !baseAmount) return '';
    return (!isRedeem ? Number(baseAmount) * Number(askRate) : Number(baseAmount) / Number(bidRate)).toFixed(5);
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
      tokenId={baseTokenId}
      disabled={!askRate || !bidRate}
      onChangeAmount={amount => setBaseAmount(amount)}
      onInput={() => setChangingInput('base')}
      onChangeTokenId={tokenId => {
        setChangingInput('base');
        setBaseTokenId(tokenId);
      }}
    />
  );

  const exchangeInput = (
    <SwapInput
      label={isRedeem ? 'Send' : 'Recieve'}
      tokens={exchangeTokens}
      amount={exchangeAmount}
      tokenId={exchangeTokenId}
      disabled={!askRate || !bidRate}
      onChangeAmount={amount => setExchangeAmount(amount)}
      onInput={() => setChangingInput('exchange')}
      onChangeTokenId={tokenId => {
        setChangingInput('exchange');
        setExchangeTokenId(tokenId);
      }}
    />
  );

  const onSwap = async () => {
    if (api?.synthetic && account.address && exchangeTokenId && exchangeAmount && poolInfo) {
      setSwapping(true);
      return notificationHelper(
        isRedeem
          ? api.synthetic.redeem(account.address, poolInfo.poolId, exchangeTokenId, toPrecision(exchangeAmount))
          : api.synthetic.mint(account.address, poolInfo.poolId, exchangeTokenId, toPrecision(exchangeAmount)),
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
        <SwapExchange onClick={() => setIsRedeem(!isRedeem)} />
        {isRedeem ? baseInput : exchangeInput}
        <SwapButton
          loading={swapping}
          onClick={() => onSwap()}
          disabled={!askRate || !bidRate || !exchangeAmount || !exchangeTokenId}
        />
      </div>
      <div className={classes.rateContainer}>
        {baseTokenId &&
        exchangeTokenId &&
        baseTokenId &&
        exchangeTokenId &&
        poolInfo &&
        option &&
        option.askSpread &&
        option.bidSpread ? (
          <Text>
            {`1 ${!isRedeem ? baseTokenId : exchangeTokenId} ≈ `}
            {!isRedeem ? (
              <OraclePrice
                baseTokenId={baseTokenId}
                quoteTokenId={exchangeTokenId}
                spread={option.askSpread}
                direction="ask"
              />
            ) : (
              <OraclePrice
                baseTokenId={exchangeTokenId}
                quoteTokenId={baseTokenId}
                spread={option.bidSpread}
                direction="bid"
              />
            )}
            {` ${isRedeem ? baseTokenId : exchangeTokenId}`}
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

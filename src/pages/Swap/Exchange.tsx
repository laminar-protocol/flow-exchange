import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useReducer, useState } from 'react';

import { PrimaryButton, Separator, SolidButton, Text } from '../../components';
import { useAccount, useApp, useExchange, useExchangeApi, usePools } from '../../store';
import { apiSelector } from '../../store/useApp';
import { notificationHelper, toPrecision } from '../../utils';
import AmountInput from './AmountInput';
import ExchangeRate from './ExchangeRate';
import { EthereumOraclePrice, PolkadotOraclePrice } from './OraclePrice';
import { ActionBar, Currency, Detail, Divider, Entry, ExchangeIcon, Label, SwapContainer } from './swap.style';

const Exchange: React.FC = () => {
  const api = useApp(apiSelector);
  const currentAccount = useApp(state => state.currentAccount);
  const pool = usePools(state => state.defaultPool);
  const updateBalances = useAccount(state => state.updateBalances);
  const initPool = usePools(state => state.initPool);

  const isSwapping = useExchange(state => state.isSwapping);
  const isRedeem = useExchange(state => state.isRedeem);
  const isValid = useExchange(state => state.isValid);
  const availableFromTokens = useExchange(state => (state.isRedeem ? state.flowTokens : state.baseTokens));
  const availableToTokens = useExchange(state => (state.isRedeem ? state.baseTokens : state.flowTokens));
  const fromToken = useExchange(state => state.fromToken);
  const toToken = useExchange(state => state.toToken);
  const fromAmount = useExchange(state => state.fromAmount);
  const toAmount = useExchange(state => state.toAmount);
  const onFromTokenChange = useExchange(state => state.onFromTokenChange);
  const onToTokenChange = useExchange(state => state.onToTokenChange);
  const onFromAmountChange = useExchange(state => state.onFromAmountChange);
  const onToAmountChange = useExchange(state => state.onToAmountChange);
  const onSwapToken = useExchange(state => state.onSwapToken);
  const onFetchLiquidityPoolSpread = useExchange(state => state.onFetchLiquidityPoolSpread);
  const [allowance, setAllowance] = useState<Record<string, string>>({});
  const [allowanceLoading, setAllowanceLoading] = useState(false);
  const [forceUpdateAllowanceSignal, forceUpdateAllowance] = useReducer(x => x + 1, 0);

  const { askSpread, bidSpread }: { askSpread?: number; bidSpread?: number } = usePools(state => {
    if (pool && fromToken && toToken) {
      const token = fromToken.isBaseToken ? toToken : fromToken;
      return state.getPoolTokenOptions(pool.id, token.id) || {};
    }
    return {};
  });

  const [isLoadingSpread, setIsLoadingSpread] = useState(true);

  const [{ loading: isLoadingRate, data: rate }, setRate] = useState<{
    loading: boolean;
    data?: number;
  }>({ loading: false });

  let spread: number | undefined;

  if (bidSpread !== undefined && askSpread !== undefined) {
    spread = isRedeem ? bidSpread : askSpread;
  }

  const onSwap = async () => {
    if (currentAccount && toToken && fromToken && pool) {
      useExchangeApi.setState(state => {
        state.isSwapping = true;
      });

      return notificationHelper(
        isRedeem
          ? api.redeem(currentAccount.address, pool.id, fromToken.id, toPrecision(fromAmount, fromToken.precision))
          : api.mint(currentAccount.address, pool.id, toToken.id, toPrecision(fromAmount, fromToken.precision)),
      )
        .then(() => {
          useExchangeApi.setState(state => {
            state.fromAmount = '';
            state.toAmount = '';
          });
        })
        .finally(() => {
          useExchangeApi.setState(state => {
            state.isSwapping = false;
          });
          updateBalances(currentAccount?.address);
        });
    }
  };

  const enable = async () => {
    if (currentAccount && fromToken && pool && api.flowProtocolGrant) {
      setAllowanceLoading(true);

      return notificationHelper(api.flowProtocolGrant(currentAccount.address, fromToken.id))
        .then(() => {
          forceUpdateAllowance();
        })
        .finally(() => {
          setAllowanceLoading(false);
        });
    }
  };

  useEffect(() => {
    if (fromToken?.id && api.chainType === 'ethereum' && api.getTokenAllowance && currentAccount) {
      api.getTokenAllowance(currentAccount.address, fromToken.id).then((value: any) => {
        setAllowance(state => ({
          [fromToken.id]: value,
          ...state,
        }));
      });
    }
  }, [api, currentAccount, fromToken, forceUpdateAllowanceSignal]);

  // init
  useEffect(() => {
    if (pool) {
      initPool(pool.id).finally(() => setIsLoadingSpread(false));
    }
  }, [initPool, pool]);

  useEffect(() => {
    if (fromAmount && toAmount === undefined) {
      onFromAmountChange(fromAmount, rate, spread);
    }

    if (toAmount && fromAmount === undefined) {
      onToAmountChange(toAmount, rate, spread);
    }
  }, [onFromAmountChange, onToAmountChange, fromAmount, toAmount, spread, rate]);

  useEffect(() => {
    if (fromToken && toToken) {
      onFetchLiquidityPoolSpread(isRedeem ? fromToken : toToken);
    }
  }, [onFetchLiquidityPoolSpread, fromToken, toToken, isRedeem]);

  const isLoading = isLoadingSpread || isLoadingRate;

  if (!fromToken || !toToken || !availableFromTokens || !availableToTokens) {
    return <SwapContainer padding={2} />;
  }

  return (
    <SwapContainer padding={2}>
      {api.chainType === 'laminar' ? (
        <PolkadotOraclePrice set={setRate} fromToken={fromToken} toToken={toToken} />
      ) : api.chainType === 'ethereum' ? (
        <EthereumOraclePrice set={setRate} fromToken={fromToken} toToken={toToken} />
      ) : null}
      <Entry>
        <Currency>
          <Label>
            <Text weight="bold" size="s" light>
              Send
            </Text>
          </Label>
          <AmountInput
            tokens={availableFromTokens}
            selectedToken={fromToken}
            onCurrencyChange={onFromTokenChange}
            onAmountChange={x => onFromAmountChange(x, rate, spread)}
            disabled={isSwapping}
            value={fromAmount}
            requireAuthorization={!isRedeem}
          />
        </Currency>
        <Divider>
          <ExchangeIcon
            onClick={() => {
              onSwapToken(fromToken, toToken, fromAmount, toAmount);
            }}
          >
            <FontAwesomeIcon icon="chevron-right" className="normalIcon" />
            <FontAwesomeIcon icon="exchange-alt" className="swapIcon" />
          </ExchangeIcon>
        </Divider>
        <Currency>
          <Label>
            <Text weight="bold" size="s" light>
              Recieve
            </Text>
          </Label>
          <AmountInput
            tokens={availableToTokens}
            selectedToken={toToken}
            onCurrencyChange={onToTokenChange}
            onAmountChange={x => onToAmountChange(x, rate, spread)}
            disabled={isSwapping}
            value={toAmount}
          />
        </Currency>
      </Entry>
      <Separator />
      <ActionBar>
        <Detail>
          <ExchangeRate isLoading={isLoading} spread={spread} rate={rate} fromToken={fromToken} toToken={toToken} />
        </Detail>
        {api.chainType === 'ethereum' && fromToken && allowance[fromToken.id] === '0' ? (
          <SolidButton
            size="large"
            onClick={() => {
              enable();
            }}
            loading={allowanceLoading}
            disabled={allowanceLoading}
          >
            Enable
          </SolidButton>
        ) : (
          <PrimaryButton
            size="large"
            loading={isSwapping}
            onClick={() => {
              onSwap();
            }}
            disabled={!isValid || isSwapping}
          >
            Exchange
          </PrimaryButton>
        )}
      </ActionBar>
    </SwapContainer>
  );
};

export default Exchange;

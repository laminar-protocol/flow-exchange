import { IconProp } from '@fortawesome/fontawesome-svg-core';
import deployment from 'flow-protocol/artifacts/deployment.json';
import _ from 'lodash';

export const network: Network = (process.env.REACT_APP_NETWORK as Network) || 'development';

export const abi = ((network: Network) => {
  const ERC20Detailed = require(`flow-protocol/artifacts/abi/${network}/ERC20Detailed.json`);
  const FaucetInterface = require(`flow-protocol/artifacts/abi/${network}/FaucetInterface.json`);
  const FlowMarginProtocol = require(`flow-protocol/artifacts/abi/${network}/FlowMarginProtocol.json`);
  const FlowProtocol = require(`flow-protocol/artifacts/abi/${network}/FlowProtocol.json`);
  const FlowToken = require(`flow-protocol/artifacts/abi/${network}/FlowToken.json`);
  const LiquidityPoolInterface = require(`flow-protocol/artifacts/abi/${network}/LiquidityPoolInterface.json`);
  const MarginTradingPair = require(`flow-protocol/artifacts/abi/${network}/MarginTradingPair.json`);
  const MoneyMarket = require(`flow-protocol/artifacts/abi/${network}/MoneyMarket.json`);
  const PriceOracleInterface = require(`flow-protocol/artifacts/abi/${network}/PriceOracleInterface.json`);

  return {
    ERC20: ERC20Detailed,
    FaucetInterface,
    FlowMarginProtocol,
    FlowProtocol,
    FlowToken,
    LiquidityPoolInterface,
    MarginTradingPair,
    MoneyMarket,
    PriceOracleInterface,
  };
})(network);

if (!Object.keys(deployment).includes(network)) {
  throw new Error(`Invalid network: ${network}`);
}

export const addresses: { [key: string]: string } = (deployment as any)[network];

export const explorer: string = ((network: Network) => {
  switch (network) {
    case 'mainnet':
      return 'https://mainnet.etherscan.io';
    case 'kovan':
      return 'https://kovan.etherscan.io';
    case 'development':
      return 'localhost:8545';
  }
})(network);

export const networkById = (id: number): Network => {
  switch (id) {
    case 1:
      return 'mainnet';
    case 42:
      return 'kovan';
    default:
      return 'development';
  }
};

export const tokens: { [key in TokenSymbol]: Token } = {
  DAI: {
    name: 'DAI',
    displayName: 'DAI',
    address: addresses.baseToken,
    currencySymbol: '$',
    icon: 'dollar-sign' as IconProp,
    isBaseToken: true,
  },
  fEUR: {
    name: 'EUR',
    displayName: 'Euro',
    address: addresses.fEUR,
    currencySymbol: '€',
    icon: 'euro-sign' as IconProp,
    isBaseToken: false,
  },
  fJPY: {
    name: 'JPY',
    displayName: 'Yen',
    address: addresses.fJPY,
    currencySymbol: '¥',
    icon: 'yen-sign' as IconProp,
    isBaseToken: false,
  },
  fXAU: {
    name: 'XAU',
    displayName: 'Gold',
    address: addresses.fXAU,
    currencySymbol: '',
    icon: 'cubes' as IconProp,
    isBaseToken: false,
  },
  fAAPL: {
    name: 'AAPL',
    displayName: 'Apple',
    address: addresses.fAAPL,
    currencySymbol: '',
    icon: 'award' as IconProp,
    isBaseToken: false,
  },
};

// TODO: Refactor these

export const isTokenSymbol = (symbol: TokenSymbol): symbol is TokenSymbol => (tokens as any)[symbol] != null;
export const isBaseTokenSymbol = (symbol: TokenSymbol): symbol is TokenSymbol => {
  const token = (tokens as any)[symbol];
  if (token === null) {
    return false;
  }
  return token.isBaseToken;
};

export const tradingPairs: { [key in TradingPairSymbol]: TradingPair } = {
  l10USDEUR: {
    symbol: 'l10USDEUR',
    base: 'DAI' as TokenSymbol,
    quote: 'fEUR' as TokenSymbol,
    leverage: 10,
    address: addresses.l10USDEUR,
    name: 'USDEUR 10× Long',
  },
  s10USDEUR: {
    symbol: 's10USDEUR',
    base: 'DAI' as TokenSymbol,
    quote: 'fEUR' as TokenSymbol,
    leverage: -10,
    address: addresses.s10USDEUR,
    name: 'USDEUR 10× Short',
  },
  l20USDJPY: {
    symbol: 'l20USDJPY',
    base: 'DAI' as TokenSymbol,
    quote: 'fJPY' as TokenSymbol,
    leverage: 20,
    address: addresses.l20USDJPY,
    name: 'USDJPY 20× Long',
  },
  s20USDJPY: {
    symbol: 's20USDJPY',
    base: 'DAI' as TokenSymbol,
    quote: 'fJPY' as TokenSymbol,
    leverage: -20,
    address: addresses.s20USDJPY,
    name: 'USDJPY 20× Short',
  },
  l20USDXAU: {
    symbol: 'l20USDXAU',
    base: 'DAI' as TokenSymbol,
    quote: 'fXAU' as TokenSymbol,
    leverage: 20,
    address: addresses.l20USDXAU,
    name: 'XAUUSD 20× Long',
  },
  s20USDXAU: {
    symbol: 's20USDXAU',
    base: 'DAI' as TokenSymbol,
    quote: 'fXAU' as TokenSymbol,
    leverage: -20,
    address: addresses.s20USDXAU,
    name: 'XAUUSD 20× Short',
  },
  l5USDAAPL: {
    symbol: 'l5USDAAPL',
    base: 'DAI' as TokenSymbol,
    quote: 'fAAPL' as TokenSymbol,
    leverage: 5,
    address: addresses.l5USDAAPL,
    name: 'AAPL 5× Long',
  },
  s5USDAAPL: {
    symbol: 's5USDAAPL',
    base: 'DAI' as TokenSymbol,
    quote: 'fAAPL' as TokenSymbol,
    leverage: -5,
    address: addresses.s5USDAAPL,
    name: 'AAPL 5× Short',
  },
};

export const tradingSymbols: { [key in TradingSymbol]: Trading } = {
  EURUSD: {
    name: 'EURUSD',
    long: 'l10USDEUR',
    short: 's10USDEUR',
    chartSymbol: 'EURUSD',
    inverted: false,
    leverage: 10,
    precision: 4,
  },
  USDJPY: {
    name: 'USDJPY',
    long: 's20USDJPY',
    short: 'l20USDJPY',
    chartSymbol: 'USDJPY',
    inverted: true,
    leverage: 20,
    precision: 2,
  },
  XAUUSD: {
    name: 'XAUUSD',
    long: 'l20USDXAU',
    short: 's20USDXAU',
    chartSymbol: 'XAUUSD',
    inverted: false,
    leverage: 20,
    precision: 2,
  },
  USDAAPL: {
    name: 'USDAAPL',
    long: 'l5USDAAPL',
    short: 'l5USDAAPL',
    chartSymbol: 'AAPL',
    inverted: false,
    leverage: 5,
    precision: 2,
  },
};

// TODO: remove this, use app state instead
export const liquidityPools: { [key: string]: Pool } = {
  POOL1: {
    id: addresses.pool1,
    key: 'POOL1',
    address: addresses.pool,
    name: 'Laminar',
    spread: 0.003, // TODO: Read from contract
  },
  POOL2: {
    id: addresses.pool2,
    key: 'POOL2',
    address: addresses.pool2,
    name: 'ACME',
    spread: 0.0031, // TODO: Read from contract
  },
};

/**
 * Find trading pair by address
 * @param address trading pair address
 * @returns tradingPair or undefined
 */
export const findTradingPairByAddress = (address: Address): TradingPair | undefined => {
  const pairs = Object.values(tradingPairs);
  return pairs.find(pair => pair.address.toLocaleLowerCase() === address.toLocaleLowerCase());
};

/**
 * Find trading info by address
 * @param address trading pair address
 * @returns trading info or undefined
 */
export const findTradingInfoByPairAddress = (
  address: Address,
): { symbol: Trading; direction: 'long' | 'short' } | undefined => {
  const pair = findTradingPairByAddress(address);
  if (!pair) {
    return undefined;
  }

  const symbols = Object.values(tradingSymbols);
  const symbol = symbols.find(s => s.long === pair.symbol || s.short === pair.symbol);

  if (symbol) {
    return {
      symbol,
      direction: symbol.long === pair.symbol ? 'long' : 'short',
    };
  }

  return undefined;
};

/**
 * Find trading pair from symbol
 * @param symbol TradingSymbol
 * @returns trading pair or undefined
 */
export const getTradingPairFromTradingSymbol = (symbol: TradingSymbol): TradingPair | undefined => {
  const trading = _.get(tradingSymbols, symbol);
  return _.get(tradingPairs, trading.long) || _.get(tradingPairs, trading.short);
};

/**
 * Find quote token from trading symbol
 * @param symbol TradingSymbol
 * @returns quote token or undefined
 */
export const getQuoteTokenFromTradingSymbol = (symbol: TradingSymbol): Token | undefined => {
  const pair = getTradingPairFromTradingSymbol(symbol);
  if (!pair) return undefined;
  return _.get(tokens, `${pair.quote}`);
};

/**
 * Find base token from trading symbol
 * @param symbol TradingSymbol
 * @returns base token or undefined
 */
export const getBaseTokenFromTradingSymbol = (symbol: TradingSymbol): Token | undefined => {
  const pair = getTradingPairFromTradingSymbol(symbol);
  if (!pair) return undefined;
  return _.get(tokens, `${pair.base}`);
};

export const subgraphEndpoints = ((network: Network): { http: string; ws: string } => {
  switch (network) {
    case 'mainnet':
      return {
        http: 'https://api.thegraph.com/subgraphs/name/laminar-protocol/flow-protocol-subgraph',
        ws: 'wss://api.thegraph.com/subgraphs/name/laminar-protocol/flow-protocol-subgraph',
      };
    case 'kovan':
      return {
        http: 'https://api.thegraph.com/subgraphs/name/laminar-protocol/flow-protocol-subgraph',
        ws: 'wss://api.thegraph.com/subgraphs/name/laminar-protocol/flow-protocol-subgraph',
      };
    case 'development':
      return {
        http: 'http://localhost:8000/subgraphs/name/laminar-protocol/flow-protocol-subgraph',
        ws: 'ws://localhost:8001/subgraphs/name/laminar-protocol/flow-protocol-subgraph',
      };
  }
})(network);

import ERC20Detailed from 'flow-protocol/artifacts/abi/ERC20Detailed.json';
import FlowProtocol from 'flow-protocol/artifacts/abi/FlowProtocol.json';
import LiquidityPoolInterface from 'flow-protocol/artifacts/abi/LiquidityPoolInterface.json';
import MoneyMarket from 'flow-protocol/artifacts/abi/MoneyMarket.json';
import FlowMarginProtocol from 'flow-protocol/artifacts/abi/FlowMarginProtocol.json';
import FlowToken from 'flow-protocol/artifacts/abi/FlowToken.json';
import MarginTradingPair from 'flow-protocol/artifacts/abi/MarginTradingPair.json';
import PriceOracleInterface from 'flow-protocol/artifacts/abi/PriceOracleInterface.json';

import deployment from 'flow-protocol/artifacts/deployment.json';

// TODO: setup pipeline for mainnet
export const network: keyof typeof deployment = process.env.REACT_APP_NETWORK || 'kovan' as any;

if (!deployment[network]) {
  throw new Error(`Invalid network: ${network}`);
}

export const addresses = deployment[network];

export const tokens = {
  DAI: {
    name: 'DAI',
    fullName: 'Dai Stablecoin',
    address: addresses.baseToken,
    currencySymbol: '$',
  },
  fEUR: {
    name: 'EUR',
    fullName: 'Flow Euro',
    address: addresses.fEUR,
    currencySymbol: '€',
  },
  fJPY: {
    name: 'JPY',
    fullName: 'Flow Japanese Yen',
    address: addresses.fJPY,
    currencySymbol: '¥',
  },
};

export const tradingPairs = {
  l10USDEUR: {
    base: 'DAI',
    quote: 'fEUR',
    leverage: 10,
    address: addresses.l10USDEUR,
  },
  s10USDEUR: {
    base: 'DAI',
    quote: 'fEUR',
    leverage: -10,
    address: addresses.s10USDEUR,
  },
  l20USDJPY: {
    base: 'DAI',
    quote: 'fJPY',
    leverage: 20,
    address: addresses.l20USDJPY,
  },
  s20USDJPY: {
    base: 'DAI',
    quote: 'fJPY',
    leverage: 20,
    address: addresses.s20USDJPY,
  },
};

export const abi = {
  ERC20: ERC20Detailed as any,
  FlowProtocol: FlowProtocol as any,
  LiquidityPoolInterface: LiquidityPoolInterface as any,
  MoneyMarket: MoneyMarket as any,
  FlowMarginProtocol: FlowMarginProtocol as any,
  FlowToken: FlowToken as any,
  MarginTradingPair: MarginTradingPair as any,
  PriceOracleInterface: PriceOracleInterface as any,
};

// TODO: make this configurable
export const subgraphEndpoints = {
  http: 'https://api.thegraph.com/subgraphs/name/laminar-protocol/flow-protocol-subgraph',
  ws: 'wss://api.thegraph.com/subgraphs/name/laminar-protocol/flow-protocol-subgraph',
};

import ERC20Detailed from 'flow-protocol/artifacts/abi/ERC20Detailed.json';
import FlowProtocol from 'flow-protocol/artifacts/abi/FlowProtocol.json';
import LiquidityPoolInterface from 'flow-protocol/artifacts/abi/LiquidityPoolInterface.json';
import MoneyMarket from 'flow-protocol/artifacts/abi/MoneyMarket.json';
import FlowMarginProtocol from 'flow-protocol/artifacts/abi/FlowMarginProtocol.json';
import FlowToken from 'flow-protocol/artifacts/abi/FlowToken.json';
import MarginTradingPair from 'flow-protocol/artifacts/abi/MarginTradingPair.json';
import PriceOracleInterface from 'flow-protocol/artifacts/abi/PriceOracleInterface.json';

import deployment from 'flow-protocol/artifacts/deployment.json';

export type Addresses = typeof deployment['kovan'];

export const tokens = {
  baseToken: {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
  },
  fEUR: {
    symbol: 'fEUR',
    name: 'Flow Euro',
  },
  fJPY: {
    symbol: 'fJPY',
    name: 'Flow Japanese Yen',
  },
};

export const tradingPairs = {
  l10USDEUR: {
    base: 'DAI',
    quote: 'fEUR',
    leverage: 10,
  },
  s10USDEUR: {
    base: 'DAI',
    quote: 'fEUR',
    leverage: -10,
  },
  l20USDJPY: {
    base: 'DAI',
    quote: 'fJPY',
    leverage: 20,
  },
  s20USDJPY: {
    base: 'DAI',
    quote: 'fJPY',
    leverage: 20,
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

export { deployment };

// TODO: make this configurable
export const subgraphEndpoints = {
  http: 'https://api.thegraph.com/subgraphs/name/laminar-protocol/flow-protocol-subgraph',
  ws: 'wss://api.thegraph.com/subgraphs/name/laminar-protocol/flow-protocol-subgraph',
};

import ERC20Detailed from 'flow-protocol/artifacts/abi/ERC20Detailed.json';
import FlowProtocol from 'flow-protocol/artifacts/abi/FlowProtocol.json';
import LiquidityPoolInterface from 'flow-protocol/artifacts/abi/LiquidityPoolInterface.json';
import MoneyMarket from 'flow-protocol/artifacts/abi/MoneyMarket.json';
import FlowMarginProtocol from 'flow-protocol/artifacts/abi/FlowMarginProtocol.json';
import FlowToken from 'flow-protocol/artifacts/abi/FlowToken.json';
import MarginTradingPair from 'flow-protocol/artifacts/abi/MarginTradingPair.json';
import PriceOracleInterface from 'flow-protocol/artifacts/abi/PriceOracleInterface.json';

export { default as deployment } from 'flow-protocol/artifacts/deployment.json';

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

export const symbols = {
  DAI: 'DAI',
  EUR: 'fEUR',
  JPY: 'fJPY',
};

export const abi = {
  ERC20: ERC20Detailed,
  FlowProtocol,
  LiquidityPoolInterface,
  MoneyMarket,
  FlowMarginProtocol,
  FlowToken,
  MarginTradingPair,
  PriceOracleInterface,
};

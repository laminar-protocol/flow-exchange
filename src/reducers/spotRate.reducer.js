import types from 'types';
import { toBN } from 'helpers/unitHelper';

const INITIAL_STATE = {
  rates: null,
  isQuerying: false,
};

const parseRate = (rate) => {
  const price = toBN(rate.price);
  const askSpread = toBN(rate.askSpread);
  const bidSpread = toBN(rate.bidSpread);
  const askPrice = price.add(askSpread);
  const bidPrice = price.sub(bidSpread);

  return {
    price: price.toString(),
    askSpread: askSpread.toString(),
    bidSpread: bidSpread.toString(),
    askPrice: askPrice.toString(),
    bidPrice: bidPrice.toString(),
  };
};

const parseRates = (rates, payload) => ({
  ...rates,
  [payload.symbol]: parseRate(payload),
});

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.spotRate.requested:
      return {
        ...state,
        isQuerying: true,
      };
    case types.spotRate.failed:
      return {
        ...state,
        isQuerying: false,
      };
    case types.spotRate.completed:
      return {
        ...state,
        rates: parseRates(state.rates, payload),
        isQuerying: false,
      };

    default:
      return state;
  }
};

export default reducer;

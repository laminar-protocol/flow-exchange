import types from 'types';
import { toBN } from 'helpers/unitHelper';

const INITIAL_STATE = {
  rates: null,
  isQuerying: false,
};

export const parseRate = (rate: any) => {
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

const parseRates = (rates: any, payload: any) => ({
  ...rates,
  [payload.symbol]: parseRate(payload),
});

const reducer = (state = INITIAL_STATE, { type, payload }: any) => {
  switch (type) {
    case types.spot.rate.requested:
      return {
        ...state,
        isQuerying: true,
      };
    case types.spot.rate.failed:
      return {
        ...state,
        isQuerying: false,
      };
    case types.spot.rate.completed:
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

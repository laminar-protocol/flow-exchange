type Direction = 'bid' | 'ask';

const calcExchangeRate = (amount: number, spread: number, rate: number, direction: Direction, precision = 6) => {
  const finalRate = rate * (1 - spread);
  let finalAmount;
  if (direction === 'bid') {
    finalAmount = amount / finalRate;
  }
  finalAmount = amount * finalRate;

  return finalAmount.toFixed(precision);
};

export default calcExchangeRate;

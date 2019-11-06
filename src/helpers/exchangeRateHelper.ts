import roundTo from 'round-to';

type Direction = 'bid' | 'ask';

export const caculate = (amount: number, spread: number, rate: number, direction: Direction, precision = 6) => {
  // TODO: Possbile bug in rate calculation
  // TODO: Refactor this with margin
  // TODO: Use numbro

  const finalRate = rate * (1 - spread);
  let finalAmount;
  if (direction === 'bid') {
    finalAmount = amount / finalRate;
  }
  finalAmount = amount * finalRate;

  return roundTo(finalAmount, precision);
};

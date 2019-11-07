export type Direction = 'bid' | 'ask';

export const calculateRate = (spread: number, inverted: boolean, direction: Direction, rate?: number) => {
  if (!rate) {
    return undefined;
  }

  let calculatedRate;
  if (inverted) {
    calculatedRate = direction === 'bid' ? rate * (1 + spread) : rate * (1 - spread);
    calculatedRate = 1.0 / calculatedRate;
  } else {
    calculatedRate = direction === 'bid' ? rate * (1 - spread) : rate * (1 + spread);
  }
  return calculatedRate;
};

import numbro from 'numbro';

// TODO: Refactor this file into common formatter
// TODO: Refactor this messey logic

type Direction = 'bid' | 'ask';

export const formatRate = (rate: number, spread: number, prefixUSD: boolean, isJPY: boolean, direction: Direction) => {
  let calculateRate;
  if (prefixUSD) {
    calculateRate = direction === 'bid' ? rate * (1 + spread) : rate * (1 - spread);
    calculateRate = 1.0 / calculateRate;
  } else {
    calculateRate = direction === 'bid' ? rate * (1 - spread) : rate * (1 + spread);
  }

  const precision = isJPY ? 2 : 4;
  return numbro(calculateRate).format({ mantissa: precision, trimMantissa: false });
};

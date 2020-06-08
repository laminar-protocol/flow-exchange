const Map = {
  Two: '2',
  Three: '3',
  Five: '5',
  Ten: '10',
  Twenty: '20',
  Fifty: '50',
} as Record<string, string>;

export const getLeverage = (str: string): ['long' | 'short', string] | [] => {
  const [, direction, leverage] = str.match('^(Long|Short)(.*)$') || [];
  if (direction && Map[leverage]) {
    return [direction === 'Long' ? 'long' : 'short', Map[leverage]];
  } else {
    return [];
  }
};

export const getLeverageEnable = (leverages: string[]) => {
  if (!leverages) return {};

  return leverages.reduce(
    (result, curr) => {
      const [direction, leverage] = getLeverage(curr);

      const label = leverage ? `${leverage}` : '';

      let option: any = {};
      if (direction === 'long') {
        option.long = curr;
      }
      if (direction === 'short') {
        option.short = curr;
      }
      if (label) {
        if (result[label]) {
          result[label] = {
            ...result[label],
            ...option,
          };
        } else {
          result[label] = option;
        }
      }
      return result;
    },
    {} as Record<
      string,
      {
        long?: string;
        short?: string;
      }
    >,
  );
};

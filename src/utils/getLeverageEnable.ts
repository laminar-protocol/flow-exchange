const Map = {
  Two: 'x2',
  Three: 'x3',
  Five: 'x5',
  Ten: 'x10',
  Twenty: 'x20',
  Fifty: 'x50',
} as Record<string, string>;

const getLeverageEnable = (leverages: string[]) => {
  if (!leverages) return {};

  return leverages.reduce(
    (result, curr) => {
      const [, direction, leverage] = curr.match('^(Long|Short)(.*)$') || [];
      const label = Map[leverage];
      let option: any = {};
      if (direction === 'Long') {
        option.long = curr;
      }
      if (direction === 'Short') {
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

export default getLeverageEnable;

const currencySymbols = {
  DAI: '$',
  EUR: '€',
  JPY: '¥',
};

const getCurrencySymbol = (id: string): string => {
  return (currencySymbols as any)[id] || '';
};

export default getCurrencySymbol;

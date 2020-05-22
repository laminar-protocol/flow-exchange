import numbro from 'numbro';

export const unformatNumber = (source: string | number) => {
  if (/[0-9.]+\s[A-Za-z]+/.test(source as string)) {
    const n = `$source}`.split(' ')[0];
    if (!isNaN(n as any)) return numbro.unformat(n);
  }

  return numbro.unformat(source as string);
};

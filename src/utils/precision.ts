import BN from 'bn.js';
import { isHex, bnFromHex } from '@polkadot/util';
import numbro from 'numbro';

const zero = new BN(0);
const negative1 = new BN(-1);

export const toFixed = (value: number, d: number) => {
  return numbro(value).format({
    mantissa: d,
    // @ts-ignore
    roundingFunction: Math.floor,
  });
};

export const getValueFromHex = (value: string | number) => {
  if (typeof value === 'number') return String(value);
  if (isHex(value)) return bnFromHex(value).toString();
  return value;
};

export const getValueOfPrecision = (precision: number) => {
  if (precision < 0) throw new Error('precision invaild');

  return new BN('1'.padEnd(precision + 1, '0'), 10);
};

export const numberToString = (arg: string | number) => {
  if (typeof arg === 'string') {
    if (!arg.match(/^-?[0-9.]+$/)) {
      throw new Error(
        `while converting number to string, invalid number value '${arg}', should be a number matching (^-?[0-9.]+).`,
      );
    }
    return arg;
  }

  if (typeof arg !== 'number') {
    throw new Error(`while converting number to string, invalid number value '${arg}' type ${typeof arg}.`);
  }

  return String(arg);
};

export const fromPrecision = (
  _input: string | BN | number,
  precision: number,
  options: { pad?: boolean; commify?: boolean; mantissa?: number } = {},
) => {
  const input = isHex(_input) ? getValueFromHex(_input) : _input;

  let wei = BN.isBN(input) ? input : new BN(input);

  const negative = wei.lt(zero);

  const base = getValueOfPrecision(precision);
  const baseLength = precision;

  if (negative) {
    wei = wei.mul(negative1);
  }

  let fraction = wei.mod(base).toString(10);

  while (fraction.length < baseLength) {
    fraction = `0${fraction}`;
  }

  if (!options.pad && !options.mantissa) {
    [, fraction] = fraction.match(/^([0-9]*[1-9]|0)(0*)/) as RegExpMatchArray;
  }

  if (options.mantissa !== undefined) {
    fraction = fraction.slice(0, options.mantissa);
  }

  if (fraction === '0') {
    if (options.mantissa && options.mantissa === 0) {
      fraction = '';
    } else if (!options.pad) {
      fraction = '';
    }
  }

  let whole = wei.div(base).toString(10);

  if (options.commify) {
    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  let value = `${whole}${fraction && `.${fraction}`}`;

  if (negative) {
    value = `-${value}`;
  }

  return value;
};

export const toPrecision = (input: number | string, precision = 18) => {
  let ether = numberToString(input);
  const base = getValueOfPrecision(precision);
  const baseLength = precision || 1;

  // Is it negative?
  const negative = ether.startsWith('-');
  if (negative) {
    ether = ether.substring(1);
  }

  if (ether === '.') {
    throw new Error(`while converting number ${input} with precision ${precision}, invalid value`);
  }

  // Split it into a whole and fractional part
  const comps = ether.split('.');

  if (comps.length > 2) {
    throw new Error(`while converting number ${input} with precision ${precision},  too many decimal points`);
  }

  let whole = comps[0];
  let fraction = comps[1];

  if (!whole) {
    whole = '0';
  }
  if (!fraction) {
    fraction = '0';
  }
  if (fraction.length > baseLength) {
    throw new Error(`while converting number ${input} with precision ${precision}, too many decimal places`);
  }

  while (fraction.length < baseLength) {
    fraction += '0';
  }

  const wholeBN = new BN(whole);
  const fractionBN = new BN(fraction);

  let wei = wholeBN.mul(base).add(fractionBN);

  if (negative) {
    wei = wei.mul(negative1);
  }

  return new BN(wei.toString(10), 10);
};

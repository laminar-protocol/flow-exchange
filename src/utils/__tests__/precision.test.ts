import BN from 'bn.js';

import { fromPrecision, toPrecision } from '../precision';

describe('precision', () => {
  it('fromPrecision', () => {
    expect(fromPrecision('1', 1)).toEqual('0.1');
    expect(fromPrecision('10', 1, { pad: true })).toEqual('1.0');
    expect(fromPrecision('1011132131200', 4, { pad: true, commify: true })).toEqual('101,113,213.1200');
    expect(fromPrecision(new BN('11011132131200'), 4, { pad: true, commify: true })).toEqual('101,113,213.1200');
    expect(fromPrecision('3786123861283612368136812638172638126381263812638', 1)).toEqual(
      '378612386128361236813681263817263812638126381263.8',
    );
    expect(fromPrecision('3786123861283612368136812638172638126381263812638', 100)).toEqual(
      '0.0000000000000000000000000000000000000000000000000003786123861283612368136812638172638126381263812638',
    );
    expect(fromPrecision('3786123861283612,368136812638172638126381263812638', 100)).toThrowError();
  });
  it('toPrecision', () => {
    expect(toPrecision('10', 1).toString()).toEqual('100');
    expect(toPrecision('1000', 18).toString()).toEqual('1000000000000000000000');
  });
});

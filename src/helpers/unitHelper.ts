import BN from 'bn.js';
import web3 from 'web3';

export const fromWei = (amount?: BN | string) => web3.utils.fromWei((amount || '0'), 'ether');
export const toWei = (amount: BN | string) => web3.utils.toWei(new BN(amount), 'ether');
export const toBN = (amount?: string | number) => web3.utils.toBN((amount || '0'));

export const UINT256_MAX = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
export const UINT256_MIN = '0';

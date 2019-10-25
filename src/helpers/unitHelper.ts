import BN from 'bn.js';
import ethereum from 'services/ethereum';

export const fromWei = (amount: BN | string) => ethereum.ethProvider.utils.fromWei((amount || '0'), 'ether');
export const toWei = (amount: BN | string) => ethereum.ethProvider.utils.toWei((amount || '0') as any, 'ether');
export const toBN = (amount: string) => ethereum.ethProvider.utils.toBN((amount || '0'));

export const UINT256_MAX = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
export const UINT256_MIN = '0';

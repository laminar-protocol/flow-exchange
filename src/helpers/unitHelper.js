import ethereum from 'services/ethereum';

export const fromWei = (amount) => ethereum.ethProvider.utils.fromWei(amount, 'ether');
export const toWei = (amount) => ethereum.ethProvider.utils.toWei(amount, 'ether');

export const UINT256_MAX = '115792089237316195423570985008687907853269984665640564039457584007913129639935';
export const UINT256_MIN = '0';

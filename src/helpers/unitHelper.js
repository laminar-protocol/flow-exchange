import ethereum from 'services/ethereum';

export const fromWei = (amount) => ethereum.ethProvider.utils.fromWei(amount, 'ether');
export const toWei = (amount) => ethereum.ethProvider.utils.toWei(amount, 'ether');

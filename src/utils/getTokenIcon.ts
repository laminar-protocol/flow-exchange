import { faBtc, faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faAward, faCubes, faDollarSign, faEuroSign, faYenSign } from '@fortawesome/free-solid-svg-icons';

import { TokenId } from '../services/Api';

const iconMap = {
  DAI: faDollarSign,
  fEUR: faEuroSign,
  fJPY: faYenSign,
  fXAU: faCubes,
  fAAPL: faAward,
  LAMI: faDollarSign,
  AUSD: faDollarSign,
  FEUR: faEuroSign,
  FJPY: faYenSign,
  FBTC: faBtc,
  FETH: faEthereum,
};

const getTokenIcon = (tokenId: TokenId) => {
  return iconMap[tokenId];
};

export default getTokenIcon;

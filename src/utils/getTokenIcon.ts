import { faBtc, faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faAward, faCubes, faDollarSign, faEuroSign, faYenSign } from '@fortawesome/free-solid-svg-icons';

import { TokenInfo } from '../services/Api';

const iconMap: Record<TokenInfo['name'], typeof faBtc> = {
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
  FAUD: faDollarSign,
  FCAD: faDollarSign,
  FCHF: faDollarSign,
  FXAU: faDollarSign,
  FOIL: faDollarSign,
};

const getTokenIcon = (tokenName: TokenInfo['name']) => {
  return iconMap[tokenName];
};

export default getTokenIcon;

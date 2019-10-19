export const contractAddress = {
  kovan: {
    dai: '0xbf7a7169562078c96f0ec1a8afd6ae50f12e5a99',
    flow: '0x4Ed3f56009d7b65d7f2a3e83a83DB02b7Ed8C687',
    eur: '0xa52676717b3df67bFC1d885FE89bB91D589aBc10',
    jpy: '0x4344452774d1d9b9088527E3B79398A4a28Eb69D',
    fallbackPool: '0x3f9cC98f612611E83Ae9977c3f8024D762722E66',
  },
};

export const symbols = {
  kovan: [
    { symbol: 'dai', isBase: true },
    { symbol: 'eur', isBase: false },
    { symbol: 'jpy', isBase: false },
  ],
};

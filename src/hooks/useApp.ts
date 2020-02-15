import { EthereumApi, PolkadotApi } from '../services';
import { Account, EthereumProvider, Impl, PolkadotProvider } from '../types';
import create, { GetState, SetState, State } from './createState';

export interface AppState extends State {
  provider: EthereumProvider | PolkadotProvider | null;
  currentTheme: 'light' | 'dark';
  availableProvider: Impl[];
  currentAccount: Account | null;
  connectModalShow: boolean;
  init(): void;
  setProvider(impl: Impl): AppState['provider'];
}

const checkAvailableProvider = () => {
  const anyWindow = window as any;

  const available = {
    ethereum: !!(anyWindow.ethereum || anyWindow.web3?.currentProvider),
    polkadot: !!anyWindow.injectedWeb3,
  };

  return (Object.keys(available) as Impl[]).filter(v => available[v]);
};

export const [useApp, useAppApi] = create<AppState>(
  (set: SetState<AppState>, get: GetState<AppState>): AppState => ({
    provider: null,
    currentTheme: 'light',
    currentAccount: null,
    availableProvider: [],
    connectModalShow: true,
    init() {
      set(state => {
        state.availableProvider = checkAvailableProvider();
      });
    },
    setProvider(impl) {
      set(state => {
        if (impl === 'ethereum') {
          state.provider = {
            impl: 'ethereum',
            loading: true,
            api: new EthereumApi(),
          };
        } else if (impl === 'polkadot') {
          state.provider = {
            impl: 'polkadot',
            loading: true,
            api: new PolkadotApi(),
          };
        }
      });

      return get().provider;
    },
  }),
);

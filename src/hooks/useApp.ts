import { EthereumApi, PolkadotApi } from '../services';
import { Account, EthereumProvider, Impl, PolkadotProvider } from '../types';
import create, { GetState, SetState, State } from './createState';
import { useSettingApi } from './useSetting';

export interface AppState extends State {
  provider: EthereumProvider | PolkadotProvider | null;
  availableProvider: Impl[];
  currentAccount: Account | null;
  connectModalShow: boolean;
  setProviderEnable(impl: Impl): Promise<AppState['provider']>;
  checkAvailableProvider(): Impl[];
}

export const [useApp, useAppApi] = create<AppState>(
  (set: SetState<AppState>, get: GetState<AppState>): AppState => ({
    provider: null,
    currentAccount: null,
    availableProvider: [],
    connectModalShow: false,
    checkAvailableProvider() {
      const anyWindow = window as any;

      const available = {
        ethereum: !!(anyWindow.ethereum || anyWindow.web3?.currentProvider),
        polkadot: !!anyWindow.injectedWeb3,
      };

      console.log(anyWindow.injectedWeb3);

      return (Object.keys(available) as Impl[]).filter(v => available[v]);
    },
    async setProviderEnable(impl) {
      let provider: AppState['provider'];

      if (impl === 'ethereum') {
        provider = {
          impl: 'ethereum',
          loading: true,
          api: new EthereumApi(),
        };
      } else if (impl === 'polkadot') {
        provider = {
          impl: 'polkadot',
          loading: true,
          api: new PolkadotApi(),
        };
      } else {
        provider = null;
      }

      await provider?.api.enable();

      set(state => {
        state.provider = provider;
      });

      const appProvider = get().provider;
      useSettingApi.getState().setProvider(appProvider?.impl);

      return appProvider;
    },
  }),
);

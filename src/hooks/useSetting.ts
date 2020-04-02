import store from 'store';

import { ChainType } from '../services/Api';
import create, { GetState, SetState, State } from './createState';

const SETTING_KEY = 'setting';

export interface SettingState extends State {
  setting: {
    chainType?: ChainType;
    currentTheme: 'light' | 'dark';
  };
  setCurrentTheme(theme: SettingState['setting']['currentTheme']): void;
  setChainType(chainTypeName: SettingState['chainType']): void;
}

export const [useSetting, useSettingApi] = create<SettingState>(
  (set: SetState<SettingState>, get: GetState<SettingState>): SettingState => {
    let initSetting: SettingState['settings'] = {
      chainType: undefined,
      currentTheme: 'light',
    };

    // init
    if (!store.get(SETTING_KEY)) {
      store.set(SETTING_KEY, initSetting);
    } else {
      initSetting = store.get(SETTING_KEY);
    }

    const sync = () => {
      const setting = get().setting;
      store.set(SETTING_KEY, setting);
    };

    return {
      setting: initSetting,
      setCurrentTheme(theme) {
        set(state => {
          state.setting.currentTheme = theme;
        });
        sync();
      },
      setChainType(chainTypeName) {
        if (chainTypeName) {
          set(state => {
            state.setting.chainType = chainTypeName;
          });
          sync();
        }
      },
    };
  },
);

export default useSetting;

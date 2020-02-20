import store from 'store';

import { Impl } from '../types';
import create, { GetState, SetState, State } from './createState';

const SETTING_KEY = 'setting';

export interface SettingState extends State {
  setting: {
    provider?: Impl;
    currentTheme: 'light' | 'dark';
    setCurrentTheme(theme: SettingState['setting']['currentTheme']): void;
    setProvider(providerName: SettingState['provider']): void;
  };
}

export const [useSetting, useSettingApi] = create<SettingState>(
  (set: SetState<SettingState>, get: GetState<SettingState>): SettingState => {
    let initSetting: SettingState['settings'] = {
      provider: undefined,
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
      setCurrentTheme(theme: SettingState['setting']['currentTheme']) {
        set(state => {
          state.setting.currentTheme = theme;
        });
        sync();
      },
      setProvider(providerName: SettingState['provider']) {
        if (providerName) {
          set(state => {
            state.setting.provider = providerName;
          });
          sync();
        }
      },
    };
  },
);

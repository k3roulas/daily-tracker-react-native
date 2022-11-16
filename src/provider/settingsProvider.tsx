import { createContext, useContext, useEffect, useState } from 'react';

import { getSettings, storeSettings } from '../lib/localStore';
import { ProviderType } from '../type/provider';
import {
  SettingsContextType,
  SettingsType,
} from '../type/provider/settingsProvider';

const defaultSettings = {
  height: '',
};

export const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  saveSettings: async () => {},
});

export const SettingsProvider: ProviderType = ({ children }) => {
  const [settings, setSettings] = useState<SettingsType>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  const saveSettings = async (settings: SettingsType) => {
    storeSettings(settings);
    setSettings(settings);
  };

  const loadSettings = async () => {
    const fromDisk = await getSettings();
    fromDisk !== null && setSettings(fromDisk);
    setIsLoaded(true);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {isLoaded && <>{children}</>}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType =>
  useContext(SettingsContext);

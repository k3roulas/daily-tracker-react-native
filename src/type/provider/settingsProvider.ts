// TODO use type or interface
export type SettingsContextType = {
  settings: SettingsType;
  saveSettings: (s: SettingsType) => Promise<void>;
};

export interface SettingsType {
  height: string;
}

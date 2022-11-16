import AsyncStorage from '@react-native-async-storage/async-storage';

import { measuresKey, settingsKey } from '../config/index';
import { MeasuresType } from '../type/provider/measuresProvider';
import { SettingsType } from '../type/provider/settingsProvider';

const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    // error reading value
  }
};

export const storeMeasures = (measures: MeasuresType) => {
  storeData(measuresKey, measures);
};

export const getMeasures = async () => {
  return await getData(measuresKey);
};

export const storeSettings = (settings: SettingsType) => {
  storeData(settingsKey, settings);
};

export const getSettings = async (): Promise<SettingsType> => {
  return getData(settingsKey);
};

import AsyncStorage from '@react-native-async-storage/async-storage';

import { settingsKey } from '../config/index';

const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(settingsKey, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    const decoded = JSON.parse(value);
    console.log('decoded', decoded);
    return decoded;
    // if (value !== null) {
    //   // value previously stored
    // }
  } catch (e) {
    // error reading value
  }
};

export const storeHeight = settings => {
  return storeData(settingsKey, settings);
};

export const getHeight = () => {
  return getData(settingsKey);
};

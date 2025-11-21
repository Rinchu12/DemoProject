import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key: string) => {
  try {
    const token = await AsyncStorage.getItem(key);
    return token;
  } catch (error) {
    console.log('Error in fetching data=====', error);
    return '';
  }
};

export const setData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('Error in setting data=====', error);
  }
};

export const clearData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Error in clearing data=====', error);
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log('Error while clearing all data=====', error);
  }
};

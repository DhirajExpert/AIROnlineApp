import * as SecureStore from 'expo-secure-store';

export const saveSecureData = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

export const getSecureData = async (key) => {
  const value = await SecureStore.getItemAsync(key);
  return value;
};

export const deleteSecureData = async (key) => {
  await SecureStore.deleteItemAsync(key);
};

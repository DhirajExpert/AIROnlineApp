import * as SecureStore from 'expo-secure-store';

const getToken = async () => {
  try {
    const authData = await SecureStore.getItemAsync('auth');
    if (!authData) {
      console.error('No auth data found');
      return null;
    }
    const { token } = JSON.parse(authData);
    console.log('Retrieved Token:', token);  // Check token here
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

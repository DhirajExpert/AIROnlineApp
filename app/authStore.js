import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,

  // Method to log in the user and save data
  login: async (userData, token) => {
    try {
      // Save user data and token
      await SecureStore.setItemAsync('authLogin', JSON.stringify({ userData, token }));
      set({
        user: userData,
        token,
        isLoggedIn: true,
      });
    } catch (error) {
      console.error('Failed to store user data:', error);
    }
  },
  logout: async () => {
    try {
       await SecureStore.deleteItemAsync('authLogin');
       
      set({
        user: null,
        token: null,
        isLoggedIn: false,
      });

      console.log('Logout successful:', useAuthStore.getState()); // Debug
    } catch (error) {
      console.error('Failed to clear user data:', error);
    }
  },

  // Method to restore session on app launch
  restoreSession: async () => {
    try {
     
      const authData = await SecureStore.getItemAsync('authLogin');
      if (authData) {
        const { user, token } = JSON.parse(authData);
        set({
          user,
          token,
          isLoggedIn: !!token,
        });
      }
    } catch (error) {
      console.error('Failed to restore session:', error);
    }
  },
}));

export default useAuthStore;

import {create} from 'zustand';
import * as LocalAuthentication from 'expo-local-authentication';

interface AuthPageState {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  authenticate: () => Promise<void>;
}

const useAuthStore = create<AuthPageState>(set => ({
  isAuthenticated: false,
  setIsAuthenticated: value => set({isAuthenticated: value}),
  authenticate: async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync();
      set({isAuthenticated: result.success});
    } catch (error) {
      console.error('Authentication error:', error);
    }
  },
}));

export default useAuthStore;

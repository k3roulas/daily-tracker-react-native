import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { createContext, useContext, useEffect, useState } from 'react';

import { ProviderType } from '../type/provider';
import { User, UserContextType } from '../type/provider/userProvider';

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: ProviderType = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    // setUser(defaultUser);
    // return;

    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      setUser(result.user);
    } catch (e) {
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        await signIn();
      }
      if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError(
          'PLAY_SERVICES_NOT_AVAILABLE - play services not available or outdated',
        );
      }
      if (e.code === statusCodes.IN_PROGRESS) {
        setError(
          'IN_PROGRESS - operation (e.g. sign in) is in progress already',
        );
      }
      setError('UNKNOWN - code : ' + e.code);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null);
      signIn();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    signIn();
  }, []);

  return (
    <UserContext.Provider value={{ user, error, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => useContext(UserContext);

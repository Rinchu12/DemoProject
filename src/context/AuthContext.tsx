import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UserData } from '../types/listItemType';
import { clearAllData, getData, setData } from '../storage/asyncStoreUtil';
import { ISLOGGEDIN } from '../constants/constants';

interface AuthContextType {
  isLoggedIn: boolean;
  setUserLoggedIn: (isLoggedIn: boolean) => void;
  user: UserData | null;
  setLoggedInUser: (user: UserData | null) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextprovider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [user, setUser] = useState<UserData | null>(null);
  useEffect(() => {
    const setLoggedIn = async () => {
      let isLoggedIn = await getData(ISLOGGEDIN);
      setUserLoggedIn(isLoggedIn === 'true');
    };

    setLoggedIn();
  }, []);

  const setUserLoggedIn = async (isLoggedIn: boolean) => {
    await setData(ISLOGGEDIN, String(isLoggedIn));
    setIsLoggedIn(isLoggedIn);
  };
  const setLoggedInUser = (user: UserData | null) => {
    setUser(user);
  };

  const logout = async () => {
    await clearAllData();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setUserLoggedIn, user, setLoggedInUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthProvider should wrapp the app');
  }
  return context;
};

import { useAuth } from '../context/AuthContext';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const RootNavigator = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <AppNavigator /> : <AuthNavigator />;
};
export default RootNavigator;

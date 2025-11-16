/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigation';
import PaginationScreen from './src/screens/Pagination';
import StopWatch from './src/screens/StopWatch';
import { RootComponents } from './src/screens/OTPInput';
import LoginScreen from './src/screens/Login';

function App() {
  return (
  <LoginScreen/>
  
  );                             
}



export default App;

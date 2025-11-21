/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { AuthContextprovider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import GoogleMapView from './src/screens/GoogleMap';

function App() {
  return (
    // <NavigationContainer>
    //   <AuthContextprovider>
    //     <RootNavigator />
    //   </AuthContextprovider>
    // </NavigationContainer>

    <GoogleMapView />
  );
}

export default App;

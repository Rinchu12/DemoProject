import { useEffect, useState, useRef } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  PermissionsAndroid,
  Linking,
  AppState,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import GetLocation, { LocationErrorCode } from 'react-native-get-location';

type GetLocationError = {
  code: LocationErrorCode;
  message: string;
};

const fallbackLocation = {
  latitude: 28.6139,
  longitude: 77.209,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const GoogleMapView = () => {
  const [region, setRegion] = useState(fallbackLocation);
  const appStateRef = useRef(AppState.currentState);

  useEffect(() => {
    requestLocationPermission();

    const subscription = AppState.addEventListener('change', nextState => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextState === 'active'
      ) {
        setTimeout(() => {
          retryLocation();
        }, 800); // small delay so GPS becomes active
      }
      appStateRef.current = nextState;
    });

    return () => subscription.remove();
  }, []);

  const retryLocation = async () => {
    try {
      await getCurrentLocation();
    } catch {
      // Try once more after GPS fully wakes up
      setTimeout(() => {
        getCurrentLocation();
      }, 1200);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      if (
        granted['android.permission.ACCESS_FINE_LOCATION'] === 'granted' ||
        granted['android.permission.ACCESS_COARSE_LOCATION'] === 'granted'
      ) {
        getCurrentLocation();
      } else {
        Alert.alert('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = async () => {
    try {
      let location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });

      const { latitude, longitude } = location;

      setRegion(prev => ({
        ...prev,
        latitude,
        longitude,
      }));
    } catch (error) {
      const { code, message } = error as GetLocationError;

      if (code === 'UNAVAILABLE') {
        Alert.alert('Location Disabled', 'Enable location services.', [
          {
            text: 'Open Settings',
            onPress: () => GetLocation.openSettings(),
          },
          { text: 'Cancel', style: 'cancel' },
        ]);
        return;
      }

      Alert.alert('Error getting location', message);
      setRegion(fallbackLocation);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={fallbackLocation} // important: NOT "region"
        showsUserLocation={true}
        onUserLocationChange={e => {
          const coord = e.nativeEvent.coordinate;
          if (!coord) return; // safety check

          const { latitude, longitude } = coord;
          setRegion(r => ({ ...r, latitude, longitude }));
        }}
      >
        <Marker coordinate={region} />
      </MapView>
    </View>
  );
};

export default GoogleMapView;

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapStyle: { flex: 1 },
});

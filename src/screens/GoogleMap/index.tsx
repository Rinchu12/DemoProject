import { useEffect, useState, useRef } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import GetLocation from 'react-native-get-location';

const fallbackLocation = {
  latitude: 28.6139,
  longitude: 77.209,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const GoogleMapView = () => {
  const [region, setRegion] = useState(fallbackLocation);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    retryLocation();
  }, []);

  const retryLocation = async () => {
    try {
      await getCurrentLocation();
    } catch {
      setTimeout(() => {
        getCurrentLocation();
      }, 1200);
    }
  };

  const getCurrentLocation = async () => {
    try {
      let location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });

      const { latitude, longitude } = location;

      updateLocationOnMap(latitude, longitude);
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch location');
    }
  };

  const updateLocationOnMap = (latitude: number, longitude: number) => {
    const newRegion = {
      ...region,
      latitude,
      longitude,
    };

    setRegion(newRegion);

    // Smooth camera animation
    mapRef.current?.animateCamera({
      center: { latitude, longitude },
      pitch: 0,
      heading: 0,
      zoom: 17,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.mapStyle}
        initialRegion={fallbackLocation}
        showsUserLocation={true}
        followsUserLocation={true}
        onUserLocationChange={e => {
          const coord = e.nativeEvent.coordinate;
          if (!coord) return;

          updateLocationOnMap(coord.latitude, coord.longitude);
        }}
      >
        {/* Red marker that moves with region */}
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

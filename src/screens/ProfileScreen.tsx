import { useEffect } from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import axiosInstance from '../axios/axiosInstance';
import { ENDPOINTS } from '../constants/constants';
import { useAuth } from '../context/AuthContext';
import { LoginResponse, ProfileResponse } from '../types/listItemType';

const ProfileScreen = () => {
  const { user, setLoggedInUser, logout } = useAuth();
  useEffect(() => {
    callProfileApi();
  }, []);

  const callLogoutAPI = async () => {
    try {
      let response: LoginResponse = await axiosInstance.post(ENDPOINTS.LOGOUT);
      if (response.status === 'success') {
        logout();
      }
    } catch (error) {
      Alert.alert('Error fetching profile data', JSON.stringify(error));
    }
  };

  const callProfileApi = async () => {
    try {
      let response: ProfileResponse = await axiosInstance.get(
        ENDPOINTS.PROFILE,
      );

      console.log('PROFILE ===>', response);

      if (response?.data) {
        setLoggedInUser(response.data); // directly set data
      }
    } catch (error) {
      setLoggedInUser(null);
      Alert.alert('Error fetching profile data', JSON.stringify(error));
    }
  };

  if (!user) {
    return <Text style={styles.loading}>Loading profile...</Text>;
  }

  return (
    <View style={styles.container}>
      {user.profilePic ? (
        <Image source={{ uri: user.profilePic }} style={styles.profilePic} />
      ) : (
        <View style={styles.placeholderPic}>
          <Text style={styles.placeholderText}>
            {user.firstName?.[0] || 'U'}
          </Text>
        </View>
      )}
      <Text style={styles.label}>UUID:</Text>
      <Text style={styles.value}>{user.uuid}</Text>

      <Text style={styles.label}>ID:</Text>
      <Text style={styles.value}>{user.id}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>

      <Text style={styles.label}>First Name:</Text>
      <Text style={styles.value}>{user.firstName}</Text>

      <Text style={styles.label}>Last Name:</Text>
      <Text style={styles.value}>{user.lastName}</Text>

      <Text style={styles.label}>Auth Provider:</Text>
      <Text style={styles.value}>{user.authProvider}</Text>

      <Button title="Logout" onPress={callLogoutAPI} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loading: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 18,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  placeholderPic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 36,
    color: '#fff',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    marginBottom: 5,
  },
});

export default ProfileScreen;

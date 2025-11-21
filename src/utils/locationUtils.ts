import { Alert } from "react-native";
import GetLocation from "react-native-get-location";

export const showGpsAlert = (
  title: string = "Location Disabled",
  message: string = "Please enable GPS to get current location"
) => {
  Alert.alert(title, message, [
    {
      text: "Open Settings",
      onPress: () => GetLocation.openSettings(),
    },
    {
      text: "Cancel",
      style: "cancel",
    },
  ]);
};

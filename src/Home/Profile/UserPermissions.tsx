import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { View, Text } from "react-native";

export const getCameraPermission = async () => {
  if (Constants.platform?.android) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    if (status != "granted") {
      alert("We need permission to use your camera");
    }
  }
};

const UserPermission = () => {
  return (
    <View>
      <Text>Permissions</Text>
    </View>
  );
};

export default UserPermission;

import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput as RNTextInput,
  Dimensions,
  Text,
} from "react-native";
// import { getCameraPermission } from "./UserPermissions";
// import * as ImagePicker from "expo-image-picker";
import { Box } from "../../components/Theme";
import { useFormik } from "formik";
import * as Yup from "yup";
import FontAwesomeTextInput from "../../components/Form/FontAwesomeTextInput";
import { Button, Header } from "../../components";
import { updateUser } from "../../firebase/authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "../../firebase/config";
import { HomeNavigationProps } from "../../components/Navigation";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  address: Yup.string()
    .min(10, "Too short!")
    .max(100, "Too long!")
    .required("Required"),
});

const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("user");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const footerHeight = Dimensions.get("window").width / 5;

const Profile = ({ navigation, route }: HomeNavigationProps<"Profile">) => {
  const [profile, setProfile] = useState<any>();
  const [uid, setUid] = useState<any>();

  const fetchProfile = () => {
    const userId = route.params;
    console.log(userId?.userId);
    firebase
      .firestore()
      .collection("users")
      .doc(userId?.userId)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setProfile({
            id: userId?.userId,
            data: snapshot?.data(),
          });
        } else {
          setProfile({
            id: userId?.userId,
            data: null,
          });
        }
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  getUser()
    .then((user) => setUid(user.uid))
    .catch((error) => console.log("ERROR", error));

  //   const handlePickAvatar = async () => {
  //     getCameraPermission();

  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //     });

  //     if (!result.cancelled) {
  //       setUser({
  //         avatar: result.uri,
  //       });
  //     }
  //   };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: { username: "", address: "" },
    onSubmit: (values) => {
      updateUser(uid, values.username, values.address);
    },
  });

  const username = useRef<RNTextInput>(null);

  //   console.log("PROFILE", profile);

  return (
    <View style={styles.mainContainer}>
      <Header
        title="My Profile"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "external-link", onPress: () => true }}
      />
      <View style={styles.container}>
        <View style={{ marginVertical: 8, marginTop: 50 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>My Profile</Text>
        </View>
        <View style={styles.avatarPlaceholder}>
          <Image
            style={styles.avatar}
            source={
              profile?.data == null
                ? { uri: null }
                : { uri: profile?.data.avatar }
            }
          />
        </View>

        <Box marginTop="l">
          <Box marginBottom="s">
            <FontAwesomeTextInput
              value={profile?.data == null ? undefined : profile?.data.username}
              icon="user"
              placeholder="Enter your Username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              error={errors.username}
              touched={touched.username}
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel="next"
              onSubmitEditing={() => username.current?.focus()}
            />
          </Box>
          <Box marginBottom="s">
            <FontAwesomeTextInput
              ref={username}
              value={profile?.data == null ? undefined : profile?.data.address}
              icon="address-book"
              placeholder="Enter your Address"
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              error={errors.address}
              touched={touched.address}
              autoCapitalize="none"
              returnKeyType="go"
              returnKeyLabel="go"
              onSubmitEditing={() => handleSubmit()}
            />
          </Box>

          <Box alignItems="center">
            <Button variant="primary" onPress={handleSubmit} label="Submit" />
          </Box>
        </Box>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E1E2E6",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: 75,
  },
});

export default Profile;

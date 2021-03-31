import React, { useRef, useState } from "react";
import {
  Pressable,
  TextInput as RNTextInput,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text, Container } from "../components";
import { Box } from "../components/Theme";
import TextInput from "../components/Form/TextInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import Footer from "./components/Footer";
import { AuthNavigationProps } from "../components/Navigation";
import { SignUpUser } from "../firebase/authentication";
import { Ionicons } from "@expo/vector-icons";
import { getCameraPermission } from "../Home/Profile/UserPermissions";
import * as ImagePicker from "expo-image-picker";

const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  passwordConfirmation: Yup.string()
    .equals([Yup.ref("password")], "Passwords don't match")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const SignUp = ({ navigation }: AuthNavigationProps<"SignUp">) => {
  const password = useRef<RNTextInput>(null);
  const passwordConfirmation = useRef<RNTextInput>(null);
  const [user, setUser] = useState<any>({
    avatar: null,
  });

  const handlePickAvatar = async () => {
    getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setUser({
        avatar: result.uri,
      });
    }
  };

  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik(
    {
      validationSchema: SignUpSchema,
      initialValues: {
        email: "",
        password: "",
        passwordConfirmation: "",
      },
      onSubmit: (values) => {
        SignUpUser(values.email, values.password, user.avatar);
      },
    }
  );

  const footer = (
    <Footer
      title="Already have an account?"
      action="Login here"
      onPress={() => navigation.navigate("Login")}
    />
  );

  return (
    <Container pattern={1} {...{ footer }}>
      <View style={styles.container}>
        <Pressable
          onPress={() => handlePickAvatar()}
          style={styles.avatarPlaceholder}
        >
          <Image style={styles.avatar} source={{ uri: user.avatar }} />

          <Ionicons
            name="ios-add"
            size={40}
            color="#FFF"
            style={{ marginTop: 6, marginLeft: 2 }}
          />
        </Pressable>
      </View>

      <Text variant="title1" textAlign="center" marginBottom="s">
        Create account
      </Text>
      {/* <Text variant="body" textAlign="center" marginBottom="m">
        Let's us know what your name, email and your password
      </Text> */}

      <Box>
        <Box marginBottom="s">
          <TextInput
            icon="mail"
            placeholder="Enter your Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            touched={touched.email}
            autoCapitalize="none"
            autoCompleteType="email"
            returnKeyType="next"
            returnKeyLabel="next"
            onSubmitEditing={() => password.current?.focus()}
          />
        </Box>
        {errors.email ? <Text variant="warning">{errors.email}</Text> : null}
        <Box marginBottom="s">
          <TextInput
            ref={password}
            icon="lock"
            placeholder="Enter your Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
            autoCapitalize="none"
            autoCompleteType="password"
            returnKeyType="next"
            returnKeyLabel="next"
            secureTextEntry
            onSubmitEditing={() => passwordConfirmation.current?.focus()}
          />
        </Box>
        {errors.password ? (
          <Text variant="warning">{errors.password}</Text>
        ) : null}
        <Box marginBottom="s">
          <TextInput
            ref={passwordConfirmation}
            icon="lock"
            placeholder="Confirm your Password"
            onChangeText={handleChange("passwordConfirmation")}
            onBlur={handleBlur("passwordConfirmation")}
            error={errors.passwordConfirmation}
            touched={touched.passwordConfirmation}
            autoCapitalize="none"
            autoCompleteType="password"
            returnKeyType="go"
            returnKeyLabel="go"
            secureTextEntry
            onSubmitEditing={() => handleSubmit()}
          />
        </Box>
        {errors.passwordConfirmation ? (
          <Text variant="warning">{errors.passwordConfirmation}</Text>
        ) : null}
        <Box alignItems="center">
          <Button
            variant="primary"
            onPress={handleSubmit}
            label="Create your account"
          />
        </Box>
      </Box>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E1E2E6",
    marginVertical: 7,
    marginTop: -30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUp;

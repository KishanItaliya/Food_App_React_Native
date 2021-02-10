import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import { Button, Text, Container } from "../components";
import { Box } from "../components/Theme";
import TextInput from "./components/Form/TextInput";
import Checkbox from "./components/Form/Checkbox";
import { useFormik } from "formik";
import * as Yup from "yup";
import Footer from "./components/Footer";
import { Routes, StackNavigationProps } from "../components/Navigation";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-evenly",
  },
});

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Login = ({ navigation }: StackNavigationProps<Routes, "Login">) => {
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
    initialValues: { email: "", password: "", remember: false },
    onSubmit: (values) => console.log(values),
  });

  const password = useRef<typeof TextInput>(null);

  const footer = (
    <Footer
      title="Don't have an account?"
      action="Sign Up here"
      onPress={() => navigation.navigate("SignUp")}
    />
  );

  return (
    <Container {...{ footer }}>
      <Box padding="l" style={styles.container}>
        <Text variant="title1" textAlign="center" marginBottom="s">
          Welcome back
        </Text>
        <Text variant="body" textAlign="center" marginBottom="m">
          Use your credentials below and login to your account
        </Text>

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
              returnKeyType="go"
              returnKeyLabel="go"
              secureTextEntry
              onSubmitEditing={() => handleSubmit()}
            />
          </Box>
          <Box flexDirection="row" justifyContent="space-between">
            <Checkbox
              label="Remember me"
              checked={values.remember}
              onChange={() => setFieldValue("remember", !values.remember)}
            />
            <Button variant="transparent" onPress={() => true}>
              <Text color="primary">Forgot password</Text>
            </Button>
          </Box>
          <Box alignItems="center">
            <Button
              variant="primary"
              onPress={handleSubmit}
              label="Log into your account"
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

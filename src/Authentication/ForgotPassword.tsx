import React from "react";
import { Linking, StyleSheet } from "react-native";
import { Container, Text, Button } from "../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Routes, StackNavigationProps } from "../components/Navigation";
import Footer from "./components/Footer";
import TextInput from "./components/Form/TextInput";
import { Box } from "../components/Theme";

interface ForgotPasswordProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

const ForgotPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPassword = ({
  navigation,
}: StackNavigationProps<Routes, "ForgotPassword">) => {
  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik(
    {
      validationSchema: ForgotPasswordSchema,
      initialValues: { email: "" },
      onSubmit: (values) => console.log(values),
    }
  );

  const footer = (
    <Footer
      title="Don't work?"
      action="Try another way"
      onPress={() => Linking.openURL("mailto:help@support.com")}
    />
  );

  return (
    <Container {...{ footer }}>
      <Box padding="xl" style={styles.container}>
        <Text variant="title1" textAlign="center" marginBottom="s">
          Forgot password?
        </Text>
        <Text variant="body" textAlign="center" marginBottom="m">
          Enter the email address associated with your account
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
              returnKeyType="go"
              returnKeyLabel="go"
              onSubmitEditing={() => handleSubmit}
            />
          </Box>

          <Box alignItems="center">
            <Button
              variant="primary"
              onPress={handleSubmit}
              label="Reset password"
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;

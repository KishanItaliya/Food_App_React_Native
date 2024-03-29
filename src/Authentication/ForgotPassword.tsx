import React from "react";
import { Linking } from "react-native";
import { Container, Text, Button } from "../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthNavigationProps } from "../components/Navigation";
import Footer from "./components/Footer";
import TextInput from "../components/Form/TextInput";
import { Box } from "../components/Theme";
import { passwordReset } from "../firebase/authentication";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPassword = ({
  navigation,
}: AuthNavigationProps<"ForgotPassword">) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
  } = useFormik({
    validationSchema: ForgotPasswordSchema,
    initialValues: { email: "" },
    onSubmit: () => {
      passwordReset(values.email), navigation.navigate("PasswordChanged");
    },
  });

  const footer = (
    <Footer
      title="Don't work?"
      action="Try another way"
      onPress={() => Linking.openURL("mailto:help@support.com")}
    />
  );

  return (
    <Container pattern={2} {...{ footer }}>
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
            onSubmitEditing={() => handleSubmit()}
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
    </Container>
  );
};

export default ForgotPassword;

import React, { useRef } from "react";
import { TextInput as RNTextInput } from "react-native";
import { Button, Text, Container } from "../components";
import { Box } from "../components/Theme";
import TextInput from "../components/Form/TextInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import Footer from "./components/Footer";
import { AuthNavigationProps } from "../components/Navigation";
import { SignUpUser } from "../firebase/authentication";

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

  const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik(
    {
      validationSchema: SignUpSchema,
      initialValues: {
        email: "",
        password: "",
        passwordConfirmation: "",
      },
      onSubmit: (values) => {
        SignUpUser(values.email, values.password), navigation.navigate("Home");
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
      <Text variant="title1" textAlign="center" marginBottom="s">
        Create account
      </Text>
      <Text variant="body" textAlign="center" marginBottom="m">
        Let's us know what your name, email and your password
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

export default SignUp;

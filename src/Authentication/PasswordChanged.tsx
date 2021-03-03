import React from "react";
import {
  Container,
  Text,
  Button,
  CloseButton,
  RoundedIcon,
} from "../components";
import { AuthNavigationProps } from "../components/Navigation";
import { Box } from "../components/Theme";

const SIZE = 80;
const PasswordChanged = ({
  navigation,
}: AuthNavigationProps<"PasswordChanged">) => {
  return (
    <Container
      pattern={0}
      footer={
        <Box flexDirection="row" justifyContent="center">
          <CloseButton onPress={() => navigation.pop()} />
        </Box>
      }
    >
      <Box alignSelf="center">
        <RoundedIcon
          iconRatio={0.7}
          name="check"
          size={SIZE}
          backgroundColor="primaryLight"
          color="primary"
        />
      </Box>

      <Text
        variant="title1"
        textAlign="center"
        marginBottom="s"
        marginVertical="l"
      >
        Your password was successfully changed
      </Text>
      <Text variant="body" textAlign="center" marginBottom="m">
        Close the window and login again
      </Text>
      <Box alignItems="center">
        <Button
          variant="primary"
          onPress={() => navigation.navigate("Login")}
          label="Login Now"
        />
      </Box>
    </Container>
  );
};

export default PasswordChanged;

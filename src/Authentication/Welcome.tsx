import React from "react";
import { Image, Dimensions, StyleSheet } from "react-native";
import { Box, Text, useTheme } from "../components/Theme";
import { Button } from "../components";
import { AuthNavigationProps } from "../components/Navigation";
import { BorderlessButton } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const picture = {
  src: require("./assets/24.png"),
  width: 4875,
  height: 4825,
};

export const assets = [picture.src];

const styles = StyleSheet.create({
  description: {
    marginTop: 12,
    marginBottom: 12,
  },
});

const Welcome = ({ navigation }: AuthNavigationProps<"Welcome">) => {
  const theme = useTheme();
  return (
    <Box flex={1} backgroundColor="white">
      <Box
        flex={1}
        borderBottomRightRadius="xl"
        backgroundColor="grey"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          source={picture.src}
          style={{
            width: width - theme.borderRadii.xl,
            height:
              ((width - theme.borderRadii.xl) * picture.height) / picture.width,
          }}
        />
      </Box>
      <Box flex={1} borderTopLeftRadius="xl">
        <Box
          backgroundColor="grey"
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
        />
        <Box
          backgroundColor="white"
          borderTopLeftRadius="xl"
          justifyContent="space-evenly"
          alignItems="center"
          flex={1}
          padding="xl"
        >
          <Text variant="title2">Let's get started</Text>
          <Text variant="body" textAlign="center" style={styles.description}>
            Login to your account below or signup for an amazing experience
          </Text>
          <Button
            variant="primary"
            label="Have an account ? Login"
            onPress={() => navigation.navigate("Login")}
          />
          <Button
            label="Create account, it's Free"
            onPress={() => navigation.navigate("SignUp")}
          />
          <BorderlessButton
            style={{ marginTop: 10 }}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text variant="button" color="secondary">
              Forgot password?
            </Text>
          </BorderlessButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;

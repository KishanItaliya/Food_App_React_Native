import React, { forwardRef } from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { Box } from "../Theme";
import { RoundedIcon, useTheme } from "..";
import { FontAwesome as Icon } from "@expo/vector-icons";

interface FontAwesomeTextInputProps extends RNTextInputProps {
  icon: string;
  touched?: boolean;
  error?: string;
}

const FontAwesomeTextInput = forwardRef<RNTextInput, FontAwesomeTextInputProps>(
  ({ icon, touched, error, ...props }, ref) => {
    const theme = useTheme();
    const SIZE = theme.borderRadii.m * 2;
    const reColor = !touched ? "text" : error ? "danger" : "primary";
    const color = theme.colors[reColor];

    return (
      <Box
        flexDirection="row"
        alignItems="center"
        height={48}
        borderRadius="s"
        borderColor={reColor}
        borderWidth={StyleSheet.hairlineWidth}
        padding="s"
      >
        <Box padding="s">
          <Icon
            name={icon === "user" ? "user" : "address-book"}
            size={18}
            {...{ color }}
          />
        </Box>

        <Box flex={1}>
          <RNTextInput
            underlineColorAndroid="transparent"
            placeholderTextColor={color}
            {...{ ref }}
            {...props}
          />
        </Box>

        {touched && (
          <RoundedIcon
            iconRatio={0.7}
            name={!error ? "check" : "x"}
            size={SIZE}
            backgroundColor={!error ? "primary" : "danger"}
            color="white"
          />
          // <Box
          //   height={SIZE}
          //   width={SIZE}
          //   justifyContent="center"
          //   alignItems="center"
          //   backgroundColor={!error ? "primary" : "danger"}
          //   style={{ borderRadius: SIZE / 2 }}
          // >
          //   <Icon
          //     name={!error ? "check" : "x"}
          //     color="white"
          //     size={16}
          //     style={{ textAlign: "center" }}
          //   />
          // </Box>
        )}
      </Box>
    );
  }
);

export default FontAwesomeTextInput;

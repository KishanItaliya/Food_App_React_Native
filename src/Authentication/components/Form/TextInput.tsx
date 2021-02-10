import React, { forwardRef } from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { Box } from "../../../components/Theme";
import { useTheme } from "../../../components";
import { Feather as Icon } from "@expo/vector-icons";

interface TextInputProps extends RNTextInputProps {
  icon: string;
  touched?: boolean;
  error?: string;
}

const TextInput = forwardRef(
  ({ icon, touched, error, ...props }: TextInputProps, ref) => {
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
            name={icon === "mail" ? "mail" : "lock"}
            size={16}
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
          <Box
            height={SIZE}
            width={SIZE}
            justifyContent="center"
            alignItems="center"
            backgroundColor={!error ? "primary" : "danger"}
            style={{ borderRadius: SIZE / 2 }}
          >
            <Icon
              name={!error ? "check" : "x"}
              color="white"
              size={16}
              style={{ textAlign: "center" }}
            />
          </Box>
        )}
      </Box>
    );
  }
);

export default TextInput;

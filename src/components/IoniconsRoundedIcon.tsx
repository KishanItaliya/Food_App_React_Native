import React from "react";
import { Ionicons as Icon } from "@expo/vector-icons";
import { Box, Theme, Text } from "./Theme";

export interface IoniconsRoundedIconProps {
  name: string;
  size: number;
  color: keyof Theme["colors"];
  backgroundColor: keyof Theme["colors"];
  iconRatio: number;
}

const IoniconsRoundedIcon = ({
  name,
  size,
  color,
  backgroundColor,
  iconRatio,
}: IoniconsRoundedIconProps) => {
  const iconSize = size * iconRatio;
  return (
    <Box
      height={size}
      width={size}
      justifyContent="center"
      alignItems="center"
      style={{ borderRadius: size / 2 }}
      {...{ backgroundColor }}
    >
      <Text style={{ width: iconSize, height: iconSize }} {...{ color }}>
        <Icon size={iconSize} {...{ name }} />
      </Text>
    </Box>
  );
};

IoniconsRoundedIcon.defaultProps = {
  iconRatio: 0.7,
};

export default IoniconsRoundedIcon;

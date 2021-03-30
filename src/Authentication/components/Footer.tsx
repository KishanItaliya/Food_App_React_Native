import React from "react";
import { Box } from "../../components/Theme";
import { Text } from "../../components";
// import SocialLogin from "./SocialLogin";
import { BorderlessButton } from "react-native-gesture-handler";

interface FooterProps {
  onPress: () => void;
  title: string;
  action: string;
}

const Footer = ({ onPress, title, action }: FooterProps) => {
  return (
    <>
      {/* <SocialLogin /> */}
      <Box alignItems="center" marginTop="m" marginBottom="s">
        <BorderlessButton {...{ onPress }}>
          <Text variant="button" color="white">
            <Text>{`${title} `}</Text>
            <Text color="primary">{action}</Text>
          </Text>
        </BorderlessButton>
      </Box>
    </>
  );
};

export default Footer;

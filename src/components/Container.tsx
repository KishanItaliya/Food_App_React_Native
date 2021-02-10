import React, { ReactNode } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box, useTheme } from "./Theme";

export const assets = [require("../components/assets/patterns/1.jpg")];
const { width, height } = Dimensions.get("screen");
const aspectRatio = 750 / 1125;
const picHeight = width * aspectRatio;

interface ContainerProps {
  children: ReactNode;
  footer: ReactNode;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
});

const Container = ({ children, footer }: ContainerProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Box flex={1} backgroundColor="secondary" style={styles.container}>
        <Box backgroundColor="white">
          <Box
            borderBottomLeftRadius="xl"
            overflow="hidden"
            height={picHeight * 0.61}
          >
            <Image
              source={assets[0]}
              style={{
                width,
                height: picHeight,
                borderBottomLeftRadius: theme.borderRadii.xl,
              }}
            />
          </Box>
        </Box>
        <Box flex={1} overflow="hidden">
          <Image
            source={assets[0]}
            style={{
              ...StyleSheet.absoluteFillObject,
              width,
              height: picHeight,
              top: -picHeight * 0.61,
            }}
          />
          <Box
            borderRadius="xl"
            borderTopLeftRadius={0}
            backgroundColor="white"
            flex={1}
            style={{ height: height * 0.6 }}
          >
            {children}
          </Box>
        </Box>

        <Box
          backgroundColor="secondary"
          paddingTop="m"
          style={{ height: height * 0.18 }}
        >
          {footer}
          <Box height={insets.bottom} />
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default Container;

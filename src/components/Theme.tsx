import {
  createText,
  createBox,
  useTheme as useReTheme,
} from "@shopify/restyle";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export const theme = {
  colors: {
    primary: "#2CB9B0",
    primaryLight: "rgba(44, 185, 176, 0.1)",
    secondary: "#0C0D34",
    text: "rgba(12, 13, 52, 0.7)",
    white: "#FFFFFF",
    danger: "#FF0058",
    grey: "#F4F0EF",
    // grey: "rgba(12, 13, 52, 0.05)",
    lightGrey: "#FAFAFA",
    darkGrey: "#8A8D90",
    orange: "#FE5E33",
    darkOrange: "#F9813A",
    yellow: "#FFC641",
    pink: "#FF87A2",
    violet: "#442CB9",
    lightBlue: "#BFEAF5",
    sprimary: "#F9813A",
    lightSprimary: "#FFD8C2",
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  textVariants: {
    hero: {
      fontSize: 70,
      lineHeight: 80,
      fontFamily: "SFProDisplay-Bold",
      color: "white",
      textAlign: "center",
    },
    title1: {
      fontSize: 28,
      fontFamily: "SFProDisplay-Semibold",
      color: "secondary",
    },
    title2: {
      fontSize: 24,
      lineHeight: 30,
      fontFamily: "SFProDisplay-Semibold",
      color: "secondary",
    },
    title3: {
      fontSize: 24,
      lineHeight: 30,
      fontFamily: "SFProDisplay-Regular",
      color: "secondary",
    },
    title4: {
      fontSize: 18,
      fontFamily: "SFProDisplay-Regular",
      color: "darkGrey",
    },
    title5: {
      fontSize: 16,
      fontFamily: "SFProDisplay-Semibold",
      color: "secondary",
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: "SFProDisplay-Regular",
      color: "text",
    },
    button: {
      fontSize: 15,
      fontFamily: "SFProDisplay-Medium",
      color: "text",
    },
    warning: {
      fontSize: 16,
      lineHeight: 20,
      fontFamily: "SFProDisplay-Regular",
      color: "danger",
    },
    header: {
      fontSize: 12,
      lineHeight: 24,
      fontFamily: "SFProDisplay-Semibold",
      color: "secondary",
    },
  },
  breakpoints: {},
};

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export const useTheme = () => useReTheme<Theme>();

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const makeStyles = <T extends NamedStyles<T>>(
  styles: (theme: Theme) => T
) => {
  return () => {
    const currentTheme = useTheme();
    return styles(currentTheme);
  };
};
// export default theme;

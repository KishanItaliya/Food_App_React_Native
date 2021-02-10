import React from "react";
import {
  AuthenticationNavigator,
  assets as authenticationAssets,
} from "./src/Authentication";
import { LoadAssets } from "./src/components";
import { theme } from "./src/components/Theme";
import { ThemeProvider } from "@shopify/restyle";
import { SafeAreaProvider } from "react-native-safe-area-context";

const assets = [...authenticationAssets];

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SFProDisplay-Bold.ttf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SFProDisplay-Semibold.ttf"),
  "SFProDisplay-Regular": require("./assets/fonts/SFProDisplay-Regular.ttf"),
  "SFProDisplay-Medium": require("./assets/fonts/SFProDisplay-Medium.ttf"),
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoadAssets {...{ fonts, assets }}>
        <SafeAreaProvider>
          <AuthenticationNavigator />
        </SafeAreaProvider>
      </LoadAssets>
    </ThemeProvider>
  );
}

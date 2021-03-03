import React, { useState } from "react";
import {
  AuthenticationNavigator,
  assets as authenticationAssets,
} from "./src/Authentication";
import { LoadAssets } from "./src/components";
import { theme } from "./src/components/Theme";
import { ThemeProvider } from "@shopify/restyle";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeNavigator, assets as homeAssets } from "./src/Home";
import { AppRoutes } from "./src/components/Navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTab from "./src/Home/BottomTab";

const assets = [...authenticationAssets, ...homeAssets];

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SFProDisplay-Bold.ttf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SFProDisplay-Semibold.ttf"),
  "SFProDisplay-Regular": require("./assets/fonts/SFProDisplay-Regular.ttf"),
  "SFProDisplay-Medium": require("./assets/fonts/SFProDisplay-Medium.ttf"),
};

const AppStack = createStackNavigator<AppRoutes>();

export default function App() {
  const [user, setUser] = useState();
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      return jsonValue != null ? setUser(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log(e);
    }
  };
  getData();

  return (
    <ThemeProvider theme={theme}>
      <LoadAssets {...{ fonts, assets }}>
        <SafeAreaProvider>
          <AppStack.Navigator headerMode="none">
            {user ? (
              <AppStack.Screen name="Home" component={BottomTab} />
            ) : (
              <AppStack.Screen
                name="Authentication"
                component={AuthenticationNavigator}
              />
            )}
          </AppStack.Navigator>
        </SafeAreaProvider>
      </LoadAssets>
    </ThemeProvider>
  );
}

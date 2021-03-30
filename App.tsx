import React, { useEffect, useState } from "react";
import {
  AuthenticationNavigator,
  assets as authenticationAssets,
} from "./src/Authentication";
import { LoadAssets } from "./src/components";
import { theme } from "./src/components/Theme";
import { ThemeProvider } from "@shopify/restyle";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import { createStackNavigator } from "@react-navigation/stack";
import { assets as homeAssets } from "./src/Home";
// import { AppRoutes } from "./src/components/Navigation";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";
import RootStack from "./src/Home/RootStack";
import firebase from "./src/firebase/config";

const assets = [...authenticationAssets, ...homeAssets];

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SFProDisplay-Bold.ttf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SFProDisplay-Semibold.ttf"),
  "SFProDisplay-Regular": require("./assets/fonts/SFProDisplay-Regular.ttf"),
  "SFProDisplay-Medium": require("./assets/fonts/SFProDisplay-Medium.ttf"),
};

// const AppStack = createStackNavigator<AppRoutes>();

export default function App() {
  const [retrieveUser, setRetrieveUser] = useState<any>();

  const fetchUser = () => {
    firebase.auth().onAuthStateChanged((_user) => {
      if (_user) {
        setRetrieveUser(_user);
      } else {
        setRetrieveUser(null);
      }
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <ThemeProvider theme={theme}>
        <LoadAssets {...{ fonts, assets }}>
          <SafeAreaProvider>
            {retrieveUser != null ? (
              // <AppStack.Screen name="Home" component={BottomTab} />
              <RootStack />
            ) : (
              // <AppStack.Navigator headerMode="none">
              //   <AppStack.Screen
              //     name="Authentication"
              //     component={AuthenticationNavigator}
              //   />
              // </AppStack.Navigator>
              <AuthenticationNavigator />
            )}
          </SafeAreaProvider>
        </LoadAssets>
      </ThemeProvider>
    </StateProvider>
  );
}

import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeRoutes } from "../../components/Navigation";
import { DRAWER_WIDTH } from "../Drawer";
import MainTabScreen from "./MainTabScreen";
import DrawerContent from "./DrawerContent";
import TransactionHistory from "../TransactionHistory";
import HomeStackNavigator from "..";

const Drawer = createDrawerNavigator<HomeRoutes>();

const RootStack = () => (
  <Drawer.Navigator
    drawerContent={(props) => <DrawerContent {...props} />}
    drawerStyle={{
      width: DRAWER_WIDTH,
    }}
  >
    <Drawer.Screen name="Home" component={MainTabScreen} />
    <Drawer.Screen name="TransactionHistory" component={TransactionHistory} />
    <Drawer.Screen name="Reviews" component={HomeStackNavigator} />
  </Drawer.Navigator>
);

export default RootStack;

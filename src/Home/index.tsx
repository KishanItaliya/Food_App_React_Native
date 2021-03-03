import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OutfitIdeas from "./OutfitIdeas";
import DrawerContent, { DRAWER_WIDTH } from "./Drawer";
import { HomeRoutes } from "../components/Navigation";
import FavoriteOutfits from "./FavoriteOutfits";
import TransactionHistory from "./TransactionHistory";
import ItemDetails from "./ItemDetails";
import FoodItems from "./FoodItems";

export { assets } from "./Drawer";
const Drawer = createDrawerNavigator<HomeRoutes>();
export const HomeNavigator = () => (
  <Drawer.Navigator
    drawerContent={() => <DrawerContent />}
    drawerStyle={{
      width: DRAWER_WIDTH,
    }}
  >
    <Drawer.Screen name="FoodItems" component={FoodItems} />
    <Drawer.Screen name="ItemDetails" component={ItemDetails} />
    <Drawer.Screen name="OutfitIdeas" component={OutfitIdeas} />
    <Drawer.Screen name="FavoriteOutfits" component={FavoriteOutfits} />
    <Drawer.Screen name="TransactionHistory" component={TransactionHistory} />
  </Drawer.Navigator>
);

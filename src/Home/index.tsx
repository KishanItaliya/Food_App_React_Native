import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OutfitIdeas from "./OutfitIdeas";
import DrawerContent, { DRAWER_WIDTH } from "./Drawer";
import { HomeRoutes } from "../components/Navigation";
import FavoriteOutfits from "./FavoriteOutfits";
import TransactionHistory from "./TransactionHistory";
import ItemDetails from "./ItemDetails";
import FoodItems from "./FoodItems";
import SearchScreen from "./SearchScreen";
import FoodItemsTabNavigator from "./HomeStackNavigator/FoodItemsTabNavigator";
import ReviewScreen from "./Reviews/ReviewScreen";
import Restaurant from "./Restaurant";
import OrderDelivery from "./OrderDelivery";

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
    <Drawer.Screen name="Restaurant" component={Restaurant} />
    <Drawer.Screen name="ItemDetails" component={ItemDetails} />
    <Drawer.Screen name="OrderDelivery" component={OrderDelivery} />
    <Drawer.Screen name="ReviewScreen" component={ReviewScreen} />
    <Drawer.Screen name="SearchScreen" component={SearchScreen} />
    <Drawer.Screen name="OutfitIdeas" component={OutfitIdeas} />
    <Drawer.Screen name="FavoriteOutfits" component={FavoriteOutfits} />
    <Drawer.Screen name="TransactionHistory" component={TransactionHistory} />
  </Drawer.Navigator>
);

const HomeStack = createStackNavigator<HomeRoutes>();
export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 1,
        },
        headerTitleAlign: "left",
      }}
    >
      <HomeStack.Screen
        name="FoodItemsTabNavigator"
        component={FoodItemsTabNavigator}
        options={{
          title: "Food Items",
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;

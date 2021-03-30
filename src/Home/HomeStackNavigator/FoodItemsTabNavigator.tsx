import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ExploreScreen from "../ExploreScreen";
import Reviews from "../Reviews";

const Tab = createMaterialTopTabNavigator();

const FoodItemsTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={"Reviews"} component={Reviews} />
      <Tab.Screen
        name={"ExploreScreen"}
        component={ExploreScreen}
        options={{ title: "Item Details" }}
      />
    </Tab.Navigator>
  );
};

export default FoodItemsTabNavigator;

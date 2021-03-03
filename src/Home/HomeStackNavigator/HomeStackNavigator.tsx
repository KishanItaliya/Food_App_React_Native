import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeStackRoutes } from "../../components/Navigation";
import ClassifyReviewTabNavigator from "./ClassifyReviewTabNavigator";

const HomeStack = createStackNavigator<HomeStackRoutes>();

const HomeStackNavigator = () => {
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
        name="ClassifyReviewTabNavigator"
        component={ClassifyReviewTabNavigator}
        options={{
          title: "Explore",
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;

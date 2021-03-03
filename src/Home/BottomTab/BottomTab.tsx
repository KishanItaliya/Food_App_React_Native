import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather as Icon } from "@expo/vector-icons";
import { COLORS } from "../FoodItems/FoodItems";
import { HomeNavigator } from "..";
import Cart from "../Cart";
import { View } from "react-native";
import OutfitIdeas from "../OutfitIdeas";
import ClassifyReviewTabNavigator from "../HomeStackNavigator/ClassifyReviewTabNavigator";
import HomeStackNavigator from "../HomeStackNavigator";

const Tab = createBottomTabNavigator();

const BottomTab = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      style: {
        height: 50,
        borderTopWidth: 0,
        elevation: 0,
      },
      showLabel: false,
      activeTintColor: COLORS.primary,
      keyboardHidesTabBar: true,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeNavigator}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => <Icon name="home" color={color} size={26} />,
      }}
    />
    <Tab.Screen
      name="OutfitIdeas"
      component={OutfitIdeas}
      options={{
        tabBarLabel: "OutfitIdeas",
        tabBarIcon: ({ color }) => <Icon name="user" color={color} size={26} />,
      }}
    />
    <Tab.Screen
      name="Search"
      component={Cart}
      options={{
        tabBarIcon: () => (
          <View
            style={{
              height: 60,
              width: 60,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.white,
              borderColor: COLORS.primary,
              borderWidth: 2,
              borderRadius: 30,
              top: -20,
              elevation: 8,
            }}
          >
            <Icon name="search" color={COLORS.primary} size={26} />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="HomeStack"
      component={HomeStackNavigator}
      options={{
        tabBarLabel: "HomeStackNavigator",
        tabBarIcon: ({ color }) => <Icon name="map" color={color} size={26} />,
      }}
    />
    <Tab.Screen
      name="Cart"
      component={Cart}
      options={{
        tabBarLabel: "Cart",
        tabBarIcon: ({ color }) => (
          <Icon name="shopping-cart" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default BottomTab;

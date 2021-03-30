import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather as Icon } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import { isIphoneX } from "react-native-iphone-x-helper";
import { COLORS, icons } from "../../constants";
import SearchScreen from "../SearchScreen";
import Cart from "../Cart";
import FoodItems from "../FoodItems";
import Restaurant from "../Restaurant";
import OrderDelivery from "../OrderDelivery";
import ReviewScreen from "../Reviews/ReviewScreen";
import TransactionHistory from "../TransactionHistory";
import Settings from "../Settings";

const HomeStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }: any) => {
  var isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ flexDirection: "row", position: "absolute", top: 0 }}>
          <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.white}
            />
          </Svg>
          <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
        </View>

        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.white,
          }}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 50,
          backgroundColor: COLORS.white,
        }}
        activeOpacity={1}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar = (props: any) => {
  if (isIphoneX()) {
    return (
      <View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            backgroundColor: COLORS.white,
          }}
        ></View>
        <BottomTabBar {...props.props} />
      </View>
    );
  } else {
    return <BottomTabBar {...props.props} />;
  }
};

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      style: {
        height: 50,
        borderTopWidth: 0,
        elevation: 0,
        backgroundColor: "transparent",
      },
      showLabel: false,
      activeTintColor: COLORS.primary,
      keyboardHidesTabBar: true,
    }}
    tabBar={(props) => <CustomTabBar props={props} />}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ focused }) => (
          <Image
            source={icons.cutlery}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? COLORS.primary : COLORS.secondary,
            }}
          />
        ),
        tabBarButton: (props) => <TabBarCustomButton {...props} />,
      }}
    />
    <Tab.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <Image
            source={icons.search}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? COLORS.primary : COLORS.secondary,
            }}
          />
        ),
        tabBarButton: (props) => <TabBarCustomButton {...props} />,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarLabel: "Settings",
        tabBarIcon: ({ focused }) => (
          <Icon
            name="music"
            color={focused ? COLORS.primary : COLORS.secondary}
            size={25}
          />
        ),
        tabBarButton: (props) => <TabBarCustomButton {...props} />,
      }}
    />
    <Tab.Screen
      name="Setting"
      component={Settings}
      options={{
        tabBarLabel: "Setting",
        tabBarIcon: ({ focused }) => (
          <Icon
            name="settings"
            color={focused ? COLORS.primary : COLORS.secondary}
            size={25}
          />
        ),
        tabBarButton: (props) => <TabBarCustomButton {...props} />,
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeScreen = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="FoodItems" component={FoodItems} />
    <HomeStack.Screen name="Restaurant" component={Restaurant} />
    <HomeStack.Screen name="Cart" component={Cart} />
    <HomeStack.Screen name="OrderDelivery" component={OrderDelivery} />
    <HomeStack.Screen name="ReviewScreen" component={ReviewScreen} />
  </HomeStack.Navigator>
);

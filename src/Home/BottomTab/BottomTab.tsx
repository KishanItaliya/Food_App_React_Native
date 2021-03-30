import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Feather as Icon } from "@expo/vector-icons";
import { HomeNavigator } from "..";
import Cart from "../Cart";
import OutfitIdeas from "../OutfitIdeas";
import HomeStackNavigator from "../HomeStackNavigator";
import SearchScreen from "../SearchScreen";
import { COLORS, icons } from "../../constants";
import Svg, { Path } from "react-native-svg";
import { isIphoneX } from "react-native-iphone-x-helper";

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

const BottomTab = () => (
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
      component={HomeNavigator}
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
      name="OutfitIdeas"
      component={OutfitIdeas}
      options={{
        tabBarLabel: "OutfitIdeas",
        tabBarIcon: ({ focused }) => (
          <Image
            source={icons.user}
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
      name="Search"
      component={SearchScreen}
      options={{
        // <View
        //   style={{
        //     height: 60,
        //     width: 60,
        //     justifyContent: "center",
        //     alignItems: "center",
        //     backgroundColor: COLORS.white,
        //     borderColor: COLORS.primary,
        //     borderWidth: 2,
        //     borderRadius: 30,
        //     top: -20,
        //     elevation: 8,
        //   }}
        // >
        // </View>
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
      name="HomeStack"
      component={HomeStackNavigator}
      options={{
        tabBarLabel: "HomeStackNavigator",
        tabBarIcon: ({ focused }) => (
          <Icon
            name="map"
            color={focused ? COLORS.primary : COLORS.secondary}
            size={25}
          />
        ),
        tabBarButton: (props) => <TabBarCustomButton {...props} />,
      }}
    />
    <Tab.Screen
      name="Cart"
      component={Cart}
      options={{
        tabBarLabel: "Cart",
        tabBarIcon: ({ focused }) => (
          <Icon
            name="shopping-cart"
            color={focused ? COLORS.primary : COLORS.secondary}
            size={25}
          />
        ),
        tabBarButton: (props) => <TabBarCustomButton {...props} />,
      }}
    />
  </Tab.Navigator>
);

export default BottomTab;

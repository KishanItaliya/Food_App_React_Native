import React from "react";
import { Image, Dimensions } from "react-native";
import { Header } from "../../components";
import { Box, Text, useTheme } from "../../components/Theme";
import DrawerItem, { DrawerItemProps } from "./DrawerItem";
import { DrawerActions, useNavigation } from "@react-navigation/native";

export const assets = [require("./assets/2.jpg")];
const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = width * 0.8;
const aspectRatio = 750 / 1125;
const height = DRAWER_WIDTH * aspectRatio;

const items: DrawerItemProps[] = [
  {
    icon: "coffee",
    label: "Food Items",
    screen: "FoodItems",
    color: "violet",
  },
  // {
  //   icon: "zap",
  //   label: "Outfit Ideas",
  //   screen: "OutfitIdeas",
  //   color: "primary",
  // },
  {
    icon: "heart",
    label: "Favourites Outfits",
    screen: "FavoriteOutfits",
    color: "orange",
  },
  {
    icon: "user",
    label: "Edit Profile",
    screen: "FavoriteOutfits",
    color: "yellow",
  },
  {
    icon: "clock",
    label: "Transaction History",
    screen: "TransactionHistory",
    color: "pink",
  },
  {
    icon: "log-out",
    label: "Logout",
    screen: "LogOut",
    color: "secondary",
  },
];

const Drawer = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <Box flex={1}>
      <Box flex={0.2} backgroundColor="white">
        <Box
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          borderBottomRightRadius="xl"
          backgroundColor="secondary"
        >
          <Header
            title="MENU"
            left={{
              icon: "x",
              onPress: () => navigation.dispatch(DrawerActions.closeDrawer()),
            }}
            right={{ icon: "shopping-bag", onPress: () => true }}
            dark
          />
        </Box>
      </Box>
      <Box flex={0.8}>
        <Box flex={1} backgroundColor="secondary" />
        <Box flex={1} backgroundColor="darkOrange" />
        <Box
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          backgroundColor="white"
          borderTopLeftRadius="xl"
          borderBottomRightRadius="xl"
          justifyContent="center"
          padding="xl"
        >
          <Box
            position="absolute"
            top={-35}
            left={DRAWER_WIDTH / 2 - 40}
            backgroundColor="primary"
            width={70}
            height={70}
            style={{ borderRadius: 40 }}
          />
          <Box marginVertical="m">
            <Text variant="title1" textAlign="center">
              Kishan Italiya
            </Text>
            <Text variant="body" textAlign="center">
              kishanpitaliya@gmail.com
            </Text>
          </Box>
          {items.map((item) => (
            <DrawerItem key={item.icon} {...item} />
          ))}
        </Box>
      </Box>
      <Box
        backgroundColor="white"
        width={DRAWER_WIDTH}
        overflow="hidden"
        height={height * 0.39}
      >
        {/* <Box
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          borderTopLeftRadius="xl"
          backgroundColor="primary"
        /> */}
        <Image
          source={assets[0]}
          style={{
            width: DRAWER_WIDTH,
            height,
            borderTopLeftRadius: theme.borderRadii.xl,
          }}
        />
      </Box>
    </Box>
  );
};

export default Drawer;

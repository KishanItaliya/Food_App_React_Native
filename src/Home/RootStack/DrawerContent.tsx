import React, { useState } from "react";
import { Dimensions, StyleSheet, Image } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { Drawer } from "react-native-paper";
import { signOut } from "../../firebase/authentication";
import { Box, useTheme, Text } from "../../components/Theme";
import { Header } from "../../components";
import FontAwesomeRoundedIcon from "../../components/FontAwesomeRoundedIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IoniconsRoundedIcon from "../../components/IoniconsRoundedIcon";
import moment from "moment";

const assets = [require("./assets/orange.png")];
const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.8;
const aspectRatio = 750 / 1125;
const height = DRAWER_WIDTH * aspectRatio;

const DrawerContent = (props: any) => {
  const [userEmail, setEmailId]: any = useState();
  const theme = useTheme();

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  getUser()
    .then((user) => {
      setEmailId(user?.email);
    })
    .catch((error) => console.log("ERROR", error));

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
              onPress: () =>
                props.navigation.dispatch(DrawerActions.closeDrawer()),
            }}
            right={{ icon: "shopping-bag", onPress: () => true }}
            dark
          />
        </Box>
      </Box>
      <Box flex={0.8}>
        <Box flex={1} backgroundColor="secondary" />
        <Box flex={1} backgroundColor="sprimary" />
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
            backgroundColor="lightBlue"
            width={70}
            height={70}
            style={{ borderRadius: 40 }}
          />
          <Box marginVertical="m">
            <Text variant="title1" textAlign="center">
              Username
            </Text>
            <Text variant="body" textAlign="center">
              {userEmail}
            </Text>
          </Box>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => (
                <FontAwesomeRoundedIcon
                  iconRatio={0.6}
                  name="home"
                  size={36}
                  backgroundColor="violet"
                  color="white"
                />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />

            <DrawerItem
              icon={() => (
                <FontAwesomeRoundedIcon
                  iconRatio={0.6}
                  name="book"
                  size={36}
                  backgroundColor="pink"
                  color="white"
                />
              )}
              label="All Reviews"
              onPress={() => {
                props.navigation.navigate("Reviews");
              }}
            />
            <DrawerItem
              icon={() => (
                <IoniconsRoundedIcon
                  iconRatio={0.6}
                  name="wallet"
                  size={36}
                  backgroundColor="yellow"
                  color="white"
                />
              )}
              label="Transaction History"
              onPress={() => {
                props.navigation.navigate("TransactionHistory");
              }}
            />
            <DrawerItem
              icon={() => (
                <FontAwesomeRoundedIcon
                  iconRatio={0.6}
                  name="sign-out"
                  size={36}
                  backgroundColor="primary"
                  color="white"
                />
              )}
              label="Sign Out"
              onPress={() => signOut()}
            />
          </Drawer.Section>
        </Box>
      </Box>
      <Box
        backgroundColor="white"
        width={DRAWER_WIDTH}
        overflow="hidden"
        height={height * 0.39}
      >
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

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 10,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;

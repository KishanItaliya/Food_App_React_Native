import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Image, View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { Drawer } from "react-native-paper";
import { signOut } from "../../firebase/authentication";
import { Box, useTheme, Text } from "../../components/Theme";
import { Header } from "../../components";
import FontAwesomeRoundedIcon from "../../components/FontAwesomeRoundedIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IoniconsRoundedIcon from "../../components/IoniconsRoundedIcon";
import firebase from "../../firebase/config";

const assets = [require("./assets/orange.png")];
const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.8;
const aspectRatio = 750 / 1125;
const height = DRAWER_WIDTH * aspectRatio;

const DrawerContent = (props: any) => {
  const [userEmail, setEmailId]: any = useState();
  const [userId, setUserId]: any = useState();
  const theme = useTheme();

  const [profile, setProfile] = useState<any>();

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchProfile = () => {
    getUser()
      .then((user) => {
        // console.log("UU", user?.uid);
        firebase
          .firestore()
          .collection("users")
          .doc(user?.uid)
          .onSnapshot((snapshot) => {
            if (snapshot.exists) {
              setProfile({
                id: user?.uid,
                data: snapshot?.data(),
              });
            } else {
              setProfile({
                id: user?.uid,
                data: null,
              });
            }
          });
      })
      .catch((error) => console.log("ERROR", error));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  getUser()
    .then((user) => {
      setEmailId(user?.email);
      setUserId(user?.uid);
    })
    .catch((error) => console.log("ERROR", error));

  // console.log("PROFILE>>", profile);

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
          <View style={styles.avatarPlaceholder}>
            <Image
              style={styles.avatar}
              source={
                profile?.data == null
                  ? { uri: null }
                  : { uri: profile?.data.avatar }
              }
            />
          </View>
          <Box marginVertical="m">
            <Text variant="title1" textAlign="center">
              {profile?.data == null ? "Username" : profile?.data.username}
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
                  name="user-circle"
                  size={36}
                  backgroundColor="pink"
                  color="white"
                />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("Profile", { userId });
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
  avatarPlaceholder: {
    position: "absolute",
    top: -35,
    left: DRAWER_WIDTH / 2 - 40,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatar: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

export default DrawerContent;

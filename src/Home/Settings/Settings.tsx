import React from "react";
import { Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { Box } from "../../components/Theme";
import Notification from "./Notification";

const Settings = ({ navigation }: HomeNavigationProps<"Setting">) => {
  return (
    <Box flex={1} backgroundColor="white">
      <Header
        title="Notifications"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "external-link", onPress: () => true }}
      />
      <Box padding="m" flex={1}>
        <Notification
          title="Food Items"
          description="Receive daily notifications"
        />
        <Notification
          title="Discounts & Coupens"
          description="Order the food you love for less"
        />
      </Box>
    </Box>
  );
};

export default Settings;

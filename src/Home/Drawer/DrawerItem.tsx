import React from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { RoundedIcon, BorderlessTap } from "../../components";
import { HomeRoutes } from "../../components/Navigation";
import { Box, Theme, Text, useTheme } from "../../components/Theme";
import { LogOut } from "../../firebase/authentication";

export interface DrawerItemProps {
  icon: string;
  color: keyof Theme["colors"];
  screen: keyof HomeRoutes;
  label: string;
}

const DrawerItem = ({ icon, color, screen, label }: DrawerItemProps) => {
  const theme = useTheme();
  const { navigate } = useNavigation<
    DrawerNavigationProp<HomeRoutes, "OutfitIdeas">
  >();
  return (
    <BorderlessTap
      onPress={screen == "LogOut" ? () => LogOut() : () => navigate(screen)}
    >
      <Box flexDirection="row" alignItems="center" padding="s">
        <RoundedIcon
          iconRatio={0.5}
          name={icon}
          size={36}
          backgroundColor={color}
          color="white"
        />
        <Text variant="button" color="secondary" marginLeft="m">
          {label}
        </Text>
      </Box>
    </BorderlessTap>
  );
};

export default DrawerItem;

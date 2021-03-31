import React, { useState } from "react";
import { Switch } from "react-native";
import { Box } from "../../components/Theme";
import { Text, useTheme } from "../../components";

interface NotificationProps {
  title: string;
  description: string;
}

const Notification = ({ title, description }: NotificationProps) => {
  const [toggled, setToggled] = useState(false);
  const theme = useTheme();
  return (
    <Box flexDirection="row" marginBottom="m">
      <Box flex={1} justifyContent="center">
        <Text variant="title5">{title}</Text>
        <Text variant="body">{description}</Text>
      </Box>
      <Box paddingVertical="m">
        <Switch
          value={toggled}
          onValueChange={setToggled}
          trackColor={{
            true: theme.colors.lightSprimary,
            false: theme.colors.grey,
          }}
          thumbColor={toggled ? theme.colors.sprimary : theme.colors.darkGrey}
        />
      </Box>
    </Box>
  );
};

export default Notification;

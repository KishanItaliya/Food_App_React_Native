import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "../../components/Theme";

const SearchScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <Box style={{ marginTop: insets.top }}>
      <Box marginTop="l" flexDirection="row" paddingHorizontal="m">
        <View style={styles.inputContainer}>
          <Icon name="search" size={24} />
          <TextInput
            style={{ flex: 1, fontSize: 18, marginLeft: 5 }}
            placeholder="Search for food"
            autoFocus={true}
          />
        </View>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default SearchScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { Box } from "../../components/Theme";
import { Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { categories, restaurantData } from "../FoodItems/ListCategories";
import { icons } from "../../constants";

const { width } = Dimensions.get("window");

const SearchScreen = ({ navigation }: HomeNavigationProps<"SearchScreen">) => {
  const [restaurant, setRestaurant] = useState();
  // console.log("Restaurant", restaurantData);
  // console.log(item);

  const currentLocation: any = {
    streetName: "Kuching",
    gps: {
      latitude: 1.5496614931250685,
      longitude: 110.36381866919922,
    },
  };

  const [restaurants, setRestaurants] = useState<any>();

  useEffect(() => {
    setRestaurants(restaurantData);
  }, []);

  return (
    <Box backgroundColor="white">
      <Header
        title="Search"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "external-link", onPress: () => true }}
      />
      <Box marginTop="l" flexDirection="row" paddingHorizontal="m">
        <View style={styles.inputContainer}>
          <Icon name="search" size={24} color="#F9813A" />
          <TextInput
            style={{ flex: 1, fontSize: 18, marginLeft: 5 }}
            placeholder="Search the Restaurant"
            // autoFocus={true}
            onChangeText={(e) => setRestaurant(e)}
          />
        </View>
      </Box>
      <ScrollView
        contentContainerStyle={{ marginTop: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {restaurants
          ?.filter((x: any) => x.name.includes(restaurant))
          .map((item: any) => (
            <View key={item?.id}>
              <Pressable
                onPress={() =>
                  navigation.navigate("Restaurant", { item, currentLocation })
                }
              >
                <View style={styles.container}>
                  <Image
                    source={item?.photo}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>{item?.name}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Image source={icons.star} style={styles.ratingImage} />
                      <Text style={styles.rating}>{item?.rating}</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>
          ))}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderColor: "#F9813A",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  container: {
    height: 175,
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  nameContainer: {
    position: "absolute",
    top: 95,
    height: 55,
    width: width * 0.4,
    backgroundColor: "#FFF",
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  ratingImage: {
    height: 16,
    width: 16,
    tintColor: "#F9813A",
    marginRight: 8,
  },
  rating: {
    lineHeight: 18,
    fontSize: 14,
  },
  image: {
    height: 150,
    width: "100%",
    borderRadius: 15,
  },
});

export default SearchScreen;

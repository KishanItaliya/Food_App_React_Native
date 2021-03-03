import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Box } from "../../components/Theme";
import { Header, Text } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather as Icon } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";
import { HomeNavigationProps } from "../../components/Navigation";

export const categories = [
  {
    id: "1",
    name: "Pizza",
    image: require("./assets/catergories/pizza.png"),
  },
  {
    id: "2",
    name: "Burger",
    image: require("./assets/catergories/burger.png"),
  },
  {
    id: "3",
    name: "Sushi",
    image: require("./assets/catergories/sushi.png"),
  },
  {
    id: "4",
    name: "Salad",
    image: require("./assets/catergories/salad.png"),
  },
];

export const COLORS = {
  white: "#FFF",
  dark: "#000",
  primary: "#F9813A",
  secondary: "#FEDAC5",
  light: "#E5E5E5",
  grey: "#908E8C",
};

export const foods = [
  {
    id: "1",
    name: "Meat Pizza",
    ingredients: "Mixed Pizza",
    price: "8.30",
    image: require("./assets/meatPizza.png"),
  },
  {
    id: "2",
    name: "Cheese Pizza",
    ingredients: "Cheese Pizza",
    price: "7.10",
    image: require("./assets/cheesePizza.png"),
  },
  {
    id: "3",
    name: "Chicken Burger",
    ingredients: "Fried Chicken",
    price: "5.10",
    image: require("./assets/chickenBurger.png"),
  },
  {
    id: "4",
    name: "Sushi Makizushi",
    ingredients: "Salmon Meat",
    price: "9.55",
    image: require("./assets/sushiMakizushi.png"),
  },
];

const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

const FoodItems = ({ navigation }: HomeNavigationProps<"FoodItems">) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  // const count = 0;
  // const [cart, setCart] = useState({});

  // const storeData = async (value: any) => {
  //   try {
  //     const jsonValue = JSON.stringify(value);
  //     await AsyncStorage.setItem("cart", jsonValue);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem("cart");
  //     return jsonValue != null ? console.log(JSON.parse(jsonValue)) : null;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const addToCart = (itemId: string) => {
  //   setCart({
  //     id: itemId,
  //     count: count + 1,
  //   });
  //   storeData(cart);
  //   getData();
  // };

  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesListContainer}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}
          >
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index
                    ? COLORS.primary
                    : COLORS.secondary,
                ...styles.categoryBtn,
              }}
            >
              <View style={styles.categoryBtnImage}>
                <Image
                  source={category.image}
                  style={{ height: 35, width: 35, resizeMode: "cover" }}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.white
                      : COLORS.primary,
                }}
              >
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const Card = ({ food }: any) => {
    return (
      <View style={styles.card}>
        <TouchableHighlight
          underlayColor={COLORS.white}
          activeOpacity={0.9}
          onPress={() => navigation.navigate("ItemDetails", food)}
        >
          <View style={{ marginTop: 10 }}>
            <View style={{ alignItems: "center", marginBottom: 5 }}>
              <Image source={food.image} style={{ height: 100, width: 100 }} />
            </View>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {food.name}
              </Text>
              <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}>
                {food.ingredients}
              </Text>
            </View>
          </View>
        </TouchableHighlight>

        <View
          style={{
            marginTop: 5,
            marginHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            ${food.price}
          </Text>
          <View style={styles.addToCartBtn}>
            <MaterialIcons
              name="add"
              size={25}
              color={COLORS.white}
              onPress={() => alert()}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Box flex={1} backgroundColor="white">
      {/* <Box style={[styles.header, { marginTop: insets.top + 15 }]}>
        <Box>
          <Box flexDirection="row">
            <Text variant="title3">Hello, </Text>
            <Text variant="title2">Kishan</Text>
          </Box>
          <Text variant="title4">What do you want today</Text>
        </Box>
        <Image
          source={require("./assets/profile.png")}
          style={styles.profile}
        />
      </Box> */}
      <Header
        title="Aahar"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "shopping-bag", onPress: () => true }}
      />
      <Box marginTop="l" flexDirection="row" paddingHorizontal="m">
        <View style={styles.inputContainer}>
          <Icon name="search" size={24} />
          <TextInput
            style={{ flex: 1, fontSize: 18, marginLeft: 5 }}
            placeholder="Search for food"
          />
        </View>
        <View style={styles.sortBtn}>
          <MaterialIcons name="tune" size={24} color={COLORS.white} />
        </View>
      </Box>
      <Box>
        <ListCategories />
      </Box>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={foods}
        renderItem={({ item }) => <Card food={item} />}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  profile: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: COLORS.dark,
    borderWidth: 1,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: COLORS.light,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sortBtn: {
    height: 50,
    width: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  categoryBtnImage: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: 200,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FoodItems;

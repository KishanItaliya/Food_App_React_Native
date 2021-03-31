import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { useStateValue } from "../../../StateProvider";
import { COLORS, icons, SIZES, images } from "../../constants";
import { v4 as uuidv4 } from "uuid";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

export const categoryData = [
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

const initialCurrentLocation: any = {
  streetName: "Kuching",
  gps: {
    latitude: 1.5496614931250685,
    longitude: 110.36381866919922,
  },
};

export const categories = [
  {
    id: 1,
    name: "Rice",
    icon: icons.rice_bowl,
  },
  {
    id: 2,
    name: "Noodles",
    icon: icons.noodle,
  },
  {
    id: 3,
    name: "Hot Dogs",
    icon: icons.hotdog,
  },
  {
    id: 4,
    name: "Salads",
    icon: icons.salad,
  },
  {
    id: 5,
    name: "Burgers",
    icon: icons.hamburger,
  },
  {
    id: 6,
    name: "Pizza",
    icon: icons.pizza,
  },
  {
    id: 7,
    name: "Snacks",
    icon: icons.fries,
  },
  {
    id: 8,
    name: "Sushi",
    icon: icons.sushi,
  },
  {
    id: 9,
    name: "Desserts",
    icon: icons.donut,
  },
  {
    id: 10,
    name: "Drinks",
    icon: icons.drink,
  },
];

// price rating
const affordable = 1;
// const fairPrice = 2;
const expensive = 3;

export const restaurantData = [
  {
    id: 1,
    name: "Crest Cafe",
    rating: 4.8,
    categories: [5, 7],
    priceRating: affordable,
    photo: images.burger_restaurant_1,
    duration: "30 - 45 min",
    location: {
      latitude: 1.5347282806345879,
      longitude: 110.35632207358996,
    },
    courier: {
      avatar: images.avatar_1,
      name: "Amy",
    },
    menu: [
      {
        menuId: 1,
        name: "Crispy Chicken Burger",
        photo: images.crispy_chicken_burger,
        description: "Burger with crispy chicken, cheese and lettuce",
        calories: 200,
        price: 150,
      },
      {
        menuId: 2,
        name: "Crispy Chicken Burger with Honey Mustard",
        photo: images.honey_mustard_chicken_burger,
        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
        calories: 250,
        price: 175,
      },
      {
        menuId: 3,
        name: "Crispy Baked French Fries",
        photo: images.baked_fries,
        description: "Crispy Baked French Fries",
        calories: 194,
        price: 96,
      },
    ],
  },
  {
    id: 2,
    name: "The Hearty Slice",
    rating: 3.2,
    categories: [2, 4, 6],
    priceRating: expensive,
    photo: images.pizza_restaurant,
    duration: "15 - 20 min",
    location: {
      latitude: 1.556306570595712,
      longitude: 110.35504616746915,
    },
    courier: {
      avatar: images.avatar_2,
      name: "Jackson",
    },
    menu: [
      {
        menuId: 4,
        name: "Hawaiian Pizza",
        photo: images.hawaiian_pizza,
        description: "Canadian bacon, homemade pizza crust, pizza sauce",
        calories: 250,
        price: 210,
      },
      {
        menuId: 5,
        name: "Tomato & Basil Pizza",
        photo: images.pizza,
        description:
          "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
        calories: 250,
        price: 260,
      },
      {
        menuId: 6,
        name: "Tomato Pasta",
        photo: images.tomato_pasta,
        description: "Pasta with fresh tomatoes",
        calories: 100,
        price: 120,
      },
      {
        menuId: 7,
        name: "Mediterranean Chopped Salad ",
        photo: images.salad,
        description: "Finely chopped lettuce, tomatoes, cucumbers",
        calories: 100,
        price: 350,
      },
    ],
  },
  {
    id: 3,
    name: "Shalimar Restaurant",
    rating: 3.7,
    categories: [3],
    priceRating: expensive,
    photo: images.hot_dog_restaurant,
    duration: "20 - 25 min",
    location: {
      latitude: 1.5238753474714375,
      longitude: 110.34261833833622,
    },
    courier: {
      avatar: images.avatar_3,
      name: "James",
    },
    menu: [
      {
        menuId: 8,
        name: "Chicago Style Hot Dog",
        photo: images.chicago_hot_dog,
        description: "Fresh tomatoes, all beef hot dogs",
        calories: 100,
        price: 70,
      },
    ],
  },
  {
    id: 4,
    name: "The Raw Herbivore",
    rating: 4.8,
    categories: [8],
    priceRating: expensive,
    photo: images.japanese_restaurant,
    duration: "10 - 15 min",
    location: {
      latitude: 1.5578068150528928,
      longitude: 110.35482523764315,
    },
    courier: {
      avatar: images.avatar_4,
      name: "Ahmad",
    },
    menu: [
      {
        menuId: 9,
        name: "Sushi sets",
        photo: images.sushi,
        description: "Fresh salmon, sushi rice, fresh juicy avocado",
        calories: 100,
        price: 140,
      },
    ],
  },
  {
    id: 5,
    name: "Namastey Lounge",
    rating: 4.8,
    categories: [1, 2],
    priceRating: affordable,
    photo: images.noodle_shop,
    duration: "15 - 20 min",
    location: {
      latitude: 1.558050496260768,
      longitude: 110.34743759630511,
    },
    courier: {
      avatar: images.avatar_4,
      name: "Muthu",
    },
    menu: [
      {
        menuId: 10,
        name: "Kolo Mee",
        photo: images.kolo_mee,
        description: "Noodles with char siu",
        calories: 200,
        price: 125,
      },
      {
        menuId: 11,
        name: "Sarawak Laksa",
        photo: images.sarawak_laksa,
        description: "Vermicelli noodles, cooked prawns",
        calories: 300,
        price: 70,
      },
      {
        menuId: 12,
        name: "Nasi Lemak",
        photo: images.nasi_lemak,
        description: "A traditional Malay rice dish",
        calories: 300,
        price: 195,
      },
      {
        menuId: 13,
        name: "Nasi Briyani with Mutton",
        photo: images.nasi_briyani_mutton,
        description: "A traditional Indian rice dish with mutton",
        calories: 300,
        price: 199,
      },
    ],
  },
  {
    id: 6,
    name: "Dessert First",
    rating: 4.9,
    categories: [9, 10],
    priceRating: affordable,
    photo: images.kek_lapis_shop,
    duration: "35 - 40 min",
    location: {
      latitude: 1.5573478487252896,
      longitude: 110.35568783282145,
    },
    courier: {
      avatar: images.avatar_1,
      name: "Jessie",
    },
    menu: [
      {
        menuId: 12,
        name: "Teh C Peng",
        photo: images.teh_c_peng,
        description: "Three Layer Teh C Peng",
        calories: 100,
        price: 399,
      },
      {
        menuId: 13,
        name: "ABC Ice Kacang",
        photo: images.ice_kacang,
        description: "Shaved Ice with red beans",
        calories: 100,
        price: 299,
      },
      {
        menuId: 14,
        name: "Kek Lapis",
        photo: images.kek_lapis,
        description: "Layer cakes",
        calories: 300,
        price: 355,
      },
    ],
  },
];

const ListCategories = () => {
  const [{}, dispatch]: any = useStateValue();
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState(restaurantData);
  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation
  );

  const addToBasket = (item: any) => {
    console.log("Hello");
    dispatch({
      type: "ADD_TO_BASKET",
      product: {
        product_id: uuidv4(),
        id: item.id,
        title: item.name,
        price: item.price,
        ingredients: item.ingredients,
        image: item.image,
        count: 1,
      },
    });
  };

  const onSelectCategory = (category: any) => {
    let restaurantList = restaurantData.filter((a) =>
      a.categories.includes(category.id)
    );
    setRestaurants(restaurantList);
    setSelectedCategory(category);
    // console.log("JKL>>", restaurants);
  };

  const renderMainCategories = () => {
    const renderItem = ({ item }: any) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            marginRight: SIZES.padding,
            elevation: 5,
          }}
          onPress={() => onSelectCategory(item)}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedCategory?.id == item.id
                  ? COLORS.white
                  : COLORS.lightGray,
            }}
          >
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                height: 30,
                width: 30,
              }}
            />
          </View>
          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
              fontSize: 12,
              lineHeight: 22,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
      />
    );
  };

  const renderRestaurantList = () => {
    const getCategoryNameById = (id: any) => {
      let category = categories.filter((a) => a.id == id);

      if (category.length > 0) return category[0].name;
      return "";
    };
    const renderItem = ({ item }: any) => {
      // console.log("ABC", item);
      return (
        <Pressable
          style={{ marginBottom: SIZES.padding * 2 }}
          //onPress => navigate to Restaurant screen
          onPress={() =>
            navigation.navigate("Restaurant", { item, currentLocation })
          }
        >
          <View style={{ marginBottom: SIZES.padding }}>
            <Image
              source={item.photo}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 175,
                borderRadius: SIZES.radius,
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                height: 50,
                width: SIZES.width * 0.3,
                backgroundColor: COLORS.white,
                borderTopRightRadius: SIZES.radius,
                borderBottomLeftRadius: SIZES.radius,
                alignItems: "center",
                justifyContent: "center",
                elevation: 1,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item.duration}
              </Text>
            </View>
          </View>

          {/* Restaurant Info */}
          <Text style={{ lineHeight: 24, fontSize: 16 }}>{item.name}</Text>
          <View
            style={{
              marginTop: SIZES.padding,
              flexDirection: "row",
            }}
          >
            <Image
              source={icons.star}
              style={{
                height: 16,
                width: 16,
                tintColor: COLORS.primary,
                marginRight: 8,
              }}
            />
            <Text style={{ lineHeight: 18, fontSize: 14 }}>{item.rating}</Text>

            <View
              style={{
                flexDirection: "row",
                marginLeft: 10,
              }}
            >
              {item.categories.map((categoryId: any) => {
                return (
                  <View style={{ flexDirection: "row" }} key={categoryId}>
                    <Text style={{ lineHeight: 18, fontSize: 14 }}>
                      {getCategoryNameById(categoryId)}
                    </Text>
                    <Text style={{ color: COLORS.darkgray, fontSize: 14 }}>
                      {" "}
                      .{" "}
                    </Text>
                  </View>
                );
              })}

              {[1, 2, 3].map((priceRating) => (
                <Text
                  key={priceRating}
                  style={{
                    lineHeight: 22,
                    fontSize: 16,
                    color:
                      priceRating <= item.priceRating
                        ? COLORS.black
                        : COLORS.darkgray,
                  }}
                >
                  ₹
                </Text>
              ))}
            </View>
          </View>
        </Pressable>
      );
    };

    return (
      <FlatList
        data={restaurants}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    // <ScrollView
    //   horizontal
    //   showsHorizontalScrollIndicator={false}
    //   contentContainerStyle={styles.categoriesListContainer}
    // >
    //   {categoryData.map((category, index) => (
    //     <TouchableOpacity
    //       key={index}
    //       activeOpacity={0.8}
    //       onPress={() => setSelectedCategoryIndex(index)}
    //     >
    //       <View
    //         style={{
    //           backgroundColor:
    //             selectedCategoryIndex == index ? "#F9813A" : "#FEDAC5",
    //           ...styles.categoryBtn,
    //         }}
    //       >
    //         <View style={styles.categoryBtnImage}>
    //           <Image
    //             source={category.icon}
    //             style={{ height: 35, width: 35, resizeMode: "cover" }}
    //           />
    //         </View>
    //         <Text
    //           style={{
    //             fontSize: 15,
    //             fontWeight: "bold",
    //             marginLeft: 10,
    //             color: selectedCategoryIndex == index ? "#FFF" : "#F9813A",
    //           }}
    //         >
    //           {category.name}
    //         </Text>
    //       </View>
    //     </TouchableOpacity>
    //   ))}
    // </ScrollView>
    <ScrollView
      style={{ marginBottom: SIZES.padding * 4 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ padding: SIZES.padding }}>
        {renderMainCategories()}
        {renderRestaurantList()}
      </View>
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   categoriesListContainer: {
//     paddingVertical: 30,
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   categoryBtn: {
//     height: 45,
//     width: 120,
//     marginRight: 7,
//     borderRadius: 30,
//     alignItems: "center",
//     paddingHorizontal: 5,
//     flexDirection: "row",
//   },
//   categoryBtnImage: {
//     height: 35,
//     width: 35,
//     backgroundColor: "#FFF",
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   card: {
//     height: 200,
//     width: cardWidth,
//     marginHorizontal: 10,
//     marginBottom: 15,
//     marginTop: 15,
//     borderRadius: 15,
//     elevation: 13,
//     backgroundColor: "#FFF",
//   },
//   addToCartBtn: {
//     height: 30,
//     width: 30,
//     borderRadius: 20,
//     backgroundColor: "#F9813A",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

export default ListCategories;

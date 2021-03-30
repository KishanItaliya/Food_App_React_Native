import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { HomeNavigationProps } from "../../components/Navigation";
import { Box } from "../../components/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import CartCard from "./CartCard";
// import CartFooter from "./CartFooter";
import { v4 as uuidv4 } from "uuid";
import { COLORS, SIZES } from "../../constants";
import { groupBy, chain } from "lodash";
import { FlatList } from "react-native-gesture-handler";

const Cart = ({ route, navigation }: HomeNavigationProps<"Cart">) => {
  const insets = useSafeAreaInsets();
  const [orders, setOrders] = useState([]);

  var x: any, group: any;
  var groupedRestaurants: any;

  // useEffect(() => {
  const { orderItems }: any = route.params;
  const getUniqueRestaurant = () => {
    orderItems.map((item: any) => {
      if (!orders.includes(item.name)) {
        orders.push(item.name);
      }
    });
    x = orderItems
      .filter(function (item: any) {
        var i;
        for (i = 0; i < orders.length; i++) {
          item.name == orders[i];
        }
        return item.name;
      })
      .map(function ({
        name,
        menuId,
        qty,
        price,
        total,
        food,
        location,
        courier,
        rating,
      }: any) {
        return {
          name,
          menuId,
          qty,
          price,
          total,
          food,
          location,
          courier,
          rating,
        };
      });
    // console.log(x);

    group = x.reduce((r, a) => {
      // console.log("a", a);
      // console.log("r",r);
      r[a.name] = [...(r[a.name] || []), a];
      return r;
    }, {});
    // console.log(x);
    // console.log("group", group);
    // console.log("1>>", group["Crest Cafe"]);
    groupedRestaurants = chain(x)
      .groupBy("name")
      .map((value, key) => ({ id: uuidv4(), name: key, restaurants: value }))
      .value();
    // console.log("GROUPED>>", groupedRestaurants);
  };
  getUniqueRestaurant();
  // }, []);

  // console.log(orders);

  // const renderInfo = () => {
  //   console.log("GROUP", group);
  //   Object.keys(group).map((item, index) => {
  //     const obj = group[item];
  //     // console.log("ORDERS", orderItems);
  //     // console.log("OBJECT>>", obj);
  //     obj.map((item) => {
  //       <View>
  //         <Text>{item.total}</Text>
  //       </View>;
  //     });
  //   });
  // };

  // const Card = () => {
  //   groupedRestaurants.map((items) => {
  //     items.restaurants.map((item) => {
  //       return (
  //         <View>
  //           <Text>{items.name}</Text>
  //         </View>
  //       );
  //     });
  //   });
  // };

  const renderCards = () => {
    // console.log("XYZ>>", groupedRestaurants);
    const RenderItem = ({ restaurant }: any) => {
      // console.log("X:", restaurant);
      var total = 0;
      return (
        <View
          style={{
            width: SIZES.width * 0.9,
            backgroundColor: COLORS.primary,
            alignSelf: "center",
            borderRadius: SIZES.radius,
            marginBottom: SIZES.padding * 2,
            padding: SIZES.padding * 2,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              lineHeight: 20,
              color: COLORS.white,
            }}
          >
            {restaurant.name}
          </Text>
          <View>
            {restaurant?.restaurants.map((item) => {
              const qty = item.qty;
              total += item.total;
              if (qty > 0) {
                return (
                  <View key={item.menuId} style={{ marginTop: 10 }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ flex: 0.3, marginRight: 10 }}>
                        <Image
                          source={item.food.photo}
                          style={{
                            height: 80,
                            width: 80,
                            borderRadius: 40,
                          }}
                        />
                      </View>
                      <View style={{ flex: 0.7 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            lineHeight: 20,
                            color: COLORS.white,
                          }}
                        >
                          {item.food.name}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: 10,
                        alignItems: "flex-end",
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.white,
                          fontSize: 14,
                          fontWeight: "bold",
                          lineHeight: 16,
                        }}
                      >
                        {item.qty} ✘ {item.price} = ₹{item.total}
                      </Text>
                    </View>
                  </View>
                );
              }
            })}
          </View>
          <View
            style={{
              marginTop: 15,
              alignItems: "flex-end",
              borderTopWidth: 2,
              borderTopColor: COLORS.white,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 22,
                lineHeight: 26,
                color: COLORS.white,
                marginTop: 10,
              }}
            >
              Total: ₹{total}
            </Text>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Pressable
              style={{
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius,
                height: 50,
                width: 150,
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() =>
                navigation.navigate("OrderDelivery", {
                  restaurant: {
                    name: restaurant?.name,
                    location: restaurant?.restaurants[0].location,
                    courier: restaurant?.restaurants[0].courier,
                    rating: restaurant?.restaurants[0].rating,
                  },
                })
              }
            >
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    lineHeight: 20,
                    fontWeight: "bold",
                    color: COLORS.primary,
                  }}
                >
                  Map View
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      );
    };

    return (
      <FlatList
        data={groupedRestaurants}
        keyExtractor={(x, index) => index.toString()}
        renderItem={({ item }) => <RenderItem restaurant={item} />}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <Box flex={1} backgroundColor="white" style={{ marginTop: insets.top }}>
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back-ios"
          size={26}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Cart</Text>
      </View>

      {/* <ScrollView>
        {basket.map((item: any) => (
          <CartCard key={item.product_id} item={item} />
        ))}
        <CartFooter />
      </ScrollView> */}

      {/* {groupedRestaurants.map((items) => {
          items.restaurants.map((item) => {
          return (
            <View>
              <Text>{items.name}</Text>
              <Card items={items.restaurants} />
            </View>
          );
          });
        })} */}

      {/* <ScrollView
        style={{ marginTop: 10, backgroundColor: COLORS.white }}
        showsVerticalScrollIndicator={false}
      >
        {orderItems?.map((item: any) => {
          const qty = item.qty;
          // const restaurant_name = item?.name;
          if (qty > 0) {
            return (
              <Pressable
                key={item.menuId}
                style={{
                  backgroundColor: COLORS.primary,
                  height: 125,
                  width: SIZES.width * 0.9,
                  borderRadius: SIZES.radius,
                  elevation: 10,
                  alignSelf: "center",
                  padding: SIZES.padding,
                  marginBottom: SIZES.padding * 2,
                }}
                onPress={() => true}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={item.food.photo}
                    style={{
                      height: 70,
                      width: 70,
                      borderRadius: SIZES.radius,
                      marginRight: 10,
                      flex: 0.3,
                    }}
                  />

                  <View style={{ flex: 0.7 }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 15,
                        lineHeight: 18,
                        color: COLORS.white,
                      }}
                    >
                      {item.food.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        lineHeight: 16,
                        color: COLORS.white,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 18,
                      color: COLORS.white,
                      fontWeight: "bold",
                    }}
                  >
                    Qty: {item.qty}
                  </Text>

                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 18,
                      color: COLORS.white,
                      fontWeight: "bold",
                    }}
                  >
                    Total: ₹ {item.total}
                  </Text>
                </View>
              </Pressable>
            );
          }
        })}
      </ScrollView> */}

      {renderCards()}
    </Box>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
});

export default Cart;

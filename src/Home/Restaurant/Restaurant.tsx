import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RectButton } from "react-native-gesture-handler";
import { icons, COLORS, SIZES } from "../../constants";
import { HomeNavigationProps } from "../../components/Navigation";
// import { v4 as uuidv4 } from "uuid";
// import { useStateValue } from "../../../StateProvider";

const Restaurant = ({
  route,
  navigation,
}: HomeNavigationProps<"Restaurant">) => {
  // const [{}, dispatch]: any = useStateValue();
  const scrollX = new Animated.Value(0);
  const [restaurant, setRestaurant]: any = useState(null);
  const [curentLocation, setCurentLocation]: any = useState(null);
  const [orderItems, setOrderItems]: any = useState([]);

  useEffect(() => {
    const { item, currentLocation }: any = route.params;
    setRestaurant(item);
    setCurentLocation(currentLocation);
  });

  // const addToOrder = (item: any) => {
  //   console.log("Hello");
  //   dispatch({
  //     type: "ADD_TO_ORDER",
  //     restaurant: {
  //       order_id: uuidv4(),
  //       restaurant_id: item.id,
  //       restaurant_rating: item.rating,
  //       restaurant_name: item.name,
  //       restaurant_location: item.location,
  //       restaurant_courier: item.courier,
  //     },
  //   });
  // };

  const editOrder = (action: any, menuId: number, price: number, food: any) => {
    let orderList = orderItems.slice();
    let item = orderList.filter((a) => a.menuId == menuId);
    if (action == "+") {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          menuId: menuId,
          qty: 1,
          price: price,
          total: price,
          food: food,
          name: restaurant?.name,
          location: restaurant?.location,
          courier: restaurant?.courier,
          rating: restaurant?.rating,
        };
        orderList.push(newItem);
      }
      setOrderItems(orderList);
    } else {
      if (item.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = newQty * price;
        }
      }
      setOrderItems(orderList);
    }
  };

  const getOrderQty = (menuId: number) => {
    let orderItem = orderItems.filter((a) => a.menuId == menuId);

    if (orderItem.length > 0) {
      return orderItem[0].qty;
    }
    return 0;
  };

  const getBasketItemCount = () => {
    let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);
    return itemCount;
  };

  const sumOrder = () => {
    let total = orderItems.reduce((a, b) => a + (b.total || 0), 0);
    return total.toFixed(2);
  };

  const renderHeader = () => {
    return (
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: SIZES.padding * 3,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray3,
            }}
          >
            <Text style={{ lineHeight: 22, fontSize: 16 }}>
              {restaurant?.name}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.list}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View style={{ height: 30 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: SIZES.padding,
          }}
        >
          {restaurant?.menu.map((item: any, index: any) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: "clamp",
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderFoodInfo = () => {
    return (
      <View>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        >
          {restaurant?.menu.map((item: any, index: any) => (
            <View key={`menu-${index}`} style={{ alignItems: "center" }}>
              <View style={{ height: SIZES.height * 0.65 }}>
                {/* Image */}
                <View style={{ height: SIZES.height * 0.35 }}>
                  <Image
                    source={item.photo}
                    resizeMode="cover"
                    style={{
                      width: SIZES.width,
                      height: "100%",
                    }}
                  />

                  {/* Quantity */}
                  <View
                    style={{
                      position: "absolute",
                      bottom: -20,
                      width: SIZES.width,
                      height: 50,
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        borderTopLeftRadius: 25,
                        borderBottomLeftRadius: 25,
                        backgroundColor: COLORS.white,
                      }}
                    >
                      <RectButton
                        style={{
                          width: 50,
                          height: 50,
                          borderTopLeftRadius: 25,
                          borderBottomLeftRadius: 25,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onPress={() =>
                          editOrder("-", item.menuId, item.price, item)
                        }
                      >
                        <Text style={{ fontSize: 30, lineHeight: 36 }}>-</Text>
                      </RectButton>
                    </View>

                    <View
                      style={{
                        width: 50,
                        backgroundColor: COLORS.white,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          lineHeight: 22,
                          fontWeight: "bold",
                        }}
                      >
                        {getOrderQty(item.menuId)}
                      </Text>
                    </View>

                    <View
                      style={{
                        borderTopRightRadius: 25,
                        borderBottomRightRadius: 25,
                        backgroundColor: COLORS.white,
                      }}
                    >
                      <RectButton
                        style={{
                          width: 50,
                          height: 50,
                          borderTopRightRadius: 25,
                          borderBottomRightRadius: 25,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onPress={() =>
                          editOrder("+", item.menuId, item.price, item)
                        }
                      >
                        <Text style={{ fontSize: 30, lineHeight: 36 }}>+</Text>
                      </RectButton>
                    </View>
                  </View>
                </View>
                {/* Name & Description */}
                <View
                  style={{
                    width: SIZES.width,
                    alignItems: "center",
                    marginTop: 15,
                    paddingHorizontal: SIZES.padding * 2,
                  }}
                >
                  <Text
                    style={{
                      marginVertical: 10,
                      textAlign: "center",
                      fontSize: 20,
                      lineHeight: 28,
                      fontWeight: "bold",
                    }}
                  >
                    {item.name} - ₹{item.price.toFixed(2)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      textAlign: "center",
                    }}
                  >
                    {item.description}
                  </Text>
                </View>

                {/* Calories */}
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={icons.fire}
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 10,
                    }}
                  />

                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      color: COLORS.darkgray,
                    }}
                  >
                    {item.calories.toFixed(2)} cal
                  </Text>
                </View>

                {/* Reviews */}
                <Pressable
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => navigation.navigate("ReviewScreen", { item })}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 22,
                      fontWeight: "bold",
                      color: COLORS.primary,
                    }}
                  >
                    Check Reviews {`>>`}
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </Animated.ScrollView>

        <View>
          {renderDots()}
          <View
            style={{
              backgroundColor: COLORS.white,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: SIZES.padding * 2,
                paddingHorizontal: SIZES.padding * 3,
                borderBottomColor: COLORS.lightGray2,
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{ fontSize: 16, lineHeight: 22, fontWeight: "bold" }}
              >
                {getBasketItemCount()} items in Cart
              </Text>
              <Text
                style={{ fontSize: 16, lineHeight: 22, fontWeight: "bold" }}
              >
                ₹{sumOrder()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: SIZES.padding * 2,
                paddingHorizontal: SIZES.padding * 3,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={icons.pin}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.darkgray,
                  }}
                />
                <Text
                  style={{
                    marginLeft: SIZES.padding,
                    fontSize: 16,
                    lineHeight: 22,
                  }}
                >
                  Location
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Image
                  source={icons.master_card}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.darkgray,
                  }}
                />
                <Text
                  style={{
                    marginLeft: SIZES.padding,
                    fontSize: 16,
                    fontWeight: "bold",
                    lineHeight: 22,
                  }}
                >
                  8888
                </Text>
              </View>
            </View>
            {/* Order Button */}
            <View
              style={{
                padding: SIZES.padding * 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Pressable
                style={{
                  width: SIZES.width * 0.9,
                  padding: SIZES.padding,
                  backgroundColor: COLORS.primary,
                  alignItems: "center",
                  borderRadius: SIZES.radius,
                }}
                onPress={() => {
                  // console.log("RESTAU>>>", restaurant?.name),
                  //   navigation.navigate("OrderDelivery", {
                  //     restaurant: restaurant,
                  //     curentLocation: curentLocation,
                  //   });
                  navigation.navigate("Cart", { orderItems });
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontWeight: "bold",
                    fontSize: 20,
                    lineHeight: 28,
                  }}
                >
                  Go to Cart
                </Text>
              </Pressable>
            </View>
          </View>
          {isIphoneX() && (
            <View
              style={{
                position: "absolute",
                bottom: -34,
                left: 0,
                right: 0,
                height: 34,
                backgroundColor: COLORS.white,
              }}
            ></View>
          )}
        </View>
      </View>
    );
  };

  // const renderOrder = () => {
  //   return (
  //     <View>
  //       {renderDots()}
  //       <View
  //         style={{
  //           backgroundColor: COLORS.white,
  //           borderTopLeftRadius: 40,
  //           borderTopRightRadius: 40,
  //         }}
  //       >
  //         <View
  //           style={{
  //             flexDirection: "row",
  //             justifyContent: "space-between",
  //             paddingVertical: SIZES.padding * 2,
  //             paddingHorizontal: SIZES.padding * 3,
  //             borderBottomColor: COLORS.lightGray2,
  //             borderBottomWidth: 1,
  //           }}
  //         >
  //           <Text style={{ fontSize: 16, lineHeight: 22, fontWeight: "bold" }}>
  //             {getBasketItemCount()} items in Cart
  //           </Text>
  //           <Text style={{ fontSize: 16, lineHeight: 22, fontWeight: "bold" }}>
  //             ${sumOrder()}
  //           </Text>
  //         </View>
  //         <View
  //           style={{
  //             flexDirection: "row",
  //             justifyContent: "space-between",
  //             paddingVertical: SIZES.padding * 2,
  //             paddingHorizontal: SIZES.padding * 3,
  //           }}
  //         >
  //           <View style={{ flexDirection: "row" }}>
  //             <Image
  //               source={icons.pin}
  //               resizeMode="contain"
  //               style={{
  //                 width: 20,
  //                 height: 20,
  //                 tintColor: COLORS.darkgray,
  //               }}
  //             />
  //             <Text
  //               style={{
  //                 marginLeft: SIZES.padding,
  //                 fontSize: 16,
  //                 lineHeight: 22,
  //               }}
  //             >
  //               Location
  //             </Text>
  //           </View>

  //           <View style={{ flexDirection: "row" }}>
  //             <Image
  //               source={icons.master_card}
  //               resizeMode="contain"
  //               style={{
  //                 width: 20,
  //                 height: 20,
  //                 tintColor: COLORS.darkgray,
  //               }}
  //             />
  //             <Text
  //               style={{
  //                 marginLeft: SIZES.padding,
  //                 fontSize: 16,
  //                 fontWeight: "bold",
  //                 lineHeight: 22,
  //               }}
  //             >
  //               8888
  //             </Text>
  //           </View>
  //         </View>
  //         {/* Order Button */}
  //         <View
  //           style={{
  //             padding: SIZES.padding * 2,
  //             alignItems: "center",
  //             justifyContent: "center",
  //           }}
  //         >
  //           <TouchableOpacity
  //             style={{
  //               width: SIZES.width * 0.9,
  //               padding: SIZES.padding,
  //               backgroundColor: COLORS.primary,
  //               alignItems: "center",
  //               borderRadius: SIZES.radius,
  //             }}
  //             onPress={() =>
  //               navigation.navigate("OrderDelivery", {
  //                 restaurant: restaurant,
  //                 curentLocation: curentLocation,
  //               })
  //             }
  //           >
  //             <Text
  //               style={{
  //                 color: COLORS.white,
  //                 fontWeight: "bold",
  //                 fontSize: 20,
  //                 lineHeight: 28,
  //               }}
  //             >
  //               Order
  //             </Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //       {isIphoneX() && (
  //         <View
  //           style={{
  //             position: "absolute",
  //             bottom: -34,
  //             left: 0,
  //             right: 0,
  //             height: 34,
  //             backgroundColor: COLORS.white,
  //           }}
  //         ></View>
  //       )}
  //     </View>
  //   );
  // };

  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderFoodInfo()}
        {/* {renderOrder()} */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});

export default Restaurant;

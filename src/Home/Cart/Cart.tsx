import React from "react";
import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { HomeNavigationProps } from "../../components/Navigation";
import { Box } from "../../components/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, foods } from "../FoodItems/FoodItems";
import { RectButton } from "react-native-gesture-handler";

const Cart = ({ navigation }: HomeNavigationProps<"Cart">) => {
  // const [cart, setCart]: any = useState();
  // const removeData = async (itemId: string) => {
  //   try {
  //     await AsyncStorage.removeItem("cart");
  //     console.log(itemId, " ItemId Removed");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const getCart = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem("cart");
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const removeFromCart = (itemId: string) => {
  //   removeData(itemId);
  // };

  // getCart()
  //   .then((cart) => setCart(cart))
  //   .catch((error) => console.log("ERROR", error));

  const CartCard = ({ item }: any) => {
    return (
      <View style={styles.cartCard}>
        <Image source={item.image} style={{ height: 80, width: 80 }} />
        <View
          style={{ height: 100, marginLeft: 10, paddingVertical: 20, flex: 1 }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
          <Text style={{ fontSize: 14, color: COLORS.grey }}>
            {item.ingredients}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            ${item.price}
          </Text>
        </View>
        <View style={{ marginRight: 20, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>3</Text>
          <View style={styles.actionBtn}>
            <MaterialIcons
              name="remove"
              size={24}
              color={COLORS.white}
              onPress={() => true}
            />
            <MaterialIcons name="add" size={24} color={COLORS.white} />
          </View>
        </View>
      </View>
    );
  };

  const insets = useSafeAreaInsets();
  return (
    <Box flex={1} backgroundColor="white" style={{ marginTop: insets.top }}>
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back-ios"
          size={26}
          onPress={navigation.goBack}
        />
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Cart</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        data={foods}
        renderItem={({ item }) => <CartCard item={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 10 }}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 15,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Total Price
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>$50</Text>
            </View>
            <View style={{ marginHorizontal: 30 }}>
              <RectButton
                style={[
                  styles.btnContainer,
                  {
                    marginVertical: 5,
                    backgroundColor: COLORS.primary,
                    justifyContent: "center",
                    alignSelf: "center",
                  },
                ]}
              >
                <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                  CHECKOUT
                </Text>
              </RectButton>
            </View>
          </View>
        )}
      />
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
  cartCard: {
    height: 100,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 70,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});

export default Cart;

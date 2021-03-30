import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useStateValue } from "../../../StateProvider";

const CartCard = ({ item }: any) => {
  const [{}, dispatch]: any = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      product_id: item.product_id,
    });
  };
  return (
    <View style={styles.cartCard}>
      <Image source={item.image} style={{ height: 80, width: 80 }} />
      <View
        style={{
          height: 100,
          marginLeft: 10,
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.title}</Text>
        <Text style={{ fontSize: 14, color: "#908E8C" }}>
          {item.ingredients}
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>₹{item.price}</Text>
      </View>
      {/* <View style={{ marginRight: 20, alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.count}
            </Text>

            <View style={styles.actionBtn}>
              <MaterialIcons name="remove" size={24} color={COLORS.white} />
              <MaterialIcons name="add" size={24} color={COLORS.white} />
            </View>
          </View> */}
      <View style={{ marginRight: 20, alignItems: "center" }}>
        <MaterialIcons
          name="delete"
          size={28}
          color="#F9813A"
          onPress={() => removeFromBasket()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartCard: {
    height: 100,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: "#FFF",
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 70,
    height: 30,
    backgroundColor: "#F9813A",
    borderRadius: 25,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CartCard;

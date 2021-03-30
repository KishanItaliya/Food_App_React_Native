import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useStateValue } from "../../../StateProvider";
import { v4 as uuidv4 } from "uuid";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

const ItemsCard = ({ food }: any) => {
  const [{}, dispatch]: any = useStateValue();
  const navigation = useNavigation();

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

  return (
    <View style={styles.card}>
      <TouchableHighlight
        underlayColor="#FFF"
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
            <Text style={{ fontSize: 14, color: "#908E8C", marginTop: 2 }}>
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
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>₹{food.price}</Text>
        <View style={styles.addToCartBtn}>
          <MaterialIcons
            name="add"
            size={25}
            color="#FFF"
            onPress={() => {
              addToBasket(food), navigation.navigate("Cart");
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: "#FFF",
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: "#F9813A",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ItemsCard;

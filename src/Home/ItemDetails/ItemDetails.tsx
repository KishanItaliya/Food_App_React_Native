import React from "react";
import "react-native-get-random-values";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { Box } from "../../components/Theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HomeNavigationProps } from "../../components/Navigation";
import { COLORS } from "../FoodItems/FoodItems";
import { RectButton } from "react-native-gesture-handler";
import { useStateValue } from "../../../StateProvider";
import { v4 as uuidv4 } from "uuid";

const ItemDetails = ({
  navigation,
  route,
}: HomeNavigationProps<"ItemDetails">) => {
  const item: any = route.params;
  const insets = useSafeAreaInsets();
  const [{}, dispatch]: any = useStateValue();

  const addToBasket = () => {
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
    <Box flex={1} backgroundColor="white" style={{ marginTop: insets.top }}>
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back-ios"
          size={26}
          onPress={navigation.goBack}
        />
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Details</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 280,
          }}
        >
          <Image source={item.image} style={{ height: 220, width: 220 }} />
        </View>
        <View style={styles.details}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: COLORS.white,
              }}
            >
              {item.name}
            </Text>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="favorite-border"
                size={26}
                color={COLORS.primary}
              />
            </View>
          </View>
          <Text style={styles.detailsText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <View>
            <RectButton
              style={[
                styles.btnContainer,
                {
                  marginTop: 30,
                  marginBottom: 10,
                  backgroundColor: COLORS.white,
                  justifyContent: "center",
                  alignSelf: "center",
                },
              ]}
              onPress={() => {
                addToBasket(), navigation.navigate("Cart");
              }}
            >
              <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
                ADD TO CART
              </Text>
            </RectButton>
            <RectButton
              style={[
                styles.btnContainer,
                {
                  marginTop: 10,
                  marginBottom: 30,
                  backgroundColor: COLORS.white,
                  justifyContent: "center",
                  alignSelf: "center",
                },
              ]}
              onPress={() => navigation.navigate("ReviewScreen", item)}
            >
              <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
                REVIEWS
              </Text>
            </RectButton>
          </View>
        </View>
      </ScrollView>
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
  details: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
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

export default ItemDetails;

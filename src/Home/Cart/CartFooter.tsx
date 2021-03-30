import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { getBasketTotal } from "../../../reducer";
import { useStateValue } from "../../../StateProvider";
import { Box } from "../../components/Theme";

const CartFooter = () => {
  const [{ basket }]: any = useStateValue();
  return (
    <Box>
      {basket?.length != 0 ? (
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
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
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              ₹{getBasketTotal(basket).toFixed(2)}
            </Text>
          </View>
          <View style={{ marginHorizontal: 30 }}>
            <RectButton
              style={[
                styles.btnContainer,
                {
                  marginVertical: 5,
                  backgroundColor: "#F9813A",
                  justifyContent: "center",
                  alignSelf: "center",
                  marginBottom: 45,
                },
              ]}
              onPress={() => alert()}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontWeight: "bold",
                }}
              >
                CHECKOUT
              </Text>
            </RectButton>
          </View>
        </View>
      ) : (
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              alignSelf: "center",
            }}
          >
            Your Cart Is Empty !!
          </Text>
        </View>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});

export default CartFooter;

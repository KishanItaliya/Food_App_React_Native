import React from "react";
import { View, Text, Image } from "react-native";
import { icons } from "../../constants";

const CardContent = ({ review }: any) => {
  const item = review.data;
  return (
    <View
      style={{
        borderRadius: 15,
        height: 120,
        width: 150,
        elevation: 2,
        marginRight: 7,
        backgroundColor: "#F9813A",
      }}
    >
      <View
        style={{
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 14, color: "#FFF" }}>{item.review}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={icons.star}
            style={{
              height: 16,
              width: 16,
              tintColor: "#FFF",
              marginRight: 8,
            }}
          />
          <Text style={{ fontSize: 14, color: "#FFF" }}>({item.rating})</Text>
        </View>
      </View>
    </View>
  );
};

export default CardContent;

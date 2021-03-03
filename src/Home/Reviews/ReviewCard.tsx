import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../FoodItems/FoodItems";
import StarRating from "../ItemDetails/StarRating";

const ReviewCard = ({ review }: any) => {
  return (
    <View style={[styles.reviewCard, { flex: 1 }]}>
      <View
        style={{
          height: 100,
          paddingVertical: 20,
          flex: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {review.review}
        </Text>
      </View>

      <View style={{ alignItems: "center", flex: 1 }}>
        <Text style={{ fontSize: 10, fontWeight: "bold" }}>RATING</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <StarRating rating={review.rating} size={10} color="orange" />
          <Text style={{ color: COLORS.grey, fontSize: 12, marginLeft: 3 }}>
            ({review.rating})
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewCard: {
    height: 80,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ReviewCard;

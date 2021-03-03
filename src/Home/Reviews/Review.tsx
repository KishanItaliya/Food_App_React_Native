import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import ReviewCard from "./ReviewCard";

const Review = (review: any) => {
  //   const r: any = review.review;
  return (
    <ScrollView>
      <ReviewCard review={review.review} />
    </ScrollView>
  );
};

export default Review;

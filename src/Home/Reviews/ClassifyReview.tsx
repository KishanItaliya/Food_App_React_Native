import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import firebase from "../../firebase/config";
import ClassifyReviewCard from "./ClassifyReviewCard";

const ClassifyReview = ({ name }: any) => {
  //   console.log("NAME", name);
  const [positiveReviews, setPositiveReviews]: any = useState([]);
  const [negativeReviews, setNegativeReviews]: any = useState([]);
  const [visible, setVisible]: any = useState(true);

  // let isRendered = useRef(false);
  setTimeout(() => {
    setVisible(false);
  }, 1000);

  const PositiveReview = () => {
    firebase
      .firestore()
      .collection("reviews")
      .doc(name)
      .collection("positive")
      .onSnapshot((snapshot) =>
        setPositiveReviews(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  };

  const NegativeReview = () => {
    firebase
      .firestore()
      .collection("reviews")
      .doc(name)
      .collection("negative")
      .onSnapshot((snapshot) =>
        setNegativeReviews(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  };

  useEffect(() => {
    PositiveReview();
    NegativeReview();
  }, []);

  return (
    <View>
      <ClassifyReviewCard
        positiveReviews={positiveReviews}
        negativeReviews={negativeReviews}
      />
    </View>
  );
};

export default ClassifyReview;

import React, { useState, useEffect } from "react";
import firebase from "../../firebase/config";
import Review from "./Review";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, View } from "react-native";

const Reviews = () => {
  const [reviews, setReviews]: any = useState([]);
  const [visible, setVisible]: any = useState(true);

  // let isRendered = useRef(false);
  setTimeout(() => {
    setVisible(false);
  }, 2000);

  useEffect(() => {
    // isRendered = true;
    // if (isRendered) {
    firebase
      .firestore()
      .collection("reviews")
      .onSnapshot((snapshot) =>
        setReviews(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    // }
    // return () => {
    //   isRendered = false;
    // };
  }, []);

  // console.log(reviews);

  return (
    <View style={{ marginTop: 10, justifyContent: "center" }}>
      {visible ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {reviews?.map((review: any) => (
            <Review review={review.data} key={review.id} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Reviews;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  LogBox,
} from "react-native";
import categories from "../../../assets/data/categories";
import DetailCategory from "../ItemDetails/DetailCategory";
import StarRating from "../ItemDetails/StarRating";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { submitReview } from "../../firebase/authentication";
import { useFormik } from "formik";
import { Text as TextC } from "../../components/Theme";
import * as Yup from "yup";
import { HomeNavigationProps } from "../../components/Navigation";
import { RectButton } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import ClassifyReview from "./ClassifyReview";

LogBox.ignoreLogs([
  "VirtualizedLists should never be nested", // TODO: Remove when fixed
]);

const getRating = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("review");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("user");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const ReviewSchema = Yup.object().shape({
  review: Yup.string().min(2, "Too Short!").required("Required"),
});

const ReviewScreen = ({ route }: HomeNavigationProps<"ReviewScreen">) => {
  const item: any = route.params;
  // console.log("REVIEW ITEM", item.item);
  const insets = useSafeAreaInsets();
  const [rating, setRating]: any = useState();
  const [userId, setUserId]: any = useState();

  // const getStatus = async (review: any) => {
  //   console.log(review);
  //   await fetch(
  //     "http://ec2-13-127-176-96.ap-south-1.compute.amazonaws.com/predict",
  //     {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         review: review,
  //       }),
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setStatus(json);
  //       console.log(json);
  //     })
  //     .catch((error) => {
  //       console.warn(error);
  //     });
  // };

  getRating()
    .then((rating) => setRating(rating))
    .catch((error) => console.log("ERROR", error));

  getUser()
    .then((user) => setUserId(user.uid))
    .catch((error) => console.log("ERROR", error));

  const getReviewStatus = (review: any) => {
    axios
      .post(
        "http://ec2-13-127-176-96.ap-south-1.compute.amazonaws.com/predict",
        {
          review: review,
        }
      )
      .then((response) => {
        console.log("AXIOS::", response.data);
        submitReview(
          values.review,
          rating,
          item.item.name,
          response.data,
          userId
        );
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    resetForm,
  } = useFormik({
    validationSchema: ReviewSchema,
    initialValues: {
      review: "",
    },
    onSubmit: (values) => {
      getReviewStatus(values.review);
      resetForm(values);
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          backgroundColor: "white",
          marginTop: insets.top,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* <FlatList
        data={categories.items}
        renderItem={({ item }) => <DetailCategory category={item} />}
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "white",
          paddingHorizontal: 7,
          paddingVertical: 10,
        }}
      /> */}
        <ClassifyReview name={item.item.name} />
      </ScrollView>
      <View
        style={{
          backgroundColor: "#F9813A",
          paddingHorizontal: 25,
          paddingTop: 22,
          marginTop: 10,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#FFF",
          }}
        >
          Review
        </Text>
        <View style={{ marginTop: 5 }}>
          <StarRating rating={2} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 5,
              marginHorizontal: 5,
            }}
          >
            <MaterialIcons name="rate-review" size={24} color="#FFF" />
            <TextInput
              style={{
                flex: 1,
                fontSize: 18,
                marginLeft: 5,
                color: "#FFF",
                fontWeight: "bold",
              }}
              placeholder="Enter Review..."
              placeholderTextColor="#FEDAC5"
              onChangeText={handleChange("review")}
              onBlur={handleBlur("review")}
              autoCapitalize="none"
              returnKeyType="go"
              returnKeyLabel="go"
              onSubmitEditing={() => handleSubmit()}
              value={values.review}
            />
            {errors.review ? (
              <TextC variant="warning">{errors.review}</TextC>
            ) : null}
          </View>

          <View>
            <RectButton
              style={[
                styles.btnContainer,
                {
                  marginTop: 15,
                  marginBottom: 20,
                  backgroundColor: "#FFF",
                  justifyContent: "center",
                  alignSelf: "center",
                },
              ]}
              onPress={() => handleSubmit()}
            >
              <Text style={{ color: "#F9813A", fontWeight: "bold" }}>
                SUBMIT
              </Text>
            </RectButton>
          </View>
        </View>
      </View>
    </View>
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

export default ReviewScreen;

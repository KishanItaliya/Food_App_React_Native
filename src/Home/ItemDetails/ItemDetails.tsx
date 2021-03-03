import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { Box, Text as TextC } from "../../components/Theme";
import * as Yup from "yup";
import { useFormik } from "formik";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HomeNavigationProps } from "../../components/Navigation";
import { COLORS } from "../FoodItems/FoodItems";
import { RectButton } from "react-native-gesture-handler";
import StarRating from "./StarRating";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { submitReview } from "../../firebase/authentication";

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

const ItemDetails = ({
  navigation,
  route,
}: HomeNavigationProps<"ItemDetails">) => {
  const [rating, setRating]: any = useState();
  const [userId, setUserId]: any = useState();
  const [status, setStatus]: any = useState();
  const item: any = route.params;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setRating(2);
  }, [handleSubmit]);

  const getStatus = async (review: any) => {
    await fetch(
      "http://ec2-13-127-176-96.ap-south-1.compute.amazonaws.com/predict",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: review,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setStatus(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getRating()
    .then((rating) => setRating(rating))
    .catch((error) => console.log("ERROR", error));

  getUser()
    .then((user) => setUserId(user.uid))
    .catch((error) => console.log("ERROR", error));

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
      getStatus(values.review);
      submitReview(values.review, rating, item.id, status, userId);
      resetForm(values);
      setRating(2);
    },
  });

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
                  marginVertical: 30,
                  backgroundColor: COLORS.white,
                  justifyContent: "center",
                  alignSelf: "center",
                },
              ]}
            >
              <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
                ADD TO CART
              </Text>
            </RectButton>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: COLORS.white,
              }}
            >
              Review
            </Text>
            <View style={{ marginTop: 10 }}>
              <StarRating rating={2} />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  marginHorizontal: 5,
                }}
              >
                <MaterialIcons
                  name="rate-review"
                  size={24}
                  color={COLORS.white}
                />
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 18,
                    marginLeft: 5,
                    color: COLORS.white,
                    fontWeight: "bold",
                  }}
                  placeholder="Enter Review..."
                  placeholderTextColor={COLORS.secondary}
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
                      marginVertical: 30,
                      backgroundColor: COLORS.white,
                      justifyContent: "center",
                      alignSelf: "center",
                    },
                  ]}
                  onPress={() => handleSubmit()}
                >
                  <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
                    SUBMIT
                  </Text>
                </RectButton>
              </View>
            </View>
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

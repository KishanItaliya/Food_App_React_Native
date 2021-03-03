import React, { useState } from "react";
import { View, TouchableWithoutFeedback, Animated, Easing } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../FoodItems/FoodItems";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme } from "../../components/Theme";

const numStars = 5;

const storeRating = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("review", jsonValue);
  } catch (e) {
    console.log(e);
  }
};

interface StarRatingProps {
  rating: number;
  size: number;
  color: keyof Theme["colors"];
}

const StarRating = ({ rating, size, color }: StarRatingProps) => {
  const [defaultRating, setDefaultRating] = useState(rating);
  const [state, setState] = useState({
    animation: new Animated.Value(1),
  });

  const rate = (star: any) => {
    setDefaultRating(star);
  };

  const animate = () => {
    Animated.timing(state.animation, {
      toValue: 2,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      state.animation.setValue(1);
    });
  };

  const animateScale = state.animation.interpolate({
    inputRange: [1, 1.5, 2],
    outputRange: [1, 1.4, 1],
  });

  const animateOpacity = state.animation.interpolate({
    inputRange: [1, 1.2, 2],
    outputRange: [1, 0.5, 1],
  });

  const animateWobble = state.animation.interpolate({
    inputRange: [1, 1.25, 1.75, 2],
    outputRange: ["0deg", "-3deg", "3deg", "0deg"],
  });

  const animationStyle = {
    transform: [{ scale: animateScale }, { rotate: animateWobble }],
    opacity: animateOpacity,
  };

  const Star = ({ filled }: any) => (
    <FontAwesome
      name={filled === true ? "star" : "star-o"}
      color={color}
      size={size}
      style={{ marginHorizontal: 2 }}
    />
  );

  const stars = [];

  for (let x = 1; x <= numStars; x++) {
    stars.push(
      <TouchableWithoutFeedback
        key={x}
        onPress={() => {
          rate(x);
          animate();
        }}
      >
        <Animated.View style={x <= defaultRating ? animationStyle : ""}>
          <Star filled={x <= defaultRating ? true : false} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  storeRating(defaultRating.toString());

  return (
    <View>
      <View style={{ flexDirection: "row" }}>{stars}</View>
    </View>
  );
};

StarRating.defaultProps = {
  rating: 1,
  size: 32,
  color: COLORS.white,
};

export default StarRating;

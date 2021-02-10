import React, { useRef } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import Animated, {
  divide,
  multiply,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { useScrollHandler, interpolateColor } from "react-native-redash/src/v1";
import Slide, { SLIDE_HEIGHT } from "./Slide";
import Subslide from "./Subslide";
import Dot from "./Dot";
import { useTheme, makeStyles } from "../../components";
import { Routes, StackNavigationProps } from "../../components/Navigation";
import { Theme } from "../../components/Theme";

const { width } = Dimensions.get("window");

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: theme.borderRadii.xl,
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottomRightRadius: theme.borderRadii.xl,
    overflow: "hidden",
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: theme.borderRadii.xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const slides = [
  {
    title: "Delicious",
    subtitle: "Order Food",
    description:
      "Hungry? Order food in just a few clicks and we'll take care of you..",
    color: "#72BCD4",
    picture: {
      src: require("../assets/1.png"),
      width: 2513,
      height: 3583,
    },
  },
  {
    title: "Fast",
    subtitle: "Track Delivery",
    description: "Track your food order in real-time with an interactive map.",
    color: "#FFB6C1",
    picture: {
      src: require("../assets/2.png"),
      width: 2513,
      height: 3583,
    },
  },
  {
    title: "Excentric",
    subtitle: "Reorder and Save",
    description: "Reorder in one click. Bookmark your favorite restaurants.",
    color: "#79C879",
    picture: {
      src: require("../assets/3.png"),
      width: 2513,
      height: 3583,
    },
  },
  {
    title: "Support",
    subtitle: "Seamless Payments",
    description:
      "Pay with your credit cards, Apple Pay or Android Pay, with one click.",
    color: "#FFC04C",
    picture: {
      src: require("../assets/1.png"),
      width: 470,
      height: 463,
    },
  },
];

export const assets = slides.map((slide) => slide.picture.src);

const Onboarding = ({
  navigation,
}: StackNavigationProps<Routes, "Onboarding">) => {
  const styles = useStyles();
  const theme = useTheme();
  const scroll = useRef<Animated.ScrollView>(null);
  const { scrollHandler, x } = useScrollHandler();
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        {slides.map(({ picture }, index) => {
          const opacity = interpolate(x, {
            inputRange: [
              (index - 0.5) * width,
              index * width,
              (index + 0.5) * width,
            ],
            outputRange: [0, 1, 0],
            extrapolate: Extrapolate.CLAMP,
          });
          return (
            <Animated.View style={[styles.underlay, { opacity }]} key={index}>
              <Image
                source={picture.src}
                style={{
                  width: width - theme.borderRadii.xl,
                  height:
                    ((width - theme.borderRadii.xl) * picture.height) /
                    picture.width,
                }}
              />
            </Animated.View>
          );
        })}

        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          {...scrollHandler}
        >
          {slides.map(({ title, picture }, index) => (
            <Slide key={index} right={!!(index % 2)} {...{ title, picture }} />
          ))}
        </Animated.ScrollView>
      </Animated.View>

      <View style={styles.footer}>
        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor }}
        />

        <View style={styles.footerContent}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} currentIndex={divide(x, width)} {...{ index }} />
            ))}
          </View>

          <Animated.View
            style={{
              flex: 1,
              flexDirection: "row",
              width: width * slides.length,
              transform: [{ translateX: multiply(x, -1) }],
            }}
          >
            {slides.map(({ subtitle, description }, index) => {
              const last = index === slides.length - 1;
              return (
                <Subslide
                  key={index}
                  onPress={() => {
                    if (last) {
                      navigation.navigate("Welcome");
                    } else {
                      scroll.current
                        ?.getNode()
                        .scrollTo({ x: width * (index + 1), animated: true });
                    }
                  }}
                  {...{ subtitle, description, last }}
                />
              );
            })}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;

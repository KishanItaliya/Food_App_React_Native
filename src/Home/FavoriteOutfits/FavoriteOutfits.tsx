import React, { useRef, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import {
  Transitioning,
  Transition,
  TransitioningView,
} from "react-native-reanimated";
import { Box, useTheme } from "../../components/Theme";
import { HomeNavigationProps } from "../../components/Navigation";
import { Header } from "../../components";
import Outfit from "./Outfit";
import Footer from "./Footer";
import TopCurve from "./TopCurve";

const defaultOutfits = [
  {
    id: 1,
    color: "#BFEAF5",
    aspectRatio: 1,
    selected: false,
  },
  {
    id: 2,
    color: "#BEECC4",
    aspectRatio: 200 / 145,
    selected: false,
  },
  {
    id: 3,
    color: "#FFE4D9",
    aspectRatio: 180 / 145,
    selected: false,
  },
  {
    id: 4,
    color: "#BFEAF5",
    aspectRatio: 1,
    selected: false,
  },
  {
    id: 5,
    color: "#BEECC4",
    aspectRatio: 1,
    selected: false,
  },
  {
    id: 6,
    color: "#F3F0EF",
    aspectRatio: 120 / 145,
    selected: false,
  },
  {
    id: 7,
    color: "#D5C3BB",
    aspectRatio: 210 / 145,
    selected: false,
  },
  {
    id: 8,
    color: "#BFEAF5",
    aspectRatio: 160 / 145,
    selected: false,
  },
];

const { width: wWidth } = Dimensions.get("window");

const FavoriteOutfits = ({
  navigation,
}: HomeNavigationProps<"FavoriteOutfits">) => {
  const transition = (
    <Transition.Together>
      <Transition.In type="fade" durationMs={500} />
      <Transition.Out type="fade" durationMs={500} />
    </Transition.Together>
  );
  const list = useRef<TransitioningView>(null);
  const [outfits, setOutfits] = useState(defaultOutfits);
  const theme = useTheme();
  const width = (wWidth - theme.spacing.m * 3) / 2;
  const [footerHeight, setFooterHeight] = useState(0);
  return (
    <Box flex={1} backgroundColor="white">
      <Header
        title="Favorite Outfits"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{ icon: "shopping-bag", onPress: () => true }}
      />
      <Box flex={1}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.m,
            paddingBottom: footerHeight,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Transitioning.View ref={list} transition={transition}>
            <Box flexDirection="row">
              <Box marginRight="m">
                {outfits
                  .filter((_, i) => i % 2 !== 0)
                  .map((outfit) => (
                    <Outfit key={outfit.id} outfit={outfit} width={width} />
                  ))}
              </Box>
              <Box>
                {outfits
                  .filter((_, i) => i % 2 === 0)
                  .map((outfit) => (
                    <Outfit key={outfit.id} outfit={outfit} width={width} />
                  ))}
              </Box>
            </Box>
          </Transitioning.View>
        </ScrollView>
        <TopCurve footerHeight={footerHeight} />
        <Box
          position="absolute"
          left={0}
          right={0}
          bottom={0}
          onLayout={({
            nativeEvent: {
              layout: { height },
            },
          }) => setFooterHeight(height)}
        >
          <Footer
            label="Add to Favorites"
            onPress={() => {
              list.current?.animateNextTransition();
              setOutfits(outfits.filter((outfit) => !outfit.selected));
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FavoriteOutfits;

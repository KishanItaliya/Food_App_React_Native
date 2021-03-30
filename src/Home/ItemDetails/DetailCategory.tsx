import * as React from "react";
import { Image, FlatList, Text, StyleSheet } from "react-native";

interface DetailCategoryProps {
  category: {
    id: string;
    title: string;
    movies: { id: string; poster: string }[];
  };
}

const DetailCategory = (props: DetailCategoryProps) => {
  const { category } = props;
  return (
    <>
      <Text style={styles.title}>{category.title}</Text>
      <FlatList
        data={category.movies}
        renderItem={({ item }) => (
          <Image
            style={styles.image}
            source={{
              uri: item.poster,
            }}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 180,
    resizeMode: "cover",
    borderRadius: 5,
    margin: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetailCategory;

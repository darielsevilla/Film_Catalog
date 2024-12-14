import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { loadedMovies } from "./data/data";
import SmallCard from "./BuildingBlocks/smallCard";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Trending</Text>
      {/* Carrusel horizontal */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      >
        {loadedMovies.movies.map((movie) => (
          <SmallCard key={movie.id} {...movie} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
  sectionTitle: {
    fontSize: 24,
    color: "#E91E63",
    marginVertical: 10,
    fontWeight: "bold",
  },
  carousel: {
    flexDirection: "row",
    paddingVertical: 10,
  },
});

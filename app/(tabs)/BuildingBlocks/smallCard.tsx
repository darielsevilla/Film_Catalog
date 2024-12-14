import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface MovieProps {
  id: number;
  name: string;
  rating: number;
  year: number;
  poster: string;
  overview: string;
}

const SmallCard: React.FC<MovieProps> = ({ rating, poster }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: poster }} style={styles.poster} />
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{rating}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 180,
    margin: 10,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  ratingContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 5,
  },
  ratingText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default SmallCard;
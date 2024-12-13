import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SmallCard from "./BuildingBlocks/smallCard";
import { Text } from "react-native-paper";

interface Movie {
  id: number;
  name: string;
  rating: number;
  year: number;
  poster: string;
  language: string;
  overview: string;
}

export default function MainScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);

  // Función para cargar películas de AsyncStorage
  const loadMovies = async () => {
    try {
      const storedMovies = await AsyncStorage.getItem("movies");
      if (storedMovies) {
        setMovies(JSON.parse(storedMovies));
      } else {
        console.log("No movies found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error loading movies:", error);
    }
  };

  // Ejecutar al montar el componente
  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.header}>
        Movie List
      </Text>
      {movies.length > 0 ? (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SmallCard
              name={item.name}
              rating={item.rating}
              year={item.year}
              poster={item.poster}
              overview={item.overview}
            />
          )}
        />
      ) : (
        <Text style={styles.noMoviesText}>No movies to display</Text>
      )}
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  header: {
    marginBottom: 10,
    textAlign: "center",
  },
  noMoviesText: {
    textAlign: "center",
    color: "#999",
  },
});

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { loadedMovies } from "./data/data";
import SmallCard from "./BuildingBlocks/smallCard";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface movies{
  id: string,
  title: string,
  poster_path: string,
  release_date: string,
  vote_average: string
}

export default function MainScreen() {
  const [lista, setList] = useState<Record<string, movies[]>>({})  
  const load = async()=>{
    const movies = await AsyncStorage.getItem("loadedFilms");
    const tempoList: Record<string, movies[]> =JSON.parse(movies?movies:"[]");
    await setList(tempoList);
  }

  useEffect(()=>{
    load();
  },[])
  return (
    <View style={styles.container}>
      {/* Carrusel horizontal */}
      {Object.entries(lista).map(([genre, movies])=><View key={genre}>
        <Text style={styles.sectionTitle}>{genre}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      >
        {movies.map((movie) => (
          <SmallCard key={movie.id} {...movie} />
        ))}
      </ScrollView></View>)}
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

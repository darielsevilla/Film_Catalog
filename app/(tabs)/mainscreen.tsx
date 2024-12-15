import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { loadedMovies } from "./data/data";
import SmallCard from "./BuildingBlocks/smallCard";
import { useState, useEffect, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoviesContext } from '@/context/MoviesContext';
import LinearGradient from "react-native-linear-gradient";
import NavBar from "./BuildingBlocks/UserNavbar";
import MainCarousel from "./BuildingBlocks/MainCarousel";
import { Provider as PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { customStyle, infoStyles } from "../styles/style";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Button, SafeAreaView } from 'react-native';
interface movies {
  id: string,
  title: string,
  poster_path: string,
  release_date: string,
  vote_average: string
}

export default function MainScreen() {
  const [loading, setLoading] = useState(false);
  const [lista, setList] = useState<Record<string, movies[]>>({})
  const load = async () => {
    setLoading(true);
    const movies = await AsyncStorage.getItem("loadedFilms");
    const tempoList: Record<string, movies[]> = JSON.parse(movies ? movies : "[]");
    await setList(tempoList);
    setLoading(false);
  }
  const { favorites, setFavorites } = useContext(MoviesContext);


  useEffect(() => {
    load();
  }, [])
  if (loading) {
    return (
        <SafeAreaView style={infoStyles.containerInfo}>
            <ActivityIndicator style={customStyle.marginTop} animating={true} color={MD2Colors.white} size={'large'} />
        </SafeAreaView>
    );
}
  return (
    <>
    
    <PaperProvider>

      <ScrollView>
        <NavBar />
        <MainCarousel />
        {/* Carrusel horizontal */}
        <View style={styles.container}>
        {(favorites.length != 0) ? <Text style={styles.sectionTitle}>Favoritos</Text> : <></>}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
        >
          {favorites.map((movie) => (
            <SmallCard key={movie.id} {...movie} />
          ))}
        </ScrollView>
        {Object.entries(lista).map(([genre, movies]) => <View key={genre}>
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
      </ScrollView>
      </PaperProvider>
    </>

  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#1A001F"
  },
  sectionTitle: {
    fontSize: 24,
    color: "#FFFFFF",
    marginVertical: 10,
    fontWeight: "bold",
  },
  carousel: {
    flexDirection: "row",
    paddingVertical: 10,
  },
});

import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation,  NavigationProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native'; 
type RootStackParamList = {
    InfoPage: {movieId : number};
  };
type InfoProp = NavigationProp<RootStackParamList, 'InfoPage'>;


interface MovieProps {
  id: string,
  title: string,
  poster_path: string,
  release_date: string,
  vote_average: string
}


const SmallCard: React.FC<MovieProps> = ({ vote_average, poster_path, id }) => {
  const navigation = useNavigation<InfoProp>();
  const click = () =>{
    navigation.navigate('InfoPage', {movieId : Number(id)});
  }  
  return (
    <TouchableOpacity onPress={click}> 
    <View style={styles.card}>
      <Image source={{ uri: poster_path }} style={styles.poster} />
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{vote_average}</Text>
      </View>
    </View>
    </TouchableOpacity>
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
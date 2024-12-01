import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { infoStyles } from '../styles/style';
import React from 'react';
import {Image, StyleSheet, View, ImageBackground,SafeAreaView} from 'react-native';
import { Text } from 'react-native-paper';
interface InfoPageParams {
    movieId: number;
}

interface genre{
    name : string
}
interface companies{
    name : string
}
interface Movie{
    id: number,
    poster: string,
    background: string,
    name:string,
    rating: number,
    year: string,
    language: string,
    overview: string,
    genres: string[],
    production: string[],
    trailer: string
}
export default function InfoPage({ route }: { route: { params: InfoPageParams } }){
    const [load, setLoad] = useState(false);
    const [movie, setMovie] = useState<Movie>()
    
    const getMovie = async () =>{
        const { movieId } = route.params;
        const url = process.env.EXPO_PUBLIC_PATH + '/getPelicula';
        console.log("He llegado " +movieId+" " + url)
        const response = await axios.get(url, {
            params:{
                id: movieId
            }
        })
        console.log("data:" +response.data.data.name)
        
        setMovie({
            id: response.data.data.id,
            poster: response.data.data.id.poster,
                background: response.data.data.background,
                name:   response.data.data.name,
                rating: response.data.data.rating,
                year: response.data.data.year,
                language: response.data.data.language,
                overview: response.data.data.overview,
                genres:response.data.data.genres,
                production: response.data.data.production,
                trailer:  response.data.data.trailer
        });
        //conseguir datos

        setLoad(true)

    }
    useEffect(()=>{
        getMovie();
    },[])
    if(!load){
        return(<></>);
    }
    return(<>
        <SafeAreaView style = {infoStyles.containerInfo}>
         <ImageBackground
        style={infoStyles.backgroundImg}
        source={{
          uri: movie?.background,
        }}
      />
        <Text variant="displaySmall" style={infoStyles.overlay}>{movie?.name}</Text>
        </SafeAreaView>
     </>);
   
}
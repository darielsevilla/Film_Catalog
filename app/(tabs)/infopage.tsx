import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { infoStyles, movieStyles } from '../styles/style';
import React from 'react';
import { Image, StyleSheet, View, ImageBackground, SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Chip } from 'react-native-paper';

interface InfoPageParams {
    movieId: number;
}

interface genre {
    name: string
}
interface companies {
    name: string
}
interface Movie {
    id: number,
    poster: string,
    background: string,
    name: string,
    rating: number,
    year: string,
    language: string,
    overview: string,
    genres: string[],
    production: string[],
    trailer: string
}

export default function InfoPage({ route }: { route: { params: InfoPageParams } }) {
    const [load, setLoad] = useState(false);
    const [movie, setMovie] = useState<Movie>()

    const getMovie = async () => {
        const { movieId } = route.params;
        const url = process.env.EXPO_PUBLIC_PATH + '/getPelicula';

        const response = await axios.get(url, {
            params: {
                id: movieId
            }
        })

        setMovie({
            id: response.data.data.id,
            poster: response.data.data.id.poster,
            background: response.data.data.background,
            name: response.data.data.name,
            rating: response.data.data.rating,
            year: response.data.data.year,
            language: response.data.data.language,
            overview: response.data.data.overview,
            genres: response.data.data.genres,
            production: response.data.data.production,
            trailer: response.data.data.trailer
        });
        //conseguir datos

        setLoad(true)

    }
    useEffect(() => {
        getMovie();
    }, [])
    if (!load) {
        return (<></>);
    }
    return (<>
        <SafeAreaView style={infoStyles.containerInfo}>
            <View style={infoStyles.topContainer}>
                <ImageBackground
                    style={infoStyles.backgroundImg}
                    source={{
                        uri: movie?.background,
                    }}
                />
                <Text style={infoStyles.topTextContainer}>
                    <Text style={infoStyles.txt} variant="displaySmall">{movie?.name}</Text>
                    <Text style={infoStyles.txt} variant="titleMedium">  ({movie?.year})  </Text>
                </Text>

                <View style={infoStyles.topTextContainer}>
                    {movie?.genres.map((genre) => <Chip style={infoStyles.chipStyle} key={genre} mode="outlined"><Text style={infoStyles.chipText}>{genre}</Text></Chip>)}
                </View>

            </View>
            <View style={movieStyles.bodyContainer}>
                <View style={movieStyles.divisor} />

                <View style={movieStyles.rowContainer}>
                    <Image
                        style={movieStyles.poster}
                        source={{
                            uri: movie?.background,
                        }}
                    />

                    <View style={movieStyles.textContainer}>
                        <Text style={movieStyles.bodyColor} variant="titleMedium">
                            <Text style={movieStyles.textColor}>Title:</Text> {movie?.name}
                        </Text>
                        <Text style={movieStyles.bodyColor} variant="titleMedium">
                            <Text style={movieStyles.textColor}>Original language:</Text> {movie?.language}
                        </Text>
                        <Text style={movieStyles.bodyColor} variant="titleMedium">
                            <Text style={movieStyles.textColor}>Production:</Text> {movie?.production}
                        </Text>
                    </View>
                </View>

                <View style={movieStyles.divisor} />

                <View style={movieStyles.textContainer}>
                    <Text style={movieStyles.bodyColor} variant="titleLarge">
                        Overview
                    </Text>
                    <Text style={movieStyles.bodyColor} variant="titleMedium">
                        {movie?.overview}
                    </Text>
                </View>
            </View>



            <View style={infoStyles.overlay}>


            </View>


        </SafeAreaView>
    </>);
}
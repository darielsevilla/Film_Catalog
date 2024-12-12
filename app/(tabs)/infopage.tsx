import { useEffect, useState } from 'react';
import axios from 'axios';
import { infoStyles, movieStyles } from '../styles/style';
import React from 'react';
import { Image, View, ImageBackground, Button, SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';
import { Chip } from 'react-native-paper';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import Video from 'react-native-video';

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
    trailer: string,
    duration: string,
    adult: boolean,
    date: string,
    favorite: boolean,
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
            trailer: response.data.data.trailer,
            adult: response.data.data.adult,
            duration: response.data.data.duration,
            date: response.data.data.date,
            favorite: response.data.data.favorite
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
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
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
                    <View style={movieStyles.detailsContainer}>

                        <View style={movieStyles.adultsContainer}>
                            {/*todo publico*/}
                            {/*<Image style={movieStyles.rating}
                                source={require('../../assets/images/familia.png')} />
                            <Text style={movieStyles.adultsText} variant="titleLarge">
                                Everyone
                            </Text>*/}

                            {/*adultos*/}
                            <Image style={movieStyles.adults}
                                source={require('../../assets/images/18.png')} />
                            <Text style={movieStyles.adultsText} variant="titleLarge">
                                Adults
                            </Text>
                        </View>

                        {/*rating*/}
                        <View style={movieStyles.ratingContainer}>
                            <Image style={movieStyles.rating}
                                source={require('../../assets/images/estrella2.png')} />
                            <Text style={movieStyles.attributesColor} variant="titleLarge">
                                <Text style={movieStyles.ratingText}>{movie?.rating}</Text> /10
                            </Text>
                        </View>

                        <TouchableOpacity style={movieStyles.favoriteBtn} onPress={() => {/* Tu función aquí */ }}>
                            <Image style={movieStyles.buttonImage} source={require('../../assets/images/favorito.png')} />
                            <Text style={movieStyles.buttonText}>Add to Favorites</Text>
                        </TouchableOpacity>
                    </View>

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
                                <Text style={movieStyles.attributesColor}>Title:</Text> {movie?.name}
                            </Text>
                            <Text style={movieStyles.bodyColor} variant="titleMedium">
                                <Text style={movieStyles.attributesColor}>Running Time:</Text> {movie?.duration}
                            </Text>
                            <Text style={movieStyles.bodyColor} variant="titleMedium">
                                <Text style={movieStyles.attributesColor}>Release Date:</Text> {movie?.date}
                            </Text>
                            <Text style={movieStyles.bodyColor} variant="titleMedium">
                                <Text style={movieStyles.attributesColor}>Original Language:</Text> {movie?.language}
                            </Text>
                            <Text style={movieStyles.bodyColor} variant="titleMedium">
                                <Text style={movieStyles.attributesColor}>Production:</Text> {movie?.production}
                            </Text>
                        </View>
                    </View>

                    <View style={movieStyles.divisor} />

                    <View>
                        <Text style={movieStyles.titles} variant="displaySmall">
                            Overview
                        </Text>
                        <Text style={movieStyles.text} variant="titleMedium">
                            {movie?.overview}
                        </Text>
                    </View>

                    <View style={movieStyles.divisor} />

                    <View>
                        <Text style={movieStyles.titles} variant="displaySmall">
                            Trailer
                        </Text>
                        {/*<Video
                            source={{ uri: movie?.trailer }}
                            style={movieStyles.video}
                            controls
                            resizeMode="contain"
                            paused={false}
                        />*/}
                    </View>

                </View>


            </ScrollView>
            <View style={infoStyles.overlay} />
        </SafeAreaView>
    </>);
}
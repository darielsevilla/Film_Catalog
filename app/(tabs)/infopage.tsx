import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { infoStyles, movieStyles, customStyle } from '../styles/style';
import { loadedMovies } from './data/data';
import React from 'react';
import { Image, View, ImageBackground, Button, SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';
import { Chip } from 'react-native-paper';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MoviesContext } from '@/context/MoviesContext';
import { TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
interface InfoPageParams {
    movieId: number;
}

interface gallery {
    imagen: string;
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
    gallery: gallery[];
}

export default function InfoPage({ route }: { route: { params: InfoPageParams } }) {
    const [load, setLoad] = useState(false);
    const [movie, setMovie] = useState<Movie>()
    const [adult, setAdult] = useState<boolean>(false);
    const [kids, setKids] = useState<boolean>(false);
    const {favorites, setFavorites} = useContext(MoviesContext);
    const [favorite, setFavorite] = useState(false);
    const [searching, setSearching] = useState(false);
    const getMovie = async () => {
       
        const userId = await AsyncStorage.getItem("id");
        const { movieId } = route.params;
        const url = process.env.EXPO_PUBLIC_PATH + '/getPelicula';

        const response = await axios.get(url, {
            params: {
                movieID: movieId,
                userID: userId
            }
        })

        const getEmbedUrl = (url: string) => {
            if (url.includes("watch?v=")) {
                return url.replace("watch?v=", "embed/");
            }
            return url;
        };
        //const galeria = response.data.images.map((image:any) => image.imagen);
        setMovie({
            id: response.data.data.id,
            poster: response.data.data.poster,
            background: response.data.data.background,
            name: response.data.data.name,
            rating: response.data.data.rating,
            year: response.data.data.year,
            language: response.data.data.language,
            overview: response.data.data.overview,
            genres: response.data.data.genres,
            production: response.data.data.production,
            trailer: getEmbedUrl(response.data.data.trailer),
            adult: response.data.data.adult,
            duration: response.data.data.duration,
            date: response.data.data.date,
            favorite: response.data.data.favorite,
            gallery: response.data.data.images
        });
        //conseguir datos
       
        if (adult) {
            setAdult(true);
        } else {
            setKids(true);
        }
        setLoad(true);

    }

    const addFavorite = async () => {
        try{
            if(movie){
                const user_id = await AsyncStorage.getItem("id")
            
                const config = {
                    headers: {
                        'Content-Type' : 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin' : '*'
                    }
                }
               
                const body = {
                    movie: movie.id,
                    user: user_id
                }
                
                const response = axios.post(process.env.EXPO_PUBLIC_PATH + "/agregarFavorito", body, config).then((responsePost)=>{
                    if(responsePost.status == 202){
                        //se agregó a favoritos 
                        setMovie(movie => {
                            if (!movie) return undefined; 
                            return {
                                ...movie, 
                                favorite: true 
                            }
                            });
                        const favoritos = [...favorites, {id: String(movie.id), title: movie.name, poster_path:movie.poster, release_date: String(movie.year), vote_average: String(movie.rating)}]
                        setFavorites(favoritos)
                        AsyncStorage.setItem("favorites", JSON.stringify(favoritos));
                        
                    }
                }
                ).catch((error) => { console.error(error)});
            }
        }catch(error){
            console.log(error)
        }
    };

    const removeFavorite = async () => {
        try{
            if(movie){
                const user_id = await AsyncStorage.getItem("id") 
                
                const headers = {
                    params: {
                        movie: movie.id,
                        user: user_id
                    }
                    
                }
                const response = axios.delete(process.env.EXPO_PUBLIC_PATH + "/eliminarFavorito", headers).then((responsePost)=>{
                    if(responsePost.status == 202){
                        //se eliminó a favoritos 
                        setMovie(movie => {
                            if (!movie) return undefined; 
                            return {
                                ...movie, 
                                favorite: false 
                            }
                        });

                        const favoritos = favorites.filter(movie => movie.id !== String(movie.id));
                        setFavorites(favoritos)
                        AsyncStorage.setItem("favorites", JSON.stringify(favoritos));
                    }
                });
            }
        }catch(error){

        }
    };

    useEffect(() => {
        getMovie();
    }, [])
    useEffect(()=>{
        if(movie){
            if(movie.favorite){
                setFavorite(true);
            }else{
                setFavorite(false);
            }

        }
      

    },[movie])
    if (!load) {
        return (
            <SafeAreaView style={infoStyles.containerInfo}>
                <ActivityIndicator style={customStyle.marginTop} animating={true} color={MD2Colors.white} size={'large'} />
            </SafeAreaView>
        );
    }

    return (<>
        <SafeAreaView style={infoStyles.containerInfo}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
                <View style={movieStyles.topContainer}>
                    <ImageBackground
                        style={movieStyles.backgroundImg}
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
                            {kids && (
                                <>
                                    <Image style={movieStyles.rating}
                                        source={require('../../assets/images/familia.png')} />
                                    <Text style={movieStyles.adultsText} variant="titleMedium">
                                        Everyone
                                    </Text>
                                </>
                            )}

                            {/*adultos*/}
                            {adult && (
                                <>
                                    <Image style={movieStyles.adults}
                                        source={require('../../assets/images/18.png')} />
                                    <Text style={movieStyles.adultsText} variant="titleMedium">
                                        Adults
                                    </Text>
                                </>
                            )}
                        </View>

                        {/*rating*/}
                        <View style={movieStyles.ratingContainer}>
                            <Image style={movieStyles.rating}
                                source={require('../../assets/images/estrella2.png')} />
                            <Text style={movieStyles.attributesColor} variant="titleLarge">
                                <Text style={movieStyles.ratingText}>{movie?.rating}</Text> /10
                            </Text>
                        </View>

                        {/*Agregar a Favoritos*/}
                        {(!favorite)?<TouchableOpacity style={movieStyles.favoriteBtn} onPress={addFavorite}>
                            <Image style={movieStyles.buttonImage} source={require('../../assets/images/favorito.png')} />
                            <Text style={movieStyles.buttonText}>Add to Favorites</Text>
                        </TouchableOpacity>:<TouchableOpacity style={movieStyles.rmvBtn} onPress={removeFavorite}>
                            <Image style={movieStyles.buttonImage} source={require('../../assets/images/favoritoIcon.png')} />
                            <Text style={movieStyles.buttonText}>Remove Favorite</Text>
                        </TouchableOpacity>}
                    </View>

                    <View style={movieStyles.divisor} />

                    <View style={movieStyles.rowContainer}>
                        {/* poster */}
                        <Image
                            style={movieStyles.poster}
                            source={{
                                uri: movie?.poster,
                            }}
                        />

                        {/*detalles de la pelicula*/}
                        <View style={movieStyles.textContainer}>
                            <Text style={movieStyles.bodyColor} variant="titleMedium">
                                <Text style={movieStyles.attributesColor}>Title:</Text> {movie?.name}
                            </Text>
                            <Text style={movieStyles.bodyColor} variant="titleMedium">
                                <Text style={movieStyles.attributesColor}>Running Time:</Text> {movie?.duration} min
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
                    {/*sinopsis*/}
                    <View>
                        <Text style={movieStyles.titles} variant="displaySmall">
                            Overview
                        </Text>
                        <Text style={movieStyles.text} variant="titleMedium">
                            {movie?.overview}
                        </Text>
                    </View>


                    {/* trailer */}
                    {movie?.trailer && (<>
                        <View style={movieStyles.divisor} />
                        <View>
                            <Text style={movieStyles.titles} variant="displaySmall">
                                Trailer
                            </Text>
                            <WebView
                                source={{ uri: movie.trailer }}
                                style={movieStyles.video}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                onError={(syntheticEvent) => {
                                    const { nativeEvent } = syntheticEvent;
                                    console.error('WebView error: ', nativeEvent);
                                }}
                            />
                        </View>
                    </>
                    )}

                    {/* galeria */}
                    {movie?.gallery && (<>
                        <View style={movieStyles.divisor} />
                        <View>
                            <Text style={movieStyles.titles} variant="displaySmall">
                                Gallery
                            </Text>
                            
                            {movie.gallery.map((photo, index) => (
                                <Card key={index} style={{ marginBottom: 20 }}>
                                    <Card.Cover source={{ uri: photo.imagen ? photo.imagen : "" }} />
                                </Card>
                            )
                            )}
                        </View>
                    </>
                    )}
                </View>


            </ScrollView>
            <View style={infoStyles.overlay} />
        </SafeAreaView>
    </>);
}
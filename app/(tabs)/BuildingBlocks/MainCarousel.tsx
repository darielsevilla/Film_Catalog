import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, View, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { ImageSourcePropType } from 'react-native';
import { movieStyles, infoStyles } from '../../styles/style';

import axios from 'axios';
import { Button, SafeAreaView } from 'react-native';
import { Chip } from 'react-native-paper';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';

type ImageItem = {
    image: ImageSourcePropType | string,
    title: string,
    year: number,
    rating: number,
    genres: string[]
};

const MainCarousel = () => {
    const images: ImageItem[] = [
        {
            image: require('../../../assets/images/Logo02.png'),
            title: 'Movie Title 1',
            year: 2021,
            rating: 8.5,
            genres: ['Action', 'Adventure', 'Drama']
        },
        {
            image: 'https://media.themoviedb.org/t/p/w250_and_h141_face/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg',
            title: 'Dune',
            year: 2021,
            rating: 7.8,
            genres: ['Science Fiction', 'Adventure']
        },
        {
            image: 'https://via.placeholder.com/600x200?text=Image+2',
            title: 'Movie Title 3',
            year: 2023,
            rating: 9.0,
            genres: ['Sci-Fi', 'Thriller']
        },
        {
            image: 'https://via.placeholder.com/600x200?text=Image+3',
            title: 'Movie Title 4',
            year: 2024,
            rating: 6.8,
            genres: ['Horror', 'Mystery']
        },
    ];

    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const renderStars = (rating: number, maxStars = 5) => {
        const filledStars = Math.round((rating / 10) * maxStars); // Calcula estrellas llenas
        const stars = Array.from({ length: maxStars }, (_, index) =>
            index < filledStars ? '★' : '☆' // Llenas o vacías
        );
        return stars.join(' '); // Combina en una sola línea
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
                index: currentIndex,
                animated: true,
            });
        }
    }, [currentIndex]);

    const renderItem = ({ item }: { item: ImageItem }) => {
        return (
            <SafeAreaView style={styles.item}>
                <ImageBackground
                    style={styles.image}
                    source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                />
                <View style={styles.overlay}>
                    <View style={styles.Container}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.year}>({item.year})</Text>
                    </View>
                    <Text style={styles.stars}>{renderStars(item.rating)}</Text>
                    <View style={infoStyles.topTextContainer}>
                        {item?.genres.map((genre) => (
                            <Chip style={infoStyles.chipStyle} key={genre} mode="outlined">
                                <Text style={infoStyles.chipText}>{genre}</Text>
                            </Chip>
                        ))}
                    </View>
                </View>
            </SafeAreaView>
        );
    };


    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <FlatList
                ref={flatListRef}
                data={images}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
            />
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        width: Dimensions.get('window').width, // Ancho total de la pantalla
        height: Dimensions.get('window').height * 0.5, // Altura ajustable según la necesidad
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: Dimensions.get('window').width, // Ancho total de la pantalla
        height: Dimensions.get('window').height * 0.5, // Altura ajustable según la necesidad
        resizeMode: 'cover', // Mantiene la proporción de la imagen
    },
    overlay: {
        position: 'relative',
        bottom: 160,
        left: 0,
        width: '100%',
        padding: 10,
        //backgroundColor: 'rgba(0, 0, 0, 0.6)', // Background for better visibility
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    title: {
        fontSize: 32,
        color: 'white',
        //fontWeight: 'bold',
    },
    stars: {
        fontSize: 18,
        color: 'yellow',
        //marginLeft: 10,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    year: {
        fontSize: 18,
        color: 'white',
        marginLeft: 10,
        marginTop: 12
    },
    rating: {
        fontSize: 18,
        color: 'yellow',
        marginLeft: 10,
    },
    Container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    genreBox: {
        backgroundColor: 'transparent',
        borderWidth: 1, // Grosor del borde
        borderColor: 'white', // Color del borde
        borderRadius: 5, // Bordes redondeados
        paddingVertical: 5, // Espaciado interno vertical
        paddingHorizontal: 10, // Espaciado interno horizontal
        margin: 5,
    },
    genreText: {
        color: 'white',
        fontSize: 16,
    },
});

export default MainCarousel;
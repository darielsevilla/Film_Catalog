import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, View, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { ImageSourcePropType } from 'react-native';
import { infoStyles, CarruselStyles } from '../../styles/style';

import axios from 'axios';
import { SafeAreaView } from 'react-native';
import { Chip } from 'react-native-paper';

type ImageItem = {
    image: ImageSourcePropType | string,
    title: string,
    year: number,
    rating: number,
    genres: string[]
};

const MainCarousel = () => {
    const [images, setImages] = useState<ImageItem[]>([]);
    const load = async () => {
        const response = await axios.get(process.env.EXPO_PUBLIC_PATH + '/getPeliculasCarousel');
        const loadedImages: ImageItem[] = response.data.peliculas.map((pelicula: any) => ({
            image: pelicula.background,
            title: pelicula.title,
            year: Number(pelicula.year),
            rating: Number(pelicula.rating),
            genres: pelicula.genres,
        }));
        setImages(loadedImages)
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % response.data.peliculas.length);
        }, 3000);

        return () => clearInterval(interval);
    }
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
        load();
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
            <SafeAreaView style={CarruselStyles.item}>
                <ImageBackground
                    style={CarruselStyles.image}
                    source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                />
                <View style={CarruselStyles.overlay}>
                    <View style={CarruselStyles.Container}>
                        <Text style={CarruselStyles.title}>{item.title}
                            <Text style={CarruselStyles.year}> ({item.year})</Text>
                        </Text>
                    </View>
                    <Text style={CarruselStyles.stars}>{renderStars(item.rating)}</Text>
                    <View style={[infoStyles.topTextContainer, { flexWrap: 'wrap', flexDirection: 'row' }]}>
                        {item?.genres.map((genre) => (
                            <Chip style={infoStyles.genresStyle} key={genre} mode="outlined">
                                <Text style={infoStyles.genresText}>{genre}</Text>
                            </Chip>
                        ))}
                    </View>
                </View>
            </SafeAreaView>
        );
    };


    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            {images.length > 0 ? (
                <FlatList
                    ref={flatListRef}
                    data={images}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                />
            ) : (
                <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>
                    Loading...
                </Text>
            )}
        </View>
    );
};



export default MainCarousel;
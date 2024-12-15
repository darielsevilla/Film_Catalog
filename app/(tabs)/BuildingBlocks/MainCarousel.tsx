import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, View, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { ImageSourcePropType } from 'react-native';
import { infoStyles } from '../../styles/style';

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

const styles = StyleSheet.create({
    item: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        opacity: 0.7
    },
    overlay: {
        position: 'absolute',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        bottom: 0,
        width: '100%',
    },
    title: {
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold',
    },
    year: {
        marginStart: 10,
        fontSize: 18,
        color: 'white',
        marginTop: 5,
    },
    stars: {
        fontSize: 18,
        color: 'yellow',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    Container: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
});


export default MainCarousel;
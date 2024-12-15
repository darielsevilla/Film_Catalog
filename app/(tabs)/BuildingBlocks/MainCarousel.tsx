import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import { ImageSourcePropType } from 'react-native';

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
            <View style={styles.item}>
                <Image
                    source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                    style={styles.image}
                />
                <View style={styles.overlay}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.Container}>
                        <Text style={styles.year}> {item.year} </Text>
                        <Text style={styles.stars}>{renderStars(item.rating)}</Text>
                    </View>
                    <View style={styles.Container}>
                        {item.genres.map((genre, index) => (
                            <View key={index} style={styles.genreBox}>
                                <Text style={styles.genreText}>{genre}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
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
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#444',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.5,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
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
        marginLeft: 10,
        fontWeight: 'bold',
    },
    year: {
        fontSize: 18,
        color: 'white',
        marginRight: 10,
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
import { cardStyles, customStyle } from '@/app/styles/style';
import SearchCard from '../BuildingBlocks/searchCard';
//import { loadedMovies } from '../data/data';
import { View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { Icon, MD3Colors } from 'react-native-paper';
import { Image, StyleSheet, Platform, ScrollView } from 'react-native';
import { useEffect, useState, useContext } from 'react'
import { Button } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { TextInput, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoviesContext } from '@/context/MoviesContext';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
const MyComponent = (search: string) => {
    //use States necesarios

    interface movies {
        id: string,
        title: string,
        poster_path: string,
        release_date: string,
        vote_average: string
    }
    const [searching, setSearching] = useState(false);
    const navigation = useNavigation();
    const [list, setList] = useState<movies[]>([]);
    const { favorites, setFavorites } = useContext(MoviesContext);
    const [mainSearch, setMainSearch] = useState(false);

    const loadLists = async () => {
        setMainSearch(true);
        const movies = await AsyncStorage.getItem("loadedFilms");

        const tempoList: Record<string, movies[]> = JSON.parse(movies ? movies : "[]");

        const formList = [] as movies[];

        for (let [item, movies] of Object.entries(tempoList)) {
            const listCategory = movies.filter(movie =>
                movie.title.toLowerCase().includes(search.toLowerCase()))

            for (let item2 of listCategory) {
                if (!formList.find(repeat => repeat.id == item2.id)) {
                    formList.push(item2)
                }
            }
        }

        const filterFav = favorites.filter((movie: any) => movie.title.toLowerCase().includes(search.toLowerCase()))
        for (let item2 of filterFav) {

            if (!formList.find(repeat => repeat.id == item2.id)) {
                formList.push(item2)
            }
        }
        setList(formList);
        setMainSearch(false);
        //setFavorites(favList);
    }
    useEffect(() => {
        loadLists();
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadLists();
        }, [])
    );
    //metodos de botones
    const _goBack = () => { navigation.goBack() };

    const _handleSearch = () => console.log('Searching');

    const searchOptions = async () => {
        setSearching(true);

        try {
            let url = process.env.EXPO_PUBLIC_PATH + '/Search';
            const id = await AsyncStorage.getItem("id");
            const text = search;

            const headers = {
                params: {
                    userid: id,
                    text: search
                }
            }

            const response = await axios.get(url, headers);
            const pelisExtra = response.data.peliculas;

            const peliculasMapeadas = pelisExtra.filter((peli: any) => !favorites.includes(peli.id)).map((peli: any) => ({
                id: peli.id,
                title: peli.title,
                release_date: peli.year,
                vote_average: peli.rating,
                poster_path: peli.poster == "https://image.tmdb.org/t/p/w500null" ? "https://www.reelviews.net/resources/img/default_poster.jpg" : peli.poster
            }))
            const favoritosEncontrados = favorites.filter((fav: any) =>
                fav.name && fav.name.toLowerCase().includes(search.toLowerCase())
            );
            setList([...favoritosEncontrados, ...peliculasMapeadas])
        } catch (error) {

        }
        setSearching(false);
    }

    const load = () => {
        if (list.length > 0) {
            return (
                <>
                    {list.map((movie, i) => (i == 0) ? <View key={movie.id} >
                        <SearchCard name={movie.title} img={movie.poster_path} id={Number(movie.id)} review={Number(movie.vote_average)} year={Number(movie.release_date)}></SearchCard>
                    </View> :
                        <View key={movie.id} >
                            <Divider horizontalInset={true} />
                            <SearchCard name={movie.title} img={movie.poster_path} id={Number(movie.id)} review={Number(movie.vote_average)} year={Number(movie.release_date)}></SearchCard>
                        </View>)
                    }

                    < View style={cardStyles.moreButton} >
                        {!searching ? <Button icon="magnify-plus-outline" buttonColor="#7f7f7f" mode="contained" onPress={searchOptions}>
                            Search More
                        </Button> : <ActivityIndicator animating={true} color={MD2Colors.white} />
                        }
                    </View >
                </>
            );
        } else {
            return (<>
                <View style={cardStyles.moreButton}>
                    <Image
                        source={require('../../../assets/images/alerta.png')}
                        style={cardStyles.notFoundIcon}
                    />
                    <Text style={cardStyles.textCenter} variant="labelSmall">No loaded movies matched</Text>
                </View>

                <View style={cardStyles.moreButton}>
                    {!searching ? <Button icon="magnify-plus-outline" buttonColor="#7f7f7f" mode="contained" onPress={searchOptions}>
                        Search More
                    </Button> : <ActivityIndicator animating={true} color={MD2Colors.white} size={'large'} />}
                </View>
            </>);
        }

    }



    const TopBar = () => {
        return (
            <Appbar.Header style={customStyle.backgroundNormal}>
                <Appbar.BackAction color={"white"} onPress={_goBack} />
                <Appbar.Content title={search} color={"white"} onPress={_goBack}
                />
                <Appbar.Action icon="magnify" color={"white"} onPress={_goBack} />

            </Appbar.Header>
        );
    }
    return (
        <>
            {TopBar()}

            {mainSearch ? <ActivityIndicator animating={true} color={MD2Colors.white} size={'large'} /> : load()}
        </>
    );
};



interface SearchString {
    search: string
}
export default function SearchResults({ route }: { route: { params: SearchString } }) {
    const { search } = route.params;
    return (
        <ScrollView style={customStyle.containerInfo}>
            {MyComponent(search)}
        </ScrollView>
    )

}

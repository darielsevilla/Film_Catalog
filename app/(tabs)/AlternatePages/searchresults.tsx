import { cardStyles, customStyle } from '@/app/styles/style';
import SearchCard from '../BuildingBlocks/searchCard';
//import { loadedMovies } from '../data/data';
import { View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { Icon, MD3Colors } from 'react-native-paper';
import { Image, StyleSheet, Platform} from 'react-native';
import {useEffect, useState, useContext } from 'react'
import { Button } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { TextInput, SafeAreaView} from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoviesContext } from '@/context/MoviesContext';

const MyComponent = (search: string) => {
    //use States necesarios

    interface movies{
        id: string,
        title: string,
        poster_path: string,
        release_date: string,
        vote_average: string
    }

    const navigation = useNavigation();
    const [list, setList] = useState<movies[]>([]);
    const {favorites, setFavorites} = useContext(MoviesContext);

    const loadLists = async () =>{
       
        const movies = await AsyncStorage.getItem("loadedFilms");
      
        const tempoList: Record<string, movies[]> =JSON.parse(movies?movies:"[]");

        const formList = [] as movies[];
      
        
        for(let [item, movies] of Object.entries(tempoList)){
            const listCategory = movies.filter(movie => 
                movie.title.toLowerCase().includes(search.toLowerCase()))
            
            for(let item2 of listCategory){
                if(!formList.find(repeat=>repeat.id == item2.id)){
                    formList.push(item2)
                }
            }
        }

        const filterFav = favorites.filter((movie:any) => movie.title.toLowerCase().includes(search.toLowerCase()))
            for(let item2 of filterFav){
                if(!formList.find(repeat=>repeat.id == item2.id)){
                    formList.push(item2)
                }
            }
        setList(formList);
        //setFavorites(favList);
    }
    useEffect(()=>{
        loadLists();
    },[]);

    //metodos de botones
    const _goBack = () => {navigation.goBack()};
  
    const _handleSearch = () => console.log('Searching');
  
   
    
    const load =  () => {
    
        
        /*const filteredMovies = loadedMovies.movies.filter(movie => 
            movie.name.toLowerCase().includes(search.toLowerCase())
          );*/
        if(list.length > 0){
            return(<>
                {list.map((movie, i)=>(i==0)?<View key ={movie.id} >
                        <SearchCard name={movie.title} img = {movie.poster_path} id={Number(movie.id)} review={Number(movie.vote_average)} year={2024}></SearchCard>
                    </View>:
                <View key ={movie.id} >
                    <Divider horizontalInset = {true} />
                    <SearchCard name={movie.title} img = {movie.poster_path} id={Number(movie.id)} review={Number(movie.vote_average)} year={2024}></SearchCard>
                </View>)}

                <View style={cardStyles.moreButton}>
                    <Button icon="magnify-plus-outline"  buttonColor= "#7f7f7f" mode="contained" onPress={() => console.log('Pressed')}>
                        Buscar Mas
                    </Button>
                </View>
                </>);
        }else{
            return(<>
                <View style={cardStyles.moreButton}>
                    <Image
                    source={require('@/assets/customImages/warning-not-found.png')}
                    style={cardStyles.notFoundIcon}
                    />
                    <Text style = {cardStyles.textCenter} variant="labelSmall">No pudimos encontrar la pelicula que busca</Text>
                </View>

                <View style={cardStyles.moreButton}>
                    <Button icon="magnify-plus-outline"  buttonColor= "#7f7f7f" mode="contained" onPress={() => console.log('Pressed')}>
                        Buscar Mas
                    </Button>
                </View>
            </>);
        }
        
    }

    const searchOptions = () =>{

    }
  
    const TopBar = () =>{
        return(<>
            <Appbar.Header style={customStyle.backgroundNormal}>
            <Appbar.BackAction color={"white"} onPress={_goBack} />
            <Appbar.Content title={search} color={"white"} onPress={_goBack}
            /> 
            <Appbar.Action icon="magnify"color={"white"} onPress={_handleSearch} />

          </Appbar.Header></>);
    }
    return(
        <>
        {TopBar()}

      {load()}
        
      </>
    );
  };



interface SearchString{
    search: string
}
export default function SearchResults({ route }: { route: { params: SearchString } }){
    const { search } = route.params;
    return(<>
         <SafeAreaView style = {customStyle.containerInfo}>
            {MyComponent(search)}
        </SafeAreaView>

    </>)
    
}

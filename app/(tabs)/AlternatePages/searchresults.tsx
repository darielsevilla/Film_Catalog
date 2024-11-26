import { cardStyles } from '@/app/styles/style';
import SearchCard from '../BuildingBlocks/searchCard';
import { loadedMovies } from '../data/data';
import { View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { Icon, MD3Colors } from 'react-native-paper';
import { Image, StyleSheet, Platform } from 'react-native';
import {useEffect, useState} from 'react'
import { Button } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
const MyComponent = (search: string) => {
    //use States necesarios
    const navigation = useNavigation();
    
    
    useEffect(()=>{
  
    },[]);

    //metodos de botones
    const _goBack = () => {navigation.goBack()};
  
    const _handleSearch = () => console.log('Searching');
  
   
    
    const load = () => {
        const filteredMovies = loadedMovies.movies.filter(movie => 
            movie.name.toLowerCase().includes(search.toLowerCase())
          );
        if(filteredMovies.length > 0){
            return(<>
                {filteredMovies.map((movie, i)=>(i==0)?<View key ={movie.id} >
                        <SearchCard name={movie.name} img = {movie.poster} id={movie.id} review={movie.rating} year={movie.year}></SearchCard>
                    </View>:
                <View key ={movie.id} >
                    <Divider horizontalInset = {true} />
                    <SearchCard name={movie.name} img = {movie.poster} id={movie.id} review={movie.rating} year={movie.year}></SearchCard>
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
        return(<><Appbar.Header>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Content title={search} onPress={_goBack}
            /> 
            <Appbar.Action icon="magnify" onPress={_handleSearch} />

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
        {MyComponent(search)}

    </>)
    
}

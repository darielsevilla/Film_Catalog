import * as React from 'react';
import { Card, Button } from 'react-native-paper';
import { cardStyles } from '../../styles/style';
import {Image, StyleSheet} from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useState, useEffect, useContext } from 'react';
import { userInfo } from '../data/data';
import { TouchableOpacity } from 'react-native';
import { MoviesContext } from '@/context/MoviesContext';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
interface info{
    name: string,
    img: string,
    id: number,
    review: number,
    year : number
}
interface movies{
    id: string,
    title: string,
    poster_path: string,
    release_date: string,
    vote_average: string
}
export default function SearchCard({name,img,id,review, year}:info){
    const [favorite, setFavorite] = useState(0);
    const {favorites, setFavorites} = useContext(MoviesContext);
    const addFavorite = async () => {
        try{
            const user_id = await AsyncStorage.getItem("id")
          
            const config = {
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin' : '*'
                }
            }

            const body = {
                movie: id,
                user: user_id
            }
          
            const response = axios.post(process.env.EXPO_PUBLIC_PATH + "/agregarFavorito", body, config).then((responsePost)=>{
                if(responsePost.status == 202){
                    //se agregó a favoritos 
                    setFavorite(1);
                    setFavorites([...favorites, {id: String(id), title: name, poster_path:img, release_date: String(year), vote_average: String(review)}])
                    AsyncStorage.setItem("favorites", JSON.stringify(favorites));
                    
                }
                }
            ).catch((error) => { console.error(error)});
        }catch(error){
            console.log(error)
        }
    };
    const removeFavorite = async () => {
     
        const user_id = await AsyncStorage.getItem("id") 
        console.log(user_id)
        const headers = {
            params: {
                movie: id,
                user: user_id
            }
            
        }
        const response = axios.delete(process.env.EXPO_PUBLIC_PATH + "/eliminarFavorito", headers).then((responsePost)=>{
            if(responsePost.status == 202){
                //se eliminó a favoritos 
                setFavorite(0);
                setFavorites(favorites.filter(movie => movie.id !== String(id)));
                AsyncStorage.setItem("favorites", JSON.stringify(favorites));
            }
        });
    };

    const click = () =>{
        console.log("print")
    }

    const load = async () =>{
        const moviesFavoritos = await AsyncStorage.getItem("favorites")
        const favList = JSON.parse(JSON.parse(moviesFavoritos?moviesFavoritos:"{}"))
        setFavorites(favList)
    }
    useEffect(()=>{
        //load();
        
        if(favorites.find((item : any)=>item.id == String(id))){
            setFavorite(1);
        }
    },[]);

    return(<>
        <TouchableOpacity onPress={click}> 
        <Card elevation={0} style={cardStyles.searchcard}>
            <Card.Content  style={cardStyles.searchCardFlex}>

                {/*Movie Poster */}
                <Image
                    style={cardStyles.searchCardLogo}
                    source={{
                    uri: img,
                    }}
                />
                
                {/*Movie Info */}
                
                <View style={cardStyles.sideContainer}>
                    <View style={cardStyles.textContainer}>
                        <Text variant="titleMedium"  style={cardStyles.titleTextColor}>{name}</Text>
                        <Text style={cardStyles.subtitleTextColor} variant= "titleSmall">{year != 0? year : 'N/A'}, rating: {review}</Text>
                    </View>
                    
                    {(favorite == 0) ?( <Button key="notFavorite" icon="plus" mode="contained" buttonColor='#6745b8' onPress={addFavorite}>
                        Favorite
                    </Button>):(<Button key="favorite" icon="check" mode="contained" buttonColor='#b701c2' onPress={removeFavorite}>
                        Remove favorite
                    </Button>)}    
                </View>
                
            </Card.Content>
        </Card>
        </TouchableOpacity>
    </>);
}
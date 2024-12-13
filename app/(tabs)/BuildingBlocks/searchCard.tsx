import * as React from 'react';
import { Card, Button } from 'react-native-paper';
import { cardStyles } from '../../styles/style';
import {Image, StyleSheet} from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { userInfo } from '../data/data';
import { TouchableOpacity } from 'react-native';
import { useNavigation,  NavigationProp } from '@react-navigation/native';
type RootStackParamList = {
    InfoPage: {movieId : number};
  };
type InfoProp = NavigationProp<RootStackParamList, 'InfoPage'>;
interface info{
    name: string,
    img: string,
    id: number,
    review: number,
    year : number
}
export default function SearchCard({name,img,id,review, year}:info){
    const [favorite, setFavorite] = useState(0);
    const navigation = useNavigation<InfoProp>();
    const addFavorite = () => {setFavorite(1)};
    const removeFavorite = () => {setFavorite(0)};
    const click = () =>{
        navigation.navigate('InfoPage', {movieId : id});
    }
    useEffect(()=>{
        if(userInfo.favoritos.includes(id)){
                setFavorite(1);
        }else{
            setFavorite(0);
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
                        <Text variant="titleMedium">{name}</Text>
                        <Text style={cardStyles.subtitleTextColor} variant= "titleSmall">{year}, puntaje promedio: {review}%</Text>
                    </View>
                    
                    {(favorite == 0) ?( <Button key="notFavorite" icon="plus" mode="contained" buttonColor='#ee3838' onPress={addFavorite}>
                        Favorito
                    </Button>):(<Button key="favorite" icon="check" mode="contained" buttonColor='#7f7f7f' onPress={removeFavorite}>
                        Quitar favorito
                    </Button>)}    
                </View>
                
            </Card.Content>
        </Card>
        </TouchableOpacity>
    </>);
}
import * as React from 'react';
import { Card, Button } from 'react-native-paper';
import { cardStyles } from '../../styles/style';
import {Image, StyleSheet} from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { userInfo } from '../data/data';

interface info{
    name: string,
    img: string,
    id: number,
    review: number
}
export default function SearchCard({name,img,id,review}:info){
    const [favorite, setFavorite] = useState(0);
    
    const addFavorite = () => {setFavorite(1)};
    const removeFavorite = () => {setFavorite(0)};

    useEffect(()=>{
        if(userInfo.favoritos.includes(id)){
                setFavorite(1);
        }else{
            setFavorite(0);
        }
    },[]);

    return(<>
        <Card elevation={0} style={cardStyles.searchcard}>
            <Card.Content  style={cardStyles.searchCardFlex}>

                {/*Movie Poster */}
                <Image
                    style={cardStyles.searchCardLogo}
                    source={{
                    uri: 'https://image.tmdb.org/t/p/w500/ldugBX89jCQA9RRwfzRgX0gNpBc.jpg',
                    }}
                />
                
                {/*Movie Info */}
                
                <View style={cardStyles.sideContainer}>
                    <View style={cardStyles.textContainer}>
                        <Text variant="titleMedium">Dune</Text>
                        <Text style={cardStyles.subtitleTextColor} variant= "titleSmall">2020, puntaje promedio: 62%</Text>
                    </View>
                    
                    {(favorite == 0) ?( <Button key="notFavorite" icon="plus" mode="contained" buttonColor='#ee3838' onPress={addFavorite}>
                        Favorito
                    </Button>):(<Button key="favorite" icon="check" mode="contained" buttonColor='#7f7f7f' onPress={removeFavorite}>
                        Quitar favorito
                    </Button>)}    
                </View>
                
            </Card.Content>
        </Card>
    </>);
}
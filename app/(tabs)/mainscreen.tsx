import AsyncStorage from "@react-native-async-storage/async-storage";
import SmallCard from "./BuildingBlocks/smallCard";
import {Text} from 'react-native-paper'
export default function MainScreen(){
    //variables almacenadas en asyncstorage

    //vas a cargar las peliculas totales, y las vas a almacenar en un array y en asyncstorage asi (asyncstorage es practicamente localhost):
    //AsyncStorage.setItem("movies", JSON.stringify(array)) 
    //ya cuando las separes en categorias en BuildingBlocks esta el tsx SmallCard para que hagas la carta mas pequeña, solo le pones parametros como en el examen
  
    return(
        <>
            <Text variant="labelSmall">hola</Text>
            <SmallCard></SmallCard>
        </>
    );
    
}
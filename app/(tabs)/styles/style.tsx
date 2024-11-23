import { StyleSheet } from "react-native"
import { SearchBar } from "react-native-screens"
import { Dimensions } from 'react-native';


const screen = Dimensions.get('window')

export const customStyle = StyleSheet.create({
    top:{
        display: 'flex',
        flexDirection:'row',
        marginTop:24,
        margin: 10,
        justifyContent:'center'
    },
    bar:{
        width: screen.width*0.75,
        marginRight: 10
    },
    background:{
        backgroundColor:'gray',
        color:'white'
    }
    
 })
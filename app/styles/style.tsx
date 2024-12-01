import { StyleSheet } from "react-native"
import { SearchBar } from "react-native-screens"
import { Dimensions } from 'react-native';
import { orange100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";


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

export const cardStyles = StyleSheet.create({
    searchcard:{
        elevation: 0,
        margin: 5,
        display:'flex',
        justifyContent:'space-between',
        fontFamily: 'Roboto'
    },
    searchCardLogo:{

        width: '30%',
        aspectRatio: 2 / 3,
        resizeMode: 'contain',   
        borderRadius: 10
    },
    searchCardFlex:{
        display: 'flex',
        flexDirection: 'row',
        gap:10,
    },
    sideContainer: {
       marginTop: 20,
       marginBottom: 20,
       flexDirection: 'column',
       flex: 1,
       fontFamily: 'Roboto',
    },
    subtitleTextColor:{
        color:'gray'
    },
    maxHeight: {
        height: '100%'
    },
    textContainer:{
       flex: 0.9        
    },
    moreButton:{
        marginLeft:  '10%',
        marginRight: '10%'
    },
    notFoundIcon:{
        width: '100%',
        resizeMode: 'contain',
    },
    textCenter:{
        textAlign:'center'
    }
})

export const infoStyles = StyleSheet.create({
    backgroundImg : {
        height: '30%',
        width: '100%',
        opacity: 0.7,
        resizeMode: 'cover',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerInfo : {
        height: 'auto',
        minHeight: '100%',
        width: '100%',
        backgroundColor: '#170829',
        
    },
    border : {
        borderStyle: 'solid',
        borderColor: 'red',
        borderWidth: 10,
    },
    overlay: {
        position: 'absolute',
        top: '22%',
        left: '5%',
        right: '5%',
        color: 'white'

    },

})
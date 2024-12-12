import { StyleSheet } from "react-native"
import { SearchBar } from "react-native-screens"
import { Dimensions } from 'react-native';
import { orange100, white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const screen = Dimensions.get('window')

export const customStyle = StyleSheet.create({
    top: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 24,
        margin: 10,
        justifyContent: 'center'
    },
    bar: {
        width: screen.width * 0.75,
        marginRight: 10
    },
    background: {
        backgroundColor: 'gray',
        color: 'white'
    }

})

export const cardStyles = StyleSheet.create({
    searchcard: {
        elevation: 0,
        margin: 5,
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'Roboto'
    },
    searchCardLogo: {

        width: '30%',
        aspectRatio: 2 / 3,
        resizeMode: 'contain',
        borderRadius: 10
    },
    searchCardFlex: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    sideContainer: {
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'column',
        flex: 1,
        fontFamily: 'Roboto',
    },
    subtitleTextColor: {
        color: 'gray'
    },
    maxHeight: {
        height: '100%'
    },
    textContainer: {
        flex: 0.9
    },
    moreButton: {
        marginLeft: '10%',
        marginRight: '10%'
    },
    notFoundIcon: {
        width: '100%',
        resizeMode: 'contain',
    },
    textCenter: {
        textAlign: 'center'
    }
})

export const infoStyles = StyleSheet.create({
    topContainer: {
        width: "100%",
        minHeight: 300,
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'relative',
        padding: 20,
        marginBottom: 10,
    },
    backgroundImg: {
        opacity: 0.7,
        resizeMode: 'cover',
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute'
    },
    containerInfo: {
        flex: 1,
        width: '100%',
        backgroundColor: '#170829',
    },
    border: {
        borderStyle: 'solid',
        borderColor: 'red',
        borderWidth: 10,
    },
    overlay: {
        position: 'absolute',
        top: '23%',
        left: '5%',
        right: '5%',
        color: 'white',

    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
    },
    topTextContainer: {
        display: 'flex',
        gap: 10,
        flexDirection: 'row',

    },
    txt: {
        color: 'white',
        bottom: 5
    },
    chipStyle: {
        backgroundColor: 'transparent',
        color: 'white',
        borderColor: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start'
    },
    chipText: {

        textAlign: 'center',

        display: 'flex',
        color: 'white',

    },
})

export const movieStyles = StyleSheet.create({
    bodyContainer: {
        padding: '5%'
    },
    poster: {
        width: '40%',
        height: 250,
        borderRadius: 10,
        resizeMode: 'cover'
    },
    divisor: {
        height: 2,
        backgroundColor: '#6744b9',
        marginTop: 40,
        marginBottom: 40,
        width: '100%',
        alignSelf: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    attributesColor: {
        color: '#b1a4c2',
        fontWeight: "bold"
    },
    bodyColor: {
        color: 'white',
        paddingBottom: 5
    },
    rating: {
        width: 40,
        height: 40,
        marginBottom: 15,
    },
    ratingContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#b701c2',
        padding: 10,
        borderRadius: 10
    },
    ratingText: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 28
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20
    },
    favoriteBtn: {
        alignItems: 'center',
        backgroundColor: '#6745b8',
        paddingVertical: 10,
        paddingHorizontal: 2,
        borderRadius: 10,
        gap: 10,
        width: 120
    },
    buttonImage: {
        width: 31,
        height: 31,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titles: {
        color: 'white',
        paddingBottom: 30
    },
    text: {
        color: '#b1a4c2'
    },
    video: {
        width: '100%',
        height: 200,
    },
    adultsContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#38284c',
        padding: 10,
        borderRadius: 10
    },
    adultsText: {
        color: '#b1a4c2',
    },
    adults: {
        width: 45,
        height: 45,
        marginBottom: 10,
    },
})
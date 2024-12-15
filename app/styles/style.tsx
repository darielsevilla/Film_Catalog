import { StyleSheet } from "react-native"
import { Dimensions } from 'react-native';

const screen = Dimensions.get('window')

export const customStyle = StyleSheet.create({
    top: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 24,
        margin: 10,
        justifyContent: 'center'
    },
    marginTop: {
        marginTop: '30%'
    },
    bar: {
        width: screen.width * 0.75,
        marginRight: 10
    },
    background: {
        backgroundColor: 'gray',
        color: 'white'
    },
    containerInfo: {
        height: 'auto',
        minHeight: '100%',
        width: '100%',
        backgroundColor: '#18092a',

    },
    backgroundSearchBar: {
        backgroundColor: "#332246"
    },
    backgroundNormal: {
        backgroundColor: "#18092a"
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
    titleTextColor: {
        color: 'white'
    },
    subtitleTextColor: {
        color: '#b1a4c2'
    },
    maxHeight: {
        height: '100%'
    },
    textContainer: {
        flex: 0.9
    },
    textColor: {
        color: 'gray'
    },
    moreButton: {
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: 20
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
    rmvBtn: {
        alignItems: 'center',
        backgroundColor: '#301472',
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
        height: 230,
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

export const signUp = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(24, 9, 43, 0.5)',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    innerContainer: {
        width: '100%',
        maxWidth: 400,
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
        paddingTop: 30,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    logoTitle: {
        width: 200,
        height: 120,
        resizeMode: 'contain',
    },
    formContainer: {
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '6%',
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: 20,
        borderWidth: 0,
    },
    dialogContainer: {
        backgroundColor: 'black'
    },
    dialogText: {
        color: 'white'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: '5.5%',
        color: 'white',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 12,
        marginBottom: '8%',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    alternativeText: {
        color: 'white',
        marginTop: '6%',
        textAlign: 'center',
    },
    secondChoice: {
        color: '#b701c2',
        marginTop: '6%',
        textAlign: 'center',
    }
})

export const logIn = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '4.5%',
        borderRadius: '4%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: '5.5%',
        color: 'white',
        textAlign: 'center',
    },
    error: {
        width: '100%',
        padding: 12,
        marginBottom: '8%',
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 1
    },
    errorText: {
        color: 'red',
        marginBottom: '6%',
        textAlign: 'center',
    },
    image: {
        alignContent: 'center',
        width: 150,
        height: 150,
    },
    logoTitle: {
        width: 270,
        height: 180,
        resizeMode: 'contain',
        marginBottom: '5%'
    },
    logoContainer: {
        alignItems: 'center',
        paddingTop: '6%'
    }
})

export const OpeningStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    slogan: {
        color: 'white',
        marginTop: 20,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: '22%',
        paddingHorizontal: 5
    },
    image: {
        alignContent: 'center',
        width: 150,
        height: 150,
    },
    logoTitle: {
        width: 270,
        height: 180,
        resizeMode: 'contain',
        marginBottom: '6%'
    },
    logoContainer: {
        alignItems: 'center',
        paddingTop: '6%'
    },
    buttons: {
        width: '60%',
        marginBottom: '5%'
    }
})

export const navbarStyles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 60,
        backgroundColor: '#231139',
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    centerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        marginRight: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    searchIcon: {
        marginLeft: 10,
    },
    menuContent: {
        backgroundColor: '#333',
    },
    menu: {
        marginTop: 50,
    },
    logoutMenuItem: {
        backgroundColor: '#000',
    },
    logoutText: {
        color: 'white',
    },
})
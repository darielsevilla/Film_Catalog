import * as React from 'react';
import { ImageBackground, Image, View, Button, StyleSheet, Text } from 'react-native';

export default function LogIn() {
    return (
        <ImageBackground
            source={{ uri: 'https://okdiario.com/img/2022/03/31/filmin-esta-lleno-de-obras-maestras-del-cine.jpg' }}
            style={styles.backgroundImage}
        >
            {/* Overlay degradado morado */}
            <View style={styles.overlay}></View>

            {/* Logo y Titulo */}
            <View style={styles.logoContainer}>
                <Image source={require('../../../assets/images/Logo.png')} style={styles.image} />
                <Image source={require('../../../assets/images/Text.png')} style={styles.logoTitle} />
            </View>

            <Text style={styles.slogan}>Explora, organiza y disfruta: tu catálogo de películas perfecto.</Text>

            <View style={styles.buttons}>
                <Button title="Iniciar Sesión" color="#6745b8" onPress={() => /*navigation.navigate('LogIn')*/ { }} />
            </View>

            <View style={styles.buttons}>
                <Button title="Registrarse" color="#6745b8" onPress={() => { }} />
            </View>

        </ImageBackground >
    );
};

const styles = StyleSheet.create({
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
        alignItems: 'center',
        width: '100%',
    },
    slogan: {
        color: 'white',
        marginTop: 20,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: '22%'
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
});
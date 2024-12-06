import * as React from 'react';
import { ImageBackground, Image, View, TextInput, Button, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';

export default function LogIn({navigation}: any) {
    return (
        <ImageBackground
            source={{ uri: 'https://okdiario.com/img/2022/03/31/filmin-esta-lleno-de-obras-maestras-del-cine.jpg' }}
            style={styles.backgroundImage}
        >

            {/* Overlay degradado morado */}
            <View style={styles.overlay}></View>

            <KeyboardAvoidingView
                style={styles.container}>

                {/* Logo y Titulo */}
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/images/Logo.png')} style={styles.image} />
                    <Image source={require('../../assets/images/Text.png')} style={styles.logoTitle} />
                </View>

                {/* Contenido de login */}
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Iniciar Sesión</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Correo Electrónico"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry
                    />

                    <Button title="Iniciar Sesión" color="#6745b8" onPress={() => { }} />
                    <Text style={styles.alternativeText} onPress={() => { navigation.navigate("SignUp")}} >¿No tienes una cuenta? Da click aquí para Registrarte.</Text>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
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
});
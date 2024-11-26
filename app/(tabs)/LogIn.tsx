import * as React from 'react';
import { ImageBackground, View, TextInput, Button, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';

export default function LogIn() {
    return (
        <ImageBackground
            source={{ uri: 'https://okdiario.com/img/2022/03/31/filmin-esta-lleno-de-obras-maestras-del-cine.jpg' }}
            style={styles.backgroundImage}
        >
            <View style={styles.overlay}></View>
            <KeyboardAvoidingView
                style={styles.container}>

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
                    <Text style={styles.alternativeText}>¿No tienes una cuenta? Da click aquí para Registrarte.</Text>
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
        padding: 20,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 12,
        marginBottom: 30,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    alternativeText: {
        color: 'white',
        marginTop: 20,
        textAlign: 'center',
    }
});
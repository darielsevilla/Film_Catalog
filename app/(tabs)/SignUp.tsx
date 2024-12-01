import * as React from 'react';
import { ImageBackground, Image, View, TextInput, Button, StyleSheet, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function SignUp() {
    return (
        <ImageBackground
            source={{ uri: 'https://okdiario.com/img/2022/03/31/filmin-esta-lleno-de-obras-maestras-del-cine.jpg' }}
            style={styles.backgroundImage}
        >

            {/* Overlay degradado */}
            <View style={styles.overlay}></View>

            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.innerContainer}>
                        <View style={styles.logoContainer}>
                            <Image source={require('../../assets/images/Logo.png')} style={styles.image} />
                            <Image source={require('../../assets/images/Text.png')} style={styles.logoTitle} />
                        </View>

                        {/* Sign-Up Form */}
                        <View style={styles.formContainer}>
                            <Text style={styles.title}>Crear Cuenta</Text>

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
                            <TextInput
                                style={styles.input}
                                placeholder="Confirmar Contraseña"
                                secureTextEntry
                            />

                            <Button title="Registrarse" color="#6745b8" onPress={() => { }} />
                            <Text style={styles.alternativeText}>
                                ¿Ya tienes una cuenta? Da click aquí para Iniciar Sesión.
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
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
        paddingBottom: 40,
        paddingTop: 15,
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
    }
});

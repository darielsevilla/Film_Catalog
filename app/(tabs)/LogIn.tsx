import * as React from 'react';
import { ImageBackground, Image, View, TextInput, Button, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogIn({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(0);
    const updateEmail = (value: string) => {
        if (error != 0) {
            setError(0);
        }
        setEmail(value);
    }
    const updatePassword = (value: string) => {
        if (error != 0) {
            setError(0);
        }
        setPassword(value);
    }
    const errorMessage = () => {
        if (error == 2) {
            return (<Text style={styles.errorText}>Llene todos los campos</Text>)
        } else if (error == 1) {
            return (<Text style={styles.errorText}>Correo y/o contraseña incorrecta</Text>)
        } else {
            return (<></>);
        }
    }
    const login = async () => {
        try {
            const url = process.env.EXPO_PUBLIC_PATH + '/IniciarSesion';
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*'
                }
            }
            const body = {
                correo: email,
                contrasena: password
            }
            const response = await axios.post(url, body, config);

            //variables almacenadas en asyncstorage
            AsyncStorage.setItem("name", response.data.user.nombre);
            AsyncStorage.setItem("lastName", response.data.user.apellido);
            AsyncStorage.setItem("email", response.data.user.correo);
            navigation.navigate("MainScreen")
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status == 400) {
                        setError(1);
                    } else {
                        setError(2);
                    }
                } else {
                    setError(2);
                }
            } else {
                await setError(2);
            }

        }
    }

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
                        style={error == 0 ? styles.input : styles.error}
                        placeholder="Correo Electrónico"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={updateEmail}
                    />
                    <TextInput
                        style={error == 0 ? styles.input : styles.error}
                        placeholder="Contraseña"
                        secureTextEntry
                        value={password}
                        onChangeText={updatePassword}
                    />
                    {errorMessage()}
                    <Button title="Iniciar Sesión" color="#6745b8" onPress={login} />
                    <Text style={styles.alternativeText} onPress={() => { navigation.navigate("SignUp") }} >¿No tienes una cuenta? Da click aquí para Registrarte.</Text>
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
    input: {
        width: '100%',
        padding: 12,
        marginBottom: '8%',
        backgroundColor: 'white',
        borderRadius: 5,
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
    alternativeText: {
        color: 'white',
        marginTop: '6%',
        textAlign: 'center',
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
});
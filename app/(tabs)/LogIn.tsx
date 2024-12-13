import * as React from 'react';
import { ImageBackground, Image, View, TextInput, Button, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signUp, logIn } from '../styles/style';

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
            return (<Text style={logIn.errorText}>Fill in all fields.</Text>)
        } else if (error == 1) {
            return (<Text style={logIn.errorText}>Incorrect email and/or password.</Text>)
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
            style={signUp.backgroundImage}
        >

            {/* Overlay degradado morado */}
            <View style={signUp.overlay}></View>

            <KeyboardAvoidingView
                style={logIn.container}>

                {/* Logo y Titulo */}
                <View style={logIn.logoContainer}>
                    <Image source={require('../../assets/images/Logo.png')} style={logIn.image} />
                    <Image source={require('../../assets/images/Text.png')} style={logIn.logoTitle} />
                </View>

                {/* Contenido de login */}
                <View style={logIn.formContainer}>
                    <Text style={logIn.title}>Log In</Text>

                    <TextInput
                        style={error == 0 ? signUp.input : logIn.error}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={updateEmail}
                    />
                    <TextInput
                        style={error == 0 ? signUp.input : logIn.error}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={updatePassword}
                    />
                    {errorMessage()}
                    <Button title="Log In" color="#6745b8" onPress={login} />
                    <Text style={signUp.secondChoice} onPress={() => { navigation.navigate("SignUp") }} >
                        <Text style={signUp.alternativeText}>Don't have an account?</Text> Sign Up.</Text>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({

});
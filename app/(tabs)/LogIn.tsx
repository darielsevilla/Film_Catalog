import * as React from 'react';
import { ImageBackground, Image, View, TextInput, Button, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoviesContext } from '@/context/MoviesContext';
import { useEffect } from 'react';
import { signUp, logIn } from '../styles/style';

export default function LogIn({navigation}: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {favorites, setFavorites} = useContext(MoviesContext)
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
            AsyncStorage.setItem("id", response.data.user._id)
            
        
            //posiblemente requira mover todo esto al apartado de la mainscreen
            const url2 = process.env.EXPO_PUBLIC_PATH + '/getPeliculasPorCategoria';
            const headers = {
                params : {
                    categorias: "878,28,18,99,16"
                }
            }
            //carga la lista de peliculas
            const response2 = await axios.get(url2, headers);
            //console.log(response2.data.data)
            AsyncStorage.setItem("loadedFilms", JSON.stringify(response2.data.data));
           
            const headers2 = {
                params : {
                    user: response.data.user._id
                }
            }
            const urlFavorites = process.env.EXPO_PUBLIC_PATH + '/getFavoritos';
            const responseFavorite = await axios.get(urlFavorites, headers2)

            //console.log(responseFavorite.data.resultado)
            AsyncStorage.setItem("favorites", JSON.stringify(responseFavorite.data.resultado));
            await setFavorites(responseFavorite.data.resultado)
            
            //conseguir busquedas
            const urlsearches = process.env.EXPO_PUBLIC_PATH + '/History'
            
            const responseSearches = await axios.get(urlsearches, headers2);
            const listQueries = responseSearches.data.historial
            
           await AsyncStorage.setItem("searches", JSON.stringify(listQueries));
            //console.log(favorites)
                
            navigation.navigate("SearchingScreen")
        }catch(error : unknown){
            console.log(error)
            if(axios.isAxiosError(error)){
                if(error.response){
                    if(error.response.status == 401){
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

    const saveQueries = async () =>{
        const id = await AsyncStorage.getItem("id");
        const item = await AsyncStorage.getItem("searches")
        if(id && item){
            try{
                
                const list2 = item ? JSON.parse(item) : [];
                const body={
                    user: id,
                    mensajes: list2
                }

                const config = {
                    headers: {
                        'Content-Type' : 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin' : '*'
                    }
                }
    
                if(list2.length != 0 && list2.at(0).textoBuscado != null){
                    const response = await axios.post(process.env.EXPO_PUBLIC_PATH+'/updateHistorial',body, config)
            
                }
            }catch(error){

            }
        }
    }
    useEffect(()=>{
        saveQueries();
    })
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
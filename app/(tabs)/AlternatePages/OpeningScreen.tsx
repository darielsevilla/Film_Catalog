import * as React from 'react';
import { ImageBackground, Image, View, Button, StyleSheet, Text } from 'react-native';
import { signUp, logIn, OpeningStyle } from '../../styles/style';

export default function OpeningS({ navigation }: any) {
    return (
        <ImageBackground
            source={{ uri: 'https://okdiario.com/img/2022/03/31/filmin-esta-lleno-de-obras-maestras-del-cine.jpg' }}
            style={signUp.backgroundImage}
        >
            {/* Overlay degradado morado */}
            <View style={signUp.overlay}></View>

            {/* Logo y Titulo */}
            <View style={logIn.logoContainer}>
                <Image source={require('../../../assets/images/Logo.png')} style={OpeningStyle.image} />
                <Image source={require('../../../assets/images/Text.png')} style={OpeningStyle.logoTitle} />
            </View>

            <Text style={OpeningStyle.slogan}>Explore, organize and enjoy: your perfect movie catalog.</Text>

            <View style={OpeningStyle.buttons}>
                <Button title="Log In" color="#6745b8" onPress={() => { navigation.navigate("LogIn") }} />
            </View>

            <View style={OpeningStyle.buttons}>
                <Button title="Sign Up" color="#6745b8" onPress={() => { navigation.navigate("SignUp") }} />
            </View>

        </ImageBackground >
    );
};

const styles = StyleSheet.create({

});
import * as React from 'react';
import { ImageBackground, Image, View, TextInput, Button, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';

export default function LogIn() {
    return (
        <ImageBackground
            source={{ uri: 'https://okdiario.com/img/2022/03/31/filmin-esta-lleno-de-obras-maestras-del-cine.jpg' }}
            style={styles.backgroundImage}
        >

            {/* Overlay degradado morado */}
            <View style={styles.overlay}></View>
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
    }
});
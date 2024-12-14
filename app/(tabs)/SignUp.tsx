import * as React from 'react';
import { ImageBackground, Image, View, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Dialog, Portal, PaperProvider, Text } from 'react-native-paper';
import axios from "axios"
import { useState } from 'react'
import { signUp } from '../styles/style';

export default function SignUp({ navigation }: any) {
    //useStates para los campos
    const [nombre, setNombre] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [checkpassword, setCheckPassword] = useState("");

    //const validation
    const [message, setMessage] = useState("");
    const [validation, setValidation] = useState(false)
    const showDialog = () => { setValidation(true) }
    const hideDialog = () => { setValidation(false) }

    const dialogInvalid = () => {
        return (
            <Portal >
                <Dialog visible={validation} onDismiss={hideDialog} style={signUp.dialogContainer}>
                    <Dialog.Title style={signUp.dialogText}>Error</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium" style={signUp.dialogText}>{message}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button title="  OK  " color="#6745b8" onPress={hideDialog} />
                    </Dialog.Actions>
                </Dialog>
            </Portal>);
    }
    const [created, setCreated] = useState(false);
    const signup = async () => {
        try {

            const url = process.env.EXPO_PUBLIC_PATH + '/crearUsuario';
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*'
                }
            }
            const body = {
                nombre: nombre,
                contrasena: contrasena,
                apellido: apellido,
                checkcontrasena: checkpassword,
                correo: correo
            }
            const response = await axios.post(url, body, config);
            if (response.status != 200) {
                await setMessage(response.data.message);
                showDialog();
            } else {
                setCreated(true);
            }

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status == 400) {
                        await setMessage("Please fill in all fields.");
                    } else if (error.response.status == 402) {
                        await setMessage("Both password fields must be the same.");
                    } else if (error.response.status == 405) {
                        await setMessage("Please enter a valid email format.");
                    } else if (error.response.status == 406) {
                        await setMessage("Email already in use.");
                    } else {
                        await setMessage("The account could not be created. Please try again.");
                    }
                } else {
                    await setMessage("An error occurred. Please try again.");
                }
            } else {
                await setMessage("An error occurred. Please try again.");
            }
            console.log(error)
            showDialog();
        }

    }

    const back = () => {

    }
    const content = () => {
        if (!created) {
            return (<>
                <Text style={signUp.title}>Sign Up</Text>
                <TextInput
                    style={signUp.input}
                    placeholder="First Name"
                    keyboardType="default"
                    value={nombre}
                    onChangeText={setNombre}
                />
                <TextInput
                    style={signUp.input}
                    placeholder="Last Name"
                    keyboardType="default"
                    value={apellido}
                    onChangeText={setApellido}

                />
                <TextInput
                    style={signUp.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={correo}
                    onChangeText={setCorreo}
                />
                <TextInput
                    style={signUp.input}
                    placeholder="Password"
                    secureTextEntry
                    value={contrasena}
                    onChangeText={setContrasena}

                />
                <TextInput
                    style={signUp.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={checkpassword}
                    onChangeText={setCheckPassword}
                />

                <Button title="Sign Up" color="#6745b8" onPress={signup} />
                <Text style={signUp.secondChoice} onPress={() => { navigation.navigate("LogIn") }}>
                    <Text style={signUp.alternativeText}>¿Already have an account?</Text> Log in.
                </Text>
            </>);
        } else {
            return (<><Text style={signUp.title}>Account successfully created!</Text>
                <Button title="Log In" color="#6745b8" onPress={() => { navigation.navigate("OpeningScreen") }} />
                <Text style={signUp.alternativeText}>
                    Return to Login
                </Text>

            </>);
        }
    }

    return (
        <PaperProvider>
            <ImageBackground
                source={{ uri: 'https://okdiario.com/img/2022/03/31/filmin-esta-lleno-de-obras-maestras-del-cine.jpg' }}
                style={signUp.backgroundImage}
            >
                {/* Overlay degradado */}
                <View style={signUp.overlay}></View>

                <KeyboardAvoidingView
                    style={signUp.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={signUp.innerContainer}>
                            <View style={signUp.logoContainer}>
                                <Image source={require('../../assets/images/Logo.png')} style={signUp.image} />
                                <Image source={require('../../assets/images/Text.png')} style={signUp.logoTitle} />
                            </View>

                            {/* Sign-Up Form */}
                            <View style={signUp.formContainer}>
                                {content()}
                                {dialogInvalid()}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ImageBackground>
        </PaperProvider>
    );
};
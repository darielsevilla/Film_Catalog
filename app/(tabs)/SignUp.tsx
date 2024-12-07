import * as React from 'react';
import { ImageBackground, Image, View, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Dialog, Portal, PaperProvider, Text } from 'react-native-paper';
import axios from "axios"
import { useState } from 'react'

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
                <Dialog visible={validation} onDismiss={hideDialog} style={styles.dialogContainer}>
                    <Dialog.Title style={styles.dialogText}>Error</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium" style={styles.dialogText}>{message}</Text>
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
                        await setMessage("Ingrese todos los campos");
                    } else if (error.response.status == 402) {
                        await setMessage("Los dos campos de contraseña deben ser iguales");
                    } else if (error.response.status == 405) {
                        await setMessage("Ingrese un formato valido de correo");
                    } else if (error.response.status == 406) {
                        await setMessage("Ese correo ya tiene una cuenta registrada");
                    } else {
                        await setMessage("No se pudo crear la cuenta. Intente de nuevo");
                    }
                } else {
                    await setMessage("Ocurrio un error. Intente de nuevo");
                }
            } else {
                await setMessage("Ocurrio un error. Intente de nuevo");
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
                <Text style={styles.title}>Crear Cuenta</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    keyboardType="default"
                    value={nombre}
                    onChangeText={setNombre}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Apellido"
                    keyboardType="default"
                    value={apellido}
                    onChangeText={setApellido}

                />
                <TextInput
                    style={styles.input}
                    placeholder="Correo Electrónico"
                    keyboardType="email-address"
                    value={correo}
                    onChangeText={setCorreo}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry
                    value={contrasena}
                    onChangeText={setContrasena}

                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar Contraseña"
                    secureTextEntry
                    value={checkpassword}
                    onChangeText={setCheckPassword}
                />

                <Button title="Registrarse" color="#6745b8" onPress={signup} />
                <Text style={styles.alternativeText} onPress={() => { navigation.navigate("LogIn") }}>
                    ¿Ya tienes una cuenta? Presiona aquí para Iniciar Sesión.
                </Text>
            </>);
        } else {
            return (<><Text style={styles.title}>¡Cuenta creada con éxito!</Text>
                <Button title="Iniciar Sesión" color="#6745b8" onPress={() => { navigation.navigate("OpeningScreen") }} />
                <Text style={styles.alternativeText}>
                    Regresar a Iniciar Sesión
                </Text>

            </>);
        }
    }

    return (
        <PaperProvider>
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
        paddingBottom: 20,
        paddingTop: 30,
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
    dialogContainer: {
        backgroundColor: 'black'
    },
    dialogText: {
        color: 'white'
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

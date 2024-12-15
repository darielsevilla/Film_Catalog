import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Avatar, IconButton, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
    const [visible, setVisible] = useState(false); // Estado para mostrar/ocultar el menú
    const navigation = useNavigation();

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleLogout = () => {
        closeMenu();
        console.log('Logout pressed'); // Aquí puedes redirigir a la pantalla de login o limpiar el estado
    };

    return (
        <View style={styles.navbar}>
            {/* Logo de la aplicación a la izquierda */}
            <Image
                source={require('../../../assets/images/Logo02.png')}
                style={styles.logo}
            />

            {/* Contenido del Navbar */}
            <View style={styles.centerContent}>
                {/* Ícono de búsqueda */}
                <IconButton
                    icon="magnify"
                    size={28}
                    iconColor="white"
                    onPress={() => console.log('Search pressed')}
                    style={styles.searchIcon}
                />

                {/* Menú desplegable */}
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <View style={styles.userContainer} onTouchStart={openMenu}>
                            <Text style={styles.userName}>Nombre Apellido</Text>
                            <Avatar.Image
                                size={40}
                                source={require('../../../assets/images/Logo.png')}
                            />
                        </View>
                    }
                    contentStyle={styles.menuContent}
                    style={styles.menu}
                >
                    <Menu.Item
                        onPress={handleLogout}
                        title="Logout"
                        leadingIcon="logout" // Ícono de logout
                        style={styles.logoutMenuItem} // Estilo personalizado para el item de logout
                        titleStyle={styles.logoutText} // Estilo para el texto
                    //iconColor="white" // Color del ícono
                    />
                </Menu>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 60,
        backgroundColor: '#000000', // Color de fondo del navbar
        elevation: 4, // Para sombra en Android
        shadowColor: '#000', // Para sombra en iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    logo: {
        width: 100, // Ancho del logo
        height: 100, // Alto del logo
        resizeMode: 'contain',
    },
    centerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        marginRight: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    searchIcon: {
        marginLeft: 10,
    },
    menuContent: {
        backgroundColor: '#333', // Fondo oscuro para el menú
    },
    menu: {
        marginTop: 50, // Ajusta la posición del menú para que quede debajo del avatar
    },
    logoutMenuItem: {
        backgroundColor: '#000', // Fondo negro para el item de logout
    },
    logoutText: {
        color: 'white', // Texto blanco para el item de logout
    },
});

export default Navbar;
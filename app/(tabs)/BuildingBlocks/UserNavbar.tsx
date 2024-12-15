import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Avatar, IconButton, Menu } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navbarStyles } from '../../styles/style';

type RootStackParamList = {
    SearchingScreen: undefined;
    LogIn: undefined;
};
type InfoProp = NavigationProp<RootStackParamList, 'SearchingScreen' | 'LogIn'>;
const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation<InfoProp>();
    const click = () => {
        navigation.navigate('SearchingScreen');
    }

    const [name, setName] = useState("");
    const [apellido, setApellido] = useState("");

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const load = async () => {
        const name = await AsyncStorage.getItem("name");
        const lName = await AsyncStorage.getItem("lastName");
        setName(name ? name : "nombre");
        setApellido(lName ? lName : "apellido");
    }
    const handleLogout = () => {
        navigation.navigate('LogIn');
        console.log('Logout pressed');
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <View style={navbarStyles.navbar}>
            {/* Logo de la aplicación a la izquierda */}
            <Image
                source={require('../../../assets/images/Logo02.png')}
                style={navbarStyles.logo}
            />

            {/* Contenido del Navbar */}
            <View style={navbarStyles.centerContent}>
                {/* Ícono de búsqueda */}
                <IconButton
                    icon="magnify"
                    size={28}
                    iconColor="white"
                    onPress={click}
                    style={navbarStyles.searchIcon}
                />

                {/* Menú desplegable */}
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <View style={navbarStyles.userContainer} onTouchStart={openMenu}>
                            <Text style={navbarStyles.userName}>{name} {apellido}</Text>
                            <Avatar.Image
                                size={40}
                                source={require('../../../assets/images/avatar.png')}
                                style={{
                                    backgroundColor: 'transparent'
                                }}
                            />
                        </View>
                    }
                    contentStyle={navbarStyles.menuContent}
                    style={navbarStyles.menu}
                >
                    <Menu.Item
                        onPress={handleLogout}
                        title="Logout"
                        leadingIcon="logout"
                        style={navbarStyles.logoutMenuItem}
                        titleStyle={navbarStyles.logoutText}
                    />
                </Menu>
            </View>
        </View>
    );
};

export default Navbar;
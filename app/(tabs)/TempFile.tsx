import * as React from 'react';
import NavBar from "./BuildingBlocks/UserNavbar"
//import MainCarousel from "./BuildingBlocks/MainCarousel"
import { Provider as PaperProvider } from 'react-native-paper';

export default function LogIn({ navigation }: any) {

    return (
        <PaperProvider>
            <NavBar />
            {/* <MainCarousel /> */}
        </PaperProvider>
    );
};
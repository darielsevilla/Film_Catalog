import React from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MD3DarkTheme } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useEffect } from 'react';
import { searchData } from './data/data';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

//lista global 
import { FavoriteMovies } from '@/context/MoviesContext';
//tabs
import SearchingPage from './AlternatePages/searchingpage';
import SearchResults from './AlternatePages/searchresults';
import LogIn from './LogIn'
import OpeningS from './AlternatePages/OpeningScreen';
import TempFile from './TempFile';
import SignUp from './SignUp';
import InfoPage from './infopage';
import MainScreen from './mainscreen';
import { AppState } from 'react-native';
import axios from 'axios';
//import { useEffect } from 'react';
///import { AsyncStorage } from 'react-native';


type RootStackParamList = {
  SearchingScreen: undefined;
  SearchResults: { search: string };
  LogIn: undefined;
  OpeningScreen: undefined;
  SignUp: undefined;
  InfoPage: { movieId: number };
  MainScreen: undefined;
  TempFile: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();
const templateScreen = () => {

  return (

    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>s
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>);
}


const saveList = async () => {
  await AsyncStorage.setItem("searches", JSON.stringify(searchData.queue))
}
const safeKeeping = () => {
  return (<>{/*<TopSearchBar></TopSearchBar>*/}
    {/*<SearcResults search = "Dune"></SearcResults>*/}
    <SearchingPage></SearchingPage></>);
}
export default function HomeScreen() {
  useEffect(() => {
    saveList();

    const appListener = AppState.addEventListener('change', closeEvt)

    return () => {
      appListener.remove();
    };
  }, [])

  const closeEvt = async (nextAppState: string) => {
    if (nextAppState === 'background') {
      try {

        const userID = await AsyncStorage.getItem("id")
        const item = await AsyncStorage.getItem("searches")
        const list2 = item ? JSON.parse(item) : [];
        const body = {
          user: userID,
          mensajes: list2
        }
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*'
          }
        }

        const response = await axios.post(process.env.EXPO_PUBLIC_PATH + '/updateHistorial', body, config);
        AsyncStorage.removeItem("id")

      } catch (error) {

      }

    }
  };

  const themes = MD3DarkTheme;
  const theme = useTheme();
  return (
    <>
      {/*search bar */}
      <FavoriteMovies>
        <Stack.Navigator initialRouteName='OpeningScreen'>

          <Stack.Screen name="SearchingScreen" component={SearchingPage} options={{ headerShown: false }} />
          <Stack.Screen name="SearchResults" component={SearchResults} options={{ headerShown: false }} />
          <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
          <Stack.Screen name="OpeningScreen" component={OpeningS} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="InfoPage" component={InfoPage} options={{ headerShown: false }} />
          <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
          <Stack.Screen name="TempFile" component={TempFile} options={{ headerShown: false }} />
        </Stack.Navigator>
      </FavoriteMovies>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

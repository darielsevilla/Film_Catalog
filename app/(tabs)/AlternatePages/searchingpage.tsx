import { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { TextInput, View } from "react-native";
import { Icon, MD3Colors } from 'react-native-paper';
import { Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native-paper';
import { cardStyles, customStyle } from '../../styles/style';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import { Divider } from 'react-native-paper';

interface search {
    textoBuscado: string;
    timestamp: string;
}

export default function SearchingPage({ navigation }: any) {
    const [searchQueue, setSearchQueue] = useState("")
    const [searchList, setSearchList] = useState<search[]>([])

    const loadQueue = async () => {
        const item = await AsyncStorage.getItem("searches")
        const list2 = item ? JSON.parse(item) : [];
        setSearchList(list2.sort((a: any, b: any) => {
            return a.timestamp > b.timestamp ? 1 : a.timestamp < b.timestamp ? -1 : 0;
        }))
    }

    const submit = async (newQueue: string) => {
        let updatedList: search[] = [];
        if (newQueue == "") {
            navigation.back();
        } else {
            if (searchList.find(item => item.textoBuscado.toLowerCase() === newQueue.toLowerCase()) === undefined) {
                if (searchList.length < 5) {
                    updatedList = [
                        ...searchList,
                        { textoBuscado: newQueue, timestamp: new Date().toISOString() }
                    ].sort((a, b) => (a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0));
                } else {
                    const listaTempo = searchList.sort((a, b) => (a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0));
                    listaTempo.pop();
                    updatedList = [{ textoBuscado: newQueue, timestamp: new Date().toISOString() }, ...listaTempo]
                }

            }

            if (updatedList.length != 0) {
                setSearchList(updatedList);
                const item = await AsyncStorage.setItem("searches", JSON.stringify(updatedList))
                const item2 = await AsyncStorage.getItem("searches");
            }

            navigation.navigate("SearchResults", { search: newQueue });
        }



    }
    const press = (newQueue: string) => {
        setSearchQueue(newQueue)
        navigation.navigate("SearchResults", { search: newQueue });
    }
    //loading searches
    useEffect(() => {
        loadQueue();
    }, []);

    const loadSearches = () => {
        if (searchQueue == "") {
            return (<>
                {searchList.map((item) =>
                    <TouchableOpacity key={item.textoBuscado} onPress={() => { press(item.textoBuscado) }}>
                        <Card elevation={0}>
                            <Card.Content style={cardStyles.searchCardFlex}>

                                {/*icon */}
                                <Icon
                                    source="refresh"
                                    color={"gray"}
                                    size={20}
                                />

                                {/*search info*/}
                                <View style={cardStyles.textContainer}>
                                    <Text style={cardStyles.textColor}>{item.textoBuscado}</Text>
                                </View>

                            </Card.Content>
                        </Card>
                        <Divider />
                    </TouchableOpacity>
                )}
            </>);
        } else {
            return (<>
                {searchList.filter(item => item.textoBuscado.toLowerCase().includes(searchQueue.toLowerCase()))?.map((item) =>
                    <TouchableOpacity key={item.textoBuscado} onPress={() => { press(item.textoBuscado) }}>
                        <Card elevation={0}>
                            <Card.Content style={cardStyles.searchCardFlex}>

                                {/*icon */}
                                <Icon
                                    source="refresh"
                                    color={"gray"}
                                    size={20}
                                />

                                {/*search info*/}

                                <View style={cardStyles.textContainer}>
                                    <Text style={cardStyles.textColor}>{item.textoBuscado}</Text>
                                </View>

                            </Card.Content>
                        </Card>
                        <Divider />
                    </TouchableOpacity>
                )}
            </>);
        }
    }


    const handleTitleChange = (newTitle: string) => {
        setSearchQueue(newTitle);
    };

    return (
        <>
            <Appbar.Header style={customStyle.backgroundSearchBar}>
                <Appbar.BackAction color='white' onPress={() => { { navigation.goBack() } }} />
                <Appbar.Content title={<TextInput
                    style={{ color: 'white', fontSize: 18 }}
                    value={searchQueue}

                    onChangeText={handleTitleChange}
                    onSubmitEditing={() => { submit }}
                    placeholder="Search for movies or tv shows"
                    placeholderTextColor="white"
                />}
                />
                <Appbar.Action icon="magnify" color='white' onPress={() => { submit(searchQueue) }} />
            </Appbar.Header>
            <SafeAreaView style={customStyle.containerInfo}>
                {loadSearches()}
            </SafeAreaView>
        </>
    );
}
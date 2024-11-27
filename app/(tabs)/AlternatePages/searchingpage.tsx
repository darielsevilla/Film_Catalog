import { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { TextInput, View } from "react-native";
import { Icon, MD3Colors } from 'react-native-paper';
import { Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native-paper';
import { cardStyles } from '../../styles/style';
import { TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
export default function SearchingPage({ navigation }: any){
    interface search{
        queue: string;
        timestamp:string;
    }
    const [searchQueue, setSearchQueue] = useState("")
    const [searchList, setSearchList] = useState<search[]>([])

    const loadQueue = async () =>{
        const item = await AsyncStorage.getItem("searches")
        const list2 = item ? JSON.parse(item) : [];
        setSearchList(list2.sort((a : any, b : any) => {
            return a.timestamp > b.timestamp ? 1 : a.timestamp < b.timestamp ? -1 : 0;
        }))

    }
    const submit = async (newQueue : string) =>{
        if(searchList.find(item => item.queue.toLowerCase() === newQueue.toLowerCase()) === undefined){
            if(searchList.length < 5){
                setSearchList([
                    ...searchList,
                    { queue: newQueue, timestamp: new Date().toISOString() }
                  ].sort((a, b) => (a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0)));
            }else{
                const listaTempo = searchList.sort((a, b) => (a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0));
                listaTempo.pop();
                setSearchList([{queue: newQueue, timestamp: new Date().toISOString()}, ...listaTempo])
            }
            const item = await AsyncStorage.setItem("searches", JSON.stringify(searchList))
        }
        navigation.navigate("SearchResults", { search: newQueue }); 
    }
    const press = (newQueue : string) =>{
        setSearchQueue(newQueue)
        navigation.navigate("SearchResults", { search: newQueue });
    }
    //loading searches
    useEffect(()=>{
        loadQueue();
    },[]);

    const loadSearches = () =>{
        if(searchQueue == ""){
            return(<>
                {searchList.map((item)=>
                    <TouchableOpacity key={item.queue} onPress={()=>{press(item.queue)}}> 
                    <Card elevation={0}>
                    <Card.Content  style={cardStyles.searchCardFlex}>
        
                        {/*icon */}
                            <Icon
                                source="refresh"
                                color={"gray"}
                                size={20}
                            />
                        
                        {/*search info*/}
                        
                        <View style={cardStyles.textContainer}>
                        <Text>{item.queue}</Text>
                        </View>
                        
                    </Card.Content>
                </Card>
                <Divider />
                </TouchableOpacity> 
            )}   
            </>);
        }else{
            return(<>
                {searchList.filter(item => item.queue.toLowerCase().includes(searchQueue.toLowerCase()))?.map((item)=>
                    <TouchableOpacity key={item.queue} onPress={()=>{press(item.queue)}}> 
                    <Card elevation={0}>
                    <Card.Content  style={cardStyles.searchCardFlex}>
        
                        {/*icon */}
                            <Icon
                                source="refresh"
                                color={"gray"}
                                size={20}
                            />
                        
                        {/*search info*/}
                        
                        <View style={cardStyles.textContainer}>
                        <Text>{item.queue}</Text>
                        </View>
                        
                    </Card.Content>
                </Card>
                <Divider />
                </TouchableOpacity> 
            )}   
            </>);
        }
    }

    
    const handleTitleChange = (newTitle : string) => {
        setSearchQueue(newTitle);
    };

    return(<>
        <Appbar.Header>
            <Appbar.BackAction  />
            <Appbar.Content title={<TextInput
              style={{ color: "black", fontSize: 18 }}
              value={searchQueue}
              onChangeText={handleTitleChange}
              onSubmitEditing={()=>{submit}}
              placeholder="Busque una pelicula o una serie"
              placeholderTextColor="lightgray"
            />}
            /> 
            <Appbar.Action icon="magnify" onPress={()=>{submit(searchQueue)}}/>
        </Appbar.Header>

          {loadSearches()}
    </>);
}
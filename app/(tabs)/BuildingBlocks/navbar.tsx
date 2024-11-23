import * as React from 'react';
import { Searchbar, Avatar, PaperProvider } from 'react-native-paper';
import { View } from 'react-native';
import { customStyle } from '../styles/style';
const MyComponent = () => (
    <Avatar.Icon size={24} icon="folder" />
  );
const TopSearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <>
        <View style={customStyle.top}>
            <Searchbar style={customStyle.bar}
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            />
            <Avatar.Icon size={48} icon="folder" />    
        </View>
    
    </>
    
  );
};

export default TopSearchBar;
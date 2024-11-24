import SearchCard from '../BuildingBlocks/searchCard';
import { loadedMovies } from '../data/data';
import { View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
const MyComponent = (search: string) => {
    const _goBack = () => console.log('Went back');
  
    const _handleSearch = () => console.log('Searching');
  
    const _handleMore = () => console.log('Shown more');
    
    const load = () => {
        const filteredMovies = loadedMovies.movies.filter(movie => 
            movie.name.toLowerCase().includes(search.toLowerCase())
          );
        return(<>
        {filteredMovies.map((movie, i)=>(i==0)?<View key ={movie.id} >
                <SearchCard name={movie.name} img = {movie.poster} id={movie.id} review={movie.rating} year={movie.year}></SearchCard>
            </View>:
        <View key ={movie.id} >
            <Divider horizontalInset = {true} />
            <SearchCard name={movie.name} img = {movie.poster} id={movie.id} review={movie.rating} year={movie.year}></SearchCard>
        </View>)}
        </>);
    }
    return(
        <>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={search} />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      </Appbar.Header>

      {load()}
      </>
    );
  };


import { Appbar } from 'react-native-paper';

interface SearchString{
    search: string
}
export default function SearchResults({search}:SearchString){
    
    return(<>
        {MyComponent(search)}

    </>)
    
}

import SearchCard from '../BuildingBlocks/searchCard';


const MyComponent = (search: string) => {
    const _goBack = () => console.log('Went back');
  
    const _handleSearch = () => console.log('Searching');
  
    const _handleMore = () => console.log('Shown more');
  
    return(
        <>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={search} />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      </Appbar.Header>

      <SearchCard name="Dune" img = "https://image.tmdb.org/t/p/w500/ldugBX89jCQA9RRwfzRgX0gNpBc.jpg" id={1} review={62} ></SearchCard>
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

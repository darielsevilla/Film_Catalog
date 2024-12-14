// import React from 'react';
// import { Dimensions, Text, View, Image, StyleSheet } from 'react-native';
// import Carousel from 'react-native-reanimated-carousel';

// const MainCarousel = () => {
//     const width = Dimensions.get('window').width; // Obtener el ancho de la pantalla
//     const data = [
//         { id: 1, image: 'https://cdn.mos.cms.futurecdn.net/cCPNy2QiwA2Hf5aRdjnrte.jpg', title: 'Item 1' },
//         { id: 2, image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjefRK_pPe1PQgYVTmM-nYcOTKoupleQ7zb3YCrwdZa1n0b9cn3SuJ1zv4naQ8DQ95qemRSt1TdmONskmrIEM1V1Wl7aQ9u0VDDdmUKTXv5ncDayln19jXpLXf9AmMpqU0nXpS_M7Wbc3I/s1600/familia+del+futuro.jpg', title: 'Item 2' },
//         // { id: 3, image: 'https://example.com/image3.jpg', title: 'Item 3' },
//         // Agrega más elementos según sea necesario
//     ];

//     return (
//         <View style={{ flex: 1 }}>
//             <Carousel
//                 data={data}
//                 width={width}
//                 renderItem={({ item }) => (
//                     <View style={styles.item}>
//                         <Image source={{ uri: item.image }} style={styles.image} />
//                         <Text style={styles.title}>{item.title}</Text>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// };
// const styles = StyleSheet.create({
//     item: {
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     image: {
//         width: '100%',
//         height: 200,
//         resizeMode: 'cover',
//     },
//     title: {
//         color: 'white',
//         fontSize: 18,
//         marginTop: 10,
//     },
// });
// export default MainCarousel;

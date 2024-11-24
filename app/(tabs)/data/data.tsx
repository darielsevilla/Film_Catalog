interface movies{
    id : number,
    poster: string,
    name : string,
    rating : number,
    year : number,
    language : string,
    overview : string
}
/*export const userInfo={
    favoritos: [] as number[]
}*/

/*export const loadedMovies={
    movies : [] as movies[]
}*/

export const loadedMovies={
    movies : [{
        id : 1,
        name : "Dune",
        rating : 84,
        year : 2020,
        poster: 'https://image.tmdb.org/t/p/w500/ldugBX89jCQA9RRwfzRgX0gNpBc.jpg',
        language : "en",
        overview : "Words Words Words"
    },
    {
        id : 2,
        name : "A space Odyssey",
        rating : 84,
        year : 2000,
        poster: 'https://image.tmdb.org/t/p/w500/ldugBX89jCQA9RRwfzRgX0gNpBc.jpg',
        language : "en",
        overview : "Words Words Words"},
    
    {
    id : 3,
    name : "Dune: Part Two",
    rating : 94,
    year : 2024,
    poster: 'https://s3.amazonaws.com/nightjarprod/content/uploads/sites/340/2024/07/12111025/1pdfLvkbY9ohJlCjQH2CZjjYVvJ-scaled.jpg',
    language : "en",
    overview : "Words Words Words"}]
}

export const userInfo={
    favoritos : [1]
}
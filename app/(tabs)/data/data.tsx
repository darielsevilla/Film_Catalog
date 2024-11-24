interface movies{
    id : number,
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
        language : "en",
        overview : "Words Words Words"
    },
    {id : 2,
        name : "A space Odyssey",
        rating : 84,
        year : 2000,
        language : "en",
        overview : "Words Words Words"},
    
    {id : 3,
    name : "Dune Part 2",
    rating : 84,
    year : 2024,
    language : "en",
    overview : "Words Words Words"}]
}

export const userInfo={
    favoritos : [1]
}
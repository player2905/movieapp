import { useHttp } from "../components/hooks/http.hook";

    const MovieService = () => {

    const {request} = useHttp();

    

    const getActualMonth = () => {

        const date = new Date();
        const month = date.getMonth();

        switch (month) {
            case 0:
                return 'JANUARY';
            case 1:
                return 'FEBRUARY';
            case 2:
                return 'MARCH';
            case 3:
                return 'APRIL';
            case 4:
                return 'MAY';
            case 5:
                return 'JUNE';
            case 6:
                return 'JULY';
            case 7:
                return 'AUGUST';
            case 8:
                return 'SEPTEMBER';
            case 9:
                return 'OCTOBER';
            case 10:
                return 'NOVEMBER';
            case 11:
                return 'DECEMBER';
        
            default:
                return 'JANUARY';
        }
    };

    const currentMonth = getActualMonth();

    const getFilms = async () => {

        const res = await request(`https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2022&month=${currentMonth}`)
        return _transformFilms(res);
    }

    const getFilmInfo = async (id) => {
        return (await request(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`)
                    .then(res => _getTransformFilmInfo(res)))
    }

    const _transformFilms = (res) => {
        let films = []
        
        films = res.items.map((films) => {
            return (
            {
                name: films.nameEn,
                posterUrl: films.posterUrl,
                premier: films.premiereRu,
                id: films.kinopoiskId
            });
        });
        // console.log(films);
        return films;
    }

    const _getTransformFilmInfo = (item) => {

        const info = 
            {
                name: item.nameRu,
                poster: item.posterUrl,
                year: item.year,
                country: item.countries[0].country, //массив стран
                genre: item.genres[0].genre, //массив жанров
                slogan: item.slogan,
                time: item.filmLength,
                description: item.description,
                background: item.coverUrl
            }
        
        // console.log(info);
        return info;
    }

    return {getFilms, getFilmInfo, getActualMonth}
}

export default MovieService;
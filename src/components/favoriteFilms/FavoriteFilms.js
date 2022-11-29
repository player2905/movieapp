import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilmId } from '../store/reducers/movieSlice';
import { setFavoriteFilms, setFavoriteFilmsData } from "../store/reducers/userProfileSlice";
import MovieService from "../../services/MovieService";
import { getDatabase, ref, onValue} from "firebase/database";

const FavoriteFilms = () => {

    const {deleteFavoriteFilm} = MovieService();

    const dispatch = useDispatch();

    const userId = useSelector(state => state.login.userId);
    const favoriteFilms = useSelector(state => state.userProfile.favoriteFilms);
    const dataFavorite = useSelector(state => state.userProfile.dataFavorite);

    useEffect(() => {
        readDataFavorite()
    }, [userId])

    const readDataFavorite = () => {
        const db = getDatabase();
        const Ref = ref(db, `users/` + userId + '/favoriteFilms/');
        onValue(Ref, (films) => {
        const dataFavorite = films.val();
        dispatch(setFavoriteFilmsData(dataFavorite));
        dispatch(setFavoriteFilms(Object.entries(dataFavorite)));
    })}

    const renderFavoiteFilms = (arr) => {
        const items = arr.map(item => {
            return (
                <div className='favorite-item-inner'>
                    <div 
                        className='favorite-poster'
                        onClick={() => {
                            dispatch(setFilmId(item[1].id))
                        }}>
                            <img src={item[1].poster} alt="logo"/>
                    </div>
                    <div className='favorite-info'>
                        <h4>{item[1].name}</h4>
                        <div>{item[1].year}</div>
                        <div>{item[1].genre}</div>
                        
                    </div>
                    <i class="ph-trash delete"
                        onClick={() => deleteFavoriteFilm(item[0])}></i>
                </div>
            )
        })
        return (
            <div className="results-favorite">
                {items}
            </div>

        )
    }

    let content = renderFavoiteFilms(favoriteFilms);

    return (
        <>
            <div className='favorite-content-wrapper'>
                <h1>Избранные фильмы</h1>
                {dataFavorite ? content : null}
            </div>
        </>
    )



}

export default FavoriteFilms;
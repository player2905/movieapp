import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoginState } from "../store/selectors";
import { fetchLogOut, changeStatusOnOnline, changeStatusOnOffline } from "../store/reducers/loginSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setViewdFilmsData, setViewedFilms, setFavoriteFilms, setFavoriteFilmsData, setGradeFilms } from "../store/reducers/userProfileSlice";

import './sidebar.scss';

const Sidebar = (props) => {
    const dispatch = useDispatch();
    const auth = getAuth();

    const {loginStatus, userId} = useSelector(getLoginState)

    const check = (auth) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(changeStatusOnOnline({email: user.email, userId: user.uid}));
            } else {
                dispatch(changeStatusOnOffline());
            }
        })
    }

    useEffect(() => {
        check(auth);
      }, [])

    return (
        <>
            <aside className="sidebar">
                <nav>
                    <ul className="navigation">
                        <li>
                            <Link to={`/`}>
                                <i className="ph-house"></i>
                            </Link>
                        </li>
                        { loginStatus ?
                            <li>
                                <Link to={`/profile`}>
                                <i class="ph-person"></i>
                                </Link> 
                            </li> : null
                        }
                        <li>
                            <Link to={'/find'}>
                                <i className="ph-magnifying-glass"></i>
                            </Link>
                        </li>
                        { loginStatus ?
                            <li>
                                <Link to={'/'}>
                                    <i class="ph-sign-out"
                                    onClick={() => {
                                        dispatch(fetchLogOut())
                                        dispatch(setViewdFilmsData({}));
                                        dispatch(setViewedFilms([]));
                                        dispatch(setFavoriteFilmsData({}));
                                        dispatch(setFavoriteFilms([]));
                                        dispatch(setGradeFilms([]));
                                    }}></i>
                                </Link>
                            </li>
                                :
                            <li>
                                <Link to={'/login'}>
                                <i className="ph-user"></i>
                                </Link>
                            </li>
                        }
                    </ul>
                </nav>
            </aside>
            {props.children}
        </>
    )
    
}

export default Sidebar;
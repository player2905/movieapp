import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, onValue, set, push} from "firebase/database";
import { setGradeFilms, setGrade } from "../store/reducers/userProfileSlice";

const GradeFilms = () => {
    // const [grade, setGrade] = useState(null);
    const [gradeState, setGradeState] = useState({state: false, visible: {'display': 'block'}});

    const userId = useSelector(state => state.login.userId);
    const filmId = useSelector(state => state.movieInfo.filmId);
    const filmInfo = useSelector(state => state.movieInfo.filmInfo);
    const gradeFilms = useSelector(state => state.userProfile.gradeFilms);
    const grade = useSelector(state => state.userProfile.grade);

    const dispatch = useDispatch();

    useEffect(() => {
        readDataGrade(filmInfo)
    }, [userId])

    useEffect(() => {
        checkGradeFilms()
    }, [filmId, gradeFilms])

    const readDataGrade = (film) => {
        const db = getDatabase();
        const Ref = ref(db, `users/` + userId + '/gradeFilms/');
        onValue(Ref, (films) => {
        const data = films.val();
        dispatch(setGradeFilms(Object.entries(data)));
    })}

    const checkGradeFilms = () => {
        gradeFilms.forEach(item => {
            if (item[1].id === filmId) {
                dispatch(setGrade(item[1].grade))
                console.log('KEY')
                // console.log(item[0])
                // console.log(key)
            } 
        })
    }

    const addGrade = (film, grade) => {
        const db = getDatabase();
        const Ref = ref(db, `users/` + userId + `/gradeFilms/` + film.name);
        const favoriteFilms = push(Ref);
        set(Ref, {
            id: film.id,
            grade: grade
        });
        readDataGrade(filmInfo);
    }

    return (
        <>
            <button className='btn-grade' style={gradeState.visible}
            onClick={() => setGradeState({state: true, visible: {'display': 'none'}})}>Оценить</button>
            
            {gradeState.state ? <div className='choise'>
                <div className='choisewrapper'>
                    <div>
                        <i className="ph-star star"></i>
                    </div>
                    <div onClick={() => {
                        addGrade(filmInfo, 1)
                        setGradeState({state: false, visible: {'display': 'block'}})
                        } }>
                        <span className='red'>1</span>
                    </div>
                    <div onClick={() => {
                        addGrade(filmInfo, 2)
                        setGradeState({state: false, visible: {'display': 'block'}})
                        }}>
                        <span className='red'>2</span>
                    </div>
                    <div onClick={() => {
                        addGrade(filmInfo, 3)
                        setGradeState({state: false, visible: {'display': 'block'}})
                        }}>
                        <span className='red'>3</span>
                    </div>
                    <div onClick={() => {
                        addGrade(filmInfo, 4)
                        setGradeState({state: false, visible: {'display': 'block'}})
                        }}>
                        <span className='red'>4</span>
                    </div>
                    <div onClick={() => {
                        addGrade(filmInfo, 5)
                        setGradeState({state: false, visible: {'display': 'block'}})}}>
                        <span className='gray'>5</span>
                    </div>
                    <div onClick={() => {
                        addGrade(filmInfo, 6)
                        setGradeState({state: false, visible: {'display': 'block'}})
                        }}>
                        <span className='gray'>6</span>
                    </div>
                    <div onClick={() => {
                        addGrade(filmInfo, 7)
                        setGradeState({state: false, visible: {'display': 'block'}})
                        }}>
                        <span className='green'>7</span>
                    </div>
                    <div onClick={() => {
                        addGrade(filmInfo, 8)
                        setGradeState({state: false, visible: {'display': 'block'}})
                        }}>
                        <span className='green'>8</span>
                    </div>
                    <div onClick={() => {
                        addGrade(filmInfo, 9)
                        setGradeState({state: false, visible: {'display': 'block'}})
                        }}>
                        <span className='green'>9</span>
                    </div>
                    <div onClick={() => {
                        addGrade(filmInfo, 10)
                        setGradeState({state: false, visible: {'display': 'block'}})
                        }}>
                        <span className='green'>10</span>
                    </div>
                </div>
            </div> : null}
            {grade ? <div>Ваша оценка {grade}</div> : null}
        </>
    )
}

export default GradeFilms;
import React, {useState} from 'react'
import MovieModal from '../MovieModal'
import '../MovieRow/styles.css';
import Tmdb from '../../Tmdb';

export default function MovieRow({title, items}) {

    const [scrollX, setScrollX] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalSelectedMovie, setModalSelectedMovie] = useState(null)

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth/2);
        if(x > 0) {
            x = 0;
        }
        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listw = items.results.length * 150;
        if((window.innerWidth - listw) > x) {
            x = (window.innerWidth - listw) - 60;
        }
        setScrollX(x);
    }

    const openModalMovie = async (movie) => {
        setModalVisible(true);
        setModalSelectedMovie(movie);
        document.body.style.overflow = "hidden";
        let movieInfo = await Tmdb.getMovieInfo(movie.id);
    }

    const closeModalMovie = () => {
        setModalVisible(false);
        document.body.style.overflow = "visible";
    }

    return (
        <div className="movieRow">
            <div>
                <h2>{title}</h2>
                <div className="movieRow--listarea">
                    <div className="movieRow--list">
                        {
                            items.results.length > 0 && items.results.map((item, key) => (
                            <div key={key} className="movieRow--item" onClick={()=>openModalMovie(item)}>
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title} />
                            </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {
                modalVisible ? 
                <MovieModal modalSelectedMovie={modalSelectedMovie} closeModalMovie={closeModalMovie}/>
                : 
                ''
            }
        </div>
    )
}

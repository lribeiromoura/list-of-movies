import React, {useState} from 'react'
import MovieModal from '../MovieModal'
import '../MovieRow/styles.css';
import Tmdb from '../../Tmdb';

export default function MovieRow({title, items}) {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalSelectedMovie, setModalSelectedMovie] = useState(null);

    const openModalMovie = async (movie) => {
        setModalVisible(true);
        setModalSelectedMovie(movie);
    }

    const closeModalMovie = () => {
        setModalVisible(false);
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

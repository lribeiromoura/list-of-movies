import React, {useState} from 'react'
import '../MovieModal/styles.css';


export default function MovieModal({modalSelectedMovie, closeModalMovie}) {
    
    return (
        <div className="modal">  
            <div className="modal--titlewrapper">
                <div className="modal--title">
                    {modalSelectedMovie.title}
                </div>
                <div className="modal--close" onClick={()=>closeModalMovie()}>
                    ❌
                </div>
            </div>
            <div className="modal--imagewrapper">
                <img className="modal--coverimg" src={`https://image.tmdb.org/t/p/original${modalSelectedMovie.backdrop_path}`}/>
            </div>
            <div className="modal--descriptionwrapper">
                <div className="modal--descriptiontext">{modalSelectedMovie.overview}</div>
            </div>
        </div> 
    )
}

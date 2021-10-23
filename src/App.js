import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import Header from './components/Header';
import CategoryRow from './components/CategoryRow';
import MovieRow from './components/MovieRow';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [categoriesList, setCategories] = useState(null);
  const [searchCategoriesToggle, setSearchCategoriesToggle] = useState(false);

  const toggleCategoriesSearch = () => {
    setSearchCategoriesToggle(!searchCategoriesToggle);
  }

  const closeCategoriesSearch = () => {
    setSearchCategoriesToggle(false);
  }

  const loadCategories = async () => {
    let categories = await Tmdb.getMovieCategories();
    setCategories(categories);
  }
  const loadAll = async (page, categoriesArr) => {
    let list = await Tmdb.getHomeList(page, categoriesArr);
    setMovieList(list);
  }

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    loadCategories(1, null);
  }, []);

  return (
    <div className="page">
      <Header toggleCategoriesSearch={toggleCategoriesSearch}  />
      {
        searchCategoriesToggle 
        ? 
          <CategoryRow categories={categoriesList} closeCategoriesSearch={closeCategoriesSearch} loadAll={loadAll}/>
        : 
          ''
      }
      <section className="lists">
        {
          movieList.map((item, key) => (
            <div>
              <MovieRow key={key} title={item.title} items={item.items} />
            </div>
          ))
        }
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> por Leandro Moura
      </footer>

      {
        movieList.length <= 0 && 
          <div className="loading">
            <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" />
          </div>
      }
      

    </div>
  )
}

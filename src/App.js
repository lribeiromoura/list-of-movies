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
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [pageNumber, setpageNumber] = useState(0);

  const toggleCategoriesSearch = () => {
    setSearchCategoriesToggle(!searchCategoriesToggle);
  }

  const closeCategoriesSearch = () => {
    setSearchCategoriesToggle(false);
  }

  const handleChangePage = (pageChanged) => {
    loadAll(pageChanged, null);
  }

  const handlePreviousPage = () => {
    const newPage = pageNumber-1;
    setpageNumber(newPage);
}

const handleNextPage = () => {
    const newPage = pageNumber+1;
    setpageNumber(newPage);

}

  const loadCategories = async () => {
    let categories = await Tmdb.getMovieCategories();
    setCategories(categories);
  }

  const loadAll = async (page, categoriesArr) => {
    let list = await Tmdb.getHomeList(page, categoriesArr);
    setpageNumber(list[0].items.page);
    setTotalNumberOfPages(list[0].items.total_page)
    setMovieList(list);
  }

  useEffect(() => {
    loadAll(1, null);
  }, []);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    handleChangePage(pageNumber);
  }, [pageNumber]);

  return (
    <div className="page">
      <Header toggleCategoriesSearch={toggleCategoriesSearch}  />
      { 
        categoriesList && categoriesList.genres ? 
            <CategoryRow  
                categories={categoriesList} 
                close={closeCategoriesSearch} 
                open={searchCategoriesToggle}
                onSelectedCategoryChange={filteredCategories => {loadAll(1, filteredCategories.map(filteredCategory => filteredCategory.id ))}} 
            />
        : null
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
      { 
        movieList && movieList.length > 0 ? 
        <div className="pagination-wrapper">
        {
            pageNumber !== 1 ?
                <button className="pagination-button" onClick={()=>{handlePreviousPage()}}>Previous</button>
            : null        
        }
        {
            pageNumber !== totalNumberOfPages ?
                <button className="pagination-button" onClick={()=>{handleNextPage()}}>Next</button>
            : null
        }
    </div>
        : null
      }

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

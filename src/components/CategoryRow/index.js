import React , { useState } from 'react';
import '../CategoryRow/styles.css';

export default function CategoryRow({categories, closeCategoriesSearch, loadAll}) {

    const [categoriesChecked, setCategoriesChecked] = useState([]);


    const getCategoriesChecked = (event) => {
        const { id, checked } = event.target;

        categories.genres.map(category => {
            if(category.id == id) {
                category.checked = !category.checked;
            }
        });

        searchCategoriesFromServer();
    }

    const searchCategoriesFromServer = () => {
        let arr = []

        categories.genres.map(category => {
            if(category.checked) {
                arr.push(category.id)
            }
        });
        setCategoriesChecked(arr);

        loadAll(1, categoriesChecked);
    }
    
    return (
        <div className="categoryRow--wrapper">
            <div className="categoryRow--titlewrapper">
                <div className="modal--title">
                    Categorias
                </div>
                <div className="categoryRow--close" onClick={() => closeCategoriesSearch()}>
                    ❌
                </div>
            </div>
            <div className="categoryRow--wrapperitem">
            {
                categories.genres.length > 0 && categories.genres.map((item, key) => (
                    <div key={key} className="categoryRow--item" >
                        <input type="checkbox" checked={item.checked}  id={item.id} onClick={(event)=> {getCategoriesChecked(event)}}/> {item.name} <br></br>
                    </div>
                ))
            }
            </div>

        </div>
    )
}

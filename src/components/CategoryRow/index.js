import React , { useState, useEffect } from 'react';
import '../CategoryRow/styles.css';

export default function CategoryRow({categories, close, open ,onSelectedCategoryChange}) {

    const [categoriesChecked, setCategoriesChecked] = useState(categories.genres.map(category => ({
        ...category, 
        checked: false,
    })));

    const handleCheckCategory = (e) => {
        const { id, checked } = e.target;

        setCategoriesChecked(prevCategoriesChecked => {
            return  prevCategoriesChecked.map(prevCategoryChecked => {
                        if(prevCategoryChecked.id == id) {
                            prevCategoryChecked.checked = checked;
                        }
                        return prevCategoryChecked;
                    });
        });
    }

    useEffect(() => {
        onSelectedCategoryChange(categoriesChecked.filter(categoryChecked => categoryChecked.checked));
      }, [categoriesChecked]);
    
    return (
        open ? 
        <div className="categoryRow--wrapper">
            <div className="categoryRow--titlewrapper">
                <div className="modal--title">
                    Categorias
                </div>
                <div className="categoryRow--close" onClick={() => close()}>
                    ❌
                </div>
            </div>
            <div className="categoryRow--wrapperitem">
            {
                categoriesChecked.length > 0 && categoriesChecked.map((item, key) => (
                    <div key={key} className="categoryRow--item" >
                        <input  type="checkbox" 
                                checked={item.checked}  
                                id={item.id} 
                                onChange={(event)=> {handleCheckCategory(event)}}/> 
                                    {item.name} 
                        <br>
                        </br>
                    </div>
                ))
            }
            </div>

        </div>: null
    )
}

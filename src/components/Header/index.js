import React from 'react';
import '../Header/styles.css';
import logosite from '../../../src/logo.png';
export default function Header({toggleCategoriesSearch}) {
    
    return (
        <header>
            <div className="header--logo">
                <img src={logosite} alt="logo"></img>
            </div>
            <div className="header--filter" onClick={()=>toggleCategoriesSearch()}>
                🔎
            </div>
        </header>
    )
}

import React from 'react';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
import s from './Pagination.module.scss'

export interface IPagination {
    pizzasCount: number
    currentPage: number
    onPageClick: (number: number) => void
}

export const Pagination: React.FC<IPagination> = React.memo(({currentPage, onPageClick}) => {
    
    let pages = [];
    
    for (let i = 0; i < 3; i++) {    //Math.ceil(pizzasCount/4)
        pages.push(i+1)
    }

    let slicedPages;
    if (currentPage - 3 < 0) slicedPages = pages.slice(0,3)
    else slicedPages = pages.slice(currentPage-2, currentPage + 1)

    const setPreviousPage = () => {
        if (currentPage > 1) onPageClick(currentPage - 1)
    }

    const setNextPage = () => {
        if (currentPage < pages.length) onPageClick(currentPage + 1)
    }

    return (
        <div className= {s.root}>
            <ul>
                <MdKeyboardArrowLeft onClick = {() => setPreviousPage()} className={s.arrow}/>
                {slicedPages.map(p => 
                    <li onClick = {() => onPageClick(p)}
                        className = {currentPage === p ? s.active : s.li} key = {p}>
                        {p}
                    </li>
                )}
                <MdKeyboardArrowRight onClick = {() => setNextPage()} className={s.arrow}/>
            </ul>
        </div>
        
    );
})

import React, {useCallback, useEffect} from 'react';
import {PizzaBlock, Categories, Sort, Skeleton, Pagination} from '../';
import { SortType } from '../Sort';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setCategoryId, setSortType, setSortOrder, setCurrentPage } from '../../redux/slices/filterSlice';
import { fetchPizzas } from '../../redux/slices/pizzasSlice';
import {TSortOrder} from '../../redux/slices/filterSlice'

const Home: React.FC = () => {
    
    const dispatch = useAppDispatch()

    const {categoryId, sortType, sortOrder, currentPage, searchValue} = useAppSelector((state) => state.filters)
    const {items, error, status} = useAppSelector((state) => state.pizzas)

    const setCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [])
    const setSort = useCallback((obj: SortType) => {
        dispatch(setSortType(obj))
    }, [])
    const changeSortOrder = useCallback((order: TSortOrder) => {
        dispatch(setSortOrder(order))
    }, [])
    const onPageClick = useCallback((page: number) => {
        dispatch(setCurrentPage(page))
    }, [])


    useEffect(() => {
        const getPizzas = async () => {
            const sortProperty = sortType.sortProperty
            dispatch(fetchPizzas({
                currentPage: currentPage, 
                sortProperty: sortProperty, 
                searchValue: searchValue ? searchValue : '', 
                categoryId: categoryId, 
                sortOrder: sortOrder
            }))
        }
        getPizzas() 
    }, [categoryId, sortType.sortProperty, sortOrder, currentPage, searchValue])

    let filteredPizzas = items
        .map((obj) => <PizzaBlock key = {obj.id} {...obj}/>)
    
    return (
        <div className="container">
            <div className="content__top">
                <Categories 
                    categoryId = {categoryId} 
                    setCategory = {setCategory}
                />
                <Sort 
                    sortType = {sortType} 
                    setSort = {setSort}
                    sortOrder = {sortOrder}
                    changeSortOrder = {changeSortOrder}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'rejected' && <div className='serverError'>{error?.message}<div>Попробуйте перезагрузить страницу😕</div></div>}
            <div className="content__items">
            {
                status === 'pending' ? [...new Array(4)].map((_, index) => <Skeleton key = {index}/>)
                : filteredPizzas
            }
            </div>
            <Pagination 
                pizzasCount = {items.length}
                currentPage = {currentPage} 
                onPageClick = {onPageClick}
            />
        </div>
    );
}
 
export default Home;


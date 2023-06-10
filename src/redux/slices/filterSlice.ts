import { SortType } from './../../components/Sort';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type TSortOrder = 'asc' | 'desc'

interface IFilter {
    categoryId: number
    currentPage: number
    sortType: SortType
    sortOrder: TSortOrder
    searchValue?: string
}

const initialState: IFilter = {
    categoryId: 0,
    currentPage: 1,
    sortType: {
        name: 'популярности', 
        sortProperty: 'rating'
    },
    sortOrder: 'desc',
    searchValue: ''
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload
        },
        setSortType: (state, action: PayloadAction<SortType>) => {
            state.sortType = action.payload
        },
        setSortOrder: (state, action: PayloadAction<TSortOrder>) => {
            state.sortOrder = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setFilters: (state, action: PayloadAction<IFilter>) => {
            state.sortType = action.payload.sortType
            state.sortOrder = action.payload.sortOrder
            state.searchValue = action.payload.searchValue
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload
        }
    }
})

export const { setCategoryId, setSortType, setSortOrder, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer
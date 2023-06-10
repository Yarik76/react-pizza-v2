import { createSlice, createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import axios from "axios";
import { IPizza } from "../../components/PizzaBlock/PizzaBlock";

enum Status {
    PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected'
}

interface IPizzasState {
    items: Array<IPizza>
    error: SerializedError | null
    status: Status
}
interface IFetchParams {
    currentPage: number
    sortProperty: string
    searchValue: string | ''
    categoryId: number
    sortOrder: string
}

const initialState: IPizzasState = {
    items: [],
    error: null,
    status: Status.PENDING,
}

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzas',
    async (params: IFetchParams) => {
        const {currentPage, sortProperty, searchValue, categoryId, sortOrder} = params
        let response = await axios.get<Array<IPizza>>(`https://646356544dca1a66135ab4d0.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortProperty}${searchValue ? `&search=${searchValue}` : ``}${categoryId > 0 ? `&category=${categoryId}` : ``}&order=${sortOrder}`)
        return response.data as Array<IPizza>
    }
)


const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
       builder
        .addCase(fetchPizzas.pending, (state) => {
            state.status = Status.PENDING
            state.items = []
        })
        .addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.error = null;
            state.status = Status.FULFILLED
        })
        .addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.REJECTED
            state.error = action.error
            state.items = []
        })
    }
})

export default pizzasSlice.reducer

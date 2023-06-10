import { getCartLC, getTotalPizzaCount, getTotalPizzaPrice } from '../../components/utils/cartUtils';
import { RootState } from './../store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit' 

export interface IPizzaCart {
    id: string 
    imageUrl: string, 
    price: number,
    title: string, 
    type: string, 
    size: number,
    count: number,
}

interface ICartState {
    totalPrice: number
    totalCount: number
    items: Array<IPizzaCart>
}   

const cartInitialData: Array<IPizzaCart> = getCartLC()
const initialState: ICartState = {
    items: cartInitialData,
    totalPrice: getTotalPizzaPrice(cartInitialData),
    totalCount: getTotalPizzaCount(cartInitialData)
   
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<IPizzaCart>) => {
            const findItem = state.items.find(item => +item.id === +action.payload.id)  
            if (findItem && findItem.count) {
                findItem.count++
            } else {
                state.items.push(action.payload)
            }
            state.totalPrice = getTotalPizzaPrice(state.items)
            state.totalCount = getTotalPizzaCount(state.items)
        },
        reduceItem: (state, action: PayloadAction<string>) => {
            const foundItem = state.items.find(item => +item.id === +action.payload)
            if (foundItem && foundItem.count > 1) {
                foundItem.count--
                state.totalCount--
                state.totalPrice -= foundItem.price
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => +item.id !== +action.payload)
            state.totalPrice = getTotalPizzaPrice(state.items)
            state.totalCount = getTotalPizzaCount(state.items)
        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0
            state.totalCount = 0
        }
    }
})

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: number) => (state: RootState) => state.cart.items.find(item => +item.id === id)

export const {addItem, removeItem, clearItems, reduceItem} = cartSlice.actions 
export default cartSlice.reducer
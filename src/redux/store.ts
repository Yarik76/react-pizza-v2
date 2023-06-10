import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartSlice from "./slices/cartSlice";
import filterSlice from "./slices/filterSlice";
import pizzasSlice from "./slices/pizzasSlice";

export const store = configureStore({
    reducer: {                  //reducer - по сути равно слову state, в нем лежит state.filters и т.д.
        filters: filterSlice,
        cart: cartSlice,
        pizzas: pizzasSlice
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

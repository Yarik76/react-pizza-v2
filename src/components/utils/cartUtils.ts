import { IPizzaCart } from "../../redux/slices/cartSlice"

export const getCartLC = () => {
    const data = localStorage.getItem('cart')
    return data ? JSON.parse(data) : []
}
export const getTotalPizzaPrice = (items: Array<IPizzaCart>) => {
    return items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
    }, 0)
}
export const getTotalPizzaCount = (items: Array<IPizzaCart>) => {
    return items.reduce((sum, obj) => {
        return obj.count + sum
    }, 0)
}
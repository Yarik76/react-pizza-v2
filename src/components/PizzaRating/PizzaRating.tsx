import * as React from 'react';
import {BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs'
import s from './PizzaRating.module.scss'

export interface IPizzaRating {
    rating: number
}

export const PizzaRating: React.FC<IPizzaRating> = ({rating}) => {
    let convRating = 0
    if (rating) {
        convRating = Math.floor((rating/2))
    }

    return (
        <div className= {s.wrapper}>
            {[...new Array(convRating)].map((_, index) => <BsStarFill key = {index}/>)}
            {rating && rating % 2 !== 0 ? <BsStarHalf/> : ''}
            {[...new Array(rating && rating % 2 === 0 ? 4 - convRating + 1 : 4 - convRating)].map((_, index) => <BsStar key = {index}/>)}
        </div>
    );
}

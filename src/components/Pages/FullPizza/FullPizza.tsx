import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IPizza } from '../../PizzaBlock/PizzaBlock';
import {PizzaRating} from '../../'
import s from '../FullPizza/FullPizza.module.scss'


const FullPizza: React.FC = () => {

    const [pizza, setPizza] = useState<IPizza>()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPizza = async () => {
            try {
                let response = await axios.get(`https://646356544dca1a66135ab4d0.mockapi.io/items/${id}`)
                setPizza(response.data)
            } catch(e) {
                alert('Ошибка при получении пиццы!')
                navigate('/')
            }
        }
        fetchPizza()   
    }, [])

    if (!pizza) return <></>

    return (
        <div className={s.wrapper}>
            <img src = {pizza.imageUrl}/>
            <div className = {s.descr}>
                <h2>{pizza.title}</h2>
                <PizzaRating rating = {pizza.rating}/>
                <div className = {s.price}>{pizza.price} ₽</div>
            </div>
        </div>
    );
}
 
export default FullPizza;
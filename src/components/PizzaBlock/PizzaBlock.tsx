import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { addItem, IPizzaCart, selectCartItemById } from "../../redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export interface IPizza {
  category: number;
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: Array<number>;
  title: string;
  types: Array<number>;
  count: number;
}

const pizzaTypeNames = ['Тонкое', 'Традиционное']

export const PizzaBlock: React.FC<IPizza> = (props) => {
  
  const [activeType, setActiveType] = useState<number>(0)
  const [activeSize, setActiveSize] = useState<number>(0)
  
  const dispatch = useAppDispatch()
  const foundPizza = useAppSelector(selectCartItemById(Number(props.id)))
  
  const onPizzaAdd = () => {
    if (foundPizza?.count === 30) return
    const item: IPizzaCart = { 
      id: props.id, 
      imageUrl: props.imageUrl, 
      price: props.price,
      title: props.title, 
      type: pizzaTypeNames[activeType], 
      size: props.sizes[activeSize],
      count: 1,
    }
    dispatch(addItem(item))
  }

  return (
    <div className="pizza-block">
      <NavLink to={`/pizza/${props.id}`}>
        <img
          className="pizza-block__image"
          src={props.imageUrl}
          alt={props.title}
        />
      </NavLink>
      <h4 className="pizza-block__title">{props.title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {props.types.map((typeIndex, index) => 
            <li key = {index} onClick = {() => setActiveType(index)}
              className={activeType === index ? "active" : ''}>
                {pizzaTypeNames[typeIndex]}
            </li>
          )}
        </ul>
        <ul>
          {props.sizes.map((s, index) => (
            <li key = {index} onClick = {() => setActiveSize(index)}
              className={activeSize === index ? "active" : ''}>
                {s} см
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {props.price} ₽</div>
        <button disabled = {foundPizza?.count === 30} onClick = {onPizzaAdd}
          className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            ></path>
          </svg>
          <span>Добавить</span>
          <i>{!foundPizza ? 0 : foundPizza.count}</i>
        </button>
      </div>
    </div>
  );
};


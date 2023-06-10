import * as React from 'react';
import { NavLink } from 'react-router-dom';
import emptyCart from '../../../../assets/img/empty-cart.png'

export const EmptyCart: React.FC = () => {

    return (
        <div className="container container--cart">
            <div className="cart cart--empty">
                <h2>Корзина пустая😕</h2>
                <p>
                Вероятней всего, вы не заказывали ещё пиццу.<br/>
                Для того, чтобы заказать пиццу, перейди на главную страницу.
                </p>
                <img src={emptyCart} alt="Empty cart"/>
                <NavLink className="button button--black" to = {'/'}>Вернуться назад</NavLink>
            </div>
        </div>
    );
}

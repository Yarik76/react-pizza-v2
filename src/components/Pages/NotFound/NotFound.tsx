import React from 'react';
import s from './NotFound.module.scss'

const NotFound: React.FC = () => {
    return (
        <div className= {s.wrapper}>
            <h1>Страница не найдена :(</h1>
        </div>
    );
}
 
export default NotFound;
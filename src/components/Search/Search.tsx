import React, {useRef, useCallback, useState} from 'react';
import s from './Search.module.scss'
import {AiOutlineSearch} from 'react-icons/ai'
import {RxCross2} from 'react-icons/rx'
import debounce from 'lodash.debounce'
import { setSearchValue } from '../../redux/slices/filterSlice';
import { useAppDispatch } from '../../redux/store';


export const Search: React.FC = () => {  

    const dispatch = useAppDispatch()
    const inputRef = useRef<HTMLInputElement>(null)

    const [value, setValue] = useState<string>('')

    const updateSearchValue = useCallback(  // тут нету () => {} так как debounce сразу вызваться должен (функция обертка, вернет стрелочную функцию) 
        debounce((str: string) => {         
            dispatch(setSearchValue(str))
        }, 400)
    , [])
           
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        updateSearchValue(e.target.value)
    }
    
    const onCrossClick = () => {
        dispatch(setSearchValue(''))
        setValue('')
        inputRef.current?.focus()
    }

    return (  
        <div className = {s.root}>
            <AiOutlineSearch className = {s.searchIcon}/>
            <input 
                ref = {inputRef}
                className = {s.input} 
                value = {value}
                onChange = {onChangeInput}
                type = 'text' 
                placeholder='Поиск пиццы...'
            />
            {value ? <RxCross2 onClick = {onCrossClick} className = {s.clearIcon}/> : ''}
        </div>
        
    );
}

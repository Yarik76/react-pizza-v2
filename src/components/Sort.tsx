import React, {useState, useRef, useEffect} from "react";
import {IoMdArrowDropup, IoMdArrowDropdown, } from 'react-icons/io'
import {AiOutlineArrowUp, AiOutlineArrowDown} from 'react-icons/ai'
import { TSortOrder } from "../redux/slices/filterSlice";

export interface ISort {
  sortType: SortType
  sortOrder: string
  setSort:  (obj: SortType) => void
  changeSortOrder: (order: TSortOrder) => void
}

export type SortType = {
  name: string
  sortProperty: 'rating' | 'price' | 'title'
}


export const list: Array<SortType> = [
  {name:'популярности', sortProperty: 'rating'},
  {name: 'цене', sortProperty: 'price'}, 
  {name: 'алфавиту', sortProperty: 'title'}
]

export const Sort: React.FC<ISort> = React.memo((props) => {

  const modalRef = useRef<HTMLDivElement>(null)
  const [isOpened, setIsOpened] = useState<boolean>(false)

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as HTMLElement)) {
        setIsOpened(false)
      }
    }
    document.body.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.body.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const onSelectedSortName = (sortObject: SortType) => {
    props.setSort(sortObject)
    setIsOpened(false)
  }

  return (
    <div className="sort">
      <div className="sort__label">
        {isOpened ? <IoMdArrowDropdown/> : <IoMdArrowDropup/>}
        <b>Сортировка по:</b>
        <span onClick = {() => setIsOpened(!isOpened)}>{props.sortType.name}</span>
        <div className="sort__arrows"> 
          <AiOutlineArrowUp 
            color = {props.sortOrder === 'asc' ? '#fe5f1e' : ''}
            onClick={() => props.changeSortOrder('asc')}
          />
          <AiOutlineArrowDown 
            onClick={() => props.changeSortOrder('desc')}
            color = {props.sortOrder === 'desc' ? '#fe5f1e' : ''}
          />
        </div>
      </div>
      {isOpened && 
      <div ref = {modalRef} className="sort__popup">
        <ul>
          {list.map((obj, index) => 
            <li key = {index}
              onClick = {() => onSelectedSortName(obj)}
              className = {props.sortType.name === obj.name ? 'active' : ''}>
              {obj.name}
            </li>
          )}
        </ul>
      </div>
      }
    </div>
  );
});


import React from "react";

export interface ICategories {
  categoryId: number
  setCategory: (id: number) => void
}

const categories = ['Все','Мясные','Вегетарианские','Cырные','Острые', 'Комбо']

export const Categories: React.FC<ICategories> = React.memo(({categoryId, setCategory}) => {

  return (
    <div className="categories">
      <ul>
        {categories.map((c, index) => 
          <li key = {index} className = {categoryId === index ? 'active' : ''} 
            onClick = {() => setCategory(index)}>
            {c}
          </li>
        )}
      </ul>
    </div>
  );
});





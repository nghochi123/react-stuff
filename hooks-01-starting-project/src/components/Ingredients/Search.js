import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const {onLoadIngredients} = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(()=>{
      if(enteredFilter===inputRef.current.value){
        const query = enteredFilter.length===0
        ?''
        :`?orderBy="ing/title"&equalTo="${enteredFilter}"`;
        fetch('https://react-hooks-test-one-default-rtdb.firebaseio.com/ingredients.json'+query)
        .then(response=>response.json())
        .then(responseData=>{
          console.log(responseData)
          const loadedIngredients=[];
          for(const key in responseData){
            loadedIngredients.push({
              id:key,
              title:responseData[key].ing.title,
              amount:responseData[key].ing.amount
            });
          }
          props.onLoadIngredients(loadedIngredients);
        });
      }
      return ()=> {clearTimeout(timer)};
    }, 500);
    
  }, [enteredFilter, onLoadIngredients, inputRef])
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input 
          ref={inputRef}
          type="text"
          value={enteredFilter}
          onChange={e=>setEnteredFilter(e.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;

import React, { useState, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const ingredientReducer= (currentIngredients, action) => {
  switch(action.type){
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing=>ing.id!==action.id);
    default:
      throw new Error('Should not get here');
  }
}

function Ingredients() {
  //const [ingredients, setIngredients] = useState([]);
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    // setIngredients(filteredIngredients);
    dispatch({type: 'SET', ingredients: filteredIngredients});
  }, [])

  const addIngredientHandler = ing => {
    fetch('https://react-hooks-test-one-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify({ing}),
      headers: { 'Content-Type': 'application/json'}
    }).then(response=>{
      return response.json();
    }).then(responseData=>{
      // setIngredients(prevIngredients => [
      //   ...prevIngredients, 
      //   {id: responseData.name, ...ing}]);
      dispatch({type: 'ADD', ingredient:{id: responseData.name, ...ing}});
    });
  }

  const removeIngredientHandler = ingId => {
    fetch(`https://react-hooks-test-one-default-rtdb.firebaseio.com/ingredients/${ingId}.json`, {
      method: 'DELETE'
    }).then(response=>{
      // setIngredients(prevIngredients=>prevIngredients.filter(obj=>obj.id!==ingId));
      dispatch({type: 'DELETE', id: ingId});
    })
    
  }

  const ingredientList = useMemo(()=> {
    return(
    <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler}/>
    );
  }, [ingredients]);

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;

import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(iKey=>{
        return [...Array(props.ingredients[iKey])] //Returns an array with (number of elements) == (number of a certain ingredient)
        .map((a,i)=><BurgerIngredient key={iKey+i} type={iKey}/>);  //Then, returns for each element in the above array, a BurgerIngredient element that has unique key.
    });
    transformedIngredients = transformedIngredients.reduce((arr, el)=>arr.concat(el), []);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>
    } 
    /* The iKey returns 'salad', 'bacon' etc, that match the case names in BurgerIngredient.js
    */
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;
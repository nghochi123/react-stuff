import React from 'react';

import Aux from '../../../hoc/Auxiliary'

const orderSummary = (props) =>{
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ikey=><li key={ikey}><span style={{textTransform: 'capitalize'}}>{ikey}: {props.ingredients[ikey]}</span></li>);
    return (
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
        </Aux>
    );

};

export default orderSummary;
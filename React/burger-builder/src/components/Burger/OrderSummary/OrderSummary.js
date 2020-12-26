import React from 'react';

import Aux from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button';

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
            <p>Total Price: <strong>${props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.continue}>Continue</Button>
        </Aux>
    );

};

export default orderSummary;
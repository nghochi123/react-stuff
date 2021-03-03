import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false
            }
        },
    }

    checkValidity(value, rules){
        let isValid = false;
        if(rules.required){
            isValid=value.trim()!=='';
        }
        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const ichOrderForm = {...this.state.orderForm};
        const ichOrderFormElement = {...ichOrderForm[inputIdentifier]};
        ichOrderFormElement.value = event.target.value;
        ichOrderFormElement.valid = this.checkValidity(ichOrderFormElement.value, ichOrderFormElement.validation);
        ichOrderForm[inputIdentifier] = ichOrderFormElement;
        this.setState({orderForm: ichOrderForm});
    }

    orderHandler = (e) =>{
        e.preventDefault();
        const formData = {};
        for (let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);
    }

    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement=>(
                        <Input 
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        key={formElement.id}
                        changed={(event)=> this.inputChangeHandler(event,formElement.id)}
                        invalid={!formElement.config.valid}/>
                    ))}
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) =>dispatch(actions.purchaseBurger(orderData, token))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
import React, { Component } from 'react';
import Aux from'../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients:null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount(){
        axios.get('https://react-my-burger-5313a-default-rtdb.firebaseio.com/ingredients.json')
        .then(response=>this.setState({ingredients:response.data}));
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((key)=>ingredients[key]).reduce((sm, el)=>sm+el, 0);
        this.setState({
            purchaseable: sum > 0
        })
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const updatedPrice = this.state.totalPrice + priceAddition;
        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount !== 0){    
            const updatedCount = oldCount - 1;
            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type] = updatedCount;
            const priceDiff = INGREDIENT_PRICES[type];
            const updatedPrice = this.state.totalPrice - priceDiff;
            this.setState({
                totalPrice: updatedPrice,
                ingredients: updatedIngredients
            });
            this.updatePurchaseState(updatedIngredients);
        }
        
    }

    purchaseHandler = () =>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => this.setState({purchasing:false});

    purchaseContinueHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(i+'='+this.state.ingredients[i])
        }
        queryParams.push('price='+this.state.totalPrice);
        this.props.history.push({
            pathname: '/checkout',
            search: '?'+queryParams.join('&')
        });
    }

    render(){
        let orderSummary = <Spinner/>;
        
        if(!this.state.loading && this.state.ingredients){
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler}
                price={this.state.totalPrice}/>;
        }
        let burger = this.state.ingredients ? (<Aux>
                        <Burger ingredients={this.state.ingredients}/>
                            <BuildControls
                                ingredientAdded={this.addIngredientHandler}
                                ingredientRemoved={this.removeIngredientHandler}
                                price={this.state.totalPrice}
                                purchaseable={this.state.purchaseable}
                                ordered={this.purchaseHandler}/>
                    </Aux>):<div>uwu</div>;
        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}
                    >{orderSummary}</Modal>
                    {burger}
            </Aux>

        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
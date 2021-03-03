import React, { Component } from 'react';
import Aux from'../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        purchasing: false,
        loading: false
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((key)=>ingredients[key]).reduce((sm, el)=>sm+el, 0);
        return sum>0;
    }

    purchaseHandler = () =>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => this.setState({purchasing:false});

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render(){
        let orderSummary = <Spinner/>;
        
        if(!this.state.loading && this.props.ings){
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler}
                price={this.props.price}/>;
        }
        let burger = this.props.ings ? (<Aux>
                        <Burger ingredients={this.props.ings}/>
                            <BuildControls
                                ingredientAdded={this.props.onIngredientAdded}
                                ingredientRemoved={this.props.onIngredientRemoved}
                                price={this.props.price}
                                purchaseable={this.updatePurchaseState(this.props.ings)}
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

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}

const mapDispatchToProps=dispatch=>{
    return {
        onIngredientAdded: (ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: ()=>dispatch(actions.initIngredients())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
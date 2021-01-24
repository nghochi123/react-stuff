import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSumamry';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    componentDidMount () {
        this.props.onInitPurchase();
    }

    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }

    checkoutContinueHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        let checkout = null;
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ?  <Redirect to="/" />: null;
            checkout = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinue={this.checkoutContinueHandler}
                    />
                    <Route 
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}/>
                </div>
                
                )

        }
        return (
            <div>
                {checkout}
            </div>
        );
    }

}

const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.totalPrice,
        purchased: state.order.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () =>dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
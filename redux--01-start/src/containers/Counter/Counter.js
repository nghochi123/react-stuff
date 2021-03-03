import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as ac from '../../store/actions/actions';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.addCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.subCounter}  />
                <hr/>
                <button onClick={()=>this.props.onStoreResult(this.props.ctr)}>Store result</button>
                <ul>
                    {this.props.storedResults.map(strResult=>(
                        <li key={strResult.id} onClick={()=>this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                    <li onClick={this.props.onDeleteResult}></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
	return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
        
	};
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: ()=>dispatch(ac.increment()),
        onDecrementCounter: ()=>dispatch(ac.decrement()),
        addCounter: ()=>dispatch(ac.add()),
        subCounter: ()=>dispatch(ac.sub()),
        onStoreResult: (res)=>dispatch(ac.storeResultX(res)),
        onDeleteResult: (id)=>dispatch(ac.deleteResult(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state={
            err: null
        }
        componentDidMount () {
            axios.interceptors.request.use(_ => {
                this.setState({err: null});
                return _;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({err: error});
            });
        }
        errorConfirmedHandler=()=>{
            this.setState({err:null});
        }
        render () {
            return(
                <Aux>
                    <Modal show={this.state.err} modalClosed={this.errorConfirmedHandler}>
                        {this.state.err ? this.state.err.message : null}
                    </Modal> 
                    <WrappedComponent {...this.props}/>
                </Aux>
            
            );
        }
    }
}

export default withErrorHandler;
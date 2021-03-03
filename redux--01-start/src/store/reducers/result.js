import * as actionTypes from '../actions/actions';

const initialState = {
    results: []
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: action.value})
            }
        case actionTypes.DELETE_RESULT:
            const updatedResult = state.results.filter(result=>result.id!==action.id);
            return {
                ...state,
                results: updatedResult
            }
        default:
            return state;
    }
};

export default reducer;
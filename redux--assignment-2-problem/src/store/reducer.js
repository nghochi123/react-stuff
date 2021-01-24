const initialState = {
    persons: []
};

const reducer = (state=initialState, action) =>{
    switch(action.type){
        case "ADD":
            return {
                ...state,
                persons: state.persons.concat(action.person)
            }

        case "REMOVE":
            const updatedPersons = state.persons.filter(x=>x.id !== action.person.id);
            return {
                ...state,
                persons: updatedPersons
            }

        default:
            return state;

    }
}

export default reducer;
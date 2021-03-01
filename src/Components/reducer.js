export const initialState = {
    todos: [],
    setTodo: function() {},
    loading: false
};

export const actionTypes = {
    SET_TODOS: "SET_TODOS",
    SET_TODOSSTATE: "SET_TODOSSTATE",
    SET_USER: "SET_USER",
    SET_LOADING: "SET_LOADING"
};


const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_TODOS:
            return {
                ...state,
                todos: action.todos
            }
        case actionTypes.SET_TODOSSTATE:
            return {
                ...state,
                setTodo: action.setTodo
            }
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            }
        case actionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state;
    }
}

export default reducer;
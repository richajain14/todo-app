import constants from '../constants';

let compare = (obj1, obj2) => {
    return obj2.id - obj1.id;
};

export default(state = [], action) => {
    let updated;
    switch (action.type) {
        case (constants.ADD_TODO_SUCCESS):
            // copy the newly added todo and concat to existing todo list state

            updated = [
                ...state,
                Object.assign({}, action.todo)
            ];
            return updated.sort(compare); //sort by id with largest on top
        case (constants.FETCH_TODOS_SUCCESS):
            updated = [...action.todos]; //copy all the todos
            return updated.sort(compare); //sorted list with latest on top
        case (constants.UPDATE_TODO_SUCCESS):
            // find the matching todo in the state and replace with copy the updated result

            updated = state
                .map((item) => item.id == action.todo.id ? Object.assign({}, action.todo) : item);
            return updated.sort(compare);
        default:
            return state;
    }
};

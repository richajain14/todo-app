import _ from 'lodash';
import constants from '../constants';

let compare = (obj1, obj2) => {
    return obj2._id - obj1._id;
};

export default(state = [], action) => {
    let updated;
    switch (action.type) {
        case constants.ADD_TODO_SUCCESS:
            /*copy the newly added todo and concat to existing todo list state*/

            updated = [
                ...state,
                Object.assign({}, action.todos)
            ];
            //sort by id with largest on top
            return updated.sort(compare);
        case constants.FETCH_TODOS_SUCCESS:
            /*copy all the todos*/
            updated = [...action.todos];

            /*sorted list with latest on top*/
            return updated.sort(compare);
        case constants.UPDATE_TODO_SUCCESS:
            /*find the matching todo in the state and replace with copy the updated result*/

            updated = state
                .map((item) => item._id === action.todo._id ? Object.assign({}, action.todo) : item);
            return updated.sort(compare);

        case constants.DELETE_TODO_SUCCESS:
            /*find the matching todo and delete it from the list*/
            updated = [...state];
            _.remove(updated, (item) => item._id === action.id);
            return updated;
        default:
            return state;
    }
};

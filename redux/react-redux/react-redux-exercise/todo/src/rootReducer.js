import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {
    todos: []
};

const rootReducer(state = INITIAL_STATE, action){
    switch (action.type) {
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, { task: action.task, id: uuidv4() }] };
        case 'DELETE_TODO':
            return { ...state, todos: state.todos.filter(todo => todo !== action.id) };
        case 'EDIT_TODO':
            const todos = state.todos.map(todo => {
                if (todo.id === action.id) {
                    return { ...todo, task: action.updatedTask };
                };
                return todo
            });
            return { ...state, todos };
        default:
            return state;
    };
};

export default rootReducer;
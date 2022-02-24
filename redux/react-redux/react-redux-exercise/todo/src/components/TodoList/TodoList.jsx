import './TodoList.scss';

import { useSelector, useDispatch } from 'react-redux';

import Todo from '../Todo/Todo';
import NewTodoForm from '../NewTodoForm/NewTodoForm';

const TodoList = () => {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos);

    const handleCreate = (task) => dispatch({ type: 'ADD_TODO', task });
    const handleDelete = (id) => dispatch({ type: "DELETE_TODO", id });
    const handleEdit = (id, editedTask) => dispatch({ type: 'EDIT_TODO', id, editedTask });

    const allTodos = todos.map(todo => (
        <Todo
            id={todo.id}
            key={todo.id}
            task={todo.task}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
        />
    ));

    return (
        <div className='TodoList'>
            <NewTodoForm handleCreate={handleCreate} />
            <ul>{allTodos}</ul>
        </div>
    );
};

export default TodoList;
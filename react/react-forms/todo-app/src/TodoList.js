import { useState } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import './TodoList.scss';

function TodoList() {
    const [todos, setTodos] = useState([]);

    const create = (newTodo) => {
        setTodos(todos => [...todos, newTodo]);
    };

    const update = (id, updatedTask) => {
        setTodos(todos =>
            todos.map(todo =>
                todo.id === id ? { ...todo, task: updatedTask } : todo
            )
        );
    };
    const toggleCompleted = (id) => {
        setTodos(todos =>
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const remove = (id) => setTodos(todos => todos.filter(todo => todo.id !== id));

    const todoComp = todos.map(todo => (
        <Todo
            remove={remove}
            key={todo.id}
            id={todo.id}
            task={todo.task}
            update={update}
            completed={todo.completed}
            toggleCompleted={toggleCompleted}
        />
    ));

    return (
        <div className="TodoList">
            <h1>Todo List <span>Created with React and SASS</span></h1>
            <NewTodoForm createTodo={create} />
            <ul>{todoComp}</ul>
        </div>
    );
};

export default TodoList;
import { v4 as uuid } from 'uuid';
import { useState } from 'react';
import './NewTodoForm.scss'

const NewTodoForm = ({ createTodo }) => {
    const [task, setTask] = useState('');

    const handleChange = (e) => setTask(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        createTodo({ task, id: uuid(), completed: false });
        setTask('');
    };
    return (
        <>
            <form onSubmit={handleSubmit} className='NewTodoForm'>
                <label htmlFor='task'>New Todo</label>
                <input
                    id='task'
                    type='text'
                    placeholder='New Todo'
                    value={task}
                    onChange={handleChange}
                    name='task'
                />
                <button>Add Todo</button>
            </form>
        </>
    )
};

export default NewTodoForm;

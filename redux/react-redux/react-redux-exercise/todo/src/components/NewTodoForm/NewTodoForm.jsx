import { useState } from "react";

const NewTodoForm = ({ handleCreate }) => {
    const [task, setTask] = useState('');

    const handleChange = (e) => setTask(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreate(task);
        setTask('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="task">Task: </label>
                <input
                    name="task"
                    type='text'
                    onChange={handleChange}
                    value={task}
                />
                <button>Add todo!</button>
            </form>
        </div>
    )
};

export default NewTodoForm;
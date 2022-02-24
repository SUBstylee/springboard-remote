import './Todo.scss';

import { useState } from 'react';

const Todo = ({ id, task, handleDelete, handleEdit }) => {
    const [edit, setEdit] = useState(task);
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing(isEditing => !isEditing);

    const handleChange = (e) => setEdit(e.target.value);

    const updateChanges = (e) => {
        e.preventDefault();
        handleEdit(id, task);
        setIsEditing(false);
    };

    const deleteMeme = () => handleDelete(id);

    if (isEditing) {
        return (
            <div>
                <form onSubmit={updateChanges}>
                    <input
                        type='text'
                        value={edit}
                        onChange={handleChange}
                    />
                    <button>Stop Editing</button>
                </form>
            </div>
        );
    }

    return (
        <div>
            <button onClick={toggleEdit}>Edit</button>
            <button onClick={deleteMeme}>X</button>
            <p>{edit}</p>
        </div>
    );
};

export default Todo;
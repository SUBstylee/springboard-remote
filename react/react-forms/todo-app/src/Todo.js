import { useState } from "react";
import './Todo.scss';
const Todo = ({ task = 'default todo', id = '1', remove, update, completed, toggleCompleted }) => {
    const [edit, setEdit] = useState(task);
    const [isEdit, setIsEdit] = useState(false);

    const handleRemove = () => remove(id);
    const handleEdit = () => setIsEdit(isEdit ? false : true);
    const handleUpdate = (e) => {
        e.preventDefault();
        update(id, edit);
        setIsEdit(false);
    };
    const handleChange = (e) => setEdit(e.target.value);
    const handleToggle = (e) => toggleCompleted(id);

    let res;
    if (isEdit) {
        res = (
            <div className='Todo'>
                <form className="Todo-edit-form">
                    <input type='text' value={edit} onChange={handleChange} />
                    <button onClick={handleUpdate}>Save Changes</button>
                </form>
            </div>
        )
    } else {
        res = (
            <div className='Todo'>
                <li className={completed ? 'Todo-task completed' : 'Todo-task'} onClick={handleToggle}>{task}</li>
                <div className="Todo-buttons">
                    <button onClick={handleEdit}><i className="fas fa-pen" /></button>
                    <button onClick={handleRemove}><i className="fas fa-trash" /></button>
                </div>
            </div>
        );
    }
    return res;
};

export default Todo;

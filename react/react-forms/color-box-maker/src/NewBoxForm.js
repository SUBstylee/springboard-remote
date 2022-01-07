import { useState } from "react";
import { v4 as uuid } from 'uuid';

function NewBoxForm(props) {
    const [formData, setFormData] = useState({
        height: '',
        width: '',
        color: ''
    })

    const handleChange = (evt => {
        setFormData(data => ({
            ...data,
            [evt.target.name]: evt.target.value
        }));
    });

    const handleSubmit = (evt => {
        evt.preventDefault();
        const newBox = { ...formData, id: uuid() }
        props.create(newBox);
        setFormData({
            height: '',
            width: '',
            color: ''
        });
    });

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="height">Height</label>
                <input
                    type='text'
                    name='height'
                    value={formData.height}
                    onChange={handleChange}
                    id='height'
                />
            </div>
            <div>
                <label htmlFor="width">Width</label>
                <input
                    type='text'
                    name='width'
                    value={formData.width}
                    onChange={handleChange}
                    id='width'
                />
            </div>
            <div>
                <label htmlFor="color">Color</label>
                <input
                    type='text'
                    name='color'
                    value={formData.color}
                    onChange={handleChange}
                    id='color'
                />
            </div>
            <button>MAKE A BOX!</button>
        </form>
    );
};

export default NewBoxForm;
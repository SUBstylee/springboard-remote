import { useState } from "react";

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

    const handleSubmit = (ect => {

    });

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Height</label>
                <input
                    type='text'
                    name='height'
                    value={formData.height}
                    onChange={handleChange}
                    id='height'
                />
            </div>
            <div>
                <label>Width</label>
                <input
                    type='text'
                    name='width'
                    value={formData.width}
                    onChange={handleChange}
                    id='width'
                />
            </div>
            <div>
                <label>Color</label>
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
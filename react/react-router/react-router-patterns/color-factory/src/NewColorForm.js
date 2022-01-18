import { useState } from "react";
import { useNavigate } from "react-router-dom";


const NewColorForm = ({ addColor }) => {
    const [form, setForm] = useState({ name: '', hex: '#ffffff' });
    const navigate = useNavigate();

    function handleChange(e) {
        e.persist();
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };
    function handleSubmit(e) {
        e.preventDefault();
        addColor({ [form.name]: form.hex });
        // return (<Navigate to="/colors" />);
        navigate('/colors')
    };

    const { hex, name } = form;
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Color Name</label>
                    <input
                        name="name"
                        id="name"
                        placeholder="Enter color name..."
                        onChange={handleChange}
                        value={name}
                    />
                </div>
                <div>
                    <label htmlFor="hex">Color Value</label>
                    <input
                        type='color'
                        name='hex'
                        id='hex'
                        onChange={handleChange}
                        value={hex}
                    />
                </div>
                <input type='submit' value='Add new color!' readOnly />
            </form>
        </div>
    )
}

export default NewColorForm;
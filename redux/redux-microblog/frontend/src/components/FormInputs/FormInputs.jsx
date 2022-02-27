

const FormInputs = ({ name, text, handleChange, value }) => {

    return (
        <div className="form-group">
            <label htmlFor={name}>{text}</label>
            <input onChange={handleChange}
                id={name}
                name={name}
                className='form-control'
                value={value}
            />
        </div>
    );
};

export default FormInputs;
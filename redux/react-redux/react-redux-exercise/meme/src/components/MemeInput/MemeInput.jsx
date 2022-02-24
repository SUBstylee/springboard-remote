import './MemeInput.scss';

const MemeInput = ({ text, type, name, id, onChange, value }) => {

    return (
        <div className='MemeInput'>
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                name={name}
                id={id}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

export default MemeInput;
import './custom-button.styles.scss';

const CustomButton = ({ text, isLoading, applied }) => (
    <button className={`custom-button ${applied ? 'disabled-btn' : ''}`} disabled={applied}>
        {text}
    </button>
);

export default CustomButton;
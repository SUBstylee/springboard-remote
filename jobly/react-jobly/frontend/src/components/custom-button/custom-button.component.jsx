import './custom-button.styles.scss';

const CustomButton = ({ text, isLoading }) => (
    <button className='custom-button'>
        {text}
    </button>
);

export default CustomButton;
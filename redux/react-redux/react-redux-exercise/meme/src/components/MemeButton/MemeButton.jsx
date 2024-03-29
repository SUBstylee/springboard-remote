import './MemeButton.scss';

const MemeButton = ({ text, onClick }) => {

    return (
        <button onClick={onClick}>{text}</button>
    );
};

export default MemeButton;
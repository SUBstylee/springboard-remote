import './loading-spinner.styles.scss';

const LoadingSpinner = () => {
    return (
        <div className="spinner">
            <div className="spinner__square"></div>
            <div className="spinner__square"></div>
            <div className="spinner__square"></div>
            <div className="spinner__square"></div>
        </div>
    );
};

export default LoadingSpinner;
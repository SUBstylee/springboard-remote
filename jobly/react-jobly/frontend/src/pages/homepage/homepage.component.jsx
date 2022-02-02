import './homepage.styles.scss';
import CustomButton from '../../components/custom-button/custom-button.component';
import { Link } from 'react-router-dom';

const HomePage = () => (
    <div className='homepage'>
        <h1>homepage</h1>
        <Link to='/signup'>
            <CustomButton text='signup' />
        </Link>
        <Link to='/login'>
            <CustomButton text='login' />
        </Link>
    </div>
);

export default HomePage;
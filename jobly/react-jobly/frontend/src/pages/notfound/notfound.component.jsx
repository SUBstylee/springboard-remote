import './notfound.styles.scss';
import Logo from '../../assets/JOBLY.png';
import { Link } from 'react-router-dom';
import CustomButton from '../../components/custom-button/custom-button.component';
const NotFound = () => (
    <div className='notfound'>
        <img src={Logo} alt='Jobly logo' />
        <h1>We cannot seem to find that...</h1>
        <Link to='/'>
            <CustomButton text='back to home' />
        </Link>
    </div>
);
export default NotFound;
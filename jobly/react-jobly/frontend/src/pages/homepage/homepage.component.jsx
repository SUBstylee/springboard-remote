import './homepage.styles.scss';
import { useContext } from 'react';
import CustomButton from '../../components/custom-button/custom-button.component';
import { Link } from 'react-router-dom';
import Logo from '../../assets/JOBLY.png';
import Directory from '../../components/directory/directory.component';
import UserContext from '../../UserContext';

const HomePage = ({ logout }) => {
    const { user } = useContext(UserContext);

    return (
        <div className='homepage'>
            <div className='homepage-container'>
                <img src={Logo} alt='Jobly logo' />
                {user ? (
                    <div className='logged-homepage'>
                        <Directory logout={logout} />
                    </div>
                ) : (
                    <>
                        <h1>Where jobs are found.</h1>
                        <Link to='/signup'>
                            <CustomButton text='signup' />
                        </Link>
                        <Link to='/login'>
                            <CustomButton text='login' />
                        </Link>
                        <br />
                        <Link to={{ pathname: '/login', state: { testuser: true } }}>
                            <CustomButton text='test account*' />
                        </Link>
                        <p>*Use this if you do not wish to create an account.</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default HomePage;
import './login.styles.scss';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import UserContext from '../../UserContext';

const Login = ({ login, error }) => {
    const location = useLocation();
    const testUser = location.state?.testuser;
    const intialState = {
        username: testUser ? 'testuser' : '',
        password: testUser ? 'password' : '',
    };

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(intialState);
    const { user } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (user) {
            history.push('/');
        };
    }, [user, history]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            let res = await login(formData);
            setIsLoading(false);
            if (res.success) {
                history.push('/');
            }
        } catch (e) {
            alert(e);
            setIsLoading(false);
        };
    };

    return (
        <div className='login'>
            <h1>login</h1>
            <form onSubmit={handleSubmit}>
                <FormInput name='username' type='text' autoComplete='current-username' value={formData?.username} onChange={handleChange} label='username' required />
                <FormInput name='password' type='password' autoComplete='current-password' value={formData?.password} onChange={handleChange} label='password' required />
                <CustomButton text='sign in!' />
                <Link to='/signup'>
                    <CustomButton text='create account' isLoading={isLoading} />
                </Link>
            </form>
        </div>
    );
};

export default Login;
import './login.styles.scss';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import UserContext from '../../UserContext';
import { useNavigate } from 'react-router';

const Login = ({ login, error }) => {
    const intialState = {
        username: '',
        password: '',
    };

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(intialState);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate.push('/');
        }
    }, [user, navigate]);

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
            await login(formData);
            setIsLoading(false);
            setFormData(intialState);
            history.push('/companies');
        } catch (e) {
            alert(e);
            setIsLoading(false);
        };
    };

    return (
        <div className='login'>
            <h1>login</h1>
            <form>
                <FormInput name='username' type='text' autoComplete='current-username' value={formData.username} onChange={handleChange} label='username' required />
                <FormInput name='password' type='password' autoComplete='current-password' value={formData.password} onChange={handleChange} label='password' required />
                <CustomButton text='sign in!' />
                <Link to='/signup'>
                    <CustomButton text='create account' isLoading={isLoading} />
                </Link>
            </form>
        </div>
    );
};

export default Login;
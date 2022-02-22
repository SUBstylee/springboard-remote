import './signup.styles.scss';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component'
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../UserContext';

const Signup = ({ signup }) => {
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
    });
    const { user } = useContext(UserContext);
    // const [formErrors, setFormErrors] = useState([]);

    useEffect(() => {
        if (!user) {
            history.push('/');
        };
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            let res = await signup(formData);
            setIsLoading(false);
            if (res) {
                history.push('/');
            }
        } catch (e) {
            alert(e);
            setIsLoading(false);
        };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    };


    return (
        <div className='signup'>
            <h1>signup</h1>
            <form onSubmit={handleSubmit}>
                <FormInput name='username' type='text' autoComplete='new-username' label='username' required
                    value={formData.username} onChange={handleChange}
                />
                <FormInput name='password' type='password' autoComplete='new-password' label='password' required
                    value={formData.password} onChange={handleChange}
                />
                <FormInput name='firstName' type='text' autoComplete='first-name' label='first name' required
                    value={formData.firstName} onChange={handleChange}
                />
                <FormInput name='lastName' type='text' autoComplete='last-name' label='last name' required
                    value={formData.lastName} onChange={handleChange}
                />
                <FormInput name='email' type='email' autoComplete='email' label='email' required
                    value={formData.email} onChange={handleChange}
                />
                <CustomButton text='sign up!' type='submit' onSubmit={handleSubmit} isLoading={isLoading} />
                <Link to='/login'>
                    <CustomButton text='i have an account' />
                </Link>
            </form>
        </div>
    );
};

export default Signup;